"use client";

import React, { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reel = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // En una implementación real, aquí controlarías el video
  };

  return (
    <section id="reel" className="py-20 bg-gray-600">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 amatic-sc-bold text-white">
            Reel
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Una compilación de mis mejores trabajos en animación
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Video Container */}
          <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-video relative">
              {/* Video Placeholder */}
              <img 
                src="https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Video Reel"
                className="w-full h-full object-cover"
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center">
                  <Button
                    onClick={handlePlayPause}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black w-20 h-20 rounded-full mb-4 transition-all duration-300 transform hover:scale-110"
                    size="icon"
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                  </Button>
                  <p className="text-white text-lg font-semibold">
                    Demo Reel 2024
                  </p>
                  <p className="text-gray-300">
                    3:45 minutos
                  </p>
                </div>
              </div>

              {/* Video Controls (cuando está reproduciendo) */}
              {isPlaying && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={handlePlayPause}
                        className="bg-transparent hover:bg-gray-700 text-white p-2 rounded"
                        size="icon"
                      >
                        <Pause className="w-5 h-5" />
                      </Button>
                      <Volume2 className="w-5 h-5 text-white" />
                      <div className="w-20 h-1 bg-gray-600 rounded-full">
                        <div className="w-3/4 h-full bg-yellow-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-white text-sm">
                      1:23 / 3:45
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-gray-600 rounded-full mt-3">
                    <div className="w-1/3 h-full bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Info */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Stop-Motion</h3>
              <p className="text-gray-300">Técnicas tradicionales con enfoque moderno</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Animación 2D</h3>
              <p className="text-gray-300">Personajes expresivos y narrativas fluidas</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Técnica Mixta</h3>
              <p className="text-gray-300">Combinación innovadora de medios</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">
              ¿Te gusta lo que ves? Trabajemos juntos en tu próximo proyecto
            </p>
            <Button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 text-lg font-semibold"
            >
              Contáctame
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reel;