const fs = require("fs");  // Importar el módulo 'fs'
const path = require("path");  // Importar el módulo 'path'
const prisma = require("../prisma/prismaClient");

// Obtener la lista de videos
const getVideos = async (req, res) => {
    try {
      const videos = await prisma.video.findMany();
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los videos", error });
    }
};

// Función para manejar la subida de video
const uploadVideo = (io) => async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }

    // Guardar la información en la base de datos
    const newVideo = await prisma.video.create({
      data: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
      }
    });

    // Emitir evento de subida de video
    io.emit('videoUploaded', { message: "Video subido con éxito", video: newVideo });

    res.status(201).json({ message: "Video subido con éxito", video: newVideo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un video
const deleteVideo = (io) => async (req, res) => {
    const { id } = req.params;
  
    try {
      // Buscar el video en la base de datos
      const video = await prisma.video.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!video) {
        return res.status(404).json({ message: "Video no encontrado" });
      }
  
      // Eliminar el archivo del sistema de archivos
      const videoPath = path.join(__dirname, "../../uploads", video.filename);
      fs.unlinkSync(videoPath); // Eliminar el archivo físico
  
      // Eliminar el video de la base de datos
      await prisma.video.delete({
        where: { id: parseInt(id) },
      });

      // Emitir evento de eliminación de video
      io.emit('videoDeleted', { message: "Video eliminado con éxito", videoId: id });
  
      res.status(200).json({ message: "Video eliminado con éxito" });
    } catch (error) {
      console.error("Error al eliminar el video:", error);
      res.status(500).json({ message: "Error al eliminar el video" });
    }
};

module.exports = { uploadVideo, getVideos, deleteVideo };