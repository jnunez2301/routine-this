const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../environment/environment");
/* Example of JWT middleware
authRouter.get("/protected", verifyToken, (req, res) => {
  return res.status(200).json({ message: "You have access" });
}); 
also this can be used on routers
app.use("/foo/bar", verifyToken, fooRouter)
*/
/** 
 * @description If you need to protect a specific endpoint from public usage just use it in the middleware
 * @example app.get("/foo/bar", verifyToken, (req, res, next) => res.send("Hi there"); next();)
 * @example app.use("/foo/bar", verifyToken, fooRouter)
*/
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