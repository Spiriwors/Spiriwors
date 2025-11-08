"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { useTheme } from '@/contexts/ThemeContext';


const About = () => {
  const { accentColor } = useTheme();

  return (
    <section id="about" className="py-20 bg-gray-600">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <ScrollReveal direction="right" delay={0.2}>
              <h2 className="text-[60px] md:text-5xl font-bold mb-6 amatic-sc-bold text-white leading-tight">
                Sobre Spiriwors
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Como un huevo que eclosiona para dar paso a la misteriosa vida de una nueva criatura, así son los proyectos de <strong style={{ color: accentColor }}>SPIRIWORS</strong>; una palabra garabateada en la mente de un niño que se negó a crecer y quiere compartir la magia y alegría que surgen de la imaginación.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Creemos que la animación realizada con las manos —y el corazón— es el medio idóneo para traer a la vida diversión creativa. Por eso nos gusta la naturaleza artesanal que hay en los dibujos animados y el stop motion; un arte que explora la belleza del movimiento, el dibujo y la escultura, entre muchas otras disciplinas que convergen en la consecución de una historia o idea visual para entretener, conmover o emocionar.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.5}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Con más de 20 años de experiencia en la industria, trabajando en diversos proyectos, desde comerciales y videoclips, hasta cortometrajes independientes, la <span style={{ color: accentColor }}>misión</span> de <strong style={{ color: accentColor }}>SPIRIWORS</strong> es sorprender y alegrar a la audiencia y a nuestros clientes… con la convicción de que más allá de la técnica, la <span style={{ color: accentColor }}>innovación</span> y la <span style={{ color: accentColor }}>creatividad</span> están siempre en cada uno de nuestros proyectos.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.55}>
              <p className="text-lg text-gray-300 italic mb-8">
                <span style={{ color: accentColor }}>Camilo Ayala Nieto.</span>
              </p>
            </ScrollReveal>

          </div>

          {/* Right Content - Image */}
          <ScrollReveal direction="left" delay={0.3}>
            <div className="relative">
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/images/about/Foto.jpeg"
                  alt="Equipo Spiriwors"
                  className="rounded-lg shadow-2xl w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-full h-full rounded-lg -z-10"
                style={{ backgroundColor: `${accentColor}33` }}
                animate={{
                  rotate: [0, 2, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-full h-full bg-blue-400/20 rounded-lg -z-20"
                animate={{
                  rotate: [0, -2, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default About;