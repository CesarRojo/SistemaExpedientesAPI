const prisma = require('../prisma/prismaClient');

//Get all explorFisica
const getAllExpFisica = async () => {
    return await prisma.exploracionFisica.findMany();
}

//Get explorFisica by id
const getExpFisicaById = async (id) => {
    return await prisma.exploracionFisica.findUnique({ where: { idExpFis: id } });
}

//Get all expFisica by fecha
const getAllExpFisicaByFecha = async (fechaFiltro) => {
    const startOfDay = new Date(fechaFiltro);
    const endOfDay = new Date(new Date(fechaFiltro).setDate(startOfDay.getDate() + 1));

    return await prisma.exploracionFisica.findMany({
        where: {
            createdAt: {
                gte: startOfDay, // Mayor o igual a la fecha proporcionada
                lt: endOfDay,    // Menor a la fecha siguiente
            },
        },
        include: { 
            usuario: {
                include: {
                    folio: true,
                }
            } 
        }
    });
};

//Create explorFisica
const createExpFisica = async (data) => {
    console.log(data);
    return await prisma.exploracionFisica.create({ data });
}

//Delete explorFisica
const deleteExpFisica = async (id) => {
    return await prisma.exploracionFisica.delete({ where: { idExpFis: id } });
}

module.exports = {
    getAllExpFisica,
    getExpFisicaById,
    getAllExpFisicaByFecha,
    createExpFisica,
    deleteExpFisica,
}