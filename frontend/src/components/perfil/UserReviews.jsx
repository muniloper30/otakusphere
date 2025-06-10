import { useEffect, useState } from "react";
import axios from "axios";
import ModalConfirmacion from "./ModalConfirm"; // ajusta ruta si es necesario
import { notifyInfo } from "../../utils/ToastUtils";
import { Trash2, NotebookPen } from 'lucide-react';

const UserReviews = () => {
  const [reseñas, setReseñas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [reseñaSeleccionada, setReseñaSeleccionada] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/reviews/mis-reviews", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReseñas(res.data))
      .catch((err) => console.error("Error al obtener reseñas:", err));
  }, []);

  const abrirModal = (id_reseña) => {
    setReseñaSeleccionada(id_reseña);
    setMostrarModal(true);
  };

  const eliminarReseña = async () => {
  const token = localStorage.getItem("token");

  try {
    const reseña = reseñas.find((r) => r.id_reseña === reseñaSeleccionada);

    await axios.delete(`http://localhost:8080/reviews/${reseñaSeleccionada}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setReseñas((prev) =>
      prev.filter((r) => r.id_reseña !== reseñaSeleccionada)
    );

    if (reseña) {
      notifyInfo(` "${reseña.comentario}" ha sido eliminada de tus reseñas.`);
    }

  } catch (err) {
    console.error("Error al eliminar reseña:", err);
  } finally {
    setMostrarModal(false);
    setReseñaSeleccionada(null);
  }
};

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3"> <NotebookPen className="text-fuchsia-700"/> Mis reseñas</h2>
      {reseñas.length === 0 ? (
        <p>No has escrito ninguna reseña aún.</p>
      ) : (
        <ul className="space-y-4 animate-zoom-in">
          {reseñas.map((r) => (
            <li
              key={r.id_reseña}
              className="bg-black/80 p-4 rounded-lg shadow border border-white/20"
            >
              <h3 className="text-xl font-semibold">{r.titulo}</h3>
              <p className="text-sm italic text-gray-300">
                Puntuación: {r.puntuacion} / 10
              </p>
              <p className="mt-2">{r.comentario}</p>
              <button
                onClick={() => abrirModal(r.id_reseña)}
                className="flex gap-2.5 items-center mt-3 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-md cursor-pointer"
              >
                <Trash2/> Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      {mostrarModal && (
        <ModalConfirmacion
          title="¿Eliminar reseña?"
          message="Esta acción no se puede deshacer. ¿Deseas continuar?"
          onCancel={() => setMostrarModal(false)}
          onConfirm={eliminarReseña}
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      )}
    </section>
  );
};

export default UserReviews;
