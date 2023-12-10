import {Repository} from "typeorm";
import {AuthorEntity} from "../author/Author.entity";
import {StoryEntity} from "../story/Story.entity";
import {AuthorModel} from "../author/Author.model";

export interface DBPort {
  getAuthorRepository(): Promise<Repository<AuthorEntity>>;
  getStoryRepository(): Promise<Repository<StoryEntity>>;

  getAuthorById(id: string): Promise<AuthorModel|null>;
}