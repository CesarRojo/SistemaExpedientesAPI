# Sistema de Expedientes API

Este proyecto es una API para el proyecto Sistema Expedientes utilizando Express, Prisma y Socket.IO.

## Tecnologías Utilizadas

- Node.js (v14 o superior)
- npm (v6 o superior)
- Express
- Prisma
- Socket.IO
- SQL Server
- argon2

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
- GET /folio/last: Obtiene el ultimo folio insertado en la bd.
- GET /folio/:id: Obtiene un folio por número de folio.
- POST /folio: Crea un nuevo folio.
- DELETE /folio/:id: Elimina un folio por ID.

Roles
- GET /roles: Obtiene todos los roles.
- GET /roles/:id: Obtiene un rol por el ID.
- POST /roles: Crea un nuevo rol.
- PUT /roles/:id: Actualiza un rol usando el ID.
- DELETE /roles/:id: Elimina un rol por su ID.

Empleado
- GET /empleado: Obtiene todos los empleados.
- GET /empleado/:id: Obtiene un empleado por el ID.
- POST /empleado: Crea un nuevo empleado.
- PUT /empleado/:id: Actualiza un empleado usando el ID.
- DELETE /empleado/:id: Elimina un empleado por su ID.

Usuario
- GET /usuario: Obtiene todos los usuarios.
- GET /usuario/:id: Obtiene un usuario por el ID.
- POST /usuario: Crea un nuevo usuario.
- PUT /usuario/:id: Actualiza un usuario usando el ID.
- DELETE /usuario/:id: Elimina un usuario por su ID.

### JSON para POST

1. Empleado
    ```json
    {
        "noReloj": "147986", **Asegurarse que no se repita**
        "password": "pass",
        "puesto": "Desarrollador",
        "idFolio": 3,  **Asegurar que no se repita**
        "roles": [1,2] **Asegurarse de que sea un array**
    }
    ```

2. Folio
    ```json
    {
        "numFolio": 12345
    }
    ```

3. Roles
    ```json
    {
        "displayName": "NombreRol",
        "key": "key",
        "level": 4
    }
    ```