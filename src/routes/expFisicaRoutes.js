const express = require('express');
const expFisicaController = require('../controllers/expFisicaController');

const router = express.Router();

//Routes
router.get('/', expFisicaController.getAllExpFisica);
router.get('/:id', expFisicaController.getExpFisicaById);
router.post('/', expFisicaController.createExpFisica);
router.delete('/:id', expFisicaController.deleteExpFisica);

module.exports = router;