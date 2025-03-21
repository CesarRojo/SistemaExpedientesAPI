const prisma = require('../prisma/prismaClient');

//Get all entrevIni
const getAllEntrevIni = async () => {
    return await prisma.entrevistaInicial.findMany({ 
        include: { 
            usuario: {
                include: {
                    folio: true,
                }
            } 
        }
    });
}

//Get entrevIni by id
const getEntrevIniById = async (id) => {
    return await prisma.entrevistaInicial.findUnique({
        where: { idEntrevIni: id },
        include: {
            usuario: {
                include: {
                    folio: true,
                }
            }
        }
    });
}

//Create entrevIni
const createEntrevIni = async (data, io) => {
    const { usuario, numFolio, entrevIniData } = data;

    if (!usuario || !numFolio || !entrevIniData) {
        throw new Error('Datos incompletos para crear EntrevIni');
    }

    //Las inserciones anidadas en prisma comienzan primero por el objeto más anidado
    //En este caso, primero se crea el folio, luego se crea el usuario y finalmente la entrevista inicial
    //connectOrCreate se usa para saber si el folio ya existe o se necesita crear uno nuevo.
    //connectOrCreate NO hace la relacion con usuario, la relacion se hace al momento del create de usuario.
    try {
        const newEntrevIni = await prisma.entrevistaInicial.create({
            data: {
                ...entrevIniData,
                usuario: {
                    create: {
                        ...usuario,
                        folio: {
                            connectOrCreate: {
                                where: { numFolio },
                                create: { numFolio }
                            }
                        }
                    }
                }
            }
        });

        // Emitir un evento después de crear la entrevista inicial
        io.emit('newEntrevIni', newEntrevIni);

        return newEntrevIni;

    } catch (error) {
        console.error('Error creating EntrevIni:', error);
        throw error; // Re-lanzar el error para que sea manejado en el controlador
    }
}

//Update entrevIni
const updateEntrevIni = async (id, data) => {
    return await prisma.entrevistaInicial.update({
        where: { idEntrevIni: id },
        data
    });
}

//Delete entrevIni
const deleteEntrevIni = async (id) => {
    return await prisma.entrevistaInicial.delete({
        where: { idEntrevIni: id }
    });
}

module.exports = {
    getAllEntrevIni,
    getEntrevIniById,
    createEntrevIni,
    updateEntrevIni,
    deleteEntrevIni
}