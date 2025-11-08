"use client";

import React from 'react';

const Carousel = () => {
  const featuredProjects = [
    {
      id: 1,
      image: '/images/projects/LJDP_HD_FULL_DEFF.webp',
      imageFallback: '/images/projects/LJDP_HD_FULL_DEFF.png',
      title: 'La Joya Del Pantano',
      description: 'Historia original de Spiriwors que combina la magia del stop-motion con una narrativa emotiva sobre la naturaleza y la aventura.',
    },
    {
      id: 2,
      image: '/images/projects/SALU_AFICHE.webp',
      imageFallback: '/images/projects/SALU_AFICHE.png',
      title: 'SALÚ',
      description: 'Proyecto destacado de Spiriwors que muestra la creatividad y técnica única en animación, desarrollando mundos únicos para una experiencia inmersiva.',
    }
  ];

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
          {featuredProjects.map((project, index) => (
            <div key={project.id} className="group">
              {/* Poster Image */}
              <div className="relative overflow-hidden rounded-lg shadow-2xl bg-gray-900 aspect-[3/4.2] mb-6">
                <picture>
                  <source srcSet={project.image} type="image/webp" />
                  <img
                    src={project.imageFallback}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </picture>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;