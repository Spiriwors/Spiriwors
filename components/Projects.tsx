"use client";

import React, { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { DELAY } from "@/lib/animation-tokens";
import MegaCard from "@/components/ui/megaCard";
import ParallaxAnimation from "@/components/ParallaxAnimation";
import FilterButton from "@/components/ui/FilterButton";
import { getProjects } from '@/lib/supabase/projects';
import { Project } from '@/types/project';

const Projects = () => {
  const [filter, setFilter] = useState<"all" | "2d" | "stop">("all");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Catálogo unificado fallback: categoría por tipo de animación (2D o Stop Motion)
  const fallbackProjects = [
    // SPIRIWORS – Contenidos Originales
    {
      id: 1,
      title: "La Joya Del Pantano",
      url: "https://www.youtube.com/watch?v=gTusWDe469g",
      description:
        "Cortometraje de animación 2D realizado por Camilo Ayala Nieto",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 2,
      title: "SALÚ",
      url: "https://www.youtube.com/watch?v=CZsXsqoL2B0",
      description:
        "Cortometraje de animación Stop-Motion realizado por Camilo Ayala Nieto",
      year: undefined,
      category: "stop" as const,
    },
    // SPIRIWORS – Servicios Creativos y Animación
    {
      id: 3,
      title: "Un Bosque Encantado 2 – El Abrazo del Ciempiés",
      url: "https://www.youtube.com/watch?v=qDt5k1NIWr0&list=RDqDt5k1NIWr0&start_radio=1",
      description: "Servicios Creativos y Animación para Un Bosque Encantado 2",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 4,
      title: "Un Bosque Encantado 2 – Lobos",
      url: "https://www.youtube.com/watch?v=zQM8IrGu5Oo&list=RDzQM8IrGu5Oo&start_radio=1",
      description: "Servicios Creativos y Animación para Un Bosque Encantado 2",
      year: undefined,
      category: "2d" as const,
    },
    // Venturia Animation Studios – Servicios Creativos
    {
      id: 5,
      title: "AJR – My Play",
      url: "https://www.youtube.com/watch?v=Ew8jKnliFZg",
      description:
        "Cargo: animación - Camilo Ayala\n\nA Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 6,
      title: "ONR – It Gets To a Point",
      url: "https://www.youtube.com/watch?v=9WSkP58HDwU&list=RD9WSkP58HDwU&start_radio=1",
      description:
        "Cargo: animación - Camilo Ayala\n\nA Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 7,
      title: "We The Kingdom – Christmas In Hawaii",
      url: "https://www.youtube.com/watch?v=k-qPTVztgEk&list=RDk-qPTVztgEk&start_radio=1",
      description:
        "Cargo: modelado de marionetas y animación stop-motion – Camilo Ayala\n\nA Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "stop" as const,
    },
    {
      id: 8,
      title: "Satellite – Bebe Rexha & Snoop Dogg",
      url: "https://www.youtube.com/watch?v=VBHr0faDCoQ",
      description:
        "Cargo: animación\n\nA Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 9,
      title: "Waldo´s Dream",
      url: "https://vimeo.com/335248497?fl=pl&fe=sh",
      description:
        "Cargo: animación\n\nA Creative Service by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 10,
      title: "Heroes Collection: Francis Ford Coppola",
      url: "https://vimeo.com/1058727258?fl=pl&fe=sh",
      description:
        "Cargo: Realizador de Animatic y Animador – Camilo Ayala\n\nAn Original Content by Venturia Animation Studios. All Rights Reserved.",
      year: undefined,
      category: "2d" as const,
    },
    {
      id: 11,
      title: "Smiling Symphonies",
      url: "https://www.youtube.com/watch?v=3uj8bF7jR0U",
      description: "Cargo - Animación - Camilo Ayala",
      year: undefined,
      category: "2d" as const,
    },
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      // Si hay datos de Supabase, usarlos; sino usar fallback
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(fallbackProjects);
      }
    } catch (error) {
      console.error('Error loading projects, using fallback:', error);
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = [
    { key: "all", label: "Todos", folder: "Todos" },
    { key: "2d", label: "Animación 2D", folder: "2D" },
    { key: "stop", label: "Stop Motion", folder: "StopMotion" },
  ] as const;

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Función para asignar las imágenes del carousel basado en el proyecto
  const getProjectImages = (project: any) => {
    // Si el proyecto tiene imágenes de Supabase, usarlas
    if (project.images && project.images.length > 0) {
      return project.images.map((url: string, i: number) => ({
        src: url,
        alt: `${project.title} - Imagen ${i + 1}`,
        title: project.title,
      }));
    }

    // Fallback para proyectos legacy basados en el título
    const title = project.title;
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
      // Solo las imágenes normales, sin premios
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
      return createImageArray("WaldosDream", "WD");
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
        {loading ? (
          <div className="text-center text-gray-400">Cargando proyectos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {filteredProjects.map((item) => (
              <MegaCard
                key={item.id}
                images={getProjectImages(item)}
                videoSrc={item.video_url || item.url}
                videoTitle={item.title}
                videoDescription={item.description}
              />
            ))}
          {/* Parallax Animation al final - en la misma fila que las tarjetas */}
          {filteredProjects.length > 0 &&
            (() => {
              const totalCards = filteredProjects.length;
              const cardsInLastRow = totalCards % 3; // Para grid de 3 columnas en desktop

              // Para Animación 2D: segunda posición de la última fila
              if (filter === "2d") {
                // Si la última fila tiene 0 o 1 tarjeta, necesitamos un espacio vacío antes
                if (cardsInLastRow === 0 || cardsInLastRow === 1) {
                  return (
                    <>
                      {cardsInLastRow === 0 && (
                        <div className="hidden lg:block"></div>
                      )}
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
                      <div
                        className="col-span-1 h-0 lg:h-auto"
                        aria-hidden="true"
                      ></div>
                      <div
                        className="col-span-1 h-0 lg:h-auto"
                        aria-hidden="true"
                      ></div>
                      <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <ParallaxAnimation frameRate={15} />
                      </div>
                    </>
                  );
                }
                if (cardsInLastRow === 2) {
                  return (
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                      <ParallaxAnimation frameRate={15} />
                    </div>
                  );
                }
                // Si la última fila está completa (3 tarjetas), el parallax va en nueva fila, tercera posición
                return (
                  <>
                    <div
                      className="col-span-1 h-0 lg:h-auto"
                      aria-hidden="true"
                    ></div>
                    <div
                      className="col-span-1 h-0 lg:h-auto"
                      aria-hidden="true"
                    ></div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
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
        )}
      </div>
    </section>
  );
};

export default Projects;
