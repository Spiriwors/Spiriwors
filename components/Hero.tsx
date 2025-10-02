"use client";

import React from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReel = () => {
    document.querySelector('#reel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight amatic-sc-bold">
            <span className="block text-white">SPIRI</span>
            <span className="block text-yellow-400">WORS</span>
          </h1>
        </div>
        
        <div className="mb-8 animate-fade-in-up delay-300">
          <p className="text-xl md:text-2xl text-gray-300 mb-4 amatic-sc-regular">
            Empresa de Animación
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Especialistas en <span className="text-yellow-400 font-semibold">Stop-Motion</span> y 
            <span className="text-yellow-400 font-semibold"> Animación 2D</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
          <Button 
            onClick={scrollToProjects}
            className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Ver Proyectos
          </Button>
          <Button 
            onClick={scrollToReel}
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            Ver Reel
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-yellow-400" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        .delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Hero;