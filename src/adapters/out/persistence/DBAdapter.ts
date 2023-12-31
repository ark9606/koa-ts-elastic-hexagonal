import {DBPort} from "../../../core/ports/DBPort.js";
import {getDataSource} from "../../../config/db/getDataSource.js";
import {Repository} from "typeorm";
import {AuthorEntity} from "../../../core/author/Author.entity.js";
import {injectable} from "inversify";
import {StoryEntity} from "../../../core/story/Story.entity.js";
import {AuthorModel} from "../../../core/author/Author.model.js";
import {AuthorMapper} from "../../../core/author/AuthorMapper.js";

@injectable()
export class DBAdapter implements DBPort {
  async getAuthorRepository(): Promise<Repository<AuthorEntity>> {
    return (await getDataSource()).getRepository(AuthorEntity);
  }

  async getStoryRepository(): Promise<Repository<StoryEntity>> {
    return (await getDataSource()).getRepository(StoryEntity);
  }

  async getAuthorById(authorId: string): Promise<AuthorModel|null> {
    const repository = await this.getAuthorRepository();
    const entity = await repository.findOne({
      where: {
        id: authorId,
      }
    });
    if (!entity) {
      return null;
    }
    return AuthorMapper.toModel(entity, this);
  }
}