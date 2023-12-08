import {Repository} from "typeorm";
import {AuthorEntity} from "../author/Author.entity";

export interface DBPort {
  getAuthorRepository(): Promise<Repository<AuthorEntity>>;
}