const express = require('express');
const entrevIniController = require('../controllers/entrevIniController');

const router = express.Router();

//Routes
router.get('/', entrevIniController.getAllEntrevIni);
router.get('/:id', entrevIniController.getEntrevIniById);
router.post('/', entrevIniController.createEntrevIni);
router.put('/:id', entrevIniController.updateEntrevIni);
router.delete('/:id', entrevIniController.deleteEntrevIni);

module.exports = router;