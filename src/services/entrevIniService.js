const prisma = require('../prisma/prismaClient');

//Get all entrevIni
const getAllEntrevIni = async () => {
    return await prisma.entrevIni.findMany();
}

//Get entrevIni by id
const getEntrevIniById = async (id) => {
    return await prisma.entrevIni.findUnique({
        where: { idEntrevIni: id },
    });
}

//Create entrevIni
const createEntrevIni = async (data) => {
    const { usuario, ...entrevIniData } = data;

    return await prisma.entrevIni.create({
        data: {
            ...entrevIniData,
            usuario: {
                create: usuario
            }
        }
    });
}

//Update entrevIni
const updateEntrevIni = async (id, data) => {
    return await prisma.entrevIni.update({
        where: { idEntrevIni: id },
        data
    });
}

//Delete entrevIni
const deleteEntrevIni = async (id) => {
    return await prisma.entrevIni.delete({
        where: { idEntrevIni: id }
    });
}

module.exports = {
    getAllEntrevIni,
    getEntrevIniById,
    createEntrevIni,
    updateEntrevIni,
    deleteEntrevIni
}