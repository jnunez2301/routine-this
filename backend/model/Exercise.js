const mongoose = require("mongoose");
const BodyPartEnum = require("./enum/BodyPartEnum");
const ExerciseTypeEnum = require("./enum/ExerciseTypeEnum");
const Schema = mongoose.Schema;


const exerciseSchema = new Schema({
  name: {
    type: String,
    minLength: [2, "Exercise name has to be at least 2 character long"],
    maxLength: [255, "Exercise name is too long"],
    required: [true, "You must provide a name to the exercise"],
    unique: true,
  },
  description: {
    type: String,
    minLength: [5, "Description can't be less than 5 characters long"],
    maxLength: [255, "Description has to be shorter"],
    default: "This exercise doesn't have a description"
  },
  videoUrl: {
    type: String,
    default: "",
    min: [8, "For security reasons you will have to provide a larger url"],
  },
  imgUrl: {
    type: String,
    default: "",
    min: [8, "For security reasons you will have to provide a larger url"],
  },
  bodyPart: {
    type: String,
    enum: Object.values(BodyPartEnum),
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(ExerciseTypeEnum),
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
})

const exerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = exerciseModel;