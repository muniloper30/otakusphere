import React, { useEffect, useState } from "react";
import axios from "axios";

const AnilistPage = () => {
    // Estado para almacenar los animes
  const [animes, setAnimes] = useState([]);
    //Consulta a graphql para obtener los animes
  // Usamos la libreria axios para hacer la consulta a la API de Anilist
  const fetchAnimes = async () => {
    const query = `
      query {
        Page(perPage: 10) {
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
    // Si hay un error, lo mostramos en la consola
    try {
      const response = await axios.post(
        "https://graphql.anilist.co",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setAnimes(response.data.data.Page.media);
    } catch (error) { //Si hay un error, lo mostramos en la consola
      console.error("Error al obtener los animes:", error);
    }
  };
/// useEffect se ejecuta una vez al cargar el componente, llamando a la función fetchAnimes para obtener los animes
  useEffect(() => {
    fetchAnimes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Animes Populares</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {animes.map((anime) => (
          <div
            key={anime.id}
            className="bg-[#F166B4] rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={anime.coverImage.extraLarge}
              alt={anime.title.romaji}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold ">{anime.title.romaji}</h2>
              <p className="text-sm text-gray-700">
                {anime.format} • {anime.episodes ?? "?"} episodios
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnilistPage;
