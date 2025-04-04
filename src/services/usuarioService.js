const prisma = require('../prisma/prismaClient');

//Get all usuarios
const getAllUsuarios = async () => {
    return await prisma.usuario.findMany({ include: { entrevistaInicial: true, examenMedico: true, exploracionFisica: true, solicitudInterna: true, folio: true, consentimiento: true, } });
}

//Get usuario by id
const getUsuarioById = async (id) => {
    return await prisma.usuario.findUnique({ where: { idUsuario: id }, include: { entrevistaInicial: true, examenMedico: true, exploracionFisica: true, solicitudInterna: true, consentimiento: true, } });
}

//Get usuario by idFolio
const getUsuarioByIdFolio = async (id) => {
    return await prisma.usuario.findUnique({ where: { idFolio: id }, include: { entrevistaInicial: true, examenMedico: true, exploracionFisica: true, solicitudInterna: true, consentimiento: true, } });
}

//Get all users by fecha
const getAllUsersByFecha = async (fechaFiltro) => {
    const startOfDay = new Date(fechaFiltro);
    const endOfDay = new Date(new Date(fechaFiltro).setDate(startOfDay.getDate() + 1));

    return await prisma.usuario.findMany({
        where: {
            createdAt: {
                gte: startOfDay, // Mayor o igual a la fecha proporcionada
                lt: endOfDay,    // Menor a la fecha siguiente
            },
        },
        include: { entrevistaInicial: true, examenMedico: true, exploracionFisica: true, solicitudInterna: true, consentimiento: true, folio: true, }
    });
};

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
    getAllUsersByFecha,
    createUsuario,
    updateUsuario,
    deleteUsuario,
}
