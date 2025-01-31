const fs = require("fs").promises;
const path = require("path");
const exerciseModel = require("../model/Exercise");
// Simple function that initializes core exercises for everyone
async function initExercises() {
  try {
    const filePath = path.join(__dirname, "../assets/exercises.json");
    const data = await fs.readFile(filePath, "utf-8");
    const exercises = JSON.parse(data);
    exerciseModel.create(exercises);
    console.log("Exercises saved and initialized!")
  } catch (error) {
    console.error("Error reading or parsing exercises:", error);
  }
}
// Export the function (for Node.js or environments supporting CommonJS)
module.exports = initExercises;