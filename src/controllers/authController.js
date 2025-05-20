const jwt = require('jsonwebtoken');
const { loginService, loginFolioService } = require('../services/authService');

const JWT_SECRET = 'your_jwt_secret';

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginService(username, password);
    if (user) {
      // Generar el token
      const token = jwt.sign({ id: user.noReloj, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });
      
      // Enviar el token en una cookie
      res.cookie('token', token, { httpOnly: true, sameSite: 'Lax', }); // Asegúrate de que la cookie sea segura en producción
      res.status(200).json({ user });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const loginFolio = async (req, res) => {
  const { folio } = req.body;
  try {
    const user = await loginFolioService(folio);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token'); // Elimina la cookie del token
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
};

module.exports = { login, loginFolio, logout };