const express = require('express');
const folioController = require('../controllers/folioController');

const router = express.Router();

//Routes
router.get('/', folioController.getAllFolios);
router.get('/last', folioController.getLastFolio);
router.get('/:id', folioController.getFolioByNum);
router.get('/ident/:id', folioController.getFolioById);
router.post('/', folioController.createFolio);
router.put('/extras/:id', folioController.markVideosAsWatched);
router.delete('/:id', folioController.deleteFolio);

module.exports = router;