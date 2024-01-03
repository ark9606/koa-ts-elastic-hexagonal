import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import { InversifyKoaServer} from "inversify-koa-utils";
import {container} from "../../../config/injections/di-container.js";

export function runServer() {
  // create server
  let server = new InversifyKoaServer(container);
  server.setConfig((app) => {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        console.error(err);
        // will only respond with JSON
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
          message: err.message
        };
      }
    })
    app.use(json());
    app.use(bodyParser());
    app.use(logger());
  });

  const app = server.build();
  app.listen(process.env.PORT, () => {
    console.log('Started at port ', process.env.PORT);
  });
}
