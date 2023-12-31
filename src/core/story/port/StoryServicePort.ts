import {StoryEntity} from "../Story.entity.js";

export type GetStoriesListInput = {
  filter: string | undefined;
  take: number;
  skip: number;
};
export type GetStoriesListOutput = Pick<StoryEntity, 'id' | 'title' | 'description' | 'fullText'>;
export type GetStoryOutput = StoryEntity;


export type SearchStoriesInput = {
  search: string;
  take: number;
  skip: number;
};

export interface StoryServicePort {
  getList(input: GetStoriesListInput): Promise<{
    count: number;
    items: GetStoriesListOutput[];
  }>;
  searchStories(input: SearchStoriesInput): Promise<{
    count: number;
    items: GetStoriesListOutput[];
  }>;
  getOne(id: string): Promise<GetStoryOutput>;

  getStatistics(): Promise<{
    topCategories: {category: string; stories: number}[];
    popularInPolitics: string[];
    storiesByMonths: { month: string, count: number }[];
  }>;
}