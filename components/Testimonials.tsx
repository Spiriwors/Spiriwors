"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'María González',
      position: 'Directora Creativa, Agencia Creativa',
      image: 'https://images.pexels.com/photos/3760811/pexels-photo-3760811.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 5,
      text: 'El trabajo de Camilo superó todas nuestras expectativas. Su atención al detalle y creatividad hicieron que nuestro comercial navideño fuera un éxito rotundo.'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      position: 'Productor, Netflix',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 5,
      text: 'Profesional excepcional. Camilo entregó una serie animada de alta calidad dentro del presupuesto y los tiempos acordados. Definitivamente volveremos a trabajar juntos.'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      position: 'Directora de Marketing, Startup Tech',
      image: 'https://images.pexels.com/photos/3760809/pexels-photo-3760809.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 5,
      text: 'La animación explicativa que creó Camilo para nuestro producto ayudó a aumentar nuestras conversiones en un 40%. Su enfoque estratégico es impresionante.'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 amatic-sc-bold text-white">
            Testimonios
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Testimonios reales de clientes satisfechos con nuestro trabajo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4">
                <Quote className="w-8 h-8 text-yellow-400/30" />
              </div>

              {/* Rating */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gray-800 rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-gray-300">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-gray-300">Clientes Felices</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">4.9</div>
              <div className="text-gray-300">Rating Promedio</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-300">Proyectos Entregados a Tiempo</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-300 mb-8">
            ¿Quieres ser nuestro próximo cliente satisfecho?
          </p>
          <button 
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Empezar Mi Proyecto
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;