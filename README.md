# Sistema de Expedientes API

Este proyecto es una API para el proyecto Sistema Expedientes utilizando Express, Prisma y Socket.IO.

## Tecnologías Utilizadas

- Node.js (v14 o superior)
- npm (v6 o superior)
- Express
- Prisma
- Socket.IO
- SQL Server

### Requisitos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Base de datos SQL Server

### Instalación

1. Clona el repositorio:

   ```
   git clone https://github.com/CesarRojo/SistemaExpedientesAPI.git
   cd SistemaExpedientesAPI
   npm install
   ```

2. Configura las variables de entorno
    Crea un archivo .env en la raíz del proyecto y añade la URL de tu base de datos SQL Server:
    ```
    DATABASE_URL="sqlserver://HOST:PORT;database=DB_NAME;user=USER;password=PASS;trustServerCertificate=true"
    ```

3. Ejecuta las migraciones de la base de datos
    >npx prisma migrate deploy

4. Inicia el servidor en modo desarrollo
    >npm run dev

### Uso

- La API estará disponible en http://localhost:5005.
- Puedes acceder a los videos subidos en http://localhost:5005/uploads.
- Puedes acceder a los folios subidos en http://localhost:5005/folio.

### Endpoints

Videos
- POST /api/upload: Sube un video.
- GET /api/videos: Obtiene la lista de videos.
- DELETE /api/videos/:id: Elimina un video por ID.

Folios
- GET /folio: Obtiene todos los folios.
- GET /folio/:id: Obtiene un folio por número de folio.
- POST /folio: Crea un nuevo folio.
- DELETE /folio/:id: Elimina un folio por ID.
