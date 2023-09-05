const express = require("express");

const programsRouter = express.Router();

//importing programs controllers
const controller = require("./programs.controller");

//importing globalmiddlewares
const globalmiddlewares = require("../global.middleware");

// [GET REQUEST] fetching all programs from local storage
programsRouter.get("/", controller.getAllPrograms);

// [GET REQUEST] fetching a single program item from local storage
programsRouter.get("/:id", controller.getProgramByID);

// [POST REQUEST] Creating program route
programsRouter.post("/", globalmiddlewares.checkRole, controller.postProgram);

// [PUT REQUEST] updating a single fruit item in local storage
programsRouter.put("/", globalmiddlewares.checkRole, controller.updateProgram);

// [DELETE REQUEST] removing a single program entry in local storage
programsRouter.delete(
  "/:id",
  globalmiddlewares.checkRole,
  controller.deleteProgram
);

module.exports = programsRouter;
