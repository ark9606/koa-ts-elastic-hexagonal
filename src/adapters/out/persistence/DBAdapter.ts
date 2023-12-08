import {DBPort} from "../../../core/ports/DBPort";
import {getDataSource} from "../../../config/db/getDataSource";
import {Repository} from "typeorm";
import {AuthorEntity} from "../../../core/author/Author.entity";
import {injectable} from "inversify";

@injectable()
export class DBAdapter implements DBPort {
  async getAuthorRepository(): Promise<Repository<AuthorEntity>> {
    return (await getDataSource()).getRepository(AuthorEntity);
  }
}