import { Application, Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import helloWorldRouter from "./controller/helloWorldRoute.ts";
import { SERVER_PORT } from "./environment/environment.ts";
import logger from "./middleware/logger.ts";

const app = new Application();
const router = new Router();
//Middleware
app.use(logger)
app.use((ctx, next) => {
  //TODO: Set this to desired host
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Credentials", "true");
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  // Handle preflight requests (OPTIONS method)
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 204;
    return;
  }

  return next();
});

router.get("/", (ctx) => {
  ctx.response.body =
    "Welcome to Routine This!\n Version 0.0.1\n We are still at the start of the journey!";
});

//TODO: Connect to db
async function connectDb(): Promise<void> {
  const promise = new Promise<void>((resolve) => {
    console.log("Connecting to your database...");
    setTimeout(() => {
      console.log("Connected to the database.");
      resolve();
    }, 1000);
  });
  await promise;
}

await connectDb();


app.use(router.routes());

//Routes
app.use(helloWorldRouter.routes());

if (!SERVER_PORT) {
  throw new Error("Server port must be set");
}
console.log(`Server running on http://localhost:${+SERVER_PORT}`);
await app.listen({ port: +SERVER_PORT });
