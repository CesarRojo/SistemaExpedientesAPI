const folioService = require('../services/folioService');

//Get all folios
const getAllFolios = async (req, res) => {
    try {
        const folio = await folioService.getAllFolios();
        res.json(folio);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch folios>>' });
    }
}

//Get folio by num
const getFolioByNum = async (req, res) => {
    try {
        const num = parseInt(req.params.id);
        const folio = await folioService.getFolioByNum(num);
        if (folio){
            res.json(folio);
        }else{
            res.status(404).json({ error: '<<Folio not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch folio by num>>' });
    }
}

//Get last folio
const getLastFolio = async (req, res) => {
    try {
        const folio = await folioService.getLastFolio();
        res.json(folio);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch last folio>>' });
    }
}

//Create folio
const createFolio = async (req, res) => {
    try {
        const folio = folioService.createFolio(req.body);
        res.status(201).json(folio);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create folio>>' });
    }
}

//Delete folio
const deleteFolio = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedFolio = await folioService.deleteFolio(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete folio>>' });
    }
}

module.exports = { 
    getAllFolios, 
    getFolioByNum, 
    getLastFolio,
    createFolio, 
    deleteFolio 
};