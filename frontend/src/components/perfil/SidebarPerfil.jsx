import { NavLink } from "react-router-dom";
import { UserPen, ScrollText, Star, NotebookPen, LogOut } from 'lucide-react';


const SidebarPerfil = () => {
  const baseClass =
    "block px-6 py-2 rounded hover:bg-[#1B9CF0] shadow-lg border-2 border-white transition-colors flex gap-2";
  const activeClass = "bg-[#1B9CF0] text-white";

  return (
    <aside className="w-64 shadow-md h-[400px] mt-20 md:ml-10 ml-17 bg-white/12 p-8 backdrop-blur-lg rounded-lg border-1 border-white ">
      <h2 className="text-xl font-bold mb-4">Mi perfil</h2>
      <nav className="space-y-5">
        <NavLink
          to="datos"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <UserPen className="text-indigo-600"/> Mis datos
        </NavLink>
        <NavLink
          to="listas"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <ScrollText className="text-amber-500"/> Mis listas
        </NavLink>
        <NavLink
          to="favoritos"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <Star className="text-yellow-400"/> Favoritos
        </NavLink>
        <NavLink
          to="reseñas"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          <NotebookPen className="text-fuchsia-700"/> Reseñas
        </NavLink>
       

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario"); // si guardas info del usuario también
            window.location.href = "/"; // redirige al inicio
          }}
          className="flex gap-2 mt-6 block w-full text-left px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors cursor-pointer"
        >
          <LogOut/> Cerrar sesión
        </button>
      </nav>
    </aside>
  );
};

export default SidebarPerfil;
