
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./environment/environment");

async function mongoConnect() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI must be set");
    }
    await mongoose.connect(MONGODB_URI, {
      dbName: "Routine-This"
    })
    console.log("[+] - Connected to MongoDB");
  } catch (e) {
    throw new Error(`There was an error connecting to MongoDB\n ${e}`);
  }
}

module.exports = { mongoConnect };
