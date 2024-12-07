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

routineRouter.get("/difficulty", (_req, res) => res.status(200).json(Object.values(RoutineDifficultyEnum)))
routineRouter.get("/types", (_req, res) => res.status(200).json(Object.values(RoutineTypeEnum)));

// TODO: Too late to finish this, make sure you CRUD on routines and follow the next steps
// [!] - User has to be retrieved from the verifyToken
// 
// [+] - Routines will only be displayed if the user is the owner of them with find({userId: bdUser._id})
// 
// [+] - Routines will never be able to be edited from other users perspective only the owner can do it
// 
// [+] - If a routine is set to public everyone should be able to see it in their feed of "Routines"
// 
// [+] - Routines that have a shit ton of likes and are public should be displayed in "Recommended routines"
// for the one above i would love to have an endpoint for it like "/recommended"
routineRouter.get("/",async (_req, res) => res.status(200).json(await routineModel.find({})));
routineRouter.post("/", verifyToken, async(req, res, next) => {
  try {
    const { name, description, difficulty, type, duration, exerciseIdList } = req.body;
    if(isAFieldMissing([name, difficulty, type, duration, exerciseIdList])){
      res.status(400).json(jsonMalformed);
      return;
    }
    // Username is being retrieved from the verifyToken > req.username
    const bdUser = await userModel.findOne({username: req.username})
    if(!bdUser){
      res.status(404).json(apiResponse(false, "There was an error trying to find the user"))
      return;
    }
    const newRoutine = {
      name, 
      description,
      difficulty, 
      type, 
      duration, 
      exerciseIdList, 
      userId: bdUser._id
    }
    await routineModel.create(newRoutine);
    res.status(201).json(apiResponse(true, "Routine created"))
  } catch (error) {
    res.status(500).json(apiResponse(false, "Internal server error"));
    console.error(error);
  }
  next();
})

module.exports = routineRouter;