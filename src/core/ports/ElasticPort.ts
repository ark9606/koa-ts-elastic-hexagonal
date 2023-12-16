import {StoryEntity} from "../story/Story.entity";

export type SearchStoriesInput = {
  search: string;
  take: number;
  skip: number;
}
export interface ElasticPort {

  putStories(stories: StoryEntity[]): Promise<void>;
  searchStories(params: SearchStoriesInput): Promise<{id: string }[]>;
}