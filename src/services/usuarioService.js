const prisma = require('../prisma/prismaClient');

//Get all usuarios
const getAllUsuarios = async () => {
    return await prisma.usuario.findMany();
}

//Get usuario by id
const getUsuarioById = async (id) => {
    return await prisma.usuario.findUnique({ where: { idUsuario: id } });
}

//Create usuario
const createUsuario = async (data) => {
    return await prisma.usuario.create({ data });
}

//Update usuario
const updateUsuario = async (id, data) => {
    return await prisma.usuario.update({ where: { idUsuario: id }, data });
}

//Delete usuario
const deleteUsuario = async (id) => {
    return await prisma.usuario.delete({ where: { idUsuario: id }});
}

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
}
