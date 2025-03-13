const prisma = require('../prisma/prismaClient');

//Get all examMedico
const getAllExamMedico = async () => {
    return await prisma.examenMedico.findMany({ 
        include: { 
            usuario: true,
            selecAntecPatologicos: {
                include: {
                    antecedentesPatologicos: true,
                }
            }
        }
    });
}

//Get examMedico by id
const getExamMedicoById = async (id) => {
    return await prisma.examenMedico.findUnique({
        where: { idExamMedico: id },
        include: {
            usuario: true,
            selecAntecPatologicos: {
                include: {
                    antecedentesPatologicos: true,
                }
            }
        }
    });
}

//Create examMedico
const createExamMedico = async (data) => {
    const { examMedicoData } = data;

    console.log(data);

    if (!usuario || !examMedicoData) {
        throw new Error('Datos incompletos para crear ExamMedico');
    }

    try {
        return await prisma.examenMedico.create({
            data: {
                ...examMedicoData,
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

//Update examMedico
const updateExamMedico = async (id, data) => {
    const { examMedicoData } = data;

    if (!id || !examMedicoData) {
        throw new Error('Datos incompletos para actualizar ExamMedico');
    }

    try {
        return await prisma.examenMedico.update({
            where: { idExamMedico: id },
            data: {
                ...examMedicoData,
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}

//Delete examMedico
const deleteExamMedico = async (id) => {
    try {
        return await prisma.examenMedico.delete({
            where: { idExamMedico: id }
        });
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getAllExamMedico,
    getExamMedicoById,
    createExamMedico,
    updateExamMedico,
    deleteExamMedico
}