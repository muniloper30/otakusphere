import { Link } from "react-router-dom";



const Login = () => {
  return (
    <div className="relative h-screen w-full md:flex">
      {/* Imagen de fondo para móvil */}
      <div className="absolute md:relative w-full h-full md:w-1/2 md:h-full z-0 overflow-hidden">
        <img
          src="loginImg.jpg"
          alt="Img Login"
          className="object-cover md:objet w-full h-full md:animate-pulse"
        />
      </div>

      {/* Formulario de login */}
      <div className="relative flex gap-3.5 flex-col justify-center items-center w-full md:w-1/2 bg-blend-difference md:bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] p-10 bg-opacity-80 md:bg-opacity-100">
        <h1 className="text-2xl bg-gray-700 text-center font-bold mb-6 py-2 px-3 border rounded-md animate-impulse-rotation-left">
          Tu universo otaku te espera. <br /> Inicia sesión.
        </h1>
        <h1 className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] text-2xl font-bold mb-6 py-2 px-3 border rounded-md animate-impulse-rotation-left">
          Acceder
        </h1>
        <form className="bg-gray-100 p-6 rounded shadow-md w-75 max-w-md animate-impulse-rotation-left">
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
              placeholder="Escribe tu nombre otaku"
              className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-800 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Correo electrónico
            </label>
            <input
              type="text"
              id="username"
              placeholder="Introduce el correo de tu cuenta"
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
              placeholder="Escribe tu contraseña"
              className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline w-full transition duration-500 hover:scale-110 cursor-pointer"
          >
            Acceder
          </button>
          <h3 className="text-sm text-gray-700 mt-5 font-bold text-center">
            ¿HAS OLVIDADO TU CONTRASEÑA?{" "}
            <span className="text-[#F166B4] hover:underline">
              <Link to="/register">CREAR CUENTA</Link>
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Login;
