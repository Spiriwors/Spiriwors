"use client";

import React, { useEffect, useState } from 'react';
import { getFeaturedProjects } from '@/lib/supabase/projects';
import { Project } from '@/types/project';

const Carousel = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProjects();
  }, []);

  const loadFeaturedProjects = async () => {
    try {
      const data = await getFeaturedProjects();
      setFeaturedProjects(data);
    } catch (error) {
      console.error('Error loading featured projects:', error);
      setFeaturedProjects([]);
    } finally {
      setLoading(false);
    }
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
        {loading ? (
          <div className="text-center text-gray-400">Cargando proyectos destacados...</div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center text-gray-400">No hay proyectos destacados</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="group">
                {/* Poster Image */}
                <div className="relative overflow-hidden rounded-lg shadow-2xl bg-gray-900 aspect-[3/4.2] mb-6">
                  <img
                    src={project.featured_poster || project.images[0] || '/images/projects/placeholder.jpg'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>

                {/* Content Bubble - Outside the image card */}
                <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-600">
                  <h3 className="text-lg font-bold text-white mb-2 text-center">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed text-center">
                    {project.featured_description || project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Carousel;