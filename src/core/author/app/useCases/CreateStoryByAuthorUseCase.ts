import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens";
import {DBPort} from "../../../ports/DBPort";
import {CreateStoryByAuthorOutput, CreateStoryByAuthorPort} from "../../port/CreateStoryByAuthorPort";
import {ElasticPort} from "../../../ports/ElasticPort";

@injectable()
export class CreateStoryByAuthorUseCase implements CreateStoryByAuthorPort {
  constructor(
    @inject(DI_TOKEN.DBAdapter) private dbAdapter: DBPort,
    @inject(DI_TOKEN.ElasticAdapter) private elasticPort: ElasticPort,
  ) {
  }

  async create(storyDTO: {
    title: string
    description: string
    fullText: string;
    photoUrl: string;
    category: string;
  }, authorId: string): Promise<CreateStoryByAuthorOutput> {
    const author = await this.dbAdapter.getAuthorById(authorId);
    if (!author) {
      throw new Error('Author not found');
    }
    const story = await author.writeStory(storyDTO);
    setImmediate(async () => {
      await this.elasticPort.putStories([story]);
    });
    // todo create CLI for generate stories
    // todo create endpoint for searching
    return story;
  }
}