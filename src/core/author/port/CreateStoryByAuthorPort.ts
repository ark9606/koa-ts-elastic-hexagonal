import {StoryEntity} from "../../story/Story.entity.js";

export type CreateStoryByAuthorOutput = StoryEntity;

export interface CreateStoryByAuthorPort {
  create(storyDTO: {
    title: string
    description: string
    fullText: string;
    photoUrl: string;
    category: string;
  }, authorId: string): Promise<CreateStoryByAuthorOutput>;
}