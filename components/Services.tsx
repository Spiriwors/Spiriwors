"use client";

import React from 'react';
import { Film, Palette, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SPRING, DURATION, DELAY } from '@/lib/animation-tokens';
import { useTheme } from '@/contexts/ThemeContext';

const Services = () => {
  const { accentColor } = useTheme();
  const services = [
    {
      icon: Palette,
      title: 'Servicios Creativos y Dirección',
      description: 'Animación para marcas, videoclips y campañas.',
      features: [
        'Animación 2D y stop‑motion',
        'Dirección de arte',
        'Postproducción'
      ]
    },
    {
      icon: Film,
      title: 'Contenidos Originales',
      description: 'Desarrollo y producción de historias propias.',
      features: [
        'Cortometrajes',
        'Series',
        'Coproducciones'
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-700">
      <div className="container mx-auto px-6">
        {/* Services Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <h2 className="text-[60px] md:text-5xl font-bold mb-4 amatic-sc-bold text-white leading-tight">
              Servicios
            </h2>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={index} direction="up" delay={index * DELAY.md}>
              <motion.div
                className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 will-change-transform"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={SPRING.default}
              >
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: DURATION.fast }}
                >
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                    <service.icon className="w-8 h-8 text-black" />
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-white text-center mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-300 text-center mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center justify-center text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <Star className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: accentColor }} />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;