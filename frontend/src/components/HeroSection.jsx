import { Link } from "react-router-dom";

const HeroSection = ({ scrollToRanking }) => {
  return (
    <div id="heroSection" className="relative isolate px-6  lg:px-8">
      <div className="mx-auto max-w-2xl py-22   animate-fade-in-up">
        <div className="hidden sm:mb-4 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Tu espacio Otaku personalizado, tu lista, tus reseñas, tus recomendaciones.{" "}
            <a href="#featureSection" className="font-semibold text-[#F166B4]">
              <span aria-hidden="true" className="absolute inset-0" />
              Conoce más <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-[#F166B4] sm:text-7xl">
            Otaku<span className="text-[#1B9CF0]">Sphere</span>
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
            ¿Buscas un lugar donde descubrir nuevos animes o mangas? En OtakuSphere podrás llevar un registro de todos aquellos que hayas visto o leido.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-10">
            <Link
              to="/AnilistPage"
              className="bg-gradient-to-r from-[#F166B4] to-[#1B9CF0] py-2 px-3 text-neutral-100 rounded-md transition duration-500 hover:scale-125"
            >
              Explorar lista
            </Link>
            <a
              onClick={scrollToRanking}
              className="py-2 px-3 border rounded-md transition duration-500 hover:scale-125"
            >
              Top 100 <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default HeroSection;
