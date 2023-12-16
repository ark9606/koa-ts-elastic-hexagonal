import {controller, httpGet, httpPost, interfaces, queryParam, requestParam} from "inversify-koa-utils";
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
  async getAll(
    @queryParam('title') title: string,
    @queryParam('description') description: string,
    @queryParam('fullText') fullText: string,
    @queryParam('take') take: string,
    @queryParam('skip') skip: string,
  ) {
    return this.storyServicePort.getList({
      title,
      description,
      fullText,
      take: Number.isSafeInteger(+take) ? +take : 50,
      skip: Number.isSafeInteger(+skip) ? +skip : 0,
    });
  }

  @httpGet('/:id')
  async getOneById(@requestParam("id") id: string) {
    return this.storyServicePort.getOne(id);
  }
}