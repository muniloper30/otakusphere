import pool from "../db/db.js"; 



export const agregarAnimeALista = async (req, res) => {
  const { id_api, titulo, url_imagen, puntuacion_api, nombre_lista } = req.body;
  const id_usuario = req.usuario.id;

  if (!id_api || !titulo || !nombre_lista) {
    return res.status(400).json({ error: "Faltan datos requeridos." });
  }

  try {
    // 1. Insertar anime si no existe
    const animeResult = await pool.query(
      `INSERT INTO animes (id_api, titulo, url_imagen, puntuacion_api)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id_api) DO NOTHING
       RETURNING id_anime`,
      [id_api, titulo, url_imagen, puntuacion_api]
    );

    // Recuperar el id_anime
    let id_anime;
    if (animeResult.rows.length > 0) {
      id_anime = animeResult.rows[0].id_anime;
    } else {
      const existing = await pool.query(
        "SELECT id_anime FROM animes WHERE id_api = $1",
        [id_api]
      );
      id_anime = existing.rows[0].id_anime;
    }

    // 2. Buscar o crear lista del usuario
    const listaResult = await pool.query(
      `SELECT id_lista FROM listas WHERE id_usuario = $1 AND nombre_lista = $2`,
      [id_usuario, nombre_lista]
    );

    let id_lista;
    if (listaResult.rows.length > 0) {
      id_lista = listaResult.rows[0].id_lista;
    } else {
      const nuevaLista = await pool.query(
        `INSERT INTO listas (id_usuario, nombre_lista)
         VALUES ($1, $2)
         RETURNING id_lista`,
        [id_usuario, nombre_lista]
      );
      id_lista = nuevaLista.rows[0].id_lista;
    }

    // 3. Insertar en lista_animes (si no está ya)
    await pool.query(
      `INSERT INTO lista_animes (id_lista, id_anime)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [id_lista, id_anime]
    );

    res.status(200).json({ mensaje: "Anime añadido a la lista con éxito." });
  } catch (err) {
    console.error("Error al añadir anime a lista:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener animes de una lista específica
// Esta función obtiene todos los animes de una lista específica del usuario
export const obtenerAnimesDeLista = async (req, res) => {
    const { nombre_lista } = req.params;
    const id_usuario = req.usuario.id;
  
    try {
      const result = await pool.query(
        `SELECT a.id_api, a.titulo, a.url_imagen
         FROM listas l
         JOIN lista_animes la ON l.id_lista = la.id_lista
         JOIN animes a ON la.id_anime = a.id_anime
         WHERE l.id_usuario = $1 AND l.nombre_lista = $2`,
        [id_usuario, nombre_lista]
      );
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error al obtener animes de lista:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  
// Eliminar un anime de una lista específica
// Esta función elimina un anime de una lista específica del usuario
export const eliminarAnimeDeLista = async (req, res) => {
    const { nombre_lista, id_api } = req.params;
    const id_usuario = req.usuario.id;
  
    try {
      // 1. Obtener id_anime
      const animeRes = await pool.query(
        "SELECT id_anime FROM animes WHERE id_api = $1",
        [id_api]
      );
      if (animeRes.rows.length === 0) {
        return res.status(404).json({ error: "Anime no encontrado." });
      }
      const id_anime = animeRes.rows[0].id_anime;
  
      // 2. Obtener id_lista del usuario para esa lista
      const listaRes = await pool.query(
        "SELECT id_lista FROM listas WHERE id_usuario = $1 AND nombre_lista = $2",
        [id_usuario, nombre_lista]
      );
      if (listaRes.rows.length === 0) {
        return res.status(404).json({ error: "Lista no encontrada." });
      }
      const id_lista = listaRes.rows[0].id_lista;
  
      // 3. Eliminar relación
      await pool.query(
        "DELETE FROM lista_animes WHERE id_lista = $1 AND id_anime = $2",
        [id_lista, id_anime]
      );
  
      res.status(200).json({ mensaje: "Anime eliminado correctamente de la lista." });
    } catch (err) {
      console.error("Error al eliminar anime:", err);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  };
  