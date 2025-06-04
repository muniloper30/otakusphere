import express from "express";
import {
  crearReseña,
  obtenerReseñasPorAnime,
  obtenerReseñaPorUsuario,
  obtenerReseñasDelUsuario,
  eliminarReseña
} from "../controllers/reviews.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// rutas más específicas
router.post("/", verifyToken, crearReseña);
router.get("/mis-reviews", verifyToken, obtenerReseñasDelUsuario);
router.get("/usuario/:id_anime", verifyToken, obtenerReseñaPorUsuario);
router.delete('/:id', verifyToken, eliminarReseña);


 // 

//  Esta debe ser la última, porque captura cualquier número
router.get("/:id_anime", obtenerReseñasPorAnime);

export default router;
