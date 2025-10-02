"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/images/projects/LJDP_HD_FULL_DEFF.png',
      title: 'La Joya Del Pantano',
      description: 'Historia original de Spiriwors que combina la magia del stop-motion con una narrativa emotiva sobre la naturaleza y la aventura.',
      category: 'Spiriwors Historias Originales'
    },
    {
      id: 2,
      image: '/images/projects/SALU_AFICHE.png',
      title: 'SALU',
      description: 'Proyecto destacado de Spiriwors que muestra la creatividad y técnica única en animación, desarrollando mundos únicos para una experiencia inmersiva.',
      category: 'Spiriwors Historias Originales'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 amatic-sc-bold text-white">
            Trabajos Destacados
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={slide.id} className="w-full flex-shrink-0 relative">
                  <div className="relative h-[600px] md:h-[700px]">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-contain bg-gray-900"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>
                  
                  {/* Slide Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-3xl">
                      <span className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        {slide.category}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mb-4">
                        {slide.title}
                      </h3>
                      <p className="text-lg text-gray-200">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            size="icon"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          
          <Button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
            size="icon"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-yellow-400' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;