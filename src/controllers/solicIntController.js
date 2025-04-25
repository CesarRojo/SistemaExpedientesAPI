const solicIntService = require('../services/solicIntService');

//Get all solicInt
const getAllSolicInt = async (req, res) => {
    try {
        const solicInt = await solicIntService.getAllSolInt();
        res.json(solicInt);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicInt>>' });
    }
}

//Get solicInt by id
const getSolicIntById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const solicInt = await solicIntService.getSolIntById(id);
        if(solicInt){
            res.json(solicInt);
        }else{
            res.satus(404).json({ error: '<<SolicInt not found>>' });
        }
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solicInt by id>>' });
    }
}

//Get all entrevIni by fecha
const getAllSolIntByFecha = async (req, res) => {
    try {
        const fechaFiltro = req.query.fecha; // Obtener el filtro de fecha de los parámetros de consulta
        const solInt = await solicIntService.getAllSolIntByFecha(fechaFiltro);
        res.json(solInt);
    } catch (error) {
        res.status(500).json({ error: '<<Failed to fetch solInt by fecha>>' });
    }
};

//Create solicInt
const createSolicInt = async (req, res) => {
    try {
        // Convertir la fecha de string a Date
        if (req.body.fecha) {
            req.body.fecha = new Date(req.body.fecha);
            req.body.usuario.fechaNac = new Date(req.body.usuario.fechaNac);
            req.body.usuario.createdAt = new Date(req.body.usuario.createdAt);
        }

        // Convertir la fechaNac de cada objeto en datosFam a Date
        if (req.body.datosFam) {
            req.body.datosFam = req.body.datosFam.map(dato => {
                if (dato.fechaNac) {
                    dato.fechaNac = new Date(dato.fechaNac);
                }
                return dato;
            });
        }

        const solicInt = await solicIntService.createSolInt(req.body);
        res.status(201).json(solicInt);
    } catch (error) {
        res.status(400).json({ error: '<<Failed to create solicInt>>' });
    }
}

//Delete solicInt
const deleteSolicInt = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const solicInt = await solicIntService.deleteSolInt(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: '<<Failed to delete solicInt>>' });
    }
}

module.exports = {
    getAllSolicInt,
    getSolicIntById,
    getAllSolIntByFecha,
    createSolicInt,
    deleteSolicInt,
}