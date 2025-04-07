import React from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

const Slider = () => {
  const images = [
    { src: "/kaiju8.jpg", alt: "Chainsaw Man" },
    { src: "/demon-slayer.jpg", alt: "Daima" },
    { src: "/dandadan.jpg", alt: "Dandadan" },
    { src: "/daima.jpg", alt: "Demon Slayer" },
    { src: "/fireForce.jpg", alt: "Fire Force" },
    { src: "/JUJUTSU-KAISEN.jpg", alt: "Jujutsu Kaisen" },
    { src: "/chainsaw-man.jpg", alt: "Kaiju No. 8" },
    { src: "/my-hero-academia.jpg", alt: "My Hero Academia" },
    { src: "/one-piece-anime.avif", alt: "One Piece" },
    { src: "/soloLeveling.jpg", alt: "Solo Leveling" },
    { src: "/titan.jpg", alt: "Attack on Titan" },
  ];

  return (
    <div className="w-full overflow-hidden touch-pan-x">
      <Flicking
        horizontal={true}
        bounce={30}
        autoResize={true}
        circular={true}
        duration={500} // animación más lenta
        deceleration={0.007} // menor deceleración = más lento
        cameraPadding={{ left: 60, right: 60 }} // espacio a los lados para mostrar previews
        useMouse={true}
        useTouch={true}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="flicking-panel px-2 w-[80vw] max-w-[500px]"
          >
            <img
              src={img.src}
              alt={img.alt}
              draggable={false}
              className="w-full h-[300px] sm:h-[400px] object-cover rounded-xl shadow-lg"
            />
          </div>
        ))}
      </Flicking>
    </div>
  );
};

export default Slider;
