const prisma = require('../prisma/prismaClient');

//Get all roles
const getAllRoles = async () => {
    return await prisma.roles.findMany();
}

//Get role by id
const getRoleById = async (id) => {
    return await prisma.roles.findUnique({ where: { idRol: id } });
}

//Create role
const createRole = async (data) => {
    return await prisma.roles.create({ data});
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
    createRole,
    updateRole,
    deleteRole,
}