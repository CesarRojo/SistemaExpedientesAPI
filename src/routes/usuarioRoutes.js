const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

//Routes
router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuarioById);
router.get('/folio/:id', usuarioController.getUsuarioByIdFolio);
router.post('/', usuarioController.createUsuario);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/', usuarioController.deleteUsuario);

module.exports = router;