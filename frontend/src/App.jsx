import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FooterSection from "./components/FooterSection";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AnilistPage from "./pages/AnilistPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {


  return (
    <Router> {/* Envolver toda la aplicación con Router */}
      <div className="relative min-h-screen">
        {/* Fondo decorativo */}
        <div className="absolute -z-10 inset-0 h-full w-full bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(#00ffff15_1px,transparent_1px),linear-gradient(90deg,#00ffff15_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_300px,#0000ff15,transparent)]"></div>
          <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[#ff00ff10] to-transparent"></div>
        </div>

        {/* Barra de navegación */}
        <NavBar />

        {/* Rutas */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AnilistPage" element={<AnilistPage />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Register" element={<Register/>} />
        </Routes>

      <FooterSection />
      </div>
    </Router>
  );
}

export default App;




  {/* Contenido principal */}
//   <div className=" flex items-center justify-center flex-col gap-10">
//   <h1 className="text-5xl font-bold text-gray-800">Welcome to the App</h1>
//   <ul className="rounded-2xl shadow-lg p-5 bg-white space-y-3">
//     {animeList.map((anime) => (
//       <li key={anime.id} className="flex items-center gap-4">
//         <img
//           src={anime.coverImage.large}
//           alt={anime.title.romaji}
//           className="w-16 h-24 rounded-lg shadow"
//         />
//         <span className="text-lg font-medium">{anime.title.romaji}</span>
//       </li>
//     ))}
//   </ul>
// </div>