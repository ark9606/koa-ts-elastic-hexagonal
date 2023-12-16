import {StoryEntity} from "../story/Story.entity";

export interface ElasticPort {

  putStories(stories: StoryEntity[]): Promise<void>;
}