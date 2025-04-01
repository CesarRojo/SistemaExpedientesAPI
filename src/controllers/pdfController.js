const prisma = require("../prisma/prismaClient");
const fs = require("fs");
const path = require("path");

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
        file.filename = newFilename; // Actualizar el nombre del archivo en el objeto
        file.path = newPath; // Actualizar la ruta del archivo en el objeto
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

      res.status(201).json({ message: "Documentos subidos con éxito", documents: newDocuments });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

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

            fs.renameSync(file.path, newPath); // Renombrar archivo
            file.filename = newFilename; // Actualizar el nombre del archivo en el objeto
            file.path = newPath; // Actualizar la ruta del archivo en el objeto
        });

        // Actualizar la información en la base de datos
        const updatePromises = Object.entries(files).map(async ([field, fileArray]) => {
            const file = fileArray[0];
            return await prisma.documento.upsert({
                where: {
                    idUsuario_filename: {
                        idUsuario: idUsuario,
                        filename: file.filename // Asegúrate de que el filename sea único por usuario
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

        res.status(200).json({ message: "Documentos actualizados con éxito", documents: updatedDocuments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDocumentsByUser = async (req, res) => {
    try {

        const idUsuario = path.parseInt(req.params.idUsuario);

        // Obtener los documentos del usuario específico
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