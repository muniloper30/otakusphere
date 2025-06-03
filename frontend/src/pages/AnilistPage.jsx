import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import AnimeFilters from "../components/AnimeFilters";
import debounce from "lodash/debounce";
import BotonFavorito from "../components/BotonFavorito";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ListSelector from "../components/ListSelector";

//Constantes para los filtros
const AnilistPage = () => {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  // Estado para los filtros
  const [filters, setFilters] = useState({
    search: "",
    genre: "",
    year: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  // Función para obtener los animes de la API de Anilist
  // Se utiliza useCallback para evitar que la función se vuelva a crear en cada renderizado
  const fetchAnimes = useCallback(async () => {
    setLoading(true);
    const query = `
      query ($page: Int, $search: String, $genre: [String], $year: Int, $status: MediaStatus) {
        Page(page: $page, perPage: 12) {
          pageInfo {
            total
            currentPage
            lastPage
          }
          media(
            type: ANIME,
            sort: POPULARITY_DESC,
            search: $search,
            genre_in: $genre,
            seasonYear: $year,
            status: $status
          ) {
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

    // Realiza la solicitud a la API de Anilist
    // Se utiliza axios para hacer la solicitud POST a la API de Anilist
    try {
      const response = await axios.post(
        "https://graphql.anilist.co",
        {
          query,
          variables: {
            page,
            search: filters.search || undefined,
            genre: filters.genre ? [filters.genre] : undefined,
            year: filters.year ? parseInt(filters.year) : undefined,
            status: filters.status || undefined,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = response.data.data.Page;
      setAnimes(data.media);
      setTotalPages(data.pageInfo.lastPage);
    } catch (error) {
      console.error("Error al obtener los animes:", error);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  // useEffect para cargar los animes al montar el componente y al cambiar de página o filtros
  // Se utiliza debounce para evitar que la función se ejecute demasiadas veces al cambiar los filtros
  useEffect(() => {
    const debouncedFetch = debounce(fetchAnimes, 500); // espera 500 ms
    debouncedFetch();

    return () => {
      debouncedFetch.cancel(); // limpia el debounce si el componente se desmonta o cambia antes de tiempo
    };
  }, [fetchAnimes]);

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
      <AnimeFilters filters={filters} onChange={handleFilterChange} />
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {animes.map((anime) => (
          <div
            key={anime.id}
            className="relative bg-[#F166B4] rounded-lg shadow-md overflow-hidden hover:transition duration-500 hover:scale-105 hover:shadow-lg"
          >
            <img
              onClick={() => navigate(`/anime/${anime.id}`)}
              src={anime.coverImage.extraLarge}
              alt={anime.title.romaji}
              className="w-full h-44 sm:h-64 object-cover cursor-pointer"
            />
            <BotonFavorito anime={anime} />
            <div className="p-2 sm:p-4">
              <h2 className="text-sm sm:text-lg font-semibold truncate">
                {anime.title.romaji}
              </h2>
              <p className="text-xs sm:text-sm text-gray-800">
                {anime.format} • {anime.episodes ?? "?"} episodios
              </p>

              <div className="mt-2">
                <ListSelector anime={anime} className="text-xs sm:text-sm" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default AnilistPage;
