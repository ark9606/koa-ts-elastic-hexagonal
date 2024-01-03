import {controller, httpGet, httpPost, interfaces, queryParam, requestParam} from "inversify-koa-utils";
import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens.js";
import "reflect-metadata";
import {StoryServicePort} from "../../../../core/story/port/StoryServicePort.js";

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

  @httpGet('/statistics')
  async getStatistics() {
    return this.storyServicePort.getStatistics();
  }

  @httpGet('/:id')
  async getOneById(@requestParam("id") id: string) {
    return this.storyServicePort.getOne(id);
  }
}