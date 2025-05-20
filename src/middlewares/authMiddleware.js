const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Debe ser la misma clave secreta que usaste para firmar el token

const authenticateJWT = (req, res, next) => {
  // console.log('AuthMiddleware req', req);
  console.log('AuthMiddleware req.cookies', req.cookies);
  const token = req.cookies?.token; // Obtener el token de las cookies
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user; // Almacena la información del usuario en la solicitud
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWT;
