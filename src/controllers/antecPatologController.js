const antecPatologService = require('../services/antecPatologService');

const getAllAntecPatologs = async (req, res) => {
    try {
        const antecPatologs = await antecPatologService.getAllAntecPatologs();
        res.json(antecPatologs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllAntecPatologs,
}