import "jsr:@std/dotenv/load";

export const SERVER_PORT = Deno.env.get("SERVER_PORT");
export const MONGODB_URI = Deno.env.get("MONGODB_URI");
export const FRONTEND_URL = Deno.env.get("FRONTEND_URL");
export const ENCRYPT_SECRET = Deno.env.get("ENCRYPT_SECRET");
export const JWT_SECRET = Deno.env.get("JWT_SECRET");
