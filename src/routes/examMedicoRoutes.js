const express = require('express');
const examMedicoController = require('../controllers/examMedicoController');

const router = express.Router();

router.get('/', examMedicoController.getAllExamMedico);
router.get('/:id', examMedicoController.getExamMedicoById);
router.post('/', examMedicoController.createExamMedico);
router.put('/:id', examMedicoController.updateExamMedico);
router.delete('/:id', examMedicoController.deleteExamMedico);

module.exports = router;