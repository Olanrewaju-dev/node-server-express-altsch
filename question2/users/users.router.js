const express = require("express");

//importing controllers
const controller = require("./users.controller");

//importing user middlewares
const middleware = require("./users.middlewares");

//importing global middlewares
const globalMiddleware = require("../global.middleware");

const userRouter = express.Router();

// GET all users route
userRouter.get("/", controller.getAllUser);

// GET a user route
userRouter.get("/:id", controller.getOneUser);

// POST create a user route
userRouter.post(
  "/",
  middleware.validateUserCreation,
  middleware.apiAuth,
  controller.createUser
);

// PUT update a user route
userRouter.put(
  "/:id",
  globalMiddleware.checkBody,
  middleware.apiAuth,
  controller.updateUser
);

//DELETE user in db
userRouter.delete(
  "/:id",
  globalMiddleware.checkBody,
  middleware.apiAuth,
  controller.deleteUser
);

module.exports = userRouter;
