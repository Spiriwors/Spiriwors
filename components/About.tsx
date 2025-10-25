"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';


const About = () => {

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
                Como un huevo que eclosiona para dar paso a la misteriosa vida de una nueva criatura, así son los proyectos de <strong className="text-yellow-400">SPIRIWORS</strong>; una palabra garabateada en la mente de un niño que se negó a crecer y quiere compartir la <span className="text-yellow-400">magia</span> y <span className="text-yellow-400">alegría</span> que surgen de la <span className="text-yellow-400">imaginación</span>.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Creemos que la <span className="text-yellow-400">animación</span> realizada con las <span className="text-yellow-400">manos</span> —y el <span className="text-yellow-400">corazón</span>— es el medio idóneo para traer a la vida diversión creativa. Por eso nos gusta la <span className="text-yellow-400">naturaleza artesanal</span> que hay en los <span className="text-yellow-400">dibujos animados</span> y el <span className="text-yellow-400">stop motion</span>; un arte que explora la belleza del <span className="text-yellow-400">movimiento</span>, el <span className="text-yellow-400">dibujo</span> y la <span className="text-yellow-400">escultura</span>, entre muchas otras disciplinas que convergen en la consecución de una <span className="text-yellow-400">historia</span> o <span className="text-yellow-400">idea visual</span> para <span className="text-yellow-400">entretener</span>, <span className="text-yellow-400">conmover</span> o <span className="text-yellow-400">emocionar</span>.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.5}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Con más de <span className="text-yellow-400">20 años de experiencia</span> en la industria, trabajando en diversos proyectos, desde <span className="text-yellow-400">comerciales</span> y <span className="text-yellow-400">videoclips</span>, hasta <span className="text-yellow-400">cortometrajes independientes</span>, la <span className="text-yellow-400">misión</span> de <strong className="text-yellow-400">SPIRIWORS</strong> es <span className="text-yellow-400">sorprender</span> y <span className="text-yellow-400">alegrar</span> a la <span className="text-yellow-400">audiencia</span> y a nuestros <span className="text-yellow-400">clientes</span>… con la convicción de que más allá de la técnica, la <span className="text-yellow-400">innovación</span> y <span className="text-yellow-400">originalidad</span> están siempre en la <span className="text-yellow-400">creatividad</span> inmersa en cada uno de nuestros proyectos.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.55}>
              <p className="text-lg text-gray-300 italic mb-8">
                <span className="text-yellow-400">Camilo Ayala Nieto.</span>
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
                className="absolute -top-4 -left-4 w-full h-full bg-yellow-400/20 rounded-lg -z-10"
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