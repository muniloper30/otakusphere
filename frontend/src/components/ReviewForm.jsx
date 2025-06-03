import { useEffect, useState } from "react";
import { notifyError, notifyInfo } from "../utils/ToastUtils";

const ReviewForm = ({ anime, idAnime, onSubmit }) => {
  const [comentario, setComentario] = useState("");
  const [puntuacion, setPuntuacion] = useState(10);
  const [yaExiste, setYaExiste] = useState(false);
  const [token, setToken] = useState(null);

  // Obtener token al montar
  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  // Cargar reseña del usuario si existe
  useEffect(() => {
    if (!token || !idAnime) return;

    const cargarReseña = async () => {
      try {
        const res = await fetch(`http://localhost:8080/reviews/${idAnime}/usuario`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setComentario(data.comentario);
          setPuntuacion(data.puntuacion);
          setYaExiste(true);
        } else {
          setYaExiste(false); // ← Importante para evitar quedarse siempre en true
        }
      } catch (err) {
        console.error("Error al cargar reseña del usuario:", err);
        setYaExiste(false);
      }
    };

    cargarReseña();
  }, [token, idAnime]);

  const enviarReseña = async () => {
    if (!token) {
      notifyError("Debes iniciar sesión para enviar una reseña");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_api: anime.id,
          titulo: anime.title.romaji,
          url_imagen: anime.coverImage.extraLarge,
          comentario,
          puntuacion,
        }),
      });

      if (res.ok) {
        notifyInfo("Reseña guardada correctamente");
        setYaExiste(true); // ← también aquí se actualiza el estado
        if (onSubmit) onSubmit();
      } else {
        const data = await res.json();
        notifyError(data.error || "Error al guardar la reseña");
      }
    } catch (err) {
      console.error("Error al enviar reseña:", err);
      notifyError("Error interno al enviar reseña");
    }
  };

  return (
    <div className="bg-[#1f1f1f] p-4 rounded-lg shadow-md mt-12">
      <h2 className="text-xl font-bold mb-2">
        {yaExiste ? "Editar tu reseña" : "Escribe tu reseña"}
      </h2>

      <textarea
        rows={4}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Escribe tu opinión sobre este anime..."
        className="w-full p-2 rounded border bg-black text-white mb-4"
      />

      <div className="flex items-center gap-4">
        <label className="text-sm text-gray-300">Puntuación (1-10):</label>
        <input
          type="number"
          min={1}
          max={10}
          value={puntuacion}
          onChange={(e) => setPuntuacion(Number(e.target.value))}
          className="w-16 p-1 rounded text-black"
        />
        <button
          onClick={enviarReseña}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm cursor-pointer"
        >
          {yaExiste ? "Actualizar reseña" : "Publicar reseña"}
        </button>
      </div>

      {!token && (
        <p className="mt-2 text-sm text-red-400 italic">
          Inicia sesión para poder publicar tu reseña.
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
