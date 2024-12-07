const mongoose = require("mongoose");
const RoutineDifficultyEnum = require("./enum/RoutineDifficulty");
const RoutineTypeEnum = require("./enum/RoutineTypeEnum");
const Schema = mongoose.Schema;

const routineSchema = new Schema({
  name: {
    type: String,
    minLength: [1, "Routine name has to be at least 1 character long"],
    maxLength: [255, "Routine name is too long"],
    required: [true, "Routine name must be provided"],
  },
  description: {
    type: String,
    minLength: [1, "Routine description has to be at least 1 character long"],
    default: '',
  },
  difficulty: {
    type: String,
    enum: Object.values(RoutineDifficultyEnum),
    required: [true, "Routine difficulty must be provided"]
  },
  type: {
    type: String,
    enum: Object.values(RoutineTypeEnum),
    required: [true, "Routine type must be provided"]
  },
  favorite: {
    type: Boolean,
    default: false
  },
  // Duration will be stored as a number and displayed as "minutes"
  duration: {
    type: Number,
    default: 1,
    min: [1, "Duration must be at least 1 minute long"],
    required: [true, "You must set a duration to the Routine"]
  },
  exerciseIdList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Exercise",
    min: [1, "You must add at least 1 exercise to the list"]
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Routine needs to be bound to a user"]
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    min: 0,
    default: 0,
  }
});

const routineModel = mongoose.model("Routine", routineSchema);

module.exports = routineModel;