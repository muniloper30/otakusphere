import { useEffect, useState } from "react";
import { notifyError, notifyInfo } from "../../utils/ToastUtils";
import ModalConfirmacion from "./ModalConfirm";

const Favorites = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [animeAEliminar, setAnimeAEliminar] = useState(null);

  // Obtener favoritos desde backend
  const fetchFavoritos = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8080/favoritos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Fallo al obtener favoritos");

      const data = await res.json();
      setFavoritos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Eliminar favorito desde backend
  const eliminarFavorito = async (id_anime) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8080/favoritos/${id_anime}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("No se pudo eliminar");

      setFavoritos(favoritos.filter((anime) => anime.id_anime !== id_anime));
      notifyInfo("Anime eliminado de favoritos");
    } catch (error) {
      console.error(error);
      notifyError("Error al eliminar de favoritos");
    }
  };

  // Abrir modal de confirmación
  const abrirModalConfirmacion = (anime) => {
    setAnimeAEliminar(anime);
    setMostrarModal(true);
  };

  // Cancelar eliminación
  const cancelarEliminacion = () => {
    setAnimeAEliminar(null);
    setMostrarModal(false);
  };

  // Confirmar eliminación
  const confirmarEliminacion = async () => {
    if (!animeAEliminar) return;
    await eliminarFavorito(animeAEliminar.id_anime);
    setAnimeAEliminar(null);
    setMostrarModal(false);
  };

  // Cargar favoritos al iniciar
  useEffect(() => {
    fetchFavoritos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">⭐ Animes favoritos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoritos.length === 0 ? (
          <p>No tienes animes marcados como favoritos.</p>
        ) : (
          favoritos.map((anime) => (
            <div
              key={anime.id_anime}
              className="bg-[#F166B4] rounded-lg shadow-md overflow-hidden hover:transition duration-500 hover:scale-105 hover:shadow-lg"
            >
            <p className="bg-gray-500 text-center">⭐FAV⭐</p>
              <img
                src={anime.url_imagen}
                alt={anime.titulo}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-base font-semibold text-white text-center">
                  {anime.titulo}
                </h2>
                <button
                  onClick={() => abrirModalConfirmacion(anime)}
                  className="w-full bg-red-600 text-white px-3 py-2 mt-3 rounded hover:bg-red-700 text-sm cursor-pointer"
                >
                  Eliminar de favoritos
                </button>
                
              </div>
            </div>
          ))
        )}
      </div>

      {mostrarModal && (
        <ModalConfirmacion
          title="¿Estás seguro?"
          message={`¿Quieres eliminar "${animeAEliminar?.titulo}" de tus favoritos?`}
          onCancel={cancelarEliminacion}
          onConfirm={confirmarEliminacion}
          confirmText="Sí, eliminar"
          cancelText="Cancelar"
        />
      )}
    </div>
  );
};

export default Favorites;
