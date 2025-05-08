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

//Get all entrevIni by fecha
const getAllEntrevIniByFecha = async (fechaFiltro) => {
    const startOfDay = new Date(fechaFiltro);
    const endOfDay = new Date(new Date(fechaFiltro).setDate(startOfDay.getDate() + 1));

    return await prisma.entrevistaInicial.findMany({
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
    const { entrevIniData } = data;

    if (!entrevIniData) {
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
                // usuario: {
                //     create: {
                //         ...usuario,
                //         folio: {
                //             connectOrCreate: {
                //                 where: { numFolio },
                //                 create: { numFolio }
                //             }
                //         }
                //     }
                // }
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
    const { entrevIniData } = data;
    // console.log("entrevIniData service", entrevIniData);

    return await prisma.entrevistaInicial.update({
        where: { idEntrevIni: id },
        data: {
            ...entrevIniData,
        }
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
    getAllEntrevIniByFecha,
    getEntrevIniById,
    createEntrevIni,
    updateEntrevIni,
    deleteEntrevIni
}