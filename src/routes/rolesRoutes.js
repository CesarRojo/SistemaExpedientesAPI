const express = require('express');
const rolesController = require('../controllers/rolesController');

const router = express.Router();

//Routes
router.get('/', rolesController.getAllRoles);
router.get('/:id', rolesController.getRoleById);
router.post('/', rolesController.createRole);
router.put('/:id', rolesController.updateRole);
router.delete('/:id', rolesController.deleteRole);

module.exports = router;
