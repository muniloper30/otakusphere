import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./components/NavBar";


function App() {
  const [animeList, setAnimeList] = useState([]); //Iniciar el estado animeList como un array vacío

  useEffect(() => {
    axios
      .get("http://localhost:8080/anime")
      .then((response) => {
        setAnimeList(response.data.data.Page.media);
      })
      .catch((error) => {
        console.error("Error fetching anime data:", error);
      });
  }, []); //El segundo argumento vacío significa que el efecto se ejecutará solo una vez al montar el componente




  return (
    <>
      <NavBar />
      <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center flex-col gap-10">
        <h1 className="text-5xl font-bold text-gray-800">Welcome to the App</h1>
        <ul className="rounded-2xl shadow-lg p-5 bg-white space-y-3">
          {animeList.map((anime) => (
            <li key={anime.id} className="flex items-center gap-4">
              <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="w-16 h-24 rounded-lg shadow"
              />
              <span className="text-lg font-medium">{anime.title.romaji}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
