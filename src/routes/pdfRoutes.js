const express = require("express");
const upload = require("../services/pdfService");
const { uploadDocument, getDocumentsByUser, updateDocuments } = require("../controllers/pdfController");

const router = express.Router();

router.get("/documents/:id", getDocumentsByUser);

router.post("/upload-docs", upload.fields([
    { name: 'ine', maxCount: 1 },
    { name: 'fiscal', maxCount: 1 },
    { name: 'nss', maxCount: 1 },
    { name: 'domicilio', maxCount: 1 },
    { name: 'nacimiento', maxCount: 1 },
    { name: 'curp', maxCount: 1 },
    { name: 'estudios', maxCount: 1 } // Opcional
  ]), uploadDocument);

router.put("/update-docs/:id", upload.fields([
    { name: 'ine', maxCount: 1 },
    { name: 'fiscal', maxCount: 1 },
    { name: 'nss', maxCount: 1 },
    { name: 'domicilio', maxCount: 1 },
    { name: 'nacimiento', maxCount: 1 },
    { name: 'curp', maxCount: 1 },
    { name: 'estudios', maxCount: 1 } // Opcional
]), updateDocuments);

module.exports = router;