import { Router } from "express";
import { registrarAnime } from "../controllers/animes.controller.js";

const router = Router();

// Ruta para registrar un anime en la base de datos
router.post("/registrar", registrarAnime);

export default router;
