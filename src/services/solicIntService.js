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

//Get all entrevIni by fecha
const getAllSolIntByFecha = async (fechaFiltro) => {
    const startOfDay = new Date(fechaFiltro);
    const endOfDay = new Date(new Date(fechaFiltro).setDate(startOfDay.getDate() + 1));

    return await prisma.solicitudInterna.findMany({
        where: {
            fecha: {
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
    getAllSolIntByFecha,
    createSolInt,
    deleteSolInt,
}