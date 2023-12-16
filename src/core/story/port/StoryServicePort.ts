import {StoryEntity} from "../Story.entity";

export type GetStoriesListInput = {
  title: string | undefined;
  description: string | undefined;
  fullText: string | undefined;
  take: number;
  skip: number;
};
export type GetStoriesListOutput = Pick<StoryEntity, 'id' | 'title' | 'description' | 'fullText'>;
export type GetStoryOutput = StoryEntity;

export interface StoryServicePort {
  getList(input: GetStoriesListInput): Promise<{
    count: number;
    items: GetStoriesListOutput[];
  }>;
  getOne(id: string): Promise<GetStoryOutput>;
}