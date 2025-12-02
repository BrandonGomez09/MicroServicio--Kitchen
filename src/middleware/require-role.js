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
      const userRoles = decoded.roles || [];

      // --- CORRECCIÓN: ACEPTAR UN ROL O UNA LISTA DE ROLES ---
      
      // 1. Convertimos lo que llegue a un array siempre
      const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      
      // 2. Verificamos si el usuario tiene AL MENOS UNO de los roles permitidos
      const hasPermission = userRoles.some(role => allowedRoles.includes(role));

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: You don't have permission",
          requiredRoles: allowedRoles, // Devolvemos la lista para debug
          userRoles: userRoles
        });
      }

      // Si pasó, guardamos al usuario en la request
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        roles: userRoles,
        stateId: decoded.stateId ?? null,
        municipalityId: decoded.municipalityId ?? null
      };

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