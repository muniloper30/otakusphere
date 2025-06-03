import { ArrowBigDown } from "lucide-react";
const AnimeLoopBanner = ({ scrollToHero }) => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Carrusel horizontal con duplicación */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="flex w-[400%] h-full animate-loopBanner">
          {/* Imagen duplicada 4 veces para que siempre haya contenido mientras se mueve */}
          <img
            src="/anime-banner.jpg"
            alt="Anime collage"
            className="w-1/4 h-full object-cover blur-sm opacity-60"
          />
          <img
            src="/anime-banner.jpg"
            alt="Anime collage"
            className="w-1/4 h-full object-cover blur-sm opacity-60"
          />
          <img
            src="/anime-banner.jpg"
            alt="Anime collage"
            className="w-1/4 h-full object-cover blur-sm opacity-60"
          />
          <img
            src="/anime-banner.jpg"
            alt="Anime collage"
            className="w-1/4 h-full object-cover blur-sm opacity-60"
          />
        </div>
      </div>

      {/* Superposición de sombra oscura para contraste */}
      <div className="absolute inset-0  z-10"></div>

      {/* Texto centrado */}
      <div className="absolute inset-0 z-20 pb-30 flex flex-col items-center justify-center text-center animate-fade-in">
        <h1 className="text-5xl font-semibold tracking-tight text-balance text-[#F166B4] sm:text-7xl">
            OTAKU<span className="text-[#1B9CF0]">SPHERE</span>
          </h1>
        <p className="text-white mt-4 text-lg md:text-2xl font-light tracking-wide  delay-1000">
          Tu universo anime personalizado
        </p>
        
      </div>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center md:pt-20">
        <button
          onClick={scrollToHero}
          href="/#heroSection"
          className="tracking-wide drop-shadow-xl cursor-pointer"
        >
          <ArrowBigDown className="animate-arrowBounce mt-10 text-white w-10 h-10 " />
        </button>
      </div>
    </section>
  );
};

export default AnimeLoopBanner;
