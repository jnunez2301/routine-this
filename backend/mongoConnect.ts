import mongoose from "npm:mongoose"
import { MONGODB_URI } from "./environment/environment.ts";
import chalk from "npm:chalk";

export async function mongoConnect() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI must be set");
    }
    await mongoose.connect(MONGODB_URI);
    console.log(chalk.green("[+] - Connected to MongoDB"))
  } catch (e) {
    throw new Error(`There was an error connecting to MongoDB\n ${e}`);
  }
}
