const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4400;

// importing routers
const fruitRouter = require("./fruits/fruits");
const marketRouter = require("./markets/markets");

// using third-party Express middleware
app.use(bodyParser.json());

// using express router
app.use("/fruits", fruitRouter);
app.use("/markets", marketRouter);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Altschool fruits website");
});

// Catching get request to an unspecified route in the server
app.get("*", (req, res) => {
  res.status(404);
  res.send("Route not supported");
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
