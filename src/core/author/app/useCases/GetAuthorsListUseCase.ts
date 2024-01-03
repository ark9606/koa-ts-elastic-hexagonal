import {GetAuthorsListOutput, GetAuthorsListPort} from "../../port/GetAuthorsListPort.js";
import {inject, injectable} from "inversify";
import {DI_TOKEN} from "../../../../config/injections/di-tokens.js";
import {DBPort} from "../../../ports/DBPort.js";

@injectable()
export class GetAuthorsListUseCase implements GetAuthorsListPort {
  constructor(
    @inject(DI_TOKEN.DBAdapter) private dbAdapter: DBPort,
  ) {
  }

  async get(): Promise<GetAuthorsListOutput[]> {
    return (await this.dbAdapter.getAuthorRepository()).find();
  }
}