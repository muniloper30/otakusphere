import express from "express";
import { agregarAnimeALista, obtenerAnimesDeLista, eliminarAnimeDeLista, moverAnimeDeLista } from "../controllers/lists.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, agregarAnimeALista);
router.get("/:nombre_lista", verifyToken, obtenerAnimesDeLista);
router.post("/mover", verifyToken, moverAnimeDeLista);
router.delete("/:nombre_lista/:id_api", verifyToken, eliminarAnimeDeLista);


export default router;
