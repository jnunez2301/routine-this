import "jsr:@std/dotenv/load";

export const SERVER_PORT = Deno.env.get("SERVER_PORT");