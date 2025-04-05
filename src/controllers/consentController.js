const consentService = require('../services/consentService');

const createConsent = async (req, res) => {
    try {
        if (req.body.fecha) {
            req.body.fecha = new Date(req.body.fecha);
        }
        const consent = await consentService.createConsent(req.body);
        res.status(201).json(consent);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create consent>>' });
    }
}

module.exports = {
    createConsent,
}