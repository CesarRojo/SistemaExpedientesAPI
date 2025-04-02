const prisma = require("../prisma/prismaClient");
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const UPLOADS_FOLDER = path.join(__dirname, "../../uploads/documents");

// Función para combinar los PDFs en un solo archivo
const mergePDFs = async (files, destination) => {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
        const pdfBytes = fs.readFileSync(file.path);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(destination, mergedPdfBytes);
};

// 📌 Subir documentos y generar PDF combinado
const uploadDocument = async (req, res) => {
    try {
        const files = req.files;

        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({ message: "No se subió ningún archivo" });
        }

        // Renombrar archivos usando numFolio
        Object.entries(files).forEach(([field, fileArray]) => {
            const file = fileArray[0];
            const newFilename = `${field}-${req.body.numFolio}.pdf`;
            const newPath = path.join(file.destination, newFilename);

            fs.renameSync(file.path, newPath); // Renombrar archivo
            file.filename = newFilename;
            file.path = newPath;
        });

        // Guardar la información en la base de datos
        const documentPromises = Object.entries(files).map(async ([field, fileArray]) => {
            const file = fileArray[0];
            return await prisma.documento.create({
                data: {
                    filename: file.filename,
                    path: `/uploads/documents/${file.filename}`,
                    idUsuario: parseInt(req.body.idUsuario)
                }
            });
        });

        const newDocuments = await Promise.all(documentPromises);

        // 📌 Generar PDF combinado
        const uploadedFiles = Object.values(files).map(fileArray => fileArray[0]);
        const mergedPdfPath = path.join(UPLOADS_FOLDER, `merged-${req.body.numFolio}.pdf`);

        await mergePDFs(uploadedFiles, mergedPdfPath);

        // Guardar el PDF combinado en la base de datos
        const mergedDocument = await prisma.documento.create({
            data: {
                filename: `merged-${req.body.numFolio}.pdf`,
                path: `/uploads/documents/merged-${req.body.numFolio}.pdf`,
                idUsuario: parseInt(req.body.idUsuario)
            }
        });

        res.status(201).json({
            message: "Documentos subidos y combinados con éxito",
            documents: [...newDocuments, mergedDocument]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📌 Actualizar documentos y regenerar PDF combinado
const updateDocuments = async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.idUsuario);
        const files = req.files;

        if (!files || Object.keys(files).length === 0) {
            return res.status(400).json({ message: "No se subió ningún archivo" });
        }

        // Renombrar archivos usando numFolio
        Object.entries(files).forEach(([field, fileArray]) => {
            const file = fileArray[0];
            const newFilename = `${field}-${req.body.numFolio}.pdf`;
            const newPath = path.join(file.destination, newFilename);

            fs.renameSync(file.path, newPath);
            file.filename = newFilename;
            file.path = newPath;
        });

        // Actualizar información en la base de datos
        const updatePromises = Object.entries(files).map(async ([field, fileArray]) => {
            const file = fileArray[0];
            return await prisma.documento.upsert({
                where: {
                    idUsuario_filename: {
                        idUsuario: idUsuario,
                        filename: file.filename
                    }
                },
                update: {
                    path: `/uploads/documents/${file.filename}`,
                },
                create: {
                    filename: file.filename,
                    path: `/uploads/documents/${file.filename}`,
                    idUsuario: idUsuario
                }
            });
        });

        const updatedDocuments = await Promise.all(updatePromises);

        // 📌 Regenerar PDF combinado
        const uploadedFiles = Object.values(files).map(fileArray => fileArray[0]);
        const mergedPdfPath = path.join(UPLOADS_FOLDER, `merged-${req.body.numFolio}.pdf`);

        await mergePDFs(uploadedFiles, mergedPdfPath);

        // Guardar o actualizar el PDF combinado en la base de datos
        const mergedDocument = await prisma.documento.upsert({
            where: {
                idUsuario_filename: {
                    idUsuario: idUsuario,
                    filename: `merged-${req.body.numFolio}.pdf`
                }
            },
            update: {
                path: `/uploads/documents/merged-${req.body.numFolio}.pdf`,
            },
            create: {
                filename: `merged-${req.body.numFolio}.pdf`,
                path: `/uploads/documents/merged-${req.body.numFolio}.pdf`,
                idUsuario: idUsuario
            }
        });

        res.status(200).json({
            message: "Documentos actualizados y PDF combinado generado con éxito",
            documents: [...updatedDocuments, mergedDocument]
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📌 Obtener documentos de un usuario
const getDocumentsByUser = async (req, res) => {
    try {
        const idUsuario = parseInt(req.params.id);

        const documents = await prisma.documento.findMany({
            where: { idUsuario: idUsuario }
        });

        if (!documents || documents.length === 0) {
            return res.status(404).json({ message: "No se encontraron documentos para este usuario" });
        }

        res.status(200).json({ documents });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadDocument, getDocumentsByUser, updateDocuments };
