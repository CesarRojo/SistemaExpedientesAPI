const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const videoRoutes = require('./routes/videoRoutes');
const folioRoutes = require('./routes/folioRoutes');

const app = express();
const server = http.createServer(app);

// Configurar Socket.IO con CORS
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Cambia esto al origen de tu cliente
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true // Permitir cookies y credenciales
  }
});

const PORT = process.env.PORT || 5005;

// Configurar CORS para las solicitudes HTTP
const corsOptions = {
  origin: 'http://localhost:5173', // Cambiar esto al origen del cliente
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true // Permitir cookies y credenciales
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//============RUTAS============
app.use("/api", videoRoutes(io));
app.use("/folio", folioRoutes);

// Manejar conexiones de WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});