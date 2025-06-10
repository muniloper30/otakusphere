import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import ListSelector from "../components/ListSelector";
import BotonFavorito from "../components/BotonFavorito";
import ReviewForm from "../components/ReviewForm";
import AnimeReviews from "../components/AnimeReviews";



const AnimePage = () => {
  const { id_api } = useParams();
  const [animeInfo, setAnimeInfo] = useState(null);
  const [idAnimeBd, setIdAnimeBd] = useState(null);

  const registrarAnimeEnBD = async (anime) => {
    try {
      const res = await fetch("http://localhost:8080/animes/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_api: anime.id,
          titulo: anime.title.romaji,
          url_imagen: anime.coverImage.large,
        }),
      });

      const data = await res.json();
      setIdAnimeBd(data.id_anime);
    } catch (err) {
      console.error("Error al registrar anime en BD:", err);
    }
  };

  useEffect(() => {
    const fetchAnime = async () => {
      const query = `
        query {
          Media(id: ${id_api}, type: ANIME) {
            id
            title {
              romaji
            }
            description(asHtml: false)
            coverImage {
              large
            }
            episodes
          }
        }
      `;

      try {
        const response = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ query }),
        });

        const json = await response.json();
        const anime = json.data.Media;
        setAnimeInfo(anime);
        registrarAnimeEnBD(anime); // <-- Importante para obtener idAnimeBd
      } catch (error) {
        console.error("Error al cargar anime desde AniList:", error);
      }
    };

    fetchAnime();
  }, [id_api]);

  if (!animeInfo) {
    return (
      <p className="text-white text-center flex pt-20 items-center justify-center gap-2">
        Cargando anime... <LoaderCircle className="animate-spin w-5 h-5" />
      </p>
    );
  }

  const anime = {
    id: animeInfo.id,
    title: { romaji: animeInfo.title.romaji },
    coverImage: { extraLarge: animeInfo.coverImage.large },
    episodes: animeInfo.episodes ?? "?",
  };

  return (
    <div className="min-h-screen flex flex-col justify-between animate-zoom-in">
      <main className="max-w-4xl mx-auto px-4 py-10 text-white">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={animeInfo.coverImage.large}
            alt="Portada"
            className="w-64 rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{animeInfo.title.romaji}</h1>

            <div className="mt-4 flex gap-4 items-center flex-wrap">
              <BotonFavorito anime={anime} modoTexto />
              <div className="w-48">
                <ListSelector anime={anime} className="text-sm" />
              </div>
            </div>

            {animeInfo.description ? (
              <p
                className="mt-6 text-gray-300"
                dangerouslySetInnerHTML={{ __html: animeInfo.description }}
              ></p>
            ) : (
              <p className="mt-6 text-gray-500 italic">
                Sin descripción disponible
              </p>
            )}
          </div>
        </div>

        {/* Formulario de reseña */}
        <div className="mt-10">
          <ReviewForm anime={anime} idAnime={idAnimeBd} />
          <AnimeReviews idAnime={idAnimeBd} />
        </div>
      </main>

      <footer className="w-full border-t border-gray-700 text-center text-sm text-gray-400 py-6">
        © 2025 Otakusphere™. All Rights Reserved.
      </footer>
    </div>
  );
};

export default AnimePage;
