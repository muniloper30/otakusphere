import pool from "../db/db.js";

export const registrarAnime = async (req, res) => {
  const { id_api, titulo, url_imagen } = req.body;

  // Validación básica
  if (!id_api || !titulo || !url_imagen) {
    return res.status(400).json({ error: "Faltan datos requeridos." });
  }

  try {
    // Insertar el anime si no existe
    await pool.query(
      `INSERT INTO animes (id_api, titulo, url_imagen)
       VALUES ($1, $2, $3)
       ON CONFLICT (id_api) DO NOTHING`,
      [id_api, titulo, url_imagen]
    );

    // Recuperar el id_anime interno
    const result = await pool.query(
      `SELECT id_anime FROM animes WHERE id_api = $1`,
      [id_api]
    );

    // Si no se encontró nada, error
    if (result.rows.length === 0) {
      return res.status(500).json({ error: "No se pudo recuperar el id_anime" });
    }

    res.status(200).json({ id_anime: result.rows[0].id_anime });
  } catch (error) {
    console.error("Error al registrar anime:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
