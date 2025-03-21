const express = require('express');
const examMedicoController = require('../controllers/examMedicoController');

const router = express.Router();

module.exports = (io) => {
    router.get('/', examMedicoController.getAllExamMedico);
    router.get('/:id', examMedicoController.getExamMedicoById);
    router.post('/', (req, res) => {examMedicoController.createExamMedico(req, res, io)});
    router.put('/:id', examMedicoController.updateExamMedico);
    router.delete('/:id', examMedicoController.deleteExamMedico);

    return router;
};