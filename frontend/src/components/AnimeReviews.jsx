import { useEffect, useState } from "react";

const AnimeReviews = ({ idAnime }) => {
  const [reseñas, setReseñas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarReseñas = async () => {
      try {
        const res = await fetch(`http://localhost:8080/reviews/${idAnime}`);
        if (!res.ok) throw new Error("No se pudieron obtener las reseñas");
        const data = await res.json();
        setReseñas(data);
      } catch (err) {
        console.error("Error al cargar reseñas:", err);
      } finally {
        setCargando(false);
      }
    };

    if (idAnime) {
      cargarReseñas();
    }
  }, [idAnime]);

  if (cargando) return <p className="text-gray-400 italic mt-6">Cargando reseñas...</p>;

  if (reseñas.length === 0) return <p className="text-gray-400 italic mt-6">Este anime aún no tiene reseñas públicas.</p>;

  return (
    <div className="mt-10 bg-[#111] p-4 rounded-lg">
      <h3 className="text-lg font-bold mb-4 text-white">Reseñas de otros usuarios</h3>
      <ul className="space-y-4">
        {reseñas.map((r) => (
          <li key={r.id_reseña} className="border border-gray-700 rounded p-3 text-sm text-gray-200">
            <p className="font-semibold text-pink-400">{r.nombre}</p>
            <p className="text-gray-300 mt-1">{r.comentario}</p>
            <div className="flex justify-between items-center mt-2 text-gray-400 text-xs">
              <span>Puntuación: {r.puntuacion}/10</span>
              <span>{new Date(r.fecha).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeReviews;
