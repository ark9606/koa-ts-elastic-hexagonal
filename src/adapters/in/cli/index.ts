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
import * as fs from 'fs';
import * as path from "path";
import * as readline from "readline";
const argv = yargs(hideBin(process.argv)).argv;

console.log('CLI adapter started');

const generateAuthorsMode = argv.entity === 'author';
const generateStoriesMode = argv.entity === 'story';

const container = new Container();
container.bind<DBPort>(DI_TOKEN.DBAdapter).to(DBAdapter);
container.bind<ElasticPort>(DI_TOKEN.ElasticAdapter).to(ElasticAdapter);

(async () => {

  if (generateAuthorsMode) {
    const generateCount = +argv.count;
    await generateAuthors(generateCount)
  }
  else if (generateStoriesMode) {
    await seedStories();
  }

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

async function seedStories(): Promise<void> {
  const dbAdapter = container.get<DBPort>(DI_TOKEN.DBAdapter);
  const elasticAdapter = container.get<ElasticPort>(DI_TOKEN.ElasticAdapter);

  await elasticAdapter.createIndex();

  const authors = await getAllAuthors();

  const read = fs.createReadStream(path.join(__dirname, '..', '..', '..', '..', 'data', 'news_dataset.json'));
  const rl = readline.createInterface({
    input: read,
  });
  let authorPointer = 0;
  const stories = [];
  rl.on('line', async (line) => {
    if (authorPointer >= authors.length - 1) {
      authorPointer = 0;
    }
    const object = JSON.parse(line);
    const entity = new StoryEntity();
    entity.title = object.headline;
    entity.description = object.short_description;
    entity.fullText = faker.lorem.paragraph(2) + object.short_description + faker.lorem.paragraph(2);
    entity.photoUrl = faker.image.avatar();
    entity.authorId = authors[authorPointer++].id;
    entity.category = object.category;
    entity.liked = faker.number.int({ min: 50, max: 1000 });
    entity.createdAt = faker.date.past({refDate: new Date()});
    stories.push(entity);

  });

  rl.on('close', async () => {
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
    console.log('Stories added to DB and Elastic')
    await (await getDataSource()).destroy();
  });
}
