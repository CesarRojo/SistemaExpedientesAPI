const prisma = require('../prisma/prismaClient');
const argon2 = require('argon2');

//Get all empleados
const getAllEmpleados = async () => {
    return await prisma.empleado.findMany({
        include: {
            roles: true, // Incluir roles en la respuesta
        },
    });
}

//Get empleado by id
const getEmpleadoById = async (id) => {
    return await prisma.empleado.findUnique({
        where: { idEmpleado: id },
        include: {
            roles: true, // Incluir roles en la respuesta
        },
    });
}

// Create empleado
const createEmpleado = async (data) => {
    // Hashear la contraseña antes de guardar
    if (data.password) {
        data.password = await argon2.hash(data.password);
    }

    // Si se proporcionan roles, se deben incluir en la creación
    const { roles, ...empleadoData } = data;

    return await prisma.empleado.create({
        data: {
            ...empleadoData,
            roles: {
                create: roles.map(rolId => ({
                    idRol: rolId, // Asumiendo que roles es un array de idRol
                })),
            },
        },
    });
}

//Update empleado
const updateEmpleado = async (id, data) => {
    // Hashear la contraseña si se está actualizando
    if (data.password) {
        data.password = await argon2.hash(data.password);
    }

    // Actualizar empleado y sus roles
    const { roles, ...empleadoData } = data;

    // Primero, eliminar los roles existentes
    await prisma.empleadoRol.deleteMany({
        where: { idEmpleado: id },
    });

    // Luego, actualizar el empleado y agregar los nuevos roles
    return await prisma.empleado.update({
        where: { idEmpleado: id },
        data: {
            ...empleadoData,
            roles: {
                create: roles.map(rolId => ({
                    idRol: rolId, // Asumiendo que roles es un array de idRol
                })),
            },
        },
    });
}

//Delete empleado
const deleteEmpleado = async (id) => {
    // Primero, eliminar los roles asociados
    await prisma.empleadoRol.deleteMany({
        where: { idEmpleado: id },
    });

    // Luego, eliminar el empleado
    return await prisma.empleado.delete({ where: { idEmpleado: id } });
}

module.exports = {
    getAllEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
}