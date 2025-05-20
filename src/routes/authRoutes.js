const express = require('express');
const { login, loginFolio, logout } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/loginFolio', loginFolio);
router.post('/logout', logout);

module.exports = router;