import pool from "../db/db.js";

export const obtenerFavoritos = async (req, res) => {
  const userId = req.usuario.id;

  try {
    const result = await pool.query(
      `SELECT a.id_anime, a.titulo, a.url_imagen
       FROM favoritos f
       JOIN animes a ON f.id_anime = a.id_anime
       WHERE f.id_usuario = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ error: "Error al obtener favoritos" });
  }
};


export const añadirFavorito = async (req, res) => {
  const userId = req.usuario.id;
  const { id_api, titulo, url_imagen } = req.body;

  try {
    // Insertar anime si no existe
    await pool.query(
      `INSERT INTO animes (id_api, titulo, url_imagen)
       VALUES ($1, $2, $3)
       ON CONFLICT (id_api) DO NOTHING`,
      [id_api, titulo, url_imagen]
    );

    // Obtener el id_anime (clave interna)
    const result = await pool.query(
      `SELECT id_anime FROM animes WHERE id_api = $1`,
      [id_api]
    );

    if (result.rows.length === 0) {
      return res.status(500).json({ error: "No se pudo obtener el id_anime" });
    }

    const id_anime = result.rows[0].id_anime;

    // Insertar en favoritos
    await pool.query(
      `INSERT INTO favoritos (id_usuario, id_anime)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [userId, id_anime]
    );

    res.json({ mensaje: "Añadido a favoritos" });
  } catch (error) {
    console.error("Error al añadir a favoritos:", error);
    res.status(500).json({ error: "Error al añadir a favoritos" });
  }
};


export const eliminarFavorito = async (req, res) => {
  const userId = req.usuario.id;
  const { id_anime } = req.params;

  try {
    await pool.query(
      `DELETE FROM favoritos WHERE id_usuario = $1 AND id_anime = $2`,
      [userId, id_anime]
    );
    res.json({ mensaje: "Eliminado de favoritos" });
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    res.status(500).json({ error: "Error al eliminar de favoritos" });
  }
};

