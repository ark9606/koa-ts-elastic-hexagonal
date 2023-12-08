import {Repository} from "typeorm";
import {AuthorEntity} from "../author/Author.entity";
import {StoryEntity} from "../story/Story.entity";

export interface DBPort {
  getAuthorRepository(): Promise<Repository<AuthorEntity>>;
  getStoryRepository(): Promise<Repository<StoryEntity>>;
}