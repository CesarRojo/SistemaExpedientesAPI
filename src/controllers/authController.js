const { loginService, loginFolioService } = require('../services/authService');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginService(username, password);
    console.log("userController: ",user);
    if (user) {
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
  console.log("folio controller",folio);
  try {
    const user = await loginFolioService(folio);
    console.log("userController: ",user);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { login, loginFolio };