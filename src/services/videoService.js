const multer = require("multer");
const fs = require("fs");
const path = require("path");

const UPLOADS_FOLDER = path.join(__dirname, "../../uploads");

// Verificar si la carpeta "uploads" existe, si no, crearla
if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán los videos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar archivo
  }
});

// Filtro para aceptar solo videos
const fileFilter = (req, file, cb) => {
  const filetypes = /mp4|webm|ogg/;
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error("❌ Solo se permiten archivos de video (MP4, WEBM, OGG)"));
  }
};

// Configuración de multer con límites de tamaño (100MB)
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, 
  fileFilter
});

module.exports = upload;
