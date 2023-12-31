const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4400;

// importing routers
const itemRouter = require("./inventory/item.router");
const userRouter = require("./users/users.router");

// using third-party Express middleware
app.use(bodyParser.json());

// using express router
app.use("/items", itemRouter);
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Altschool website");
});

// Catching get request to an unspecified route in the server
app.get("*", (req, res) => {
  res.status(404);
  res.send("Route not supported");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
