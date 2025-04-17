const colaboraService = require('../services/colaboraService');

//Get single colabora
const getColaboraById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const colabora = await colaboraService.getColaboraById(id);
        if(colabora){
            res.json(colabora);
        }else{
            res.status(404).json({ error: '<<Failed to fetch colabora by id>>' })
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch colabora by id>>' });
    }
}

// Get colabora by PRETTYNAME
const getColaboraByPrettyName = async (req, res) => {
    try {
        const prettyName = req.query.name;
        const colaboradores = await colaboraService.getColaboraByPrettyName(prettyName);
        if (colaboradores.length > 0) {
            res.json(colaboradores);
        } else {
            res.status(404).json({ error: '<<No colaboradores found with that name>>' });
        }
    } catch (error) {
        console.error('<<Error fetching colabora by pretty name>>', error); // Log del error
        res.status(500).json({ error: '<<Failed to fetch colabora by pretty name>>', details: error.message });
    }
}

module.exports = {
    getColaboraById,
    getColaboraByPrettyName,
}