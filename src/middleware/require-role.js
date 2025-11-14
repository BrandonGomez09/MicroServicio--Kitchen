const jwt = require("jsonwebtoken");

module.exports = function requireRole(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({
        success: false,
        message: "Missing Authorization header"
      });
    }

    const token = header.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const roles = decoded.roles || [];

      if (!roles.includes(requiredRole)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You don't have permission"
        });
      }

      req.user = decoded;
      next();

    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
        error: error.message
      });
    }
  };
};