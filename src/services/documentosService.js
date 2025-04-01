const prisma = require("../prisma/prismaClient");

//Get all documentos
const getAllDocumentos = async () => {
    return await prisma.documento.findMany();
}

module.exports = {
    getAllDocumentos,
}