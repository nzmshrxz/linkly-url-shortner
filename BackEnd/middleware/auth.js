const jwt = require("jsonwebtoken")

function auth(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]

  if (!token) return res.status(401).json({ message: "No token, authorization denied" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded   // ✅ here we attach user info
    next()               // pass control to the next function (your route handler)
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" })
  }
}

module.exports = auth
