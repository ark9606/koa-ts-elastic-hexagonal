import {DBPort} from "../../../core/ports/DBPort";
import {getDataSource} from "../../../config/db/getDataSource";
import {Repository} from "typeorm";
import {AuthorEntity} from "../../../core/author/Author.entity";
import {injectable} from "inversify";
import {StoryEntity} from "../../../core/story/Story.entity";

@injectable()
export class DBAdapter implements DBPort {
  async getAuthorRepository(): Promise<Repository<AuthorEntity>> {
    return (await getDataSource()).getRepository(AuthorEntity);
  }

  async getStoryRepository(): Promise<Repository<StoryEntity>> {
    return (await getDataSource()).getRepository(StoryEntity);
  }
}