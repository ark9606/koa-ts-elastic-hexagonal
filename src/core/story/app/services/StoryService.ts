import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens";
import {DBPort} from "../../../ports/DBPort";
import {GetStoriesListOutput, GetStoryOutput, StoryServicePort} from "../../port/StoryServicePort";

@injectable()
export class StoryService implements StoryServicePort {

  constructor(
    @inject(DI_TOKEN.DBAdapter) private dbAdapter: DBPort,
  ) {
  }

  async getList(): Promise<GetStoriesListOutput[]> {
    const stories = await (await this.dbAdapter.getStoryRepository()).find();
    return stories.map(story => ({
      id: story.id,
      title: story.title,
      description: story.description,
    }))
  }


  async getOne(id: string): Promise<GetStoryOutput> {
    const storyEntity = await (await this.dbAdapter.getStoryRepository()).findOne({
      where: {
        id
      }
    });
    return storyEntity;
  }



}