"use client";

import React, { useState, useEffect } from 'react';
import { ExternalLink, Play, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SPRING, SCALE, DURATION, DELAY } from '@/lib/animation-tokens';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  const videoCategories = [
    {
      key: 'spiriwors',
      label: 'Spiriwors Historias Originales',
      videos: [
        {
          id: 1,
          title: 'La Joya Del Pantano',
          videoPath: '/videos/Spiriwors Historias Originales/Trailer_La Joya Del Pantano.mp4',
          description: 'Trailer de la historia original La Joya Del Pantano',
          year: '2024'
        },
        {
          id: 2,
          title: 'SALU',
          videoPath: '/videos/Spiriwors Historias Originales/TRAILER-SALU.mp4',
          description: 'Trailer de la historia original SALU',
          year: '2024'
        }
      ]
    },
    {
      key: 'ube',
      label: 'Un Bosque Encantado',
      videos: [
        {
          id: 3,
          title: 'El Abrazo del Ciempiés',
          videoPath: '/videos/UBE/El%20Abrazo%20del%20Ciempi%C3%A9s%20(Un%20Bosque%20Encantado%202).mov',
          description: 'Un Bosque Encantado 2 - El Abrazo del Ciempiés',
          year: '2024'
        },
        {
          id: 4,
          title: 'LOBOS',
          videoPath: '/videos/UBE/LOBOS%20(Un%20Bosque%20Encantado%202).mp4',
          description: 'Un Bosque Encantado 2 - LOBOS',
          year: '2024'
        }
      ]
    },
    {
      key: 'venturia-historias',
      label: 'Venturia Historias Originales',
      videos: [
        {
          id: 5,
          title: 'COPPOLA',
          videoPath: '/videos/Venturia Historias Originales/COPPOLA.mp4',
          description: 'Historia original COPPOLA',
          year: '2024'
        }
      ]
    },
    {
      key: 'venturia-servicios',
      label: 'Venturia Servicios Creativos',
      videos: [
        {
          id: 6,
          title: 'AJR - My Play',
          videoPath: '/videos/Venturia Servicios Creativos/AJR - My Play (Official Video).mp4',
          description: 'Video oficial de AJR - My Play',
          year: '2024'
        },
        {
          id: 7,
          title: 'ONR - It Gets to a Point',
          videoPath: '/videos/Venturia Servicios Creativos/ONR_It Gets to a Point.mov',
          description: 'Video musical de ONR',
          year: '2024'
        },
        {
          id: 8,
          title: 'We The Kingdom - Christmas In Hawaii',
          videoPath: '/videos/Venturia Servicios Creativos/We The Kingdom - Christmas In Hawaii (Official Music Video).mp4',
          description: 'Video oficial de We The Kingdom',
          year: '2024'
        }
      ]
    }
  ];

  const categories = [
    { key: 'all', label: 'Todos' },
    { key: 'spiriwors', label: 'Spiriwors Historias Originales' },
    { key: 'ube', label: 'Un Bosque Encantado' },
    { key: 'venturia-historias', label: 'Venturia Historias Originales' },
    { key: 'venturia-servicios', label: 'Venturia Servicios Creativos' }
  ];

  const getAllVideos = () => {
    return videoCategories.flatMap(category => category.videos);
  };

  const filteredVideos = filter === 'all' 
    ? getAllVideos()
    : videoCategories.find(cat => cat.key === filter)?.videos || [];

  const handleVideoClick = (videoPath: string) => {
    setSelectedVideo(videoPath);
    setVideoError(null);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setVideoError(null);
  };

  const handleVideoError = () => {
    setVideoError('No se pudo cargar el video. Verifica que el archivo existe y el formato es compatible.');
  };

  // Función para detectar el formato del video
  const getVideoFormat = (videoPath: string) => {
    if (videoPath.includes('.mp4')) return 'mp4';
    if (videoPath.includes('.mov')) return 'mov';
    if (videoPath.includes('.avi')) return 'avi';
    return 'unknown';
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        closeVideoModal();
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  return (
    <section id="projects" className="py-20 bg-gray-700">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 amatic-sc-bold text-white">
              Trabajo
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Una selección de nuestros trabajos más destacados en animación stop-motion y 2D
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.key}
              onClick={() => setFilter(category.key)}
              variant={filter === category.key ? "default" : "outline"}
              className={`px-6 py-2 transition-all duration-300 ${
                filter === category.key
                  ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                  : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <ScrollReveal key={video.id} direction="up" delay={index * DELAY.sm}>
              <motion.div
                className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 will-change-transform"
                whileHover={{ y: -8, scale: SCALE.hover }}
                transition={SPRING.default}
              >
                <div className="relative overflow-hidden">
                  <motion.div
                    className="w-full h-48 bg-gradient-to-br from-yellow-400/20 to-blue-400/20 flex items-center justify-center will-change-transform"
                    whileHover={{ scale: SCALE.hoverLg }}
                    transition={{ duration: DURATION.base }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Play className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-white text-sm">Click para reproducir</p>
                    </div>
                  </motion.div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                    >
                      <Button
                        onClick={() => handleVideoClick(video.videoPath)}
                        className="bg-yellow-400 text-black hover:bg-yellow-500"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Reproducir Video
                      </Button>
                    </motion.div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {video.title}
                    </h3>
                    <span className="text-yellow-400 text-sm font-semibold">
                      {video.year}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4">
                    {video.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
                      Video
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Video Modal - Corregido */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeVideoModal}
          >
            <div 
              className="relative w-full max-w-4xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">
                  Reproduciendo Video
                </h3>
                <Button
                  onClick={closeVideoModal}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                  size="icon"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Contenido del Modal */}
              <div className="p-4">
                {videoError ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-red-400 mb-4 text-lg font-medium">{videoError}</p>
                    <p className="text-gray-300 mb-6">
                      Posibles soluciones:
                    </p>
                    <ul className="text-gray-300 text-sm text-left max-w-md mx-auto mb-6">
                      <li>• Verifica que el archivo existe en la ruta correcta</li>
                      <li>• Usa Chrome o Firefox para mejor compatibilidad</li>
                      <li>• Descarga el video para verlo localmente</li>
                      <li>• Convierte el archivo a formato MP4</li>
                    </ul>
                    <div className="flex gap-4 justify-center">
                      <a 
                        href={selectedVideo} 
                        download 
                        className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
                      >
                        Descargar Video
                      </a>
                      <Button
                        onClick={closeVideoModal}
                        variant="outline"
                        className="border-gray-500 text-gray-300 hover:bg-gray-700"
                      >
                        Cerrar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      src={selectedVideo}
                      controls
                      autoPlay
                      onError={handleVideoError}
                      className="w-full max-h-[70vh] object-contain"
                      preload="metadata"
                      playsInline
                      style={{ maxWidth: '100%', height: 'auto' }}
                    >
                      <source src={selectedVideo} type="video/mp4" />
                      <source src={selectedVideo} type="video/quicktime" />
                      <source src={selectedVideo} type="video/x-msvideo" />
                      Tu navegador no soporta la reproducción de video.
                    </video>
                    
                    {/* Indicador de formato corregido */}
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      Formato .{getVideoFormat(selectedVideo)}
                    </div>
                    
                    {/* Botón de cierre adicional */}
                    <Button
                      onClick={closeVideoModal}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-1 rounded-full"
                      size="icon"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;