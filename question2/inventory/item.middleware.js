const fs = require("fs");

let userDb = [];

// reading local file into an empty array
userDb = JSON.parse(fs.readFileSync("./db/users.json", "utf8"));

const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "You are not authenticated1!" });
  }

  const base64 = new Buffer.from(authHeader.split(" ")[1], "base64");
  const base64ToString = base64.toString();
  const usernameAndPassword = base64ToString.split(":");
  const auth = usernameAndPassword;

  const username = auth[0];
  const password = auth[1];

  console.log(auth);

  const existingUser = userDb.find((user) => {
    return user.username === username && user.password === parseInt(password);
  });

  if (!existingUser) {
    res.status(401).json({ message: "You are not authenticated!" });
  } else {
    next();
  }
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

module.exports = { basicAuth, apiAuth };
