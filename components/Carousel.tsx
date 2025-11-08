"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Carousel = () => {
  // Estado para controlar qué tarjetas están giradas (por proyecto)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  // Estado para controlar el slide actual de cada proyecto
  const [currentSlides, setCurrentSlides] = useState<Record<string, number>>({});

  const featuredProjects = [
    {
      id: 1,
      image: '/images/projects/LJDP_HD_FULL_DEFF.webp',
      imageFallback: '/images/projects/LJDP_HD_FULL_DEFF.png',
      title: 'La Joya Del Pantano',
      description: 'Historia original de Spiriwors que combina la magia del stop-motion con una narrativa emotiva sobre la naturaleza y la aventura.',
      key: 'LJDP',
    },
    {
      id: 2,
      image: '/images/projects/SALU_AFICHE.webp',
      imageFallback: '/images/projects/SALU_AFICHE.png',
      title: 'SALÚ',
      description: 'Proyecto destacado de Spiriwors que muestra la creatividad y técnica única en animación, desarrollando mundos únicos para una experiencia inmersiva.',
      key: 'Salu',
    }
  ];

  // Función para obtener las imágenes según el proyecto
  const getProjectImages = (projectKey: string): string[] => {
    if (projectKey === 'LJDP') {
      // Las 3 imágenes de premios van primero (LJDP premio es la primera)
      const prizeImages = [
        'LJDP premio.png',
        'LaurelesIbero-FA-Negro.png',
        'LaurelLeaves2024_OficialSelection_ESP.png'
      ].map(name => `/images/trabajos_destacados/${encodeURIComponent(name)}`);
      
      // Luego las 5 imágenes normales
      const baseImages = Array.from({ length: 5 }, (_, i) => 
        `/images/trabajos_destacados/${i + 1}_LJDP.jpg`
      );
      
      // Combinar: premios primero, luego imágenes normales
      return [...prizeImages, ...baseImages];
    }
    if (projectKey === 'Salu') {
      return Array.from({ length: 5 }, (_, i) => 
        `/images/trabajos_destacados/${i + 1}.Salu.jpg`
      );
    }
    return [];
  };

  // Función para obtener el color de fondo según el proyecto
  const getProjectBackgroundColor = (projectKey: string): string => {
    if (projectKey === 'LJDP') {
      return '#ffffff'; // Blanco para La Joya Del Pantano
    }
    if (projectKey === 'Salu') {
      return '#f3ecdc'; // Beige para SALÚ
    }
    return '#1f2937'; // Fallback gris oscuro
  };

  const handleCardClick = (projectKey: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [projectKey]: !prev[projectKey],
    }));
    // Resetear slide cuando se gira la tarjeta
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

        {/* Posters Grid - Two side by side */}
        <div className="grid md:grid-cols-2 gap-8 max-w-[57.6rem] mx-auto">
          {featuredProjects.map((project, index) => {
            const isFlipped = flippedCards[project.key] || false;
            const projectImages = getProjectImages(project.key);
            const currentSlide = currentSlides[project.key] || 0;

            return (
              <div key={project.id} className="group">
                {/* Card Container con efecto Flip 3D */}
                <div
                  className="relative w-full aspect-[3/4.2] mb-6 cursor-pointer"
                  style={{
                    perspective: "1000px",
                  }}
                  onClick={() => handleCardClick(project.key)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* Frente de la Tarjeta - Poster */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-lg shadow-2xl bg-gray-900 overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <picture>
                        <source srcSet={project.image} type="image/webp" />
                        <img
                          src={project.imageFallback}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </picture>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>

                    {/* Parte Trasera de la Tarjeta - Carrusel */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-lg shadow-2xl overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundColor: (() => {
                          const currentImage = projectImages[currentSlide];
                          const isPrizeImage = currentImage && (
                            currentImage.includes('LaurelesIbero') || 
                            currentImage.includes('LaurelLeaves') || 
                            currentImage.includes('LJDP premio')
                          );
                          return isPrizeImage ? '#ffffff' : getProjectBackgroundColor(project.key);
                        })(),
                      }}
                    >
                      <div className="relative w-full h-full">
                        {/* Imágenes del Carrusel */}
                        {projectImages.map((image, imgIndex) => {
                          const isPrizeImage = image.includes('LaurelesIbero') || 
                                             image.includes('LaurelLeaves') || 
                                             image.includes('LJDP premio');
                          return (
                            <div
                              key={imgIndex}
                              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                imgIndex === currentSlide ? "opacity-100" : "opacity-0"
                              }`}
                              style={isPrizeImage ? { backgroundColor: '#ffffff' } : {}}
                            >
                              <img
                                src={image}
                                alt={`${project.title} - Imagen ${imgIndex + 1}`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          );
                        })}

                        {/* Botones de Navegación */}
                        {projectImages.length > 1 && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevSlide(project.key, projectImages.length);
                              }}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300 z-10 shadow-lg"
                              aria-label="Imagen anterior"
                            >
                              <ChevronLeft className="w-5 h-5" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextSlide(project.key, projectImages.length);
                              }}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-all duration-300 z-10 shadow-lg"
                              aria-label="Siguiente imagen"
                            >
                              <ChevronRight className="w-5 h-5" />
                            </button>
                          </>
                        )}

                        {/* Indicadores */}
                        {projectImages.length > 1 && (
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                            {projectImages.map((_, imgIndex) => (
                              <button
                                key={imgIndex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToSlide(project.key, imgIndex);
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

                        {/* Contador de Imágenes */}
                        {projectImages.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs z-10 shadow-lg">
                            {currentSlide + 1} / {projectImages.length}
                          </div>
                        )}

                        {/* Botón para Volver */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(project.key);
                          }}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors z-10"
                          aria-label="Volver"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Bubble - Outside the image card */}
                <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-600">
                  <h3 className="text-lg font-bold text-white mb-2 text-center">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed text-center">
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Carousel;