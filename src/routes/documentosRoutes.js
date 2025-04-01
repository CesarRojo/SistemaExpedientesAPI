const express = require('express');
const documentosController = require('../controllers/documentosController');

const router = express.Router();

//Routes
router.get('/', documentosController.getAllDocumentos);

module.exports = router;