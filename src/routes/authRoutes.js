const express = require('express');
const { login, loginFolio } = require('../controllers/authController');
const router = express.Router();

router.post('/login', login);
router.post('/loginFolio', loginFolio);

module.exports = router;