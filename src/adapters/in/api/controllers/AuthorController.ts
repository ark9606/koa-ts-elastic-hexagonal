import {controller, httpGet, httpPost, interfaces} from "inversify-koa-utils";
import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens";
import {GetAuthorsListPort} from "../../../../core/author/port/GetAuthorsListPort";
import "reflect-metadata";

@controller('/authors')
@injectable()
export class AuthorController implements interfaces.Controller {

  constructor(
    @inject(DI_TOKEN.GetAuthorsListUseCase)
    private getAuthorsUseCase: GetAuthorsListPort,
  ) {
  }

  @httpGet('/')
  async getAll() {
    return this.getAuthorsUseCase.get();
  }

  @httpPost('/articles')
  async createArticle() {
    return {};
  }
}