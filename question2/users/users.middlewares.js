const fs = require("fs");
let userDb = [];

// reading local file into an empty array
userDb = JSON.parse(fs.readFileSync("./db/users.json", "utf8"));

const validateUserCreation = (req, res, next) => {
  // console.log("Validated user creation!");
  if (!req.body.username) {
    return res.status(400).json({
      error: "username is required",
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      error: "password is required",
    });
  }

  next();
  return;
};

const apiAuth = (req, res, next) => {
  const authHeader = req.headers;
  console.log(authHeader);

  if (!authHeader.api_key) {
    return res
      .status(401)
      .json({ message: "This route requires an api_key to access!" });
  }

  const apiKey = authHeader.api_key;

  console.log(apiKey);

  const exisitngUser = userDb.find((user) => {
    return user.api_key === apiKey;
  });

  console.log(exisitngUser);

  if (exisitngUser) {
    req.user = exisitngUser;
    next();
    return;
  } else {
    return res.status(401).json({
      message: "You are not authenticated! Please provide valid credentials",
    });
  }
};

module.exports = {
  validateUserCreation,
  apiAuth,
};
