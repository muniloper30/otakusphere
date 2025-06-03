import { useState, useEffect } from "react";
import ModalConfirmacion from "./ModalConfirm";
import { notifyError, notifyInfo } from "../../utils/ToastUtils";

const ListsUser = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("viendo");
  const [animes, setAnimes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [animeAEliminar, setAnimeAEliminar] = useState(null);

  const categorias = {
    viendo: "🟠 Viendo ",
    pendiente: "⏳ Pendientes",
    completado: "✅ Completados",
  };

  // Obtener animes según categoría activa
  const fetchAnimes = async (categoria) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8080/listas/${categoria}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAnimes(data);
      } else {
        console.error("Error al obtener animes");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
    }
  };

  // Abrir modal de confirmación
  const abrirModalConfirmacion = (anime) => {
    setAnimeAEliminar(anime);
    setMostrarModal(true);
  };

  // Confirmar eliminación
  const confirmarEliminacion = async () => {
    if (!animeAEliminar) return;
    await eliminarAnimeDeLista(animeAEliminar.id_api);
    setAnimeAEliminar(null);
    setMostrarModal(false);
  };

  // Cancelar eliminación
  const cancelarEliminacion = () => {
    setAnimeAEliminar(null);
    setMostrarModal(false);
  };

  // Eliminar anime del backend
  const eliminarAnimeDeLista = async (id_api) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:8080/listas/${categoriaActiva}/${id_api}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setAnimes(animes.filter((anime) => anime.id_api !== id_api));
        notifyInfo(`"${animeAEliminar.titulo}" ha sido eliminado de tu lista.`);
      } else {
        const data = await res.json();
        notifyError(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al eliminar el anime:", error);
    }
  };

  const handleCambioLista = async (id_api, nombre_lista_destino) => {
    const token = localStorage.getItem("token");

    if (nombre_lista_destino === categoriaActiva) return; // No hacer nada si no hay cambio

    try {
      const res = await fetch("http://localhost:8080/listas/mover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_api,
          nombre_lista_origen: categoriaActiva,
          nombre_lista_destino,
        }),
      });

      if (res.ok) {
        notifyInfo("Anime movido correctamente.");
        fetchAnimes(categoriaActiva); // Vuelve a cargar la lista activa
      } else {
        const data = await res.json();
        notifyError(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al mover el anime:", error);
      notifyError("Error interno al mover el anime.");
    }
  };

  useEffect(() => {
    fetchAnimes(categoriaActiva);
  }, [categoriaActiva]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">📺 Mis listas</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {Object.entries(categorias).map(([key, label]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded cursor-pointer hover:bg-[#1B9CF0] ${
              categoriaActiva === key
                ? "bg-blue-400 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setCategoriaActiva(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Lista de animes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animes.length === 0 ? (
          <p>No hay animes en esta lista.</p>
        ) : (
          animes.map((anime) => (
            <div className="bg-[#F166B4] rounded-lg shadow-md overflow-hidden hover:transition duration-500 hover:scale-105 hover:shadow-lg">
              <p className="bg-gray-500 text-center">
                 {categorias[categoriaActiva]}
              </p>
              <img
                src={anime.url_imagen}
                alt={anime.titulo}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-base font-semibold text-white text-center">
                  {anime.titulo}
                </h2>
                <div className="mt-3">
                  <select
                    value=""
                    onChange={(e) =>
                      handleCambioLista(anime.id_api, e.target.value)
                    }
                    className="w-full bg-white text-black px-2 py-1 text-sm rounded mb-2"
                  >
                    <option disabled value="">
                      📥 Mover a...
                    </option>
                    {Object.entries(categorias)
                      .filter(([key]) => key !== categoriaActiva)
                      .map(([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={() => abrirModalConfirmacion(anime)}
                    className="w-full bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700 cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de confirmación */}
      {mostrarModal && (
        <ModalConfirmacion
          title="¿Estás seguro?"
          message={`¿Quieres eliminar "${animeAEliminar?.titulo}" de tu lista?`}
          onCancel={cancelarEliminacion}
          onConfirm={confirmarEliminacion}
          confirmText="Sí, eliminar"
          cancelText="Cancelar"
        />
      )}
    </div>
  );
};

export default ListsUser;
