const prisma = require("../prisma/prismaClient");

//Get all documentos
const getAllDocumentos = async () => {
    return await prisma.documento.findMany();
}

const getDocumentosPorUsuarios = async (idUsuarios) => {
    return await prisma.documento.findMany({
        where: {
            idUsuario: {
                in: idUsuarios // Filtrar por múltiples idUsuario
            }
        }
    });
};

module.exports = {
    getAllDocumentos,
    getDocumentosPorUsuarios,
}