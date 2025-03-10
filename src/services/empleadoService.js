const prisma = require('../prisma/prismaClient');
const argon2 = require('argon2');

//Get all empleados
const getAllEmpleados = async () => {
    return await prisma.empleado.findMany();
}

//Get empleado by id
const getEmpleadoById = async (id) => {
    return await prisma.empleado.findUnique({ where: { idEmpleado: id } });
}

//Create empleado
const createEmpleado = async (data) => {
    // Hashear la contraseña antes de guardar
    if (data.password) {
        data.password = await argon2.hash(data.password);
    }
    console.log("datos service", data);
    return await prisma.empleado.create({ data });
}

//Update empleado
const updateEmpleado = async (id, data) => {
    // Hashear la contraseña si se está actualizando
    if (data.password) {
        data.password = await argon2.hash(data.password);
    }
    return await prisma.empleado.update({ where: { idEmpleado: id }, data });
}

//Delete empleado
const deleteEmpleado = async (id) => {
    return await prisma.empleado.delete({ where: { idEmpleado: id } });
}

module.exports = {
    getAllEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
}