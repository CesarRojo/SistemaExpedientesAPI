const express = require("express");
const upload = require("../services/videoService");
const { uploadVideo, getVideos, deleteVideo } = require("../controllers/videoController");

const router = express.Router();

module.exports = (io) => {
    // Aquí pasamos `io` a las rutas
    router.post("/upload", upload.single("video"), (req, res) => uploadVideo(io)(req, res));
    router.delete("/videos/:id", (req, res) => deleteVideo(io)(req, res));
    router.get("/videos", getVideos);
    return router;
};