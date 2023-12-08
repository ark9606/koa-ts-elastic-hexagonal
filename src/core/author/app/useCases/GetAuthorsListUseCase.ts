import {GetAuthorsListOutput, GetAuthorsListPort} from "../../port/GetAuthorsListPort";
import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens";
import {DBPort} from "../../../ports/DBPort";

@injectable()
export class GetAuthorsListUseCase implements GetAuthorsListPort {
  constructor(
    @inject(DI_TOKEN.DBAdapter) private dbAdapter: DBPort,
  ) {
    console.debug('>> init GetAuthorsListUseCase');
  }

  async get(): Promise<GetAuthorsListOutput[]> {
    return (await this.dbAdapter.getAuthorRepository()).find();
  }
}