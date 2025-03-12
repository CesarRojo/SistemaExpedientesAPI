const prisma = require('../prisma/prismaClient');
const argon2 = require('argon2');

const loginService = async (username, password) => {
  try {
    const user = await prisma.empleado.findUnique({
      where: { noReloj: username },
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