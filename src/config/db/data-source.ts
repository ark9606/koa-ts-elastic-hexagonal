import {DataSource} from "typeorm";
import {DATABASE} from "../env.js";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default new DataSource({
  type: "postgres",
  host: DATABASE.HOST,
  port: DATABASE.PORT,
  username: DATABASE.USER,
  password: DATABASE.PASS,
  database: DATABASE.DB,
  synchronize: false,
  logging: false,
  entities: [__dirname + '../../**/*.entity.{ts,js}'],
  subscribers: [],
  migrations: [__dirname + '../../migrations/*.{ts,js}'],
});