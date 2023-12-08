import {CreateStoryByAuthorUseCase} from "../../core/author/app/useCases/CreateStoryByAuthorUseCase";

export const DI_TOKEN = {
  GetAuthorsListUseCase: Symbol.for("GetAuthorsListUseCase"),
  CreateStoryByAuthorUseCase: Symbol.for("CreateStoryByAuthorUseCase"),
  StoryService: Symbol.for("StoryService"),
  DBAdapter: Symbol.for("DBAdapter"),
};
