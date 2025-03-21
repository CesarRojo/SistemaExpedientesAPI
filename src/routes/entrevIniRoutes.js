const express = require('express');
const entrevIniController = require('../controllers/entrevIniController');

const router = express.Router();

// Exportar una función que recibe `io` y configura las rutas
module.exports = (io) => {
    router.get('/', entrevIniController.getAllEntrevIni);
    router.get('/:id', entrevIniController.getEntrevIniById);
    router.post('/', (req, res) => {entrevIniController.createEntrevIni(req, res, io)}); // Pasar req, res e io
    router.put('/:id', entrevIniController.updateEntrevIni);
    router.delete('/:id', entrevIniController.deleteEntrevIni);

    return router;
};