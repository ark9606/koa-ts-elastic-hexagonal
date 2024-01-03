import ds from './data-source.js';
import {DataSource} from "typeorm";

export const createDataSource = async (): Promise<DataSource> => {

  return ds.initialize();
};

let dataSource: DataSource | undefined;

export async function getDataSource(): Promise<DataSource> {
  if (!dataSource || !dataSource.isInitialized) {
    dataSource = await createDataSource();
  }

  return dataSource;
}