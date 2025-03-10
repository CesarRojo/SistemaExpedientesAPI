const empleadoService = require('../services/empleadoService');

//Get all empleados
const getAllEmpleados = async (req, res) => {
    try {
        const empleados = await empleadoService.getAllEmpleados();
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch empleados>>' });
    }
}

//Get empleado by id
const getEmpleadoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const empleado = await empleadoService.getEmpleadoById(id);
        if(empleado){
            res.json(empleado);
        }else{
            res.satus(404).json({ error: '<<Empleado not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch empleado by id>>' });
    }
}

//Create empleado
const createEmpleado = async (req, res) => {
    try {
        console.log(req.body);
        const empleado = await empleadoService.createEmpleado(req.body);
        res.status(201).json(empleado);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create empleado>>' });
    }
}

//Update empleado
const updateEmpleado = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const empleado = await empleadoService.updateEmpleado(id, req,body);
        res.json(empleado);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to update empleado>>' });
    }
}

//Delete empleado
const deleteEmpleado = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const empleado = await empleadoService.deleteEmpleado(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete empleado>>' });
    }
}

module.exports = {
    getAllEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado,
}
