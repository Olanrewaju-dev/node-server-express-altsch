const express = require("express");
const path = require("path");
const fs = require("fs");

const fruitRouter = express.Router();

// creating path to local db
const fruitsDbPath = path.join(__dirname, "../db", "fruits.json");
let fruitsDb = [];
// reading local file into an empty array
fruitsDb = JSON.parse(fs.readFileSync(fruitsDbPath, "utf8"));

// [GET REQUEST] fetching all fruit items from local storage
fruitRouter.get("/", (req, res) => {
  res.send(fruitsDb);
});

// [GET REQUEST] fetching a single fruit item from local storage
fruitRouter.get("/:id", (req, res) => {
  const fruitID = req.params.id; // grabbing the URL parameter (i.e. fruit id) from the URL

  // getting the index of the fruit in the db where the index is equal to fruit id parsed in the parameter
  const fruitIndex = fruitsDb.findIndex((fruit) => {
    return fruit.id === parseInt(fruitID);
  });

  // handling error case where ID is not found in the db
  if (fruitIndex === -1) {
    res.status(500);
    res.send("Fruit item ID not found in database.");
  }
  res.send(fruitsDb[fruitIndex]); // return the json object where the URL id is found in the db
});

// [POST REQUEST] Creating fruit item route
fruitRouter.post("/", (req, res) => {
  const newFruitsItem = req.body;

  // dynamically adding id to fruit item inputs
  const lastFruit = fruitsDb[fruitsDb.length - 1];
  const lastFruitId = lastFruit.id;
  newFruitsItem.id = lastFruitId + 1;

  //pushing new fruit item to an empty array
  fruitsDb.push(newFruitsItem);
  // writing new item to local storage
  fs.writeFile(fruitsDbPath, JSON.stringify(fruitsDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not save fruit to database");
    }
    res.status(200).send("Fruit item successfully created"); // returning success message to user
  });
});

// [PUT REQUEST] updating a single fruit item in local storage
fruitRouter.put("/", (req, res) => {
  const fruitUpdate = req.body;

  // getting the index of the fruit in the db where the index is equal to fruit id parsed in the parameter
  const fruitUpdateIndex = fruitsDb.findIndex((fruit) => {
    return fruit.id === fruitUpdate.id;
  });

  // handling error case
  if (!fruitUpdateIndex) {
    res.status(404).send("Error, fruit to update not found");
  }

  // update the fruit item in the database
  fruitsDb[fruitUpdateIndex] = {
    ...fruitsDb[fruitUpdateIndex],
    ...fruitUpdate,
  };

  // writing new item to local storage
  fs.writeFile(fruitsDbPath, JSON.stringify(fruitsDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not update fruit to database");
    }
    res.status(200).send("Fruit item successfully updated"); // returning success message to user
  });
});

// [DELETE REQUEST] removing a single fruit item in local storage
fruitRouter.delete("/:id", (req, res) => {
  const parsedFruitID = req.params.id;
  console.log(parsedFruitID);

  const getFruitIndex = fruitsDb.findIndex((fruits) => {
    return fruits.id === parseInt(parsedFruitID);
  });
  console.log(getFruitIndex);

  fruitsDb.splice(getFruitIndex, 1); // remove the fruit from the database using the index

  // updating the database
  fs.writeFile(fruitsDbPath, JSON.stringify(fruitsDb), (err) => {
    if (err) {
      res
        .status(500)
        .send("Internal server error. Unable to delete fruit item");
    }
    res.send("Fruit deleted successfully");
  });
});

module.exports = fruitRouter;
