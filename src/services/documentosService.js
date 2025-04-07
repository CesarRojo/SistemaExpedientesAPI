const prisma = require("../prisma/prismaClient");

//Get all documentos
const getAllDocumentos = async () => {
    return await prisma.documento.findMany();
}

const getDocumentosPorUsuarios = async (idUsuarios) => {
    // Convertir los valores de idUsuarios a números
    const idUsuariosNumericos = idUsuarios.map(id => parseInt(id));

    return await prisma.documento.findMany({
        where: {
            idUsuario: {
                in: idUsuariosNumericos // Filtrar por múltiples idUsuario
            }
        }
    });
};

module.exports = {
    getAllDocumentos,
    getDocumentosPorUsuarios,
}