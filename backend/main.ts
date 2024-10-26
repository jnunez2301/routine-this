import { Application, Router } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import helloWorldRouter from "./controller/helloWorldRoute.ts";
import { FRONTEND_URL, MONGODB_URI, SERVER_PORT } from "./environment/environment.ts";
import logger from "./middleware/logger.ts";
import mongoose from "npm:mongoose";
import authRouter from "./controller/authController.ts";

const app = new Application();
const router = new Router();
//Middleware
app.use(logger);
app.use((ctx, next) => {
  if(!FRONTEND_URL){
    throw new Error("Frontend URL must be set");
  }
  ctx.response.headers.set("Access-Control-Allow-Origin", FRONTEND_URL);
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

async function connectDb() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MongoDB URI must be set");
    }
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error)
    throw new Error("Failed to connect to MongoDB")
  }
}

connectDb();

app.use(router.routes());

//Routes
app.use(authRouter.routes());

if (!SERVER_PORT) {
  throw new Error("Server port must be set");
}
console.log(`Server running on http://localhost:${+SERVER_PORT}`);
await app.listen({ port: +SERVER_PORT });
