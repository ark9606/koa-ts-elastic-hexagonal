import {controller, httpGet, httpPost, interfaces, requestBody, requestParam} from "inversify-koa-utils";
import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens.js";
import {GetAuthorsListPort} from "../../../../core/author/port/GetAuthorsListPort.js";
import "reflect-metadata";
import {CreateStoryByAuthorPort} from "../../../../core/author/port/CreateStoryByAuthorPort.js";

@controller('/authors')
@injectable()
export class AuthorController implements interfaces.Controller {

  constructor(
    @inject(DI_TOKEN.GetAuthorsListUseCase)
    private getAuthorsListPort: GetAuthorsListPort,
    @inject(DI_TOKEN.CreateStoryByAuthorUseCase)
    private createStoryByAuthorPort: CreateStoryByAuthorPort,
  ) {
  }

  @httpGet('/')
  async getAll() {
    return this.getAuthorsListPort.get();
  }

  @httpPost('/:id/stories')
  async createStory(@requestBody() body, @requestParam("id") authorId: string) {
    return this.createStoryByAuthorPort.create(body, authorId);
  }
}