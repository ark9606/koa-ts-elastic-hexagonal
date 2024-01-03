import {Repository} from "typeorm";
import {AuthorEntity} from "../author/Author.entity.js";
import {StoryEntity} from "../story/Story.entity.js";
import {AuthorModel} from "../author/Author.model.js";

export interface DBPort {
  getAuthorRepository(): Promise<Repository<AuthorEntity>>;
  getStoryRepository(): Promise<Repository<StoryEntity>>;

  getAuthorById(id: string): Promise<AuthorModel|null>;
}