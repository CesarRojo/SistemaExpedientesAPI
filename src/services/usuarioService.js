const prisma = require('../prisma/prismaClient');

//Get all usuarios
const getAllUsuarios = async () => {
    return await prisma.usuario.findMany({ include: { entrevistaInicial: true } });
}

//Get usuario by id
const getUsuarioById = async (id) => {
    return await prisma.usuario.findUnique({ where: { idUsuario: id }, include: { entrevistaInicial: true } });
}

//Get usuario by idFolio
const getUsuarioByIdFolio = async (id) => {
    return await prisma.usuario.findUnique({ where: { idFolio: id }, include: { entrevistaInicial: true, examenMedico: true, } });
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
    getUsuarioByIdFolio,
    createUsuario,
    updateUsuario,
    deleteUsuario,
}
