const express = require("express");
const exerciseModel = require("../../model/Exercise");
const verifyToken = require("../../middleware/verifyJwt");
const isAFieldMissing = require("../../util/isAFieldMissing");
const jsonMalformed = require("../../util/jsonMalformed");
const apiResponse = require("../../util/apiResponse");
const ExerciseTypeEnum = require("../../model/enum/ExerciseTypeEnum");
const BodyPartEnum = require("../../model/enum/BodyPartEnum");
const exerciseRouter = express.Router();

exerciseRouter.get("/", async (_req, res) => {
  const allExercises = await exerciseModel.find({});
  res.json(allExercises);
});

exerciseRouter.get("/types", async (_req, res) =>
  res.status(200).json(Object.values(ExerciseTypeEnum))
);
exerciseRouter.get("/bodyParts", async (_req, res) =>
  res.status(200).json(Object.values(BodyPartEnum))
);

exerciseRouter.post("/", verifyToken, async (req, res, next) => {
  try {
    const { name, description, videoUrl, imgUrl, bodyPart, type } = req.body;
    if (isAFieldMissing([name, description, bodyPart, type])) {
      res.status = 400;
      res.json(jsonMalformed);
    }
    const bdExercise = await exerciseModel.findOne({ name });
    if (bdExercise) {
      res
        .status(409)
        .json(apiResponse(false, "An exercise with that name already exists"));
      return;
    }
    const newExercise = {
      name,
      description,
      videoUrl,
      imgUrl,
      bodyPart,
      type,
    };
    const newBdExercise = await exerciseModel.create(newExercise);
    res.status(201).json(apiResponse(true, "Exercise created", newBdExercise));
  } catch (error) {
    res.status(500).json(apiResponse(false, "Internal server error"));
    console.error(error);
  }
  next();
});

exerciseRouter.put("/", verifyToken, async (req, res, next) => {
  try {
    const { _id, name, description, videoUrl, imgUrl, bodyPart, type } = req.body;
    if (isAFieldMissing([_id, name, description, bodyPart, type])) {
      res.status(400).json(jsonMalformed);
      return;
    }
    const bdExercise = await exerciseModel.findOne({ _id: _id });
    if (!bdExercise) {
      res
        .status(404)
        .json(
          apiResponse(false, "The exercise you are looking for does not exists")
        );
      return;
    }
    bdExercise.name = name;
    bdExercise.description = description;
    bdExercise.videoUrl = videoUrl;
    bdExercise.imgUrl = imgUrl;
    bdExercise.bodyPart = bodyPart;
    bdExercise.type = type;

    const updatedExercise = await bdExercise.save();
    res.status(200).json(apiResponse(true, "Exercise updated", updatedExercise));
  } catch (error) {
    res.status(500).json(apiResponse(false, "Internal server error"));
    console.error(error);
  }
  next();
});

exerciseRouter.delete("/:exerciseId", verifyToken, async (req, res, next) => {
  try {
    const exerciseId = req.params.exerciseId;
    if(!exerciseId){
      res.status(400).json(apiResponse(false, "You must provide an exercise id to delete"))
      return;
    }
    const bdExercise = await exerciseModel.findOne({_id: exerciseId})
    if(!bdExercise){
      res.status(404).json(apiResponse(false, "The exercise you are trying to delete does not exist"))
      return;
    }
    await exerciseModel.deleteOne({ _id: exerciseId });
    res.status(200).json(apiResponse(true, "Exercise deleted!"))
  } catch (error) {
    res.status(500).json(apiResponse(false, "Internal server error"));
    console.error(error);
  }
  next();
});

module.exports = exerciseRouter;
