import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as bodyParser from 'koa-bodyparser';
import { InversifyKoaServer} from "inversify-koa-utils";
import {container} from "../../../config/injections/di-container";

export function runServer() {
  // create server
  let server = new InversifyKoaServer(container);
  server.setConfig((app) => {
    app.use(json());
    app.use(bodyParser());
    app.use(logger());
  });

  const app = server.build();
  app.listen(process.env.PORT, () => {
    console.log('Started at port ', process.env.PORT);
  });
}
