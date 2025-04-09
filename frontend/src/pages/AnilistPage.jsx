import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const AnilistPage = () => {
  // Estado para almacenar los animes
  const [animes, setAnimes] = useState([]);
  // Estado para manejar la página actual
  const [page, setPage] = useState(1);
  // Estado para manejar el total de páginas
  const [totalPages, setTotalPages] = useState(0);
  // Estado para manejar el estado de carga
  const [loading, setLoading] = useState(true);

  // Consulta a GraphQL para obtener los animes con paginación
  // Usamos la librería axios para hacer la consulta a la API de Anilist
  const fetchAnimes = async () => {
    setLoading(true); // Activamos el estado de carga al iniciar la petición

    // Definimos la consulta GraphQL
    const query = `
      query ($page: Int) {
        Page(page: $page, perPage: 12) {
          pageInfo {
            total
            currentPage
            lastPage
          }
          media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
            }
            coverImage {
              extraLarge
            }
            episodes
            format
          }
        }
      }
    `;

    // Realizamos la petición y si la respuesta es correcta, guardamos los animes en el estado con setAnimes
    // También actualizamos el total de páginas con setTotalPages
    // Si hay un error, lo mostramos en la consola
    try {
      const response = await axios.post(
        "https://graphql.anilist.co",
        {
          query,
          variables: { page }, // ← Pasamos la variable page a la consulta
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = response.data.data.Page;
      setAnimes(data.media); // Guardamos los animes obtenidos
      setTotalPages(data.pageInfo.lastPage); // Obtenemos el total de páginas reales
    } catch (error) {
      // Si hay un error, lo mostramos en la consola
      console.error("Error al obtener los animes:", error);
    } finally {
      setLoading(false); // Cambiamos el estado de carga a false
    }
  };

  /// useEffect se ejecuta una vez al cargar el componente o cuando cambia la página,
  /// llamando a la función fetchAnimes para obtener los animes
  useEffect(() => {
    fetchAnimes();
  }, [page]);

  // Si los datos aún están cargando, mostramos un mensaje de carga
  if (loading) {
    return (
      <div className="text-3xl flex items-center justify-center h-screen">
        <div className="text-3xl flex items-center justify-center h-screen">
          Cargando animes...
        </div>
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Animes Populares</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animes.map((anime) => (
          <div
            key={anime.id}
            className="bg-[#F166B4] rounded-lg shadow-md overflow-hidden hover:transition duration-500 hover:scale-110 hover:shadow-lg"
          >
            <img
              src={anime.coverImage.extraLarge}
              alt={anime.title.romaji}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{anime.title.romaji}</h2>
              <p className="text-sm text-gray-700">
                {anime.format} • {anime.episodes ?? "?"} episodios
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Componente de paginación */}
      <Pagination
        currentPage={page} // Página actual manejada por el estado
        totalPages={totalPages} // Total de páginas reales desde la API
        onPageChange={(newPage) => setPage(newPage)} // Cambio de página desde el paginador
      />
    </div>
  );
};

export default AnilistPage;
