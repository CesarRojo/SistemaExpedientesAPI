const express = require('express');
const antecPatologController = require('../controllers/antecPatologController');

const router = express.Router();

//Routes
router.get('/', antecPatologController.getAllAntecPatologs);

module.exports = router;