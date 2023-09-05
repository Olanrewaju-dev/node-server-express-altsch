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

module.exports = { basicAuth };
