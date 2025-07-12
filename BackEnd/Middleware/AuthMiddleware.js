const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

let my_secret_Key = process.env.JWT_SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // ✅ Use req.cookies, not res.cookie
  console.log( req.cookies.token)
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, my_secret_Key);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
