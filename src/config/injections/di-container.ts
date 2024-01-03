import {Container} from "inversify";
import {interfaces, TYPE} from "inversify-koa-utils";
import {AuthorController} from "../../adapters/in/api/controllers/AuthorController.js";
import {GetAuthorsListPort} from "../../core/author/port/GetAuthorsListPort.js";
import {DI_TOKEN} from "./di-tokens.js";
import {GetAuthorsListUseCase} from "../../core/author/app/useCases/GetAuthorsListUseCase.js";
import {DBPort} from "../../core/ports/DBPort.js";
import {DBAdapter} from "../../adapters/out/persistence/DBAdapter.js";
import {StoryService} from "../../core/story/app/services/StoryService.js";
import {StoryServicePort} from "../../core/story/port/StoryServicePort.js";
import {StoryController} from "../../adapters/in/api/controllers/StoryController.js";
import {CreateStoryByAuthorUseCase} from "../../core/author/app/useCases/CreateStoryByAuthorUseCase.js";
import {CreateStoryByAuthorPort} from "../../core/author/port/CreateStoryByAuthorPort.js";
import {ElasticPort} from "../../core/ports/ElasticPort.js";
import {ElasticAdapter} from "../../adapters/out/persistence/ElasticAdapter.js";

export const container = new Container();

// note that you *must* bind your controllers to Controller
container.bind<interfaces.Controller>(TYPE.Controller).to(AuthorController).whenTargetNamed('AuthorController');
container.bind<interfaces.Controller>(TYPE.Controller).to(StoryController).whenTargetNamed('StoryController');

// custom providers
container.bind<GetAuthorsListPort>(DI_TOKEN.GetAuthorsListUseCase).to(GetAuthorsListUseCase);
container.bind<CreateStoryByAuthorPort>(DI_TOKEN.CreateStoryByAuthorUseCase).to(CreateStoryByAuthorUseCase);
container.bind<StoryServicePort>(DI_TOKEN.StoryService).to(StoryService);
container.bind<DBPort>(DI_TOKEN.DBAdapter).to(DBAdapter);
container.bind<ElasticPort>(DI_TOKEN.ElasticAdapter).to(ElasticAdapter);

