import { Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";

const helloWorldRouter = new Router();

helloWorldRouter.get("/hello/world", async (ctx, next) => {
  ctx.response.body = "Hello World";
  await next();
});

export default helloWorldRouter;
