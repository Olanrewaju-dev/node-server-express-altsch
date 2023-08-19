const checkBody = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      data: null,
      error: "Must have a body!",
    });
  }
  next();
};

module.exports = checkBody;
