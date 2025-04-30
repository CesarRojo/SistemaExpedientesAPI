const prisma = require('../prisma/prismaClient');
const argon2 = require('argon2');

const loginService = async (username, password) => {
  try {
    const user = await prisma.empleado.findUnique({
      where: { noReloj: username },
      select: { // Cambia de include a select
        password: true,
        noReloj: true,
        folio: {
          select: { // Solo selecciona los campos que deseas de Folio
            numFolio: true,
            Usuario: {
              select: {
                idUsuario: true,
                nombre: true,
                apellidoPat: true,
              }
            },
          }
        },
        roles: { // Selecciona solo el nivel de rol
          select: {
            rol: {
              select: {
                level: true,
              }
            }
          }
        }
      }
    });

    if (!user) {
      console.log("Usuario no encontrado");
      return null;
    }

    console.log("Usuario encontrado:", user);
    console.log("Contraseña almacenada:", user.password);
    console.log("Contraseña proporcionada:", password);

    const isPasswordValid = await argon2.verify(user.password, password);
    console.log("¿Contraseña válida?", isPasswordValid);

    if (isPasswordValid) {
      console.log("Retornando usuario");
      return user;
    } else {
      console.log("Contraseña incorrecta");
      return null;
    }
  } catch (error) {
    console.error("Error en loginService:", error);
    return null;
  }
};

const loginFolioService = async (folio) => {
  try {
    const user = await prisma.folio.findUnique({
      where: { numFolio: folio },
      include: {
        Usuario: {
          select: {
            idUsuario: true,
            nombre: true,
            apellidoPat: true,
            apellidoMat: true,
          }
        },
        Extras: {
          select: {
            vioVideos: true,
          }
        }
      }
    });

    if (!user) {
      console.log("Usuario no encontrado");
      return null;
    }

    console.log("Usuario encontrado:", user);
    return user;
  } catch (error) {
    console.error("Error en loginService:", error);
    return null;
  }
};

module.exports = { loginService, loginFolioService };