import { notifySuccess, notifyError } from "../utils/ToastUtils";

const ListSelector = ({ anime, className = "" }) => {
  const guardarEnLista = async (estado) => {
    const token = localStorage.getItem("token");
    if (!token) {
      notifyError("Debes iniciar sesión para añadir a una lista");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/listas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_api: anime.id,
          titulo: anime.title.romaji,
          url_imagen: anime.coverImage.extraLarge,
          nombre_lista: estado,
        }),
      });

      if (res.ok) {
        notifySuccess(`Añadido a la lista: ${estado}`);
      } else {
        const err = await res.json();
        notifyError(`Error: ${err.error}`);
      }
    } catch (err) {
      console.error("Error al guardar en lista:", err);
      notifyError("Error al conectar con el servidor");
    }
  };

  return (
    <select
      onChange={(e) => guardarEnLista(e.target.value)}
      defaultValue=""
      className={`w-full px-2 py-1 text-sm rounded bg-white cursor-pointer text-black ${className}`}
    >
      <option value="" disabled>📥 Añadir a lista</option>
      <option value="viendo">🟠 Viendo</option>
      <option value="pendiente">⏳ Pendiente</option>
      <option value="completado">✅ Completado</option>
    </select>
  );
};

export default ListSelector;
