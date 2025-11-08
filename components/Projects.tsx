"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { DELAY } from "@/lib/animation-tokens";
import MegaCard from "@/components/ui/megaCard";
import ParallaxAnimation from "@/components/ParallaxAnimation";
import FilterButton from "@/components/ui/FilterButton";

const Projects = () => {
  const [filter, setFilter] = useState<"all" | "2d" | "stop">("all");

  // Catálogo unificado: categoría por tipo de animación (2D o Stop Motion)
  const projects = [
    // SPIRIWORS – Contenidos Originales
    {
      id: 1,
      title: "La Joya Del Pantano",
      url: "https://vimeo.com/896578269?fl=pl&fe=sh",
      description: "Trailer de la historia original La Joya Del Pantano",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 2,
      title: "SALÚ",
      url: "https://vimeo.com/172426682?fl=pl&fe=sh",
      description: "Trailer de la historia original SALÚ",
      year: undefined,
      category: "stop" as const,
    },
    // SPIRIWORS – Servicios Creativos y Animación
    {
      id: 3,
      title: "Un Bosque Encantado 2 – El Abrazo del Ciempiés",
      url: "https://www.youtube.com/watch?v=qDt5k1NIWr0&list=RDqDt5k1NIWr0&start_radio=1",
      description: "Un Bosque Encantado 2 – El Abrazo del Ciempiés",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 4,
      title: "Un Bosque Encantado 2 – Lobos",
      url: "https://www.youtube.com/watch?v=zQM8IrGu5Oo&list=RDzQM8IrGu5Oo&start_radio=1",
      description: "Un Bosque Encantado 2 – Lobos",
      year: undefined,
      category: "2d" as const,
    },
    // Venturia Animation Studios – Servicios Creativos
    {
      id: 5,
      title: "AJR – My Play",
      url: "https://venturiaanimation.com/portfolio/my-play-ajr/",
      description:
        "Cargo: animación – Camilo Ayala. A Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 6,
      title: "ONR – It Gets To a Point",
      url: "https://venturiaanimation.com/portfolio/it-gets-to-a-point-onr/",
      description:
        "Cargo: animación – Camilo Ayala. A Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 7,
      title: "We The Kingdom – Christmas In Hawaii",
      url: "https://venturiaanimation.com/portfolio/christmas-in-hawaii-we-the-kingdom/",
      description:
        "Cargo: modelado de marionetas y animación stop-motion – Camilo Ayala. A Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "stop" as const,
    },
    {
      id: 8,
      title: "Satellite – Bebe Rexha & Snoop Dogg",
      url: "https://venturiaanimation.com/portfolio/satellite-bebe-rexha-snoop-dogg/",
      description:
        "Cargo: animación. A Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 9,
      title: "Waldo´s Dream",
      url: "https://venturiaanimation.com/portfolio/waldos-dream/",
      description:
        "Cargo: animación. A Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 10,
      title: "Heroes Collection: Francis Ford Coppola",
      url: "https://venturiaanimation.com/portfolio/heroes-francis-ford-coppola/",
      description:
        "Cargo: Realizador de Animatic y Animador – Camilo Ayala. Original Content by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 11,
      title: "Smiling Symphonies",
      url: "https://dinamitaanimacion.com/portfolio/smiling-symphonies/",
      description: "Proyecto de Dinamita Animación – Smiling Symphonies",
      year: undefined,
      category: "2d" as const,
    },
  ];

  const filterOptions = [
    { key: "all", label: "Todos", folder: "Todos" },
    { key: "2d", label: "Animación 2D", folder: "2D" },
    { key: "stop", label: "Stop Motion", folder: "StopMotion" },
  ] as const;

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Función para asignar las imágenes del carousel basado en el título
  const getProjectImages = (title: string) => {
    const createImageArray = (
      folder: string,
      prefix: string,
      count: number = 3
    ) => {
      return Array.from({ length: count }, (_, i) => ({
        src: `/images/megaCard/${folder}/${prefix}0${i + 1}.jpeg`,
        alt: `${title} - Imagen ${i + 1}`,
        title: title,
      }));
    };

    if (title === "La Joya Del Pantano") {
      return createImageArray("LaJoyaDelPantano", "LJDP");
    }
    if (title === "SALÚ") {
      return createImageArray("Salu", "Salu");
    }
    if (title === "Un Bosque Encantado 2 – El Abrazo del Ciempiés") {
      return createImageArray("Ciempies", "Cien");
    }
    if (title === "Un Bosque Encantado 2 – Lobos") {
      return createImageArray("Lobos", "Lobos");
    }
    if (title === "AJR – My Play") {
      return createImageArray("AJR", "Ajr");
    }
    if (title === "ONR – It Gets To a Point") {
      return createImageArray("ONR", "ONR");
    }
    if (title === "We The Kingdom – Christmas In Hawaii") {
      return createImageArray("Christmas", "Ch");
    }
    if (title === "Satellite – Bebe Rexha & Snoop Dogg") {
      return createImageArray("SnoopDogg", "SD");
    }
    if (title === "Waldo´s Dream") {
      return createImageArray("Waldo´sDream", "WD");
    }
    if (title === "Heroes Collection: Francis Ford Coppola") {
      return createImageArray("Coppola", "Coppola");
    }
    if (title === "Smiling Symphonies") {
      return createImageArray("Smiling", "S_Sy");
    }

    // Fallback para proyectos sin imágenes
    return [
      {
        src: "/images/projects/placeholder.jpg",
        alt: title,
        title: title,
      },
    ];
  };

  return (
    <section id="projects" className="py-20 bg-gray-700">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-[60px] md:text-5xl font-bold mb-4 amatic-sc-bold text-white leading-tight">
              Trabajo
            </h2>
          </div>
        </ScrollReveal>

        {/* Filter Buttons */}
        <div className="flex flex-nowrap justify-center gap-2 md:gap-4 mb-12 overflow-x-auto pb-2 md:pb-0">
          {filterOptions.map((category) => (
            <FilterButton
              key={category.key}
              folder={category.folder}
              isActive={filter === category.key}
              onClick={() => setFilter(category.key)}
            />
          ))}
        </div>

        {/* MegaCard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
          {filteredProjects.map((item) => (
            <MegaCard
              key={item.id}
              images={getProjectImages(item.title)}
              videoSrc={item.url}
              videoTitle={item.title}
            />
          ))}
          {/* Parallax Animation al final - en la misma fila que las tarjetas */}
          {filteredProjects.length > 0 && (() => {
            const totalCards = filteredProjects.length;
            const cardsInLastRow = totalCards % 3; // Para grid de 3 columnas en desktop
            
            // Para Animación 2D: segunda posición de la última fila
            if (filter === "2d") {
              // Si la última fila tiene 0 o 1 tarjeta, necesitamos un espacio vacío antes
              if (cardsInLastRow === 0 || cardsInLastRow === 1) {
                return (
                  <>
                    {cardsInLastRow === 0 && <div className="hidden lg:block"></div>}
                    <div className="w-full">
                      <ParallaxAnimation frameRate={15} />
                    </div>
                  </>
                );
              }
              // Si la última fila tiene 2 tarjetas, el parallax va directamente después
              return (
                <div className="w-full">
                  <ParallaxAnimation frameRate={15} />
                </div>
              );
            }
            
            // Para Stop Motion: tercera posición de la última fila
            if (filter === "stop") {
              // Necesitamos 2 espacios vacíos si la última fila tiene 0 o 1 tarjeta
              // Necesitamos 1 espacio vacío si la última fila tiene 2 tarjetas
              if (cardsInLastRow === 0 || cardsInLastRow === 1) {
                return (
                  <>
                    <div className="hidden lg:block"></div>
                    <div className="hidden lg:block"></div>
                    <div className="w-full">
                      <ParallaxAnimation frameRate={15} />
                    </div>
                  </>
                );
              }
              if (cardsInLastRow === 2) {
                return (
                  <>
                    <div className="hidden lg:block"></div>
                    <div className="w-full">
                      <ParallaxAnimation frameRate={15} />
                    </div>
                  </>
                );
              }
              // Si la última fila está completa (3 tarjetas), el parallax va en nueva fila, tercera posición
              return (
                <>
                  <div className="hidden lg:block"></div>
                  <div className="hidden lg:block"></div>
                  <div className="w-full">
                    <ParallaxAnimation frameRate={15} />
                  </div>
                </>
              );
            }
            
            // Para otros filtros: al final
            return (
              <div className="w-full">
                <ParallaxAnimation frameRate={15} />
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default Projects;
