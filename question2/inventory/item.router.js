const express = require("express");

// using controllers
const controller = require("./item.controller");

// using middlewares
const localMiddleware = require("./item.middleware");
const globalMiddleware = require("../global.middleware");

const itemRouter = express.Router();

// [GET REQUEST] fetching all inventory items from local storage
itemRouter.get("/", localMiddleware.basicAuth, controller.getAllItems);

// [GET REQUEST] fetching a single inventory item from local storage
itemRouter.get("/:id", localMiddleware.basicAuth, controller.getItemByID);

// [POST REQUEST] Creating inventory item route
itemRouter.post(
  "/",
  globalMiddleware.checkBody,
  localMiddleware.apiAuth,
  controller.createNewItem
);

// [PUT REQUEST] updating a single inventory item in local storage
itemRouter.put(
  "/",
  globalMiddleware.checkBody,
  localMiddleware.apiAuth,
  controller.updateItem
);

// [DELETE REQUEST] removing a single inventory item in local storage
itemRouter.delete("/:id", localMiddleware.apiAuth, controller.deleteItem);

module.exports = itemRouter;
