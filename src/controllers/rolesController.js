const rolesService = require('../services/rolesService');

//Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await rolesService.getAllRoles();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch roles>>'})
    }
}

//Get role by id
const getRoleById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const role = await rolesService.getRoleById(id);
        if (role){
            res.json(role);
        }else{
            res.status(404).json({ error: '<<Role not found>>'});
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch role by id>>'});
    }
}

//Create role
const createRole = async (req, res) => {
    try {
        const role = rolesService.createRole(req.body);
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create role>>'});
    }
}

//Update role
const updateRole = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const role = rolesService.updateRole(id, req.body);
        res.json(role);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update role>>'});
    }
}

//Delete role
const deleteRole = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const deletedRole = await rolesService.deleteRole(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete role>>' });
    }
}

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
}
