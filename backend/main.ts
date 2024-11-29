import { PORT } from "./environment/environment.ts";
import { mongoConnect } from "./mongoConnect.ts";
import { Application } from "https://deno.land/x/oak@v17.1.3/mod.ts";
import chalk from "npm:chalk";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Routine this just made it to Init!\n v0.0.1";
});

mongoConnect();

function checkPort() {
  if (!PORT) {
    throw new Error("PORT has to be assigned as a environment variable");
  }
}

checkPort();
// Routes
// app.use(authRouter.routes())

console.log(
  chalk.yellow(`[+] - Server is running at http://localhost:${PORT}`)
);

await app.listen({ port: +PORT });
