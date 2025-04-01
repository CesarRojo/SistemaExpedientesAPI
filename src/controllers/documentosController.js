const documentoService = require('../services/documentosService');

//Get all documentos
const getAllDocumentos = async (req, res) => {
    try {
        const docs = await documentoService.getAllDocumentos();
        res.json(docs);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch docs>>' });
    }
}

module.exports = {
    getAllDocumentos,
}