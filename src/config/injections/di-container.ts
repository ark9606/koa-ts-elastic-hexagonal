import {Container} from "inversify";
import {interfaces, TYPE} from "inversify-koa-utils";
import {AuthorController} from "../../adapters/in/api/controllers/AuthorController";
import {GetAuthorsListPort} from "../../core/author/port/GetAuthorsListPort";
import {DI_TOKEN} from "./di-tokens";
import {GetAuthorsListUseCase} from "../../core/author/app/useCases/GetAuthorsListUseCase";
import {DBPort} from "../../core/ports/DBPort";
import {DBAdapter} from "../../adapters/out/persistence/DBAdapter";
import {StoryService} from "../../core/story/app/services/StoryService";
import {StoryServicePort} from "../../core/story/port/StoryServicePort";
import {StoryController} from "../../adapters/in/api/controllers/StoryController";
import {CreateStoryByAuthorUseCase} from "../../core/author/app/useCases/CreateStoryByAuthorUseCase";
import {CreateStoryByAuthorPort} from "../../core/author/port/CreateStoryByAuthorPort";

export const container = new Container();

// note that you *must* bind your controllers to Controller
container.bind<interfaces.Controller>(TYPE.Controller).to(AuthorController).whenTargetNamed('AuthorController');
container.bind<interfaces.Controller>(TYPE.Controller).to(StoryController).whenTargetNamed('StoryController');

// custom providers
container.bind<GetAuthorsListPort>(DI_TOKEN.GetAuthorsListUseCase).to(GetAuthorsListUseCase);
container.bind<CreateStoryByAuthorPort>(DI_TOKEN.CreateStoryByAuthorUseCase).to(CreateStoryByAuthorUseCase);
container.bind<StoryServicePort>(DI_TOKEN.StoryService).to(StoryService);
container.bind<DBPort>(DI_TOKEN.DBAdapter).to(DBAdapter);

