const express = require("express");
const path = require("path");

const app = express();
const port = 8080;

// using in-built express middleware for static files
app.use(express.static("public"));

// creating path to static files
const homePage = path.join(__dirname, "public", "index.html");
const pageNotFound = path.join(__dirname, "public", "404.html");

// get request to index.html
app.get("/index.html", (req, res) => {
  res.status(200);
  res.sendFile(homePage);
});

// catching get request to unspecified route
app.get("*", (req, res) => {
  res.status(404);
  res.sendFile(pageNotFound);
});

// starting server
app.listen(port, () => {
  console.log("server is listening on port " + port);
});
