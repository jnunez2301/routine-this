import "jsr:@std/dotenv/load"

export const SERVER_PORT = Deno.env.get("SERVER_PORT") || 3000;
export const FRONTEND_URL = Deno.env.get("FRONTEND_URL");
export const MONGODB_URI = Deno.env.get("MONGODB_URI");