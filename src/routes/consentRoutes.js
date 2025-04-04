const express = require('express');
const consentController = require('../controllers/consentController');

const router = express.Router();

//Routes
router.post('/', consentController.createConsent);

module.exports = router;