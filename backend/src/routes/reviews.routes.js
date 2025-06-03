import express from "express";
import { crearReseña, obtenerReseñasPorAnime, obtenerReseñaPorUsuario } from "../controllers/reviews.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Crear o actualizar una reseña (requiere login)
router.post("/", verifyToken, crearReseña);

// Obtener todas las reseñas de un anime específico
router.get("/:id_anime", obtenerReseñasPorAnime);
// Obtener reseña de un usuario específico para un anime (requiere login)
router.get("/:id_anime/usuario", verifyToken, obtenerReseñaPorUsuario);

export default router;
