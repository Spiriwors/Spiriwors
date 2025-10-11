"use client";

import React from 'react';
import { Film, Palette, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SPRING, DURATION, DELAY } from '@/lib/animation-tokens';

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: 'Servicios Creativos',
      description:
        'Producción y animación para marcas, videoclips y campañas. Nos integramos a tu equipo para diseñar, animar y entregar piezas listas para publicar.',
      features: [
        'Concepto y guion',
        'Dirección de arte',
        'Animación 2D y stop‑motion',
        'Edición y postproducción'
      ]
    },
    {
      icon: Film,
      title: 'Contenidos Originales',
      description:
        'Desarrollo y realización de historias propias: cortos, series y piezas experimentales que exploran nuestro universo creativo.',
      features: [
        'Desarrollo de IP',
        'Pitching y biblias',
        'Producción de cortometrajes',
        'Alianzas y coproducciones'
      ]
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
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <ScrollReveal key={index} direction="up" delay={index * DELAY.md}>
              <motion.div
                className="bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 will-change-transform"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={SPRING.default}
              >
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: DURATION.fast }}
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

        {/* Se removieron Proceso y CTA según solicitud */}
      </div>
    </section>
  );
};

export default Services;