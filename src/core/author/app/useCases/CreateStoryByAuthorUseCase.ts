import {GetAuthorsListOutput, GetAuthorsListPort} from "../../port/GetAuthorsListPort";
import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens";
import {DBPort} from "../../../ports/DBPort";
import {CreateStoryByAuthorOutput, CreateStoryByAuthorPort} from "../../port/CreateStoryByAuthorPort";

@injectable()
export class CreateStoryByAuthorUseCase implements CreateStoryByAuthorPort {
  constructor(
    @inject(DI_TOKEN.DBAdapter) private dbAdapter: DBPort,
  ) {
  }

  async create(storyDTO: {
    title: string
    description: string
    fullText: string;
    photoUrl: string;
    category: string;
  }, authorId: string): Promise<CreateStoryByAuthorOutput> {
    const author = (await this.dbAdapter.getAuthorRepository()).findOne({
      where: {
        id: authorId,
      }
    });
    if (!author) {
      // todo create result class
      return {error: 'Author not found'} as any;
    }
    // todo make author as model and call author.createStory()
    return author as any;
  }
}