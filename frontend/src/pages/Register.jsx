import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../utils/ToastUtils";


const Register = () => {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      notifyError("Los correos no coinciden");
      return;
    }

    if (password !== confirmPassword) {
      notifyError("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post("http://localhost:8080/usuarios", {
        nombre,
        email,
        password,
      });

      notifySuccess(`Cuenta creada correctamente.
                     Inicia sesión.`);
      navigate("/login"); // Redirige a la página de login después de crear la cuenta
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      notifyError(`Error al crear la cuenta. 
                   Intentalo de nuevo.`);
    }
  };

  useEffect(() => {
    // Verifica si la ubicación tiene el estado "showModal" y actualiza el estado del modal
    if (location.state && location.state.showModal) {
      setShowModal(true);
    }
  }, [location]);

  return (
    <div className="relative h-screen w-full md:flex">
      {/* Imagen de fondo para móvil */}
      <div className="absolute w-full h-full md:h-full z-0 overflow-hidden opacity-60">
        <img
          src="loginImg.jpg"
          alt="Img Login"
          className="object-cover md:objet w-full h-full"
        />
      </div>
      {/* Formulario de registrarse */}
      <div className="relative flex gap-3.5 flex-col justify-center items-center w-full  bg-blend-difference  p-10 bg-opacity-80 md:bg-opacity-100">
        <h1 className="text-2xl bg-gray-700 text-center font-bold mb-6 py-2 px-3 border rounded-md animate-impulse-rotation-left">
          Organiza tu mundo otaku en un solo lugar
        </h1>
        <h1 className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] text-2xl font-bold mb-6 py-2 px-3 border rounded-md animate-impulse-rotation-left">
          Crear cuenta
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 p-6 rounded shadow-md w-75 max-w-md animate-impulse-rotation-left"
        >
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre de usuario"
              className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escribe tu correo electrónico"
              className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="confirmEmail"
            >
              Confirma tu correo
            </label>
            <input
              type="email"
              id="confirmEmail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Confirma tu correo"
              className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Escribe tu contraseña"
              className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirma tu Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
              className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline w-full transition duration-500 hover:scale-110 cursor-pointer"
          >
            CREAR CUENTA
          </button>
          <h3 className="text-sm text-gray-700 mt-5 font-bold text-center">
            ¿Ya tienes una cuenta?{" "}
            <span className="text-[#F166B4] hover:underline">
              <Link to="/login">ACCEDER</Link>
            </span>
          </h3>
        </form>
      </div>

      {showModal && (
        <Modal
          title="Acceso restringido"
          message="Debes iniciar sesión o registrarte para acceder al perfil."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Register;
