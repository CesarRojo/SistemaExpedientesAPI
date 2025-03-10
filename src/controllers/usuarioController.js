const usuarioService = require('../services/usuarioService');

//Get all usuarios
const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.getAllUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch all usuarios>>' });
    }
}

//Get usuario by id
const getUsuarioById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = await usuarioService.getUsuarioById(id);
        if(usuario){
            res.json(usuario);
        }else{
            res.status(404).json({ error: '<<Usuario not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch usuario by id>>' });
    }
}

//Create usuario
const createUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.createUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create usuario>>' });
    }
}

//Update usuario
const updateUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = await usuarioService.updateUsuario(id, req.body);
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update usuario>>' });
    }
}

//Delete usuario
const deleteUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const usuario = await usuarioService.deleteUsuario(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete usuario>>' });
    }
}

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
}