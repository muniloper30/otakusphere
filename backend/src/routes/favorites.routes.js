import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  obtenerFavoritos,
  añadirFavorito,
  eliminarFavorito,
} from "../controllers/favorites.controller.js";

const router = express.Router();

router.get("/", verifyToken, obtenerFavoritos);
router.post("/", verifyToken, añadirFavorito);
router.delete("/:id_anime", verifyToken, eliminarFavorito);

export default router;
