import {AuthorEntity} from "./Author.entity";
import {AuthorModel} from "./Author.model";
import {DBPort} from "../ports/DBPort";

export class AuthorMapper {
  public static toModel(entity: AuthorEntity, dbPort: DBPort): AuthorModel {
    const model = new AuthorModel(dbPort);
    Object.keys(entity).forEach(key => {
      model[key] = entity[key];
    });
    return model;
  }
}