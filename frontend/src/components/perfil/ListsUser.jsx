import { useState, useEffect } from "react";

const ListsUser = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("viendo");
  const [animes, setAnimes] = useState([]);

  const categorias = {
    viendo: "🟠 Viendo",
    pendiente: "⏳ Pendientes",
    completado: "✅ Completados",
  };

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
      } else {
        const data = await res.json();
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al eliminar el anime:", error);
    }
  };

  useEffect(() => {
    fetchAnimes(categoriaActiva);
  }, [categoriaActiva]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">📺 Mis listas</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {Object.entries(categorias).map(([key, label]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded cursor-pointer ${
              categoriaActiva === key
                ? "bg-[#1B9CF0] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setCategoriaActiva(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Contenido de la lista activa */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {animes.length === 0 ? (
          <p>No hay animes en esta lista.</p>
        ) : (
          animes.map((anime) => (
            <div
              key={anime.id_api}
              className="bg-[#F166B4] rounded-lg shadow-md overflow-hidden hover:transition duration-500 hover:scale-105 hover:shadow-lg"
            >
              <img
                src={anime.url_imagen}
                alt={anime.titulo}
                className="w-full h-64 object-cover"
              />
              <h2 className="mt-2 text-lg font-semibold text-center">
                {anime.titulo}
              </h2>

              {/* Botón para eliminar */}
              <button
                onClick={() => eliminarAnimeDeLista(anime.id_api)}
                className="mt-3 mb-3 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm block mx-auto"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListsUser;
