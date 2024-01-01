import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens";
import {DBPort} from "../../../ports/DBPort";
import {
  GetStoriesListInput,
  GetStoriesListOutput,
  GetStoryOutput,
  SearchStoriesInput,
  StoryServicePort
} from "../../port/StoryServicePort";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {StoryEntity} from "../../Story.entity";
import {ILike, Like} from "typeorm";
import {ElasticPort} from "../../../ports/ElasticPort";

@injectable()
export class StoryService implements StoryServicePort {

  constructor(
    @inject(DI_TOKEN.DBAdapter) private dbAdapter: DBPort,
    @inject(DI_TOKEN.ElasticAdapter) private elasticPort: ElasticPort,
  ) {
  }

  async getList(input: GetStoriesListInput): Promise<{
    count: number;
    items: GetStoriesListOutput[];
  }> {
    const where: FindOptionsWhere<StoryEntity>[] = [];
    if (typeof input?.filter === 'string' && input.filter.length > 0) {
      where.push({title: ILike(`%${input.filter}%`)});
      where.push({description: ILike(`%${input.filter}%`)});
      where.push({fullText: ILike(`%${input.filter}%`)});
    }
    const qb = (await this.dbAdapter.getStoryRepository())
      .createQueryBuilder('story')
      .select('story');

    if (typeof input?.filter === 'string' && input.filter.length > 0) {
      const formattedFilter = input.filter.trim().replace(/ /g, ' & ');
      qb.where("to_tsvector('simple', story.title) @@ to_tsquery('simple', :query)",
        { query: `${formattedFilter}:*` });
    }

    const [stories, count] = await qb.limit(input.take).offset(input.skip).getManyAndCount();
    // const [stories, count] = await (await this.dbAdapter.getStoryRepository()).findAndCount({
    //   where,
    //   skip: input.skip,
    //   take: input.take,
    // });
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


  public async searchStories(input: SearchStoriesInput): Promise<{
    count: number;
    items: GetStoriesListOutput[];
  }> {
    const res = await this.elasticPort.searchStories({
      search: input.search,
      take: input.take,
      skip: input.skip
    })
    return res as any;
  }


  async getOne(id: string): Promise<GetStoryOutput> {
    const storyEntity = await (await this.dbAdapter.getStoryRepository()).findOne({
      where: {
        id
      }
    });
    return storyEntity;
  }

  public async getStatistics(): Promise<{
    topCategories: {category: string; stories: number}[];
    popularInPolitics: string[];
    storiesByMonths: { month: string, count: number }[];
  }> {
    const res = await this.elasticPort.getTopCategories(5);
    const popularInPolitics = await this.elasticPort.popularInCategory('POLITICS');
    const monthStories = await this.elasticPort.storiesByMonths();
    return {
      topCategories: res.map(item => ({category: item.key, stories: item.doc_count})),
      popularInPolitics: popularInPolitics.map(item => item.key),
      storiesByMonths: monthStories.map(item => ({month: item.key_as_string, count: item.doc_count})),
    };
  }




}