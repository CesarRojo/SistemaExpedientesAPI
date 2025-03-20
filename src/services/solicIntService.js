const prisma = require('../prisma/prismaClient');

//Get all solicInt
const getAllSolInt = async () => {
    return await prisma.solicitudInterna.findMany({
        include: {
            datosFam: true,
            usuario: true,
        }
    });
}

//Get solicInt by id
const getSolIntById = async (id) => {
    return await prisma.solicitudInterna.findUnique({ where: { idSolInt: id },
        include: {
            datosFam: true,
            usuario: true,
        }
    });
}

//Create solicInt
const createSolInt = async (data) => {
    const { datosFam, ...solicitudData } = data; // Desestructuramos los datos
    console.log(datosFam);
    console.log(solicitudData);

    return await prisma.solicitudInterna.create({
        data: {
            ...solicitudData, // Incluimos los datos de la solicitud
            datosFam: {
                create: datosFam, // Creamos los datos de la familia anidados
            },
        },
    });
}

//Delete solicInt
const deleteSolInt = async (id) => {
    return await prisma.solicitudInterna.delete({ where: { idSolInt: id } });
}

module.exports = {
    getAllSolInt,
    getSolIntById,
    createSolInt,
    deleteSolInt,
}