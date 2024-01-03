import {AuthorEntity} from "./Author.entity.js";
import {AuthorModel} from "./Author.model.js";
import {DBPort} from "../ports/DBPort.js";

export class AuthorMapper {
  public static toModel(entity: AuthorEntity, dbPort: DBPort): AuthorModel {
    const model = new AuthorModel(dbPort);
    Object.keys(entity).forEach(key => {
      model[key] = entity[key];
    });
    return model;
  }
}