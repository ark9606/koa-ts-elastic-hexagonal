import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens";
import {DBPort} from "../../../ports/DBPort";
import {GetStoriesListInput, GetStoriesListOutput, GetStoryOutput, StoryServicePort} from "../../port/StoryServicePort";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {StoryEntity} from "../../Story.entity";
import {Like} from "typeorm";

@injectable()
export class StoryService implements StoryServicePort {

  constructor(
    @inject(DI_TOKEN.DBAdapter) private dbAdapter: DBPort,
  ) {
  }

  async getList(input: GetStoriesListInput): Promise<{
    count: number;
    items: GetStoriesListOutput[];
  }> {
    const where: FindOptionsWhere<StoryEntity> = {};
    if (typeof input?.title === 'string' && input.title.length > 0) {
      where.title = Like(`%${input.title}%`);
    }
    if (typeof input?.description === 'string' && input.description.length > 0) {
      where.description = Like(`%${input.description}%`);
    }
    if (typeof input?.fullText === 'string' && input.fullText.length > 0) {
      where.fullText = Like(`%${input.fullText}%`);
    }
    const [stories, count] = await (await this.dbAdapter.getStoryRepository()).findAndCount({
      where,
      skip: input.skip,
      take: input.take,
    });
    return {
      count,
      items: stories.map(story => ({
        id: story.id,
        title: story.title,
        description: story.description,
        fullText: story.fullText,
      })),
    }
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