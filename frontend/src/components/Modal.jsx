import logoModal from "../assets/otakuLogo2.png";

const Modal = ({ title, message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center animate-zoom-in">
        <img
          src={logoModal}
          alt="OtakuSphere Logo"
          className="h-30 w-30  animate-rotational-wave mx-auto"
        />
        <h2 className="text-lg font-bold mb-4 text-black">{title}</h2>
        <p className="mb-4 text-black">{message}</p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] text-white px-4 py-2 rounded transition duration-500 hover:scale-125 cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
