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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 amatic-sc-bold text-white">
                Sobre Nosotros
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Como un huevo que eclosiona para dar paso a la misteriosa vida de una nueva criatura, así son los proyectos de <strong style={{ color: accentColor }}>SPIRIWORS</strong>; una palabra garabateada en la mente de un niño que se negó a crecer y quiere compartir la <span style={{ color: accentColor }}>magia</span> y <span style={{ color: accentColor }}>alegría</span> que surgen de la <span style={{ color: accentColor }}>imaginación</span>.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Creemos que la <span style={{ color: accentColor }}>animación</span> realizada con las <span style={{ color: accentColor }}>manos</span> —y el <span style={{ color: accentColor }}>corazón</span>— es el medio idóneo para traer a la vida diversión creativa. Por eso nos gusta la <span style={{ color: accentColor }}>naturaleza artesanal</span> que hay en los <span style={{ color: accentColor }}>dibujos animados</span> y el <span style={{ color: accentColor }}>stop motion</span>; un arte que explora la belleza del <span style={{ color: accentColor }}>movimiento</span>, el <span style={{ color: accentColor }}>dibujo</span> y la <span style={{ color: accentColor }}>escultura</span>, entre muchas otras disciplinas que convergen en la consecución de una <span style={{ color: accentColor }}>historia</span> o <span style={{ color: accentColor }}>idea visual</span> para <span style={{ color: accentColor }}>entretener</span>, <span style={{ color: accentColor }}>conmover</span> o <span style={{ color: accentColor }}>emocionar</span>.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.5}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Con más de <span style={{ color: accentColor }}>20 años de experiencia</span> en la industria, trabajando en diversos proyectos, desde <span style={{ color: accentColor }}>comerciales</span> y <span style={{ color: accentColor }}>videoclips</span>, hasta <span style={{ color: accentColor }}>cortometrajes independientes</span>, la <span style={{ color: accentColor }}>misión</span> de <strong style={{ color: accentColor }}>SPIRIWORS</strong> es <span style={{ color: accentColor }}>sorprender</span> y <span style={{ color: accentColor }}>alegrar</span> a la <span style={{ color: accentColor }}>audiencia</span> y a nuestros <span style={{ color: accentColor }}>clientes</span>… con la convicción de que más allá de la técnica, la <span style={{ color: accentColor }}>innovación</span> y <span style={{ color: accentColor }}>originalidad</span> están siempre en la <span style={{ color: accentColor }}>creatividad</span> inmersa en cada uno de nuestros proyectos.
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