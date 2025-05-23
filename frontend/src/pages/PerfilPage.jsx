import { Outlet } from "react-router-dom";
import SidebarPerfil from "../components/perfil/SidebarPerfil";

const PerfilPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <SidebarPerfil />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PerfilPage;
