import express from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUser,
  deleteUser,
  loginUsuario,
} from "../controllers/users.controller.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Rutas públicas
router.post("/login", loginUsuario); // Iniciar sesión
router.post("/", createUsuario); // Crear nuevo usuario

// Rutas protegidas
router.get("/perfil", verifyToken, (req, res) => {
  res.json({
    mensaje: "Acceso permitido, usuario registrado y verificado",
    usuario: req.usuario,
  });
});

// Gestión de usuarios
router.get("/", getUsuarios); // Obtener todos los usuarios
router.put("/:id", updateUser); // Actualizar usuario
router.delete("/:id", deleteUser); // Eliminar usuario

// Rutas para obtener usuario por ID
router.get("/:id", getUsuarioById); // Obtener usuario por ID

export default router;
