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
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    let filePath = path.join(UPLOADS_FOLDER, originalName);
    let counter = 1;

    // Verificar si el archivo ya existe y agregar un sufijo numérico incremental
    while (fs.existsSync(filePath)) {
      filePath = path.join(UPLOADS_FOLDER, `${baseName}-${counter}${extension}`);
      counter++;
    }

    cb(null, path.basename(filePath)); // Usar el nombre del archivo con el sufijo numérico si es necesario
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
