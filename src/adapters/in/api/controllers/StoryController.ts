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
    @queryParam('filter') filter: string,
    @queryParam('take') take: string,
    @queryParam('skip') skip: string,
  ) {
    return this.storyServicePort.getList({
      filter,
      take: Number.isSafeInteger(+take) ? +take : 50,
      skip: Number.isSafeInteger(+skip) ? +skip : 0,
    });
  }

  // todo create several endpoint for aggs from ELASTIC

  @httpGet('/search')
  async searchStories(
    @queryParam('search') search: string,
    @queryParam('take') take: string,
    @queryParam('skip') skip: string,
  ) {
    return this.storyServicePort.searchStories({
      search,
      take: Number.isSafeInteger(+take) ? +take : 50,
      skip: Number.isSafeInteger(+skip) ? +skip : 0,
    });
  }

  @httpGet('/:id')
  async getOneById(@requestParam("id") id: string) {
    return this.storyServicePort.getOne(id);
  }
}