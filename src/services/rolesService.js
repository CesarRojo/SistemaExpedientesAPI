const prisma = require('../prisma/prismaClient');

//Get all roles
const getAllRoles = async () => {
    const roles = await prisma.roles.findMany();
    return roles;
}

//Get role by id
const getRoleById = async (id) => {
    return await prisma.roles.findUnique({ where: { idRol: id } });
}

//Get role by empleado username
const getRoleEmpleado = async (username) => {
    return await prisma.empleadoRol.findMany({ where: { empleado: { noReloj: username }}, include: { rol: true } });
}

//Create role
const createRole = async (data) => {
    return await prisma.roles.create({ data });
}

//Update role
const updateRole = async (id, data) => {
    return await prisma.roles.update({ where: { idRol: id}, data});
}

//Delete role
const deleteRole = async (id) => {
    return await prisma.roles.delete({ where: { idRol: id } });
}

module.exports = {
    getAllRoles,
    getRoleById,
    getRoleEmpleado,
    createRole,
    updateRole,
    deleteRole,
}