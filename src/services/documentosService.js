const prisma = require("../prisma/prismaClient");

//Get all documentos
const getAllDocumentos = async () => {
    return await prisma.documento.findMany();
}

const getDocumentosPorUsuarios = async (idUsuarios) => {
    console.log("usuarios service", idUsuarios);

    // Convertir los valores de idUsuarios a números
    const idUsuariosNumericos = idUsuarios.map(id => parseInt(id));

    const res = await prisma.documento.findMany({
        where: {
            idUsuario: {
                in: idUsuariosNumericos // Filtrar por múltiples idUsuario
            }
        }
    });
    console.log("res", res);
    return res;
};

module.exports = {
    getAllDocumentos,
    getDocumentosPorUsuarios,
}