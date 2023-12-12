import {AuthorEntity} from "../../../core/author/Author.entity";
import { faker } from '@faker-js/faker';
import {Container} from "inversify";
import {DBPort} from "../../../core/ports/DBPort";
import {DI_TOKEN} from "../../../config/injections/di-tokens";
import {DBAdapter} from "../../out/persistence/DBAdapter";
import {getDataSource} from "../../../config/db/getDataSource";
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

console.log('Hello from CLI adapter');

const generateAuthorsMode = argv.entity === 'author';
const generateCount = +argv.count;

const container = new Container();
container.bind<DBPort>(DI_TOKEN.DBAdapter).to(DBAdapter);

(async () => {

  if (generateAuthorsMode) {
    await generateAuthors(generateCount)
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
  await (await getDataSource()).destroy();
}
