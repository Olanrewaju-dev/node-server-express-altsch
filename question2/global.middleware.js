const checkBody = (req, res, next) => {
  const parsedBody = req.body;
  if (Object.keys(parsedBody).length != 0) {
    console.log(parsedBody);
    next();
    return;
  }
  res.status(400).send("Error, didn't send a body to post");
};

module.exports = {
  checkBody,
};
