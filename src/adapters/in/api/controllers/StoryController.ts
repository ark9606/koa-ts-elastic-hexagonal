import {controller, httpGet, httpPost, interfaces, requestParam} from "inversify-koa-utils";
import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens";
import {GetAuthorsListPort} from "../../../../core/author/port/GetAuthorsListPort";
import "reflect-metadata";
import {StoryServicePort} from "../../../../core/story/port/StoryServicePort";

@controller('/stories')
@injectable()
export class StoryController implements interfaces.Controller {

  constructor(
    @inject(DI_TOKEN.StoryService)
    private storyServicePort: StoryServicePort,
  ) {
  }

  @httpGet('/')
  async getAll() {
    return this.storyServicePort.getList();
  }

  @httpGet('/:id')
  async getOneById(@requestParam("id") id: string) {
    return this.storyServicePort.getOne(id);
  }
}