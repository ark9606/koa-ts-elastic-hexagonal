export type GetAuthorsListOutput = {id: string; firstName: string; lastName: string};

export interface GetAuthorsListPort {
  get(): Promise<GetAuthorsListOutput[]>;
}