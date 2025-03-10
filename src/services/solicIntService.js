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

