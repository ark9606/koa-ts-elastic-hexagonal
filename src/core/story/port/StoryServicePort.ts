import {StoryEntity} from "../Story.entity";

export type GetStoriesListOutput = {id: string; title: string; description: string};
export type GetStoryOutput = StoryEntity;

export interface StoryServicePort {
  getList(): Promise<GetStoriesListOutput[]>;
  getOne(id: string): Promise<GetStoryOutput>;
}