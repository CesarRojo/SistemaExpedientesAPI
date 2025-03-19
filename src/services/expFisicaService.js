const prisma = require('../prisma/prismaClient');

//Get all explorFisica
const getAllExpFisica = async () => {
    return await prisma.exploracionFisica.findMany();
}

//Get explorFisica by id
const getExpFisicaById = async (id) => {
    return await prisma.exploracionFisica.findUnique({ where: { idExpFis: id } });
}

//Create explorFisica
const createExpFisica = async (data) => {
    return await prisma.exploracionFisica.create({ data });
}

//Delete explorFisica
const deleteExpFisica = async (id) => {
    return await prisma.exploracionFisica.delete({ where: { idExpFis: id } });
}

module.exports = {
    getAllExpFisica,
    getExpFisicaById,
    createExpFisica,
    deleteExpFisica,
}