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

//Create folio
// const createFolio = async (data) => {
//     const transaction = await prisma.$transaction(async (prisma) => {
//       // Obtener el último folio
//       const lastFolio = await prisma.folio.findFirst({
//         orderBy: {
//           idFolio: 'desc',
//         },
//       });
  
//       // Generar el nuevo folio
//       const newFolioNumber = lastFolio ? lastFolio.numFolio + 2 : 1000;
//       // Crear el nuevo folio
//       return await prisma.folio.create({
//         data: {
//           numFolio: newFolioNumber,
//           Extras: {
//             create: {
//               vioVideos: false,
//             },
//           },
//         },
//       });
//     });
//     return transaction;
//   };

const markVideosAsWatched = async (idFolio) => {
    await prisma.extras.update({
        where: { idFolio: idFolio },
        data: { vioVideos: true }
    });
};

const confirmVideosWatched = async (numFolio) => {
    return await prisma.extras.findUnique({
        where: {
            folio: {
                numFolio: numFolio
            }
        },
        include: {
            folio: true,
        }
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
    confirmVideosWatched,
}