import type { Context } from "https://deno.land/x/oak@v17.1.2/mod.ts";
import { Router } from "https://deno.land/x/oak@v17.1.2/router.ts";
import type { User } from "../model/User.ts";
import userModel from "../model/User.ts";
import { Status } from "jsr:@oak/commons@1/status";
import { compareSync } from "https://deno.land/x/bcrypt@v0.4.1/src/main.ts";
// import { hashSync } from "https://deno.land/x/bcrypt@v0.4.1/src/main.ts";
import { SignJWT } from "https://deno.land/x/jose@v5.6.3/index.ts";
import ApiResponse from "../model/ApiResponse.ts";
import { ENCRYPT_SECRET, JWT_SECRET } from "../environment/environment.ts";
import { aesGcmEncrypt } from "../util/cryptoAesGcm.ts";

const authRouter = new Router();

authRouter.post("/api/auth/login", async (ctx: Context) => {
  const { username, password, rememberMe } = await ctx.request.body.json();
  const user: User | null = await userModel.findOne({ username: username });
  if (!user) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = ApiResponse(false, "Couldn't find user");
    return;
  }
  const isValidPassword = compareSync(password, user.password);
  if (!isValidPassword) {
    ctx.response.status = Status.BadRequest;
    ApiResponse(false, "Wrong password");
    return;
  }
  if (!JWT_SECRET) throw new Error("JWT_SECRET must be set");
  if (!ENCRYPT_SECRET) throw new Error("ENCRYPT_SECRET must be set");
  const jwtToken = await new SignJWT({
    username: username,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(rememberMe ? "720h" : "24h")
    .sign(new TextEncoder().encode(JWT_SECRET));
  const encryptToken = await aesGcmEncrypt(jwtToken, ENCRYPT_SECRET);
  ctx.response.status = Status.OK;
  ctx.response.body = ApiResponse(true, "Logged in", encryptToken);
});

export default authRouter;
