const express = require("express");
const apiResponse = require("../../util/apiResponse");
const userModel = require("../../model/User");
const { hashText, compareText } = require("../../service/TextEncrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../environment/environment");
const isAFieldMissing = require("../../util/isAFieldMissing");
const authRouter = express.Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, secretAnswer } = req.body;
    if (isAFieldMissing([username, password, secretAnswer])) {
      res.status = 400;
      res.json(jsonMalformed);
      return;
    }
    const bdUser = await userModel.findOne({ username: username });
    if (bdUser) {
      res.status = 409;
      res.json(apiResponse(false, "User already exists"));
      return;
    }
    const newUser = {
      username: username,
      password: hashText(password),
      secretAnswer: hashText(secretAnswer),
    };
    await userModel.create(newUser);
    res.status = 201;
    res.json(apiResponse(true, `User ${username} created successfully`));
  } catch (error) {
    console.log(error);
  }
  next();
});
authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (isAFieldMissing([username, password])) {
      res.status = 400;
      res.json(jsonMalformed);
      return;
    }
    const bdUser = await userModel.findOne({ username: username });
    if (!bdUser) {
      res.status = 404;
      res.json(apiResponse(false, "User not found"));
      return;
    }
    const isValidPassword = compareText(password, bdUser.password);
    if (!isValidPassword) {
      res.status = 401;
      res.json(apiResponse(false, "Password is not correct"));
      return;
    }
    const token = jwt.sign({ username }, JWT_SECRET_KEY, { expiresIn: "3h" });
    res.status = 200;
    res.json({ ...apiResponse(true, "Logged in successfully"), token });
  } catch (error) {
    console.error(error);
  }
  next();
});

module.exports = authRouter;
