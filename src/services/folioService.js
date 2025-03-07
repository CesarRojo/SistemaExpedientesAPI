const prisma = require('../prisma/prismaClient');

//Get all folios
const getAllFolios = async () => {
    return await prisma.folio.findMany();
}

//Get folio by num
const getFolioByNum = async (num) => {
    return await prisma.folio.findUnique({ where: { numFolio: num } });
}

//Create folio
const createFolio = async (data) => {
    return await prisma.folio.create({ data });
}

//Delete folio
const deleteFolio = async (id) => {
    return await prisma.folio.delete({ where: { idFolio: id } });
}

module.exports = {
    getAllFolios,
    getFolioByNum,
    createFolio,
    deleteFolio,
}