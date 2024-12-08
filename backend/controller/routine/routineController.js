const express = require("express");
const RoutineDifficultyEnum = require("../../model/enum/RoutineDifficulty");
const RoutineTypeEnum = require("../../model/enum/RoutineTypeEnum");
const routineModel = require("../../model/Routine");
const isAFieldMissing = require("../../util/isAFieldMissing");
const jsonMalformed = require("../../util/jsonMalformed");
const userModel = require("../../model/User");
const apiResponse = require("../../util/apiResponse");
const verifyToken = require("../../middleware/verifyJwt");
const routineRouter = express.Router();

routineRouter.get("/difficulty", (_req, res) =>
  res.status(200).json(Object.values(RoutineDifficultyEnum))
);
routineRouter.get("/types", (_req, res) =>
  res.status(200).json(Object.values(RoutineTypeEnum))
);

routineRouter.get("/", verifyToken, async (req, res) => {
  try {
    const bdUser = await userModel.findOne({ username: req.username });
    if (!bdUser) {
      res.status(404).json(apiResponse(false, "Could'nt find the user info"));
      return;
    }
    res.status(200).json(await routineModel.find({ userId: bdUser._id }));
  } catch (error) {
    res.status(500).json(apiResponse(false, "Internal server error"));
    console.error(error);
  }
});
routineRouter.post("/", verifyToken, async (req, res, next) => {
  try {
    const {
      routineName,
      description,
      difficulty,
      type,
      duration,
      exerciseList,
    } = req.body;
    if (
      isAFieldMissing([routineName, difficulty, type, duration, exerciseList])
    ) {
      res.status(400).json(jsonMalformed);
      return;
    }
    // Username is being retrieved from the verifyToken > req.username
    const bdUser = await userModel.findOne({ username: req.username });
    if (!bdUser) {
      res
        .status(404)
        .json(apiResponse(false, "There was an error trying to find the user"));
      return;
    }
    const newRoutine = {
      routineName,
      description,
      difficulty,
      type,
      duration,
      exerciseList,
      userId: bdUser._id,
    };
    const newBdRoutine = await routineModel.create(newRoutine);
    res.status(201).json(apiResponse(true, "Routine created", newBdRoutine));
  } catch (error) {
    res.status(500).json(apiResponse(false, "Internal server error"));
    console.error(error);
  }
  next();
});
// [+] - Routines will never be able to be edited from other users perspective only the owner can do it
routineRouter.put("/", verifyToken, async (req, res, next) => {
  try {
    const body = req.body;
    const bdUser = await userModel.findOne({ username: req.username });
    if (!bdUser) {
      res.status(404).json(apiResponse(false, "Could'nt find the user info"));
      return;
    }
    const bdRoutine = await routineModel.findOne({_id: body._id});
    if(!bdRoutine){
      res.status(404).json(apiResponse(false, "The Routine you are trying to update doesn't exist"))
      return;
    }
    if(bdRoutine.userId.toString() !== bdUser._id.toString()){
      res.status(401).json(apiResponse(false, "Update denied you are not the owner of this Routine"))
      return;
    }
    bdRoutine.routineName = body.routineName;
    bdRoutine.description = body.description;
    bdRoutine.difficulty = body.difficulty;
    bdRoutine.type = body.type;
    bdRoutine.favorite = body.favorite;
    bdRoutine.duration = body.duration;
    bdRoutine.exerciseList = body.exerciseList;
    bdRoutine.isPublic = body.isPublic;

    const updatedRoutine = await bdRoutine.save();
    res.status(200).json(apiResponse(true, "Routine updated", updatedRoutine))
  } catch (error) {
    res.status(500).json(apiResponse(false, "Internal server error"));
    console.error(error);
  }
  next();
});


routineRouter.delete("/:routineId", verifyToken, async(req, res, next) => {
  try {
    const routineId = req.params.routineId;
    if(!routineId){
      res.status(400).json(apiResponse(false, "You must provide a routine id to delete it"))
      return;
    }
    const bdUser = await userModel.findOne({ username: req.username });
    if (!bdUser) {
      res.status(404).json(apiResponse(false, "Could'nt find the user info"));
      return;
    }
    const bdRoutine = await routineModel.findOne({ _id: routineId })
    if(!bdRoutine) {
      res.status(404).json(apiResponse(false, "The routine you are trying to delete does not exist"))
      return;
    }
    await routineModel.deleteOne({ _id: routineId })
    res.status(200).json(apiResponse(true, "Routine deleted!"))
  } catch (error) {
    res.status(500).json(apiResponse(false, "Internal server error"));
    console.error(error);
  }
  next();
})
module.exports = routineRouter;
