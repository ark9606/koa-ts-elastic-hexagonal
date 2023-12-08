import * as Koa from 'koa';
import * as Router from 'koa-router';

import * as logger from 'koa-logger';
import * as json from 'koa-json';
import {APIAdapter} from "./adapters/in/api/APIAdapter";


const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = { msg: 'Hello world' };

  await next();
});

router.get('/authors', APIAdapter.getAuthors);

app.use(json());
app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  console.log('Started at port ', process.env.PORT);
})