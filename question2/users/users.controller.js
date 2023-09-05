const fs = require("fs");
const path = require("path");

const userDbPath = path.join(__dirname, "../db", "users.json");
let userDb = [];

userDb = JSON.parse(fs.readFileSync(userDbPath, "utf8"));

// Creating user in local db
const createUser = (req, res) => {
  const newUserInput = req.body;

  // ensuring user is new in the database
  const checkIfUserExist = userDb.find((user) => {
    return (
      user.username === newUserInput.username &&
      user.password === newUserInput.password
    );
  });

  if (checkIfUserExist) {
    res.send("Error! User already exists");
    return;
  } else if (
    (!checkIfUserExist && newUserInput.username === "Olanrewaju") ||
    newUserInput.username === "Daniel"
  ) {
    newUserInput.user_type = "admin";
    newUserInput.api_key = `${newUserInput.username}_${newUserInput.password}`;
  } else {
    newUserInput.user_type = "user";
  }

  // dynamically adding id to user input
  const lastUser = userDb[userDb.length - 1];
  const lastUserId = lastUser.id;
  newUserInput.id = lastUserId + 1;

  // pushing new user to an empty array
  userDb.push(newUserInput);
  //writing new user input to local storage
  fs.writeFile(userDbPath, JSON.stringify(userDb), (err) => {
    if (err) {
      res.status(500).send("Internal server error. Could not save user");
    }
    res.status(200).send("Users successfully created.");
  });
};

// Fetch all user from local db
const getAllUser = (req, res) => {
  res.send(userDb);
};

// Fetch a specified user from db
const getOneUser = (req, res) => {
  const userEntry = req.params.id; // grabbing the user id specified in the URL parameter

  // handling error in case no id is parsed in the parameter
  if (!userEntry) {
    res.status(400).json({
      message: "Bad request. User cannot be fetched.",
    });
  }

  // fetching the index of the user from db
  const userIndex = userDb.findIndex((user) => {
    return user.id === parseInt(userEntry);
  });

  // checking if index is found and handling error case
  if (userIndex === -1) {
    res.status(404).json({
      message: "User not found. Check the id of user sent.",
    });
  }

  //responding with the user details from db
  res.send(userDb[userIndex]);
};

// Update a specified user in db
const updateUser = (req, res) => {
  const userToUpdate = req.body;

  if (!userToUpdate) {
    res.status(404).json({
      message: "no particulars provided for user update.",
    });
  }

  const userIndex = userDb.findIndex((user) => {
    return user.id === userToUpdate.id;
  });

  if (userIndex === -1) {
    res.status(500).json({
      message: "Error, user particulars does not match the database.",
    });
  }

  userDb[userIndex] = { ...userDb[userIndex], ...userToUpdate };

  fs.writeFile(userDbPath, JSON.stringify(userDb), (err) => {
    if (err) {
      res.status(500).json({
        message: "Internal error, something went wrong.",
      });
    }
    res.status(200).send("User details updated successfully.");
  });
};

// Delete a specified user in db
const deleteUser = (req, res) => {
  const parsedUserID = req.params.id;

  const getUserIndex = userDb.findIndex((user) => {
    return user.id === parseInt(parsedUserID);
  });

  userDb.splice(getUserIndex, 1); // remove the user from the database using the index

  // updating the database
  fs.writeFile(userDbPath, JSON.stringify(userDb), (err) => {
    if (err) {
      res.status(500).send("Internal server error. Unable to delete user");
    }
    res.send("User deleted successfully");
  });
};

module.exports = {
  createUser,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
};
