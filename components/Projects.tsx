"use client";

import React, { useState, useEffect } from 'react';
import { ExternalLink, Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SPRING, SCALE, DURATION, DELAY } from '@/lib/animation-tokens';

const Projects = () => {
  const [filter, setFilter] = useState<'all' | '2d' | 'stop'>('all');
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'iframe' | 'video'; src: string } | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Catálogo unificado: categoría por tipo de animación (2D o Stop Motion)
  const projects = [
    // SPIRIWORS – Contenidos Originales
    {
      id: 1,
      title: 'La Joya Del Pantano',
      url: 'https://vimeo.com/896578269?fl=pl&fe=sh',
      description: 'Trailer de la historia original La Joya Del Pantano',
      year: undefined,
      category: '2d' as const
    },
    {
      id: 2,
      title: 'SALÚ',
      url: 'https://vimeo.com/172426682?fl=pl&fe=sh',
      description: 'Trailer de la historia original SALÚ',
      year: undefined,
      category: '2d' as const
    },
    // SPIRIWORS – Servicios Creativos y Animación
    {
      id: 3,
      title: 'Un Bosque Encantado 2 – El Abrazo del Ciempiés',
      url: 'https://www.youtube.com/watch?v=qDt5k1NIWr0&list=RDqDt5k1NIWr0&start_radio=1',
      description: 'Un Bosque Encantado 2 – El Abrazo del Ciempiés',
      year: undefined,
      category: '2d' as const
    },
    {
      id: 4,
      title: 'Un Bosque Encantado 2 – Lobos',
      url: 'https://www.youtube.com/watch?v=zQM8IrGu5Oo&list=RDzQM8IrGu5Oo&start_radio=1',
      description: 'Un Bosque Encantado 2 – Lobos',
      year: undefined,
      category: '2d' as const
    },
    // Venturia Animation Studios – Servicios Creativos
    {
      id: 5,
      title: 'AJR – My Play',
      url: 'https://venturiaanimation.com/portfolio/my-play-ajr/',
      description: 'Cargo: animación – Camilo Ayala. A Creative Service by Venturia Animation Studios. All Rights Reserved.',
      year: undefined,
      category: '2d' as const
    },
    {
      id: 6,
      title: 'ONR – It Gets To a Point',
      url: 'https://venturiaanimation.com/portfolio/it-gets-to-a-point-onr/',
      description: 'Cargo: animación – Camilo Ayala. A Creative Service by Venturia Animation Studios. All Rights Reserved.',
      year: undefined,
      category: '2d' as const
    },
    {
      id: 7,
      title: 'We The Kingdom – Christmas In Hawaii',
      url: 'https://venturiaanimation.com/portfolio/christmas-in-hawaii-we-the-kingdom/',
      description: 'Cargo: modelado de marionetas y animación stop-motion – Camilo Ayala. A Creative Service by Venturia Animation Studios. All Rights Reserved.',
      year: undefined,
      category: 'stop' as const
    },
    {
      id: 8,
      title: 'Satellite – Bebe Rexha & Snoop Dogg',
      url: 'https://venturiaanimation.com/portfolio/satellite-bebe-rexha-snoop-dogg/',
      description: 'Cargo: animación. A Creative Service by Venturia Animation Studios. All Rights Reserved.',
      year: undefined,
      category: '2d' as const
    },
    {
      id: 9,
      title: 'Waldo´s Dream',
      url: 'https://venturiaanimation.com/portfolio/waldos-dream/',
      description: 'Cargo: animación. A Creative Service by Venturia Animation Studios. All Rights Reserved.',
      year: undefined,
      category: '2d' as const
    },
    {
      id: 10,
      title: 'Heroes Collection: Francis Ford Coppola',
      url: 'https://venturiaanimation.com/portfolio/heroes-francis-ford-coppola/',
      description: 'Cargo: Realizador de Animatic y Animador – Camilo Ayala. Original Content by Venturia Animation Studios. All Rights Reserved.',
      year: undefined,
      category: '2d' as const
    }
    // Dinamita Animación – Smiling Symphonies (falta enlace)
  ];

  const filterOptions = [
    { key: 'all', label: 'Todos' },
    { key: '2d', label: 'Animación 2D' },
    { key: 'stop', label: 'Stop Motion' }
  ] as const;

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  // Detección de proveedores y reproducción
  const getYouTubeId = (url: string) => {
    const short = url.match(/youtu\.be\/([\w-]{11})/);
    if (short) return short[1];
    const reg = url.match(/[?&]v=([\w-]{11})/);
    return reg ? reg[1] : null;
  };

  const getVimeoId = (url: string) => {
    const m = url.match(/vimeo\.com\/(\d+)/);
    return m ? m[1] : null;
  };

  const isDirectVideoUrl = (url: string) => /\.(mp4|mov|webm|m4v)(\?.*)?$/i.test(url);

  const buildYouTubeEmbed = (id: string) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  const buildVimeoEmbed = (id: string) => `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`;

  const handlePlayClick = (url: string) => {
    setVideoError(null);
    const yt = getYouTubeId(url);
    if (yt) {
      setSelectedMedia({ type: 'iframe', src: buildYouTubeEmbed(yt) });
      return;
    }
    const vm = getVimeoId(url);
    if (vm) {
      setSelectedMedia({ type: 'iframe', src: buildVimeoEmbed(vm) });
      return;
    }
    if (isDirectVideoUrl(url)) {
      setSelectedMedia({ type: 'video', src: url });
      return;
    }
    // Si no es reproducible en modal, abrir en nueva pestaña
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const closeVideoModal = () => {
    setSelectedMedia(null);
    setVideoError(null);
  };

  const handleVideoError = () => {
    setVideoError('No se pudo cargar el video. Verifica que el archivo existe y el formato es compatible.');
  };

  const getVideoFormat = (videoPath: string) => {
    if (videoPath.includes('.mp4')) return 'mp4';
    if (videoPath.includes('.mov')) return 'mov';
    if (videoPath.includes('.avi')) return 'avi';
    if (videoPath.includes('.webm')) return 'webm';
    return 'unknown';
  };

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedMedia) {
        closeVideoModal();
      }
    };

    if (selectedMedia) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedMedia]);

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
          {filteredProjects.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" delay={index * DELAY.sm}>
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
                        onClick={() => handlePlayClick(item.url)}
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
                      {item.title}
                    </h3>
                    {item.year ? (
                      <span className="text-yellow-400 text-sm font-semibold">{item.year}</span>
                    ) : (
                      <span className="text-yellow-400/60 text-sm font-semibold">&nbsp;</span>
                    )}
                  </div>

                  <p className="text-gray-300 mb-4">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
                      {item.category === '2d' ? '2D' : 'Stop Motion'}
                    </span>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label="Abrir enlace externo">
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Video Modal - Animated */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.base }}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={closeVideoModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: DURATION.medium, ease: 'easeOut' }}
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
                        href={selectedMedia?.src} 
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
                    {selectedMedia.type === 'iframe' ? (
                      <iframe
                        src={selectedMedia.src}
                        className="w-full aspect-video"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={selectedMedia.src}
                        controls
                        autoPlay
                        onError={handleVideoError}
                        className="w-full max-h-[70vh] object-contain"
                        preload="auto"
                        playsInline
                        style={{ maxWidth: '100%', height: 'auto' }}
                      >
                        <source src={selectedMedia.src} type="video/mp4" />
                        <source src={selectedMedia.src} type="video/quicktime" />
                        <source src={selectedMedia.src} type="video/x-msvideo" />
                        Tu navegador no soporta la reproducción de video.
                      </video>
                    )}
                    
                    {/* Indicador de formato corregido */}
                    {selectedMedia.type === 'video' && (
                      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Formato .{getVideoFormat(selectedMedia.src)}
                      </div>
                    )}
                    
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;