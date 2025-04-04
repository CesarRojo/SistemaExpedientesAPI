const prisma = require('../prisma/prismaClient');

const createConsent = async (data) => {
    return await prisma.consentimiento.create({ data });
}

module.exports = {
    createConsent,
}