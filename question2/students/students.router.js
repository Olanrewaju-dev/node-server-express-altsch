const express = require("express");

// using controllers
const controller = require("./students.controller");

// using middlewares
const { basicAuth } = require("./students.middleware");
const globalMiddleware = require("../global.middleware");

const studentRouter = express.Router();

// [GET REQUEST] fetching all market items from local storage
studentRouter.get("/", basicAuth, controller.getAllStudent);

// [GET REQUEST] fetching a single market item from local storage
studentRouter.get("/:id", basicAuth, controller.getStudentByID);

// [POST REQUEST] Creating market item route
studentRouter.post("/", globalMiddleware.checkBody, controller.postNewStudent);

// [PUT REQUEST] updating a single market in local storage
studentRouter.put(
  "/",
  basicAuth,
  globalMiddleware.checkBody,
  controller.updateStudent
);

// [DELETE REQUEST] removing a single market in local storage
studentRouter.delete("/:id", basicAuth, controller.deleteStudent);

module.exports = studentRouter;
