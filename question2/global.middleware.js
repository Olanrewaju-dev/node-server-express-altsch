const checkBody = (req, res, next) => {
  console.log("i got here!");
  if (!req.body) {
    next();
    return;
  }
  res.status(400).send("Error, didn't send a body to post");
};

const checkRole = (req, res, next) => {
  if (req.user.user_type !== "admin") {
    return res.status(403).json({ message: "You are not authorized!" });
  }
  next();
};

module.exports = {
  checkBody,
  checkRole,
};
