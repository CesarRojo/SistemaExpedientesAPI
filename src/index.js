const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const folioRoutes = require('./routes/folioRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const entrevIniRoutes = require('./routes/entrevIniRoutes');
const examMedicoRoutes = require('./routes/examMedicoRoutes');
const antecPatologRoutes = require('./routes/antecPatologRoutes');
const expFisicaRoutes = require('./routes/expFisicaRoutes');
const solicIntRoutes = require('./routes/solicIntRoutes');

const app = express();
const server = http.createServer(app);

// Configurar Socket.IO con CORS
const io = socketIo(server, {
  cors: {
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true // Permitir cookies y credenciales
  }
});

const PORT = process.env.PORT || 5005;

// Configurar CORS para las solicitudes HTTP
const corsOptions = {
  origin: '*', // Permitir cualquier origen
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true // Permitir cookies y credenciales
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//============RUTAS============
app.use("/api", videoRoutes(io));
app.use("/folio", folioRoutes);
app.use("/roles", rolesRoutes);
app.use("/empleado", empleadoRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/entrevIni", entrevIniRoutes);
app.use("/examMedico", examMedicoRoutes);
app.use("/antecPatolog", antecPatologRoutes);
app.use("/expFisica", expFisicaRoutes);
app.use("/solicInt", solicIntRoutes);
app.use("/auth", authRoutes);

// Manejar conexiones de WebSocket
io.on('connection', (socket) => {
  const clientIp = socket.handshake.address;
  console.log(`Nuevo cliente conectado desde IP: ${clientIp}`);

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado desde IP: ${clientIp}`);
  });
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});