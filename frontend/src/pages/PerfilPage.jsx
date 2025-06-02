import { Outlet } from "react-router-dom";
import SidebarPerfil from "../components/perfil/SidebarPerfil";

const PerfilPage = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="flex justify-center flex-col md:flex-row w-full max-w-7xl">
        <SidebarPerfil />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default PerfilPage;
