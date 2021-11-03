const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    debugger;
    const verifyToken = jwt.verify(req.headers.token, process.env.JWT_TOKEN);
    next();
  } catch (err) {
    res.status(409).json({ error: true, message: "auth failed" });
  }
};
