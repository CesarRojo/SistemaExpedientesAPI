const multer = require("multer");
const fs = require("fs");
const path = require("path");

const UPLOADS_FOLDER = path.join(__dirname, "../../uploads/documents");

// Verificar si la carpeta "uploads/documents" existe, si no, crearla
if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER); // Carpeta donde se guardarán los documentos
    },
    filename: (req, file, cb) => {
      // Usa un nombre genérico o basado en la fecha
      const timestamp = Date.now();
      cb(null, `${file.fieldname}-${timestamp}.pdf`);
    }
  });

// Filtro para aceptar solo PDFs
const fileFilter = (req, file, cb) => {
  const filetypes = /pdf/;
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    cb(null, true);
  } else {
    cb(new Error("❌ Solo se permiten archivos PDF"));
  }
};

// Configuración de multer con límites de tamaño (10MB)
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter
});

module.exports = upload;