const prisma = require('../prisma/prismaClient');

//Get single colabora
const getColaboraById = async (id) => {
    return await prisma.colabora.findUnique({ where: { CB_CODIGO: id } });
}

// Get colabora by PRETTYNAME
const getColaboraByPrettyName = async (prettyName) => {
    return await prisma.colabora.findMany({
        where: {
            // Usar contains sin mode
            PRETTYNAME: {
                contains: prettyName.toLowerCase(), // Convertir a minúsculas
            },
        },
    });
}

module.exports = {
    getColaboraById,
    getColaboraByPrettyName,
}