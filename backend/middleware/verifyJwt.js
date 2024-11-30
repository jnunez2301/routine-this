const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../environment/environment");

function verifyToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    req.username = payload.username;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

module.exports = verifyToken;