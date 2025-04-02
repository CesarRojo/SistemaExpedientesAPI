const express = require('express')
const solicIntController = require('../controllers/solicIntController');

const router = express.Router();

//Routes
router.get('/', solicIntController.getAllSolicInt);
router.get('/fecha', solicIntController.getAllSolIntByFecha);
router.get('/:id', solicIntController.getSolicIntById);
router.post('/', solicIntController.createSolicInt);
router.delete('/:id', solicIntController.deleteSolicInt);

module.exports = router;