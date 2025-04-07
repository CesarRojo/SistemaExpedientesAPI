const expFisicaService = require('../services/expFisicaService');

//Get all expFisica
const getAllExpFisica = async (req, res) => {
    try {
        const expFisica = await expFisicaService.getAllExpFisica();
        res.json(expFisica);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch expFisica>>' });
    }
}

//Get expFisica by id
const getExpFisicaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const expFisica = await expFisicaService.getExpFisicaById(id);
        if(expFisica){
            res.json(expFisica);
        }else{
            res.status(404).json({ error: '<<ExpFisica not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch expFisica by id>>' });
    }
}

//Get all expFisica by fecha
const getAllExpFisicaByFecha = async (req, res) => {
    try {
        const fechaFiltro = req.query.fecha; // Obtener el filtro de fecha de los parámetros de consulta
        const expFisica = await expFisicaService.getAllExpFisicaByFecha(fechaFiltro);
        res.json(expFisica);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch expFisica by fecha>>' });
    }
};

//Create expFisica
const createExpFisica = async (req, res) => {
    try {
        if (req.body.createdAt) {
            req.body.createdAt = new Date(req.body.createdAt);
        }
        const expFisica = await expFisicaService.createExpFisica(req.body);
        res.status(201).json(expFisica);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create expFisica>>'});
    }
}

//Delete expFisica
const deleteExpFisica = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedExpFisica = await expFisicaService.deleteExpFisica(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete expFisica>>' });
    }
}

module.exports = {
    getAllExpFisica,
    getExpFisicaById,
    getAllExpFisicaByFecha,
    createExpFisica,
    deleteExpFisica,
}