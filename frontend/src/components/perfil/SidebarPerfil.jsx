import { NavLink } from "react-router-dom";

const SidebarPerfil = () => {
  const baseClass =
    "block px-6 py-2 rounded hover:bg-[#1B9CF0] shadow-lg  transition-colors";
  const activeClass = "bg-[#1B9CF0] text-white";

  return (
    <aside className="w-64  shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Mi perfil</h2>
      <nav className="space-y-5">
        <NavLink to="datos" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
          👤 Mis datos
        </NavLink>
        <NavLink to="listas" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
          📺 Mis listas
        </NavLink>
        <NavLink to="favoritos" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
          ⭐ Favoritos
        </NavLink>
        <NavLink to="reseñas" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
          ✍️ Reseñas
        </NavLink>
        <NavLink to="configuracion" className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}>
          ⚙️ Configuración
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarPerfil;
