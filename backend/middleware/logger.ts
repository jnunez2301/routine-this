import { Context, Next } from "https://deno.land/x/oak@v17.1.2/mod.ts";

const logger = async (ctx: Context, next: Next) => {
  const currentDate = new Date();
  const apiLog = `${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()} - ${currentDate.toDateString()} - ${
    ctx.request.method
  } ${ctx.request.url.pathname} `;
  await next();
  console.log(apiLog, ctx.response.status);
};

export default logger;