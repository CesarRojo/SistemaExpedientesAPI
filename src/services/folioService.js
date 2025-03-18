const prisma = require('../prisma/prismaClient');

//Get all folios
const getAllFolios = async () => {
    return await prisma.folio.findMany();
}

//Get folio by id
const getFolioById = async (id) => {
    return await prisma.folio.findUnique({ where: { idFolio: id }, 
        include: {
            Usuario: true,
            Empleado: true,
        } });
}

//Get folio by num
const getFolioByNum = async (num) => {
    return await prisma.folio.findUnique({ where: { numFolio: num }, include: { Usuario: true } });
}

//Get the last inserted folio
const getLastFolio = async () => {
    return await prisma.folio.findFirst({
        orderBy: {
            idFolio: 'desc'
        }
    });
}

//Create folio
const createFolio = async (data) => {
    return await prisma.folio.create({ 
        data: {
            numFolio: data.numFolio,
            Extras: {
                create: {
                    vioVideos: false,
                }
            }
        }
    });
}

const markVideosAsWatched = async (idFolio) => {
    await prisma.extras.update({
        where: { idFolio: idFolio },
        data: { vioVideos: true }
    });
};

//Delete folio
const deleteFolio = async (id) => {
    return await prisma.folio.delete({ where: { idFolio: id } });
}

module.exports = {
    getAllFolios,
    getFolioById,
    getFolioByNum,
    getLastFolio,
    createFolio,
    deleteFolio,
    markVideosAsWatched,
}