const examenMedicoService = require('../services/examMedicoService');

//Get all examMedico
const getAllExamMedico = async (req, res) => {
    try {
        const examMedico = await examenMedicoService.getAllExamMedico();
        res.json(examMedico);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch examen medicos>>' });
    }
}

//Get examMedico by id
const getExamMedicoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const examMedico = await examenMedicoService.getExamMedicoById(id);
        if(examMedico){
            res.json(examMedico);
        }else{
            res.status(404).json({ error: '<<Examen medico not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch examen medico>>' });
    }
}

//Create examMedico
const createExamMedico = async (req, res) => {
    try {
        if(req.body.examMedicoData.fecha && req.body.examMedicoData.fechaNac){
            req.body.examMedicoData.fecha = new Date(req.body.examMedicoData.fecha);
            req.body.examMedicoData.fechaNac = new Date(req.body.examMedicoData.fechaNac);
        }
        const examMedico = await examenMedicoService.createExamMedico(req.body);
        res.status(201).json(examMedico);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create examen medico>>' });
    }
}

//Update examMedico
const updateExamMedico = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const examMedico = await examenMedicoService.updateExamMedico(id, req.body);
        res.status(200).json(examMedico);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to update examen medico>>' });
    }
}

//Delete examMedico
const deleteExamMedico = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const examMedico = await examenMedicoService.deleteExamMedico(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete examen medico>>' });
    }
}

module.exports = {
    getAllExamMedico,
    getExamMedicoById,
    createExamMedico,
    updateExamMedico,
    deleteExamMedico,
}