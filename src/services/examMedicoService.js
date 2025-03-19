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

// Create examMedico
const createExamMedico = async (data) => {
    const { examMedicoData, antecFam, selecAntecPatolog } = data;

    console.log("datos examMedico:",data);
    // console.log("datos examMedico:",examMedicoData);
    // console.log("datos antecFam:",antecFam);
    // console.log("datos selectAntecPatolog:",selecAntecPatolog);

    if (!examMedicoData || !antecFam) {
        throw new Error('Datos incompletos para crear Examen Médico');
    }

    try {
        const examenMedico = await prisma.examenMedico.create({
            data: {
                ...examMedicoData,
                // Inserción anidada para antecedentes familiares
                antecFam: {
                    create: antecFam.map(fam => ({
                        parentesco: fam.parentesco,
                        edad: fam.edad,
                        enfermedad: fam.enfermedad,
                        causaMuerte: fam.causaMuerte,
                    })),
                },
                // Inserción anidada para selección de antecedentes patológicos
                selecAntecPatolog: {
                    create: selecAntecPatolog.map(idAntecPatolog => ({
                        antecPatolog: {
                            connect: { idAntecPatolog: idAntecPatolog }
                        }
                    })),
                },
            },
            include: {
                antecFam: true,
                selecAntecPatolog: {
                    include: {
                        antecPatolog: true,
                    }
                }
            }
        });

        return examenMedico;
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