const express = require('express');
const cors = require('cors');

const videoRoutes = require('./routes/videoRoutes');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());

//Middleware to parse JSON
app.use(express.json());

// Permitir acceso a archivos estáticos en la carpeta "uploads"
app.use("/uploads", express.static("uploads"));

// Usar las rutas de subida de videos
app.use("/api", videoRoutes);

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
});