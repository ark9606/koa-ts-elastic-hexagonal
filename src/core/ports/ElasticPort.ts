import {StoryEntity} from "../story/Story.entity";

export interface ElasticPort {

  putStory(story: StoryEntity): Promise<void>;
}