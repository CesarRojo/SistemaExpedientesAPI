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

const getDocumentosPorUsuarios = async (req, res) => {
    const { idUsuarios } = req.query; // Obtener el idUsuarios de los parámetros de consulta
    console.log("usuarios",req.query.idUsuarios);
    const usuariosArray = idUsuarios.split(','); // Convertir el string en un array
    try {
        const docs = await documentoService.getDocumentosPorUsuarios(usuariosArray);
        res.json(docs);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch docs>>' });
    }
};

module.exports = {
    getAllDocumentos,
    getDocumentosPorUsuarios,
}