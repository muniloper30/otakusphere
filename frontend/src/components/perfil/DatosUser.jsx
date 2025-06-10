import { useState } from "react";
import axios from "axios";
import { notifyInfo } from "../../utils/ToastUtils";
import ModalConfirmacion from "./ModalConfirm";
import { UserPen, ScrollText, Star, NotebookPen, LogOut } from 'lucide-react';


const DatosUser = () => {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  );
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(usuario?.nombre || "");
  const [mostrarModal, setMostrarModal] = useState(false);

  const confirmarGuardado = () => {
    setMostrarModal(true);
  };

  const handleGuardar = async () => {
  try {
    const response = await axios.put(`http://localhost:8080/usuarios/${usuario.id}`, {
      nombre: nuevoNombre,
      email: usuario.email
    });

    const actualizado = {
      id: response.data.id || response.data.id_usuario,
      nombre: response.data.nombre,
      email: response.data.email
    };

    localStorage.setItem("usuario", JSON.stringify(actualizado));
    setUsuario(actualizado);
    setModoEdicion(false);
    notifyInfo("✅ Nombre actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar nombre:", error);
    notifyInfo("❌ Error al actualizar nombre");
  } finally {
    setMostrarModal(false);
  }
};


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="shadow-xl rounded-lg p-6 space-y-4 bg-white/10 backdrop-blur-sm border border-black/80 animate-zoom-in">
        <h1 className="text-2xl font-semibold mb-4 flex gap-3 items-center"><UserPen className="text-indigo-600"/> Mis datos</h1>

        {modoEdicion ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Nuevo nombre:</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-white/80 text-black"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={confirmarGuardado}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setModoEdicion(false);
                  setNuevoNombre(usuario.nombre);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <p>
              <strong>Nombre:</strong> {usuario?.nombre}
            </p>
            <p>
              <strong>Email:</strong> {usuario?.email}
            </p>
            <button
              onClick={() => setModoEdicion(true)}
              className="mt-4 bg-[#F166B4] hover:bg-pink-500 text-white px-4 py-2 rounded cursor-pointer"
            >
              Editar nombre
            </button>
          </>
        )}
      </div>

      {mostrarModal && (
        <ModalConfirmacion
          title="¿Confirmar cambio de nombre?"
          message={`¿Seguro que quieres cambiar tu nombre a "${nuevoNombre}"?`}
          onCancel={() => setMostrarModal(false)}
          onConfirm={handleGuardar}
          confirmText="Sí, guardar"
          cancelText="Cancelar"
        />
      )}
    </div>
  );
};

export default DatosUser;
