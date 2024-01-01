import {StoryEntity} from "../story/Story.entity";

export type SearchStoriesInput = {
  search: string;
  take: number;
  skip: number;
}
export interface ElasticPort {

  createIndex(): Promise<void>;
  putStories(stories: StoryEntity[]): Promise<void>;
  searchStories(params: SearchStoriesInput): Promise<{id: string }[]>;
  getTopCategories(count: number): Promise<any>;
  popularInCategory(category: string): Promise<any>;
  storiesByMonths(): Promise<any>;
}