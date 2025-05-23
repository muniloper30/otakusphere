import { Star } from "lucide-react";
import { notifyError, notifyInfo } from "../utils/ToastUtils";

const BotonFavorito = ({ anime }) => {
  const handleFavorito = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      notifyError("Debes iniciar sesión para añadir a favoritos");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_api: anime.id,
          titulo: anime.title.romaji,
          url_imagen: anime.coverImage.extraLarge,
        }),
      });

      if (res.ok) {
        notifyInfo(`"${anime.title.romaji}" añadido a favoritos`);;
      } else {
        const data = await res.json();
        notifyError(data.error || "No se pudo añadir a favoritos");
      }
    } catch (error) {
      console.error(error);
      notifyError("Error al añadir a favoritos");
    }
  };

  return (
    <button
      onClick={handleFavorito}
      className="absolute top-2 right-2 text-yellow-400 hover:scale-120 transition-colors duration-300 cursor-pointer"
      title="Añadir a favoritos"
    >
      <Star className="w-6 h-6" />
    </button>
  );
};

export default BotonFavorito;
