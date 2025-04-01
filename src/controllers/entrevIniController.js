const entrevIniService = require('../services/entrevIniService');

//Get all entrevInis
const getAllEntrevIni = async (req, res) => {
    try {
        const entrevInis = await entrevIniService.getAllEntrevIni();
        res.json(entrevInis);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch entrevInis>>' });
    }
}

//Get all entrevIni by fecha
const getAllEntrevIniByFecha = async (req, res) => {
    try {
        const fechaFiltro = req.query.fecha; // Obtener el filtro de fecha de los parámetros de consulta
        const entrevIni = await entrevIniService.getAllEntrevIniByFecha(fechaFiltro);
        res.json(entrevIni);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch entrevIni by fecha>>' });
    }
};

//Get entrevIni by id
const getEntrevIniById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const entrevIni = await entrevIniService.getEntrevIniById(id);
        if(entrevIni){
            res.json(entrevIni);
        }else{
            res.satus(404).json({ error: '<<EntrevIni not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch entrevIni by id>>' });
    }
}

//Create entrevIni
const createEntrevIni = async (req, res, io) => {
    try {
        // Convertir la fecha de string a Date
        if (req.body.entrevIniData.fecha) {
            req.body.entrevIniData.fecha = new Date(req.body.entrevIniData.fecha);
            req.body.usuario.fechaNac = new Date(req.body.usuario.fechaNac);
        }
        const entrevIni = await entrevIniService.createEntrevIni(req.body, io);
        res.status(201).json(entrevIni);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create entrevIni>>' });
    }
}

//Update entrevIni
const updateEntrevIni = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const entrevIni = await entrevIniService.updateEntrevIni(id, req.body);
        res.status(200).json(entrevIni);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to update entrevIni>>' });
    }
}

//Delete entrevIni
const deleteEntrevIni = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const entrevIni = await entrevIniService.deleteEntrevIni(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete entrevIni>>' });
    }
}

module.exports = {
    getAllEntrevIni,
    getAllEntrevIniByFecha,
    getEntrevIniById,
    createEntrevIni,
    updateEntrevIni,
    deleteEntrevIni
}