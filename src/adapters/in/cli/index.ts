import {AuthorEntity} from "../../../core/author/Author.entity";
import { faker } from '@faker-js/faker';
import {Container} from "inversify";
import {DBPort} from "../../../core/ports/DBPort";
import {DI_TOKEN} from "../../../config/injections/di-tokens";
import {DBAdapter} from "../../out/persistence/DBAdapter";
import {getDataSource} from "../../../config/db/getDataSource";
import {StoryEntity} from "../../../core/story/Story.entity";
import {ElasticPort} from "../../../core/ports/ElasticPort";
import {ElasticAdapter} from "../../out/persistence/ElasticAdapter";
import {In} from "typeorm";
import {chunkify} from "../../../core/common/utils/chunkify";
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

console.log('CLI adapter started');

const generateAuthorsMode = argv.entity === 'author';
const generateStoriesMode = argv.entity === 'story';
const generateCount = +argv.count;

const STORIES_CATEGORIES = [
  'BUSINESS',
  'ECONOMICS',
  'SCIENCE',
  'SECURITY',
  'GAMES',
  'PROGRAMMING',
  'ENTERTAINMENT',
  'MUSIC',
  'MOVIE',
  'TRAVEL',
  'HEALTH',
  'BEAUTY',
];

const container = new Container();
container.bind<DBPort>(DI_TOKEN.DBAdapter).to(DBAdapter);
container.bind<ElasticPort>(DI_TOKEN.ElasticAdapter).to(ElasticAdapter);

(async () => {

  if (generateAuthorsMode) {
    await generateAuthors(generateCount)
  }
  else if (generateStoriesMode) {
    const authors = await getAllAuthors();
    const chunks = chunkify(authors, 50);
    let generated = 0;
    for (const chunk of chunks) {
      generated += await generateStoriesForAuthors(chunk);
    }
    console.log('Created stories:', generated);
  }
  await (await getDataSource()).destroy();

})();

async function generateAuthors(count: number) {
  const dbAdapter = container.get<DBPort>(DI_TOKEN.DBAdapter);
  const entities = new Array(count).fill(null).map(() => {
    const entity = new AuthorEntity();
    entity.firstName = faker.person.firstName();
    entity.lastName = faker.person.firstName();
    entity.description = faker.person.bio();
    entity.photoUrl = faker.image.avatar();
    return entity;
  });

  const repo = await dbAdapter.getAuthorRepository();
  const res = await repo.insert(entities);

  console.log('Created authors:', res?.identifiers?.length || 'none');
}

async function getAllAuthors() {
  const dbAdapter = container.get<DBPort>(DI_TOKEN.DBAdapter);
  const repo = await dbAdapter.getAuthorRepository();
  return repo.find();
}

async function generateStoriesForAuthors(authors: AuthorEntity[]): Promise<number> {
  const dbAdapter = container.get<DBPort>(DI_TOKEN.DBAdapter);
  const elasticAdapter = container.get<ElasticPort>(DI_TOKEN.ElasticAdapter);

  const stories: StoryEntity[] = [];
  authors.forEach(author => {
    const storiesCount = faker.number.int({ min: 250, max: 400 });
    for (let i = 0; i < storiesCount; i++) {
      const entity = new StoryEntity();
      entity.title = faker.lorem.sentence();
      entity.description = faker.lorem.paragraph(2);
      entity.fullText = faker.lorem.paragraph(20);
      entity.photoUrl = faker.image.avatar();
      entity.authorId = author.id;
      entity.category = STORIES_CATEGORIES[faker.number.int({min: 0, max: STORIES_CATEGORIES.length - 1})]
      entity.liked = faker.number.int({ min: 50, max: 1000 });
      entity.createdAt = faker.date.past({refDate: new Date()})
      stories.push(entity);
    }
  });


  const repo = await dbAdapter.getStoryRepository();
  const chunks = chunkify(stories, 5000);
  let generated = 0;
  for (const chunk of chunks) {
    const res = await repo.insert(chunk);
    generated += res?.identifiers?.length;

    const entities = await repo.find({
      where: {
        id: In(res?.identifiers.map(({id}) => id)),
      }
    });
    await elasticAdapter.putStories(entities);
  }



  return generated;
}
