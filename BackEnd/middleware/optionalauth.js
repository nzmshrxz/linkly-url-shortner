const jwt = require("jsonwebtoken");

function optionalAuth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // attach user
    } catch (err) {
      // if token invalid, ignore → treat as guest
      req.user = null;
    }
  } else {
    req.user = null; // no token → guest
  }

  next(); // always move on
}

module.exports = optionalAuth;
