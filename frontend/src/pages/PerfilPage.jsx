import { Outlet } from "react-router-dom";
import SidebarPerfil from "../components/perfil/SidebarPerfil";

const PerfilPage = () => {
  return (
    <div className="relative min-h-screen flex justify-center overflow-hidden">
      {/* Imagen flotante desde carpeta public */}
      <img
        src="/otakuPerfil-bg.png"
        alt="Mascota Otaku"
        className="absolute bottom-40 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-xl md:w-3xl pointer-events-none animate-fade-in-left"
        style={{ zIndex: 0 }}
      />

      {/* Contenido principal del perfil */}
      <div className="relative z-10 flex justify-center flex-col md:flex-row w-full max-w-7xl animate-fade-in-right">
        <SidebarPerfil />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PerfilPage;
