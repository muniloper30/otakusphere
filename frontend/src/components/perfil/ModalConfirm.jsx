import logoModal from "../../assets/otakuLogo2.png";

const ModalConfirmacion = ({
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar"
}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/3 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96 text-center animate-zoom-in">
        <img
          src={logoModal}
          alt="OtakuSphere Logo"
          className="h-24 w-24 mx-auto animate-rotational-wave"
        />
        <h2 className="text-lg font-bold mb-4 text-black">{title}</h2>
        <p className="mb-6 text-black">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
