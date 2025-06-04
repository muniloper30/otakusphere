import pool from "../db/db.js";

// Crear o actualizar una reseña
export const crearReseña = async (req, res) => {
  const { id_api, titulo, url_imagen, comentario, puntuacion } = req.body;
  const id_usuario = req.usuario.id;

  if (!id_api || !titulo || !url_imagen || !comentario || !puntuacion) {
    return res.status(400).json({ error: "Faltan datos requeridos." });
  }

  try {
    // 1. Insertar el anime si no existe
    await pool.query(
      `INSERT INTO animes (id_api, titulo, url_imagen)
       VALUES ($1, $2, $3)
       ON CONFLICT (id_api) DO NOTHING`,
      [id_api, titulo, url_imagen]
    );

    // 2. Obtener el id_anime (interno)
    const resultAnime = await pool.query(
      `SELECT id_anime FROM animes WHERE id_api = $1`,
      [id_api]
    );

    if (resultAnime.rows.length === 0) {
      return res.status(500).json({ error: "No se pudo obtener id_anime" });
    }

    const id_anime = resultAnime.rows[0].id_anime;

    // 3. Insertar o actualizar la reseña
    const result = await pool.query(
      `INSERT INTO reseñas (id_usuario, id_anime, comentario, puntuacion)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id_usuario, id_anime)
       DO UPDATE SET comentario = $3, puntuacion = $4, fecha = CURRENT_TIMESTAMP
       RETURNING *`,
      [id_usuario, id_anime, comentario, puntuacion]
    );

    res.status(200).json({
      mensaje: "Reseña guardada correctamente.",
      reseña: result.rows[0],
    });
  } catch (err) {
    console.error("Error al crear reseña:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener todas las reseñas de un anime
export const obtenerReseñasPorAnime = async (req, res) => {
  const { id_anime } = req.params;

  try {
    const result = await pool.query(
      `SELECT r.id_reseña, r.comentario, r.puntuacion, r.fecha, u.nombre 
       FROM reseñas r
       JOIN usuarios u ON r.id_usuario = u.id_usuario
       WHERE r.id_anime = $1
       ORDER BY r.fecha DESC`,
      [id_anime]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener reseñas:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener todas las reseñas hechas por el usuario autenticado
export const obtenerReseñasDelUsuario = async (req, res) => {
  const id_usuario = req.usuario.id;

  try {
    const result = await pool.query(
      `SELECT r.id_reseña, r.comentario, r.puntuacion, r.fecha, a.titulo, a.url_imagen
       FROM reseñas r
       JOIN animes a ON r.id_anime = a.id_anime
       WHERE r.id_usuario = $1
       ORDER BY r.fecha DESC`,
      [id_usuario]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error al obtener reseñas del usuario:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener una reseña concreta del usuario sobre un anime
export const obtenerReseñaPorUsuario = async (req, res) => {
  const { id_anime } = req.params;
  const id_usuario = req.usuario.id;

  try {
    const result = await pool.query(
      `SELECT r.id_reseña, r.comentario, r.puntuacion, r.fecha 
       FROM reseñas r
       WHERE r.id_anime = $1 AND r.id_usuario = $2`,
      [id_anime, id_usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada." });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error al obtener reseña:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


export const eliminarReseña = async (req, res) => {
  const id_usuario = req.usuario.id;
  const id_reseña = parseInt(req.params.id, 10); // usa 'id'


  if (isNaN(id_reseña)) {
    return res.status(400).json({ error: "ID inválido" });
  }
console.log("ID reseña:", id_reseña, "ID usuario:", id_usuario);

  try {
    const result = await pool.query(
      `DELETE FROM reseñas 
       WHERE id_reseña = $1 AND id_usuario = $2 
       RETURNING *`,
      [id_reseña, id_usuario]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Reseña no encontrada o no autorizada." });
    }

    res.status(200).json({ mensaje: "Reseña eliminada correctamente." });
  } catch (err) {
    console.error("Error al eliminar reseña:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};



