import { useState } from "react";

const ListsUser = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("viendo");

  const categorias = {
    viendo: "🟠 Viendo",
    pendiente: "⏳ Pendientes",
    completado: "✅ Completados",
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">📺 Mis listas</h1>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        {Object.entries(categorias).map(([key, label]) => (
          <button
            key={key}
            className={`px-4 py-2 rounded cursor-pointer ${
              categoriaActiva === key
                ? "bg-[#1B9CF0] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setCategoriaActiva(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Contenido de la lista activa */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Aquí irán los items de la lista seleccionada */}
        <p>Mostrando: <strong>{categorias[categoriaActiva]}</strong></p>
      </div>
    </div>
  );
};

export default ListsUser;
