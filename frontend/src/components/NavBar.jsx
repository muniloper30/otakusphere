import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logoNav from "../assets/otakulogo1.png"; 



const NavBar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Alternar el menú hamburguesa
  const toggleNavBar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <img
                src={logoNav}
                alt="OtakuSphere Logo"
                className="h-15 w-15 mr-2"
              />
              <Link to="/HomePage">
                <span className="text-3xl cursor-pointer px-2 py-2 tracking-tight font-[Saira] hover:bg-[#F166B4] transition duration-500">
                  OtakuSphere
                </span>
              </Link>
            </div>
            <ul className="hidden lg:flex ml-14 space-x-12">
              <li>
                <Link
                  to="/HomePage"
                  className="block px-3 py-2 text-neutral-100 hover:bg-[#F166B4] transition duration-500 hover:scale-125"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/AnilistPage"
                  className="block px-3 py-2 text-neutral-100 hover:bg-[#F166B4] transition duration-500 hover:scale-125"
                >
                  Lista Animes
                </Link>
              </li>
              <li>
                <button
                  className="block px-3 py-2 text-neutral-100 hover:bg-[#F166B4] transition duration-500 hover:scale-125 cursor-pointer"
                >
                  Perfil
                </button>
              </li>
            </ul>
            <div className="hidden lg:flex justify-center space-x-12 items-center">
              <Link
                to="#"
                className="py-2 px-3 border rounded-md transition duration-500 hover:scale-125"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="#"
                className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] py-2 px-3 text-neutral-100 rounded-md transition duration-500 hover:scale-125"
              >
                Crear una cuenta
              </Link>
            </div>
            <div
              className={`lg:hidden cursor-pointer transition-all duration-300 ${isOpen ? "text-pink-500 rotate-90" : "text-white"}`}
              onClick={toggleNavBar}
            >
              <button className="cursor-pointer">
                {mobileDrawerOpen ? <X size={50} /> : <Menu size={50} />}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed top-20 left-0 z-20 bg-neutral-900 w-screen h-[calc(100vh-4rem)] p-6 md:p-12 flex flex-col justify-center items-center lg:hidden transition-all duration-700 ease-in-out">
              <ul className="flex flex-col items-center gap-5">
                <li>
                  <Link to="/HomePage"
                    className="block px-3 py-2 text-neutral-100 text-2xl hover:bg-[#F166B4] transition duration-500 hover:scale-125 cursor-pointer"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/AnilistPage" 
                    className="block px-3 py-2 text-neutral-100 text-2xl hover:bg-[#F166B4] transition duration-500 hover:scale-125 cursor-pointer"
                    >
                    Lista Animes
                  </Link>
                </li>
                <li>
                  <button
                    className="block px-3 py-2 text-2xl text-neutral-100 hover:bg-[#F166B4] transition duration-500 hover:scale-125 cursor-pointer"
                  >
                    Perfil
                  </button>
                </li>
              </ul>
              <br />
              <br />
              <div className="flex flex-col items-center gap-5">
                <button
                  className="py-2 px-3 border rounded-md transition duration-500 hover:scale-125 text-2xl cursor-pointer"
                >
                  Iniciar Sesión
                </button>
                <button
                  className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] py-2 px-3 text-neutral-100 rounded-md transition duration-500 hover:scale-125 text-2xl cursor-pointer"
                >
                  Crear una cuenta
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
