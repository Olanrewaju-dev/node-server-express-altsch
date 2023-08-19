const express = require("express");
const path = require("path");
const fs = require("fs");

// using middlewares
const checkBody = require("../global.middleware");

const marketsRouter = express.Router();

// creating path to local db
const marketsDbPath = path.join(__dirname, "../db", "markets.json");
let marketsDb = [];

// reading local file into an empty array
marketsDb = JSON.parse(fs.readFileSync(marketsDbPath, "utf8"));

// [GET REQUEST] fetching all market items from local storage
marketsRouter.get("/", (req, res) => {
  res.send(marketsDb);
});

// [GET REQUEST] fetching a single market item from local storage
marketsRouter.get("/:id", (req, res) => {
  const marketID = req.params.id; // grabbing the URL parameter (i.e. fruit id) from the URL

  // getting the index of the fruit in the db where the index is equal to fruit id parsed in the parameter
  const marketIndex = marketsDb.findIndex((market) => {
    return market.id === parseInt(marketID);
  });

  // handling error case where ID is not found in the db
  if (marketIndex === -1) {
    res.status(500);
    res.send("Fruit item ID not found in database.");
  }
  res.send(marketsDb[marketIndex]); // return the json object where the URL id is found in the db
});

// [POST REQUEST] Creating market item route
marketsRouter.post("/", checkBody, (req, res) => {
  const newMarket = req.body;

  // dynamically adding id to fruit item inputs
  const lastMarket = marketsDb[marketsDb.length - 1];
  const lastMarketId = lastMarket.id;
  newMarket.id = lastMarketId + 1;

  //pushing new fruit item to an empty array
  marketsDb.push(newMarket);
  // writing new item to local storage
  fs.writeFile(marketsDbPath, JSON.stringify(marketsDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not save fruit to database");
    }
    res.status(200).send("Market successfully created"); // returning success message to user
  });
});

// [PUT REQUEST] updating a single market in local storage
marketsRouter.put("/", (req, res) => {
  const updateMarket = req.body;

  // getting the index of the market in the db where the index is equal to market id parsed in the parameter
  const updateMarketIndex = marketsDb.findIndex((market) => {
    return market.id === updateMarket.id;
  });

  // handling error case
  if (!updateMarketIndex) {
    res.status(404).send("Error, fruit to update not found");
  }

  // update the market in the database
  marketsDb[updateMarketIndex] = {
    ...marketsDb[updateMarketIndex],
    ...updateMarket,
  };

  // writing new market to local storage
  fs.writeFile(marketsDbPath, JSON.stringify(marketsDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not update fruit to database");
    }
    res.status(200).send("Market successfully updated"); // returning success message to user
  });
});

// [DELETE REQUEST] removing a single market in local storage
marketsRouter.delete("/:id", (req, res) => {
  const parsedMarketID = req.params.id;

  const getMarketIndex = marketsDb.findIndex((market) => {
    return market.id === parseInt(parsedMarketID);
  });

  marketsDb.splice(getMarketIndex, 1); // remove the market from the database using the index

  // updating the database
  fs.writeFile(marketsDbPath, JSON.stringify(marketsDb), (err) => {
    if (err) {
      res
        .status(500)
        .send("Internal server error. Unable to delete fruit item");
    }
    res.send("Market deleted successfully");
  });
});

module.exports = marketsRouter;
