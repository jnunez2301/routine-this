const mongoose = require("mongoose");
const RoutineDifficultyEnum = require("./enum/RoutineDifficulty");
const RoutineTypeEnum = require("./enum/RoutineTypeEnum");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    min: [1, "You must add at least 1 exercise to the list"],
    required: [true, "You must add an exercise ID"]
  },
  reps: {
    type: Number,
    default: 1,
    min: [1, "The exercise must have at least 1 rep"],
    required: [true, "You need to add reps to the exercise"]
  },
  sets: {
    type: Number,
    default: 1,
    min: [1, "The exercise must have at least 1 set"],
    required: [true, "You need to add sets to the exercise"]
  }
})

const routineSchema = new Schema({
  routineName: {
    type: String,
    minLength: [1, "Routine name has to be at least 1 character long"],
    maxLength: [255, "Routine name is too long"],
    required: [true, "Routine name must be provided"],
    unique: false
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
  exerciseList: {
    type: [WorkoutSchema],
    required: [true, "Every routine must have exercises"]
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
  createdAt: {
    type: Date,
    default: new Date()
  }
});

/*
  TODO: [IDEA]
  [#] - routineLikeSchema
  [#] - routineLikeModel
  [+] - This should be in another Schema to keep it simple
  [+] - Should only list the ones that are public if it's not public they can not be added to this model
  [+] - If a routine is set to public everyone should be able to see it in their feed of "Routines"
  [+] - Routines that have a shit ton of likes and are public should be displayed in "Recommended routines"
  for the one above i would love to have an endpoint for it like "/recommended"
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: {
    type: Number,
    min: 0,
    default: 0,
  },
  routineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Routine"
  }
   */

const routineModel = mongoose.model("Routine", routineSchema);

module.exports = routineModel;