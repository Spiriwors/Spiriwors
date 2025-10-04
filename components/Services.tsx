"use client";

import React from 'react';
import { Film, Palette, Video, Users, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const Services = () => {
  const services = [
    {
      icon: Film,
      title: 'Animación Stop-Motion',
      description: 'Creación de animaciones frame por frame con objetos físicos para comerciales, cortometrajes y contenido creativo.',
      features: ['Storyboarding', 'Diseño de sets', 'Iluminación profesional', 'Post-producción']
    },
    {
      icon: Palette,
      title: 'Animación 2D',
      description: 'Desarrollo de animaciones digitales expresivas con técnicas tradicionales y herramientas modernas.',
      features: ['Diseño de personajes', 'Animación fluida', 'Efectos visuales', 'Composición digital']
    },
    {
      icon: Video,
      title: 'Video Promocional',
      description: 'Producción completa de videos animados para marketing, explicativos y contenido corporativo.',
      features: ['Guión creativo', 'Dirección artística', 'Sonido y música', 'Distribución multiplataforma']
    }
  ];

  const process = [
    { step: '01', title: 'Concepto', description: 'Definimos la idea y desarrollamos el concepto creativo' },
    { step: '02', title: 'Pre-producción', description: 'Storyboard, diseño de personajes y planificación técnica' },
    { step: '03', title: 'Producción', description: 'Animación frame por frame con atención al detalle' },
    { step: '04', title: 'Post-producción', description: 'Edición, efectos, sonido y entrega final' }
  ];

  return (
    <section id="services" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Services Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 amatic-sc-bold text-white">
              Servicios
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ofrecemos servicios completos de animación para hacer realidad tu visión creativa
            </p>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.2}>
              <motion.div
                className="bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-black" />
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <Star className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gray-900 rounded-lg p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center text-white mb-4 amatic-sc-bold">
            Proceso
          </h3>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Un enfoque estructurado que garantiza resultados excepcionales en cada proyecto
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                  {step.step}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-gray-300">
                  {step.description}
                </p>
                
                {/* Connection Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-yellow-400/30 transform -translate-y-1/2 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4 amatic-sc-bold">
            ¿Listo para comenzar tu proyecto?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Conversemos sobre tu idea y cómo podemos ayudarte a llevarla al siguiente nivel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Solicitar Cotización
            </button>
            <button 
              onClick={() => document.querySelector('#reel')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Ver Mi Trabajo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;