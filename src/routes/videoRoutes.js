const express = require("express");
const upload = require("../services/videoService");
const { uploadVideo, getVideos, deleteVideo } = require("../controllers/videoController");

const router = express.Router();

// Ruta para subir videos
router.post("/upload", upload.single("video"), uploadVideo);

// Ruta para obtener la lista de videos
router.get("/videos", getVideos);

// Ruta para eliminar un video
router.delete("/videos/:id", deleteVideo);

module.exports = router;
