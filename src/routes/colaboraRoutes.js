const express = require('express');
const colaboraController = require('../controllers/colaboraController');

const router = express.Router();

//Routes
router.get('/name', colaboraController.getColaboraByPrettyName);
router.get('/:id', colaboraController.getColaboraById);

module.exports = router;