"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getFeaturedProjects } from "@/lib/supabase/projects";

const Carousel = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({});
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackProjects = [
    {
      id: 1,
      image: "/images/projects/LJDP_HD_FULL_DEFF.webp",
      imageFallback: "/images/projects/LJDP_HD_FULL_DEFF.png",
      title: "La Joya Del Pantano",
      description:
        "Suyay, la princesa rana de la tribu, es raptada por unos codiciosos murciélagos. Su padre el sapo Cacique, buscará la forma de rescatar a su pequeña. Proyecto ganador del estímulo FDC",
      key: "LJDP",
    },
    {
      id: 2,
      image: "/images/projects/SALU_AFICHE.webp",
      imageFallback: "/images/projects/SALU_AFICHE.png",
      title: "SALÚ",
      description:
        "En una pequeña plaza de toros, la familia propietaria celebra una corrida privada; aplauden la actuación de “Paella” el picador, “Villancico” el banderillero y “Canijo” el torero. “Baco” el toro, a quien le gusta el vino tinto, los sorprende a todos ellos después de enfrentarse a la espada mortal. Distribuye Bogoshorts. Proyecto ganador del FDC",
      key: "Salu",
    },
    {
      id: 3,
      image: "/images/projects/1.AFICHE_LUNES.webp",
      imageFallback: "/images/projects/1.AFICHE_LUNES.png",
      title: "Lunes",
      description:
        "En un colegio desolado y gris, un niño (número 14 de la lista), luchará para proteger su identidad, a pesar de sus calificaciones... Tesis de grado universitario",
      key: "Lunes",
    },
  ];

  useEffect(() => {
    loadFeaturedProjects();
  }, []);

  const loadFeaturedProjects = async () => {
    try {
      const data = await getFeaturedProjects();

      if (data && data.length > 0) {
        setFeaturedProjects(data);
      } else {
        setFeaturedProjects(fallbackProjects);
      }
    } catch (error) {
      console.error("Error loading featured projects, using fallback:", error);
      setFeaturedProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  const normalizeTitle = (title?: string) => {
    return (title || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const getProjectType = (project: any): string => {
    const key = project.key || "";
    const normalizedTitle = normalizeTitle(project.title);

    if (key === "LJDP" || normalizedTitle.includes("joya del pantano")) {
      return "LJDP";
    }

    if (key === "Salu" || normalizedTitle.includes("salu")) {
      return "Salu";
    }

    if (key === "Lunes" || normalizedTitle.includes("lunes")) {
      return "Lunes";
    }

    return "";
  };

  const getPosterObjectPosition = (project: any): string => {
    const projectType = getProjectType(project);

    if (projectType === "Salu") {
      return "center top";
    }

    if (projectType === "Lunes") {
      return "center center";
    }

    return "center center";
  };

  const getProjectImages = (project: any): string[] => {
    const projectType = getProjectType(project);

    if (projectType === "LJDP") {
      const prizeImages = [
        "LJDP-premio.png",
        "LaurelesIbero-FA-Negro.png",
        "LaurelLeaves2024_OficialSelection_ESP.png",
      ].map((name) => `/images/trabajos_destacados/${name}`);

      const baseImages = Array.from(
        { length: 5 },
        (_, i) => `/images/trabajos_destacados/${i + 1}_LJDP.jpg`
      );

      return [...prizeImages, ...baseImages];
    }

    if (projectType === "Salu") {
      return Array.from(
        { length: 5 },
        (_, i) => `/images/trabajos_destacados/${i + 1}.Salu.jpg`
      );
    }

    if (projectType === "Lunes") {
      return [
        "/images/trabajos_destacados/L.COMIC_01_LUNES.png",
        "/images/trabajos_destacados/L.COMIC_02_LUNES.png",
        "/images/trabajos_destacados/L.Premio_Lunes__VideoJove.png",
        "/images/trabajos_destacados/L.LOGO_CINE_CREA.png",
      ];
    }

    if (
      Array.isArray(project.images) &&
      project.images.length > 0 &&
      project.images.every(
        (img: string) => typeof img === "string" && img.trim() !== ""
      )
    ) {
      return project.images;
    }

    return [];
  };

  const getProjectLogos = (
    project: any
  ): { src: string; alt: string; className: string }[] => {
    const projectType = getProjectType(project);

    if (projectType === "Lunes") {
      return [
        {
          src: "/images/trabajos_destacados/L.LOGO_Javeriana.png",
          alt: "Pontificia Universidad Javeriana",
          className: "max-h-20 object-contain",
        },
      ];
    }

    if (projectType === "Salu") {
      return [
        {
          src: "/images/trabajos_destacados/L.LOGO_CINE_CREA.png",
          alt: "Cine Crea",
          className: "max-h-48 object-contain",
        },
      ];
    }

    if (projectType === "LJDP") {
      return [
        {
          src: "/images/trabajos_destacados/L.LOGO_CINE_CREA.png",
          alt: "Cine Crea",
          className: "max-h-48 object-contain",
        },
      ];
    }

    return [];
  };

  const getProjectBackgroundColor = (project: any): string => {
    const projectType = getProjectType(project);

    if (projectType === "LJDP") return "#ffffff";
    if (projectType === "Salu") return "#f3ecdc";
    if (projectType === "Lunes") return "#ffffff";

    return "#1f2937";
  };

  const getProjectKey = (project: any): string => {
    return project.key || `project-${project.id}`;
  };

  const handleCardClick = (projectKey: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [projectKey]: !prev[projectKey],
    }));

    if (!flippedCards[projectKey]) {
      setCurrentSlides((prev) => ({
        ...prev,
        [projectKey]: 0,
      }));
    }
  };

  const nextSlide = (projectKey: string, totalImages: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [projectKey]: ((prev[projectKey] || 0) + 1) % totalImages,
    }));
  };

  const prevSlide = (projectKey: string, totalImages: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [projectKey]: ((prev[projectKey] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const goToSlide = (projectKey: string, index: number) => {
    setCurrentSlides((prev) => ({
      ...prev,
      [projectKey]: index,
    }));
  };

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 amatic-sc-bold text-white">
            Trabajos Destacados
          </h2>
        </div>

        {loading ? (
          <div className="text-center text-gray-400">
            Cargando proyectos destacados...
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center text-gray-400">
            No hay proyectos destacados
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-[57.6rem] mx-auto">
            {featuredProjects.map((project, index) => {
              const projectKey = getProjectKey(project);
              const isFlipped = flippedCards[projectKey] || false;
              const projectImages = getProjectImages(project);
              const currentSlide = currentSlides[projectKey] || 0;
              const projectLogos = getProjectLogos(project);

              const posterImage =
                project.featured_poster ||
                project.image ||
                project.imageFallback ||
                null;

              return (
                <div key={project.id} className="group">
                  <div
                    className="relative w-full aspect-[3/4.2] mb-6 cursor-pointer"
                    style={{ perspective: "1000px" }}
                    onClick={() => handleCardClick(projectKey)}
                  >
                    <div
                      className="relative w-full h-full transition-transform duration-700"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      }}
                    >
                      <div
                        className="absolute inset-0 w-full h-full rounded-lg shadow-2xl bg-gray-900 overflow-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                      >
                        {project.imageFallback && project.image ? (
                          <picture>
                            <source srcSet={project.image} type="image/webp" />
                            <img
                              src={project.imageFallback}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              style={{
                                objectPosition: getPosterObjectPosition(project),
                              }}
                              loading={index === 0 ? "eager" : "lazy"}
                              decoding="async"
                            />
                          </picture>
                        ) : posterImage ? (
                          <img
                            src={posterImage}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            style={{
                              objectPosition: getPosterObjectPosition(project),
                            }}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                            Sin imagen
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>

                      {projectImages.length > 0 && (
                        <div
                          className="absolute inset-0 w-full h-full rounded-lg shadow-2xl overflow-hidden"
                          style={{
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            backgroundColor: (() => {
                              const currentImage = projectImages[currentSlide];

                              const isPrizeImage =
                                currentImage &&
                                (currentImage.includes("LaurelesIbero") ||
                                  currentImage.includes("LaurelLeaves") ||
                                  currentImage.includes("LJDP-premio") ||
                                  currentImage.includes("Premio_Lunes") ||
                                  currentImage.includes("LOGO_CINE_CREA"));

                              return isPrizeImage
                                ? "#ffffff"
                                : getProjectBackgroundColor(project);
                            })(),
                          }}
                        >
                          <div className="relative w-full h-full">
                            {projectImages.map((image, imgIndex) => {
                              const isPrizeImage =
                                image.includes("LaurelesIbero") ||
                                image.includes("LaurelLeaves") ||
                                image.includes("LJDP-premio") ||
                                image.includes("Premio_Lunes") ||
                                image.includes("LOGO_CINE_CREA");

                              const imageScale = image.includes("LJDP-premio")
                                ? 1.2
                                : image.includes("LaurelLeaves")
                                ? 0.7
                                : image.includes("LaurelesIbero")
                                ? 0.9
                                : image.includes("Premio_Lunes")
                                ? 0.95
                                : image.includes("LOGO_CINE_CREA")
                                ? 3.2
                                : 1;

                              return (
                                <div
                                  key={imgIndex}
                                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                    imgIndex === currentSlide
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                  style={
                                    isPrizeImage
                                      ? { backgroundColor: "#ffffff" }
                                      : {}
                                  }
                                >
                                  <img
                                    src={image}
                                    alt={`${project.title} - Imagen ${
                                      imgIndex + 1
                                    }`}
                                    className="w-full h-full object-contain"
                                    style={{
                                      transform: `scale(${imageScale})`,
                                    }}
                                  />
                                </div>
                              );
                            })}

                            {projectImages.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    prevSlide(projectKey, projectImages.length);
                                  }}
                                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300 z-10 shadow-lg"
                                  aria-label="Imagen anterior"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    nextSlide(projectKey, projectImages.length);
                                  }}
                                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300 z-10 shadow-lg"
                                  aria-label="Siguiente imagen"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              </>
                            )}

                            {projectImages.length > 1 && (
                              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                                {projectImages.map((_, imgIndex) => (
                                  <button
                                    key={imgIndex}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      goToSlide(projectKey, imgIndex);
                                    }}
                                    className={`h-2 rounded-full transition-all duration-300 shadow-lg ${
                                      imgIndex === currentSlide
                                        ? "bg-gray-800 w-6"
                                        : "bg-gray-600/70 hover:bg-gray-700 w-2"
                                    }`}
                                    aria-label={`Ir a imagen ${imgIndex + 1}`}
                                  />
                                ))}
                              </div>
                            )}

                            {projectImages.length > 1 && (
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs z-10 shadow-lg">
                                {currentSlide + 1} / {projectImages.length}
                              </div>
                            )}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(projectKey);
                              }}
                              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors z-10"
                              aria-label="Volver"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-600">
                    <h3 className="text-lg font-bold text-white mb-2 text-center">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      {project.featured_description || project.description}
                    </p>

                    {projectLogos.length > 0 && (
                      <div className="flex flex-wrap justify-center items-center gap-4 mt-5">
                        {projectLogos.map((logo) => (
                          <img
                            key={logo.src}
                            src={logo.src}
                            alt={logo.alt}
                            className={logo.className}
                            loading="lazy"
                            decoding="async"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Carousel;