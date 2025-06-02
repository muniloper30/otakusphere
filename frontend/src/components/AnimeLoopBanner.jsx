import { ArrowBigDown } from "lucide-react";
const AnimeLoopBanner = () => {
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
        <h1 className="text-white text-3xl sm:text-2xl md:text-8xl font-extrabold tracking-wide drop-shadow-xl ">
          OTAKUSPHERE
        </h1>
        <p className="text-white mt-4 text-lg md:text-2xl font-light tracking-wide  delay-1000">
          Tu universo anime personalizado
        </p>
        
      </div>
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center md:pt-20">
        <a
          href="/#heroSection"
          className="tracking-wide drop-shadow-xl "
        >
          <ArrowBigDown className="animate-arrowBounce mt-10 text-white w-10 h-10 " />
        </a>
      </div>
    </section>
  );
};

export default AnimeLoopBanner;
