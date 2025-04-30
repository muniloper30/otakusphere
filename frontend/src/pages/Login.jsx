

const Login = () => {
    return (
        <div className="flex h-screen">
            {/* Formulario de login a la izquierda */}
            <div className="flex flex-col justify-center items-center w-1/2 bg-gray-400 p-10">
                <h1 className="text-4xl font-bold mb-6">Login</h1>
                <form className="bg-white p-10 rounded shadow-md w-80">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-500 hover:scale-110 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
            </div>

            {/* Imagen a la derecha */}
            <div className="w-1/2 h-full">
                <img
                    src="loginImg.jpg" // Cambia esta ruta por la de tu imagen
                    alt="Img Login"
                    className="object-cover w-full h-full"
                />
            </div>
        </div>
    );
};

export default Login;
