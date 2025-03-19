const prisma = require('../prisma/prismaClient');

//Get all antecPatologs
const getAllAntecPatologs = async () => {
    return await prisma.antecPatolog.findMany();
}

module.exports = {
    getAllAntecPatologs,
}