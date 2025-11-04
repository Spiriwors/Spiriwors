"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { DELAY } from "@/lib/animation-tokens";
import MegaCard from "@/components/ui/megaCard";
import ParallaxAnimation from "@/components/ParallaxAnimation";
import { useTheme } from "@/contexts/ThemeContext";
import { getProjects } from "@/lib/supabase/projects";
import { Project } from "@/types/project";

const Projects = () => {
  const [filter, setFilter] = useState<"all" | "2d" | "stop">("all");
  const { accentColor } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      // Fallback a datos vacíos si falla
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };


  const filterOptions = [
    { key: "all", label: "Todos" },
    { key: "2d", label: "Animación 2D" },
    { key: "stop", label: "Stop Motion" },
  ] as const;

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Convertir imágenes de Supabase a formato MegaCard
  const getProjectImages = (project: Project) => {
    // Si tiene imágenes de Supabase, usarlas
    if (project.images && project.images.length > 0) {
      return project.images.map((url, i) => ({
        src: url,
        alt: `${project.title} - Imagen ${i + 1}`,
        title: project.title,
      }));
    }

    // Fallback para compatibilidad con imágenes antiguas
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 amatic-sc-bold text-white">
              Trabajo
            </h2>
          </div>
        </ScrollReveal>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((category) => (
            <Button
              key={category.key}
              onClick={() => setFilter(category.key)}
              variant={filter === category.key ? "default" : "outline"}
              className={`px-6 py-2 transition-all duration-300 ${
                filter === category.key
                  ? "text-white"
                  : ""
              }`}
              style={
                filter === category.key
                  ? { backgroundColor: accentColor }
                  : { borderColor: accentColor, color: accentColor }
              }
              onMouseEnter={(e) => {
                if (filter !== category.key) {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.color = 'white';
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== category.key) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = accentColor;
                }
              }}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* MegaCard Grid */}
        {loading ? (
          <div className="text-center text-gray-400">Cargando proyectos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {filteredProjects.map((item, index) => {
              console.log('Rendering project:', item.title, 'Video URL:', item.video_url);
              return (
                <MegaCard
                  key={item.id}
                  images={getProjectImages(item)}
                  videoSrc={item.video_url}
                  videoTitle={item.title}
                />
              );
            })}
            {/* Parallax Animation en el espacio vacío */}
            {filteredProjects.length === 11 && (
              <div className="w-full max-w-md mx-auto">
                <ParallaxAnimation frameRate={15} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
