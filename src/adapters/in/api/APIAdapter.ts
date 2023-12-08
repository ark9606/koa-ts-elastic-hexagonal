import * as Koa from 'koa';

export class APIAdapter {
  public static async getAuthors(ctx: Koa.ParameterizedContext, next: Koa.Next) {
    ctx.body = { msg: 'list' };

    await next();
  }
}