const path = require("path");
const fs = require("fs");

// creating path to local db
const inventoryDbPath = path.join(__dirname, "../db", "inventory.json");
let inventoryDb = [];

// reading local file into an empty array
inventoryDb = JSON.parse(fs.readFileSync(inventoryDbPath, "utf8"));

// GET - Fetching all items in db
const getAllItems = (req, res) => {
  res.send(inventoryDb);
};

// GET - Fetching an items in db by ID
const getItemByID = (req, res) => {
  const itemID = req.params.id; // grabbing the URL parameter (i.e. item id) from the URL

  // getting the index of the item in the db where the index is equal to item id parsed in the URL parameter
  const itemIndex = inventoryDb.findIndex((item) => {
    return item.id === parseInt(itemID);
  });

  // handling error case where ID is not found in the db
  if (itemIndex === -1) {
    res.status(500).send("Item ID not found in database.");
  }
  res.send(inventoryDb[itemIndex]); // return the json object where the URL id is found in the db
};
//===========END OF GET OPERATION=================//

// POST - creating an item in db
const createNewItem = (req, res) => {
  const newItem = req.body;

  // dynamically adding id to item inputs
  const lastItemInDB = inventoryDb[inventoryDb.length - 1];
  const lastItemId = lastItemInDB.id;
  newItem.id = lastItemId + 1;

  //pushing new item to an empty array
  inventoryDb.push(newItem);
  // writing new item to local storage
  fs.writeFile(inventoryDbPath, JSON.stringify(inventoryDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not save item to database");
    }
    res.status(200).send("Item successfully created"); // returning success message to user
  });
};
//===========END OF POST OPERATION=================//

// PUT - updating an item in db
const updateItem = (req, res) => {
  const updateItem = req.body;

  // getting the index of the item in the db where the index is equal to student id parsed in the URL parameter
  const updateItemIndex = inventoryDb.findIndex((item) => {
    return item.id === updateItem.id;
  });

  // update the item in the database
  inventoryDb[updateItemIndex] = {
    ...inventoryDb[updateItemIndex],
    ...updateItem,
  };

  // writing new item to local storage
  fs.writeFile(inventoryDbPath, JSON.stringify(inventoryDb), (err) => {
    if (err) {
      // handling error
      res
        .status(500)
        .send("Internal server error. Could not update item in database");
    }
    res.status(200).send("item successfully updated"); // returning success message to user
  });
};
//===========END OF PUT OPERATION=================//

const deleteItem = (req, res) => {
  const parsedItemID = req.params.id;

  const getItemIndex = inventory.findIndex((item) => {
    return item.id === parseInt(parsedItemID);
  });

  inventoryDb.splice(getItemIndex, 1); // remove the item from the database using the index

  // updating the database
  fs.writeFile(inventoryDbPath, JSON.stringify(inventoryDb), (err) => {
    if (err) {
      res.status(500).send("Internal server error. Unable to delete item");
    }
    res.send("Item deleted successfully");
  });
};

module.exports = {
  getAllItems,
  getItemByID,
  createNewItem,
  updateItem,
  deleteItem,
};
