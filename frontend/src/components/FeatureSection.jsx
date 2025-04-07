import {
  UserCircleIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

import Slider from "./slider";

//Variable para guardar las funcionalidades de la app
//Se usa para mapear las funcionalidades en la sección de características
const features = [
  {
    name: "Gestión de usuarios",
    description: "Regístrate y personaliza tu perfil segun tus preferencias.",
    icon: UserCircleIcon,
  },
  {
    name: "Gestión de anime y manga",
    description:
      "Consulta listas actualizadas, accede a detalles y organiza tus series como 'viendo', 'completado' o 'pendiente'.",
    icon: ListBulletIcon,
  },
  {
    name: "Búsqueda y filtros",
    description:
      "Encuentra contenido fácilmente usando filtros por título, género, estado, tipo y puntuación.",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Reseñas y puntuaciones",
    description:
      "Escribe reseñas, valora tus animes y mangas favoritos y consulta opiniones de otros usuarios.",
    icon: StarIcon,
  },
];

const FeatureSection = () => {
  return (
    <div id="featureSection" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold text-[#F166B4]">
                Otakusphere
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                Funcionalidades destacadas
              </p>
              <p className="mt-6 text-lg text-white">
                Descubre todas las herramientas que ofrece nuestra plataforma
                para gestionar tu experiencia como amante del anime y manga.
              </p>

              {/* Usamos la etiqueta dl para crear una lista de definiciones, donde cada elemento tiene un nombre y una descripción. Esto es útil para mostrar características o funcionalidades de manera clara y estructurada. */}

              <dl className="flex flex-col justify-center-safe mt-10 max-w-xl space-y-8 text-base text-gray-300 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-12">
                    <dt className="font-semibold text-white flex items-center">
                      <feature.icon
                        className="absolute top-5 left-0 h-6 w-6 text-[#F166B4]"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <dd className="mt-1">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="md:mt-40">
          <Slider />    
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
