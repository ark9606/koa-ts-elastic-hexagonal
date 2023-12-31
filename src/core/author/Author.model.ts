import {AuthorEntity} from "./Author.entity.js";
import {DBPort} from "../ports/DBPort.js";
import {StoryEntity} from "../story/Story.entity.js";

export class AuthorModel extends AuthorEntity {

  constructor(private dbPort: DBPort) {
    super();
  }
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  async writeStory(storyDTO: {
    title: string
    description: string
    fullText: string;
    photoUrl: string;
    category: string;
  }): Promise<StoryEntity> {
    const repo = await this.dbPort.getStoryRepository();
    const res = await repo.insert({
      title: storyDTO.title,
      description: storyDTO.description,
      fullText: storyDTO.fullText,
      photoUrl: storyDTO.photoUrl,
      authorId: this.id,
      category: storyDTO.category,
      liked: 0,
    });
    const createdId: string = res?.identifiers?.[0]?.id;
    const storyEntity = await (await this.dbPort.getStoryRepository()).findOne({
      where: {
        id: createdId,
      }
    });
    return storyEntity;
  }
}
