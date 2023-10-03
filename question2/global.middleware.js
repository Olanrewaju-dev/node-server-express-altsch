// const checkBody = (req, res, next) => {
//   console.log("i got here!");
//   if (!req.body) {
//     next();
//     return;
//   }
//   res.status(400).send("Error, didn't send a body to post");
// };

const checkBody = (req, res, next) => {
  console.log("i got here!");
  if (!req.body) {
    res.status(400).send("Error, didn't send a body to post");
  }
  next();
};

module.exports = {
  checkBody,
};
