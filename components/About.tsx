"use client";

import React, { useEffect, useState } from 'react';
import { Award, Users, Clock, Star } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SPRING } from '@/lib/animation-tokens';

// Counter animation hook
const useCounter = (end: number, duration: number = 2, shouldStart: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * (end - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
};

const StatCounter = ({ icon: Icon, number, label, delay }: any) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Extract numeric value for counter
  const numericValue = parseInt(number.replace(/\D/g, '')) || 0;
  const suffix = number.replace(/\d/g, '');
  const count = useCounter(numericValue, 2, isInView);

  return (
    <ScrollReveal direction="scale" delay={delay}>
      <motion.div
        ref={ref}
        className="text-center"
        whileHover={{ scale: 1.1 }}
        transition={SPRING.default}
      >
        <motion.div
          className="flex justify-center mb-2"
          whileHover={{ scale: 1.15, y: -2 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8 text-yellow-400" />
        </motion.div>
        <div className="text-3xl font-bold text-white mb-1">
          {count}{suffix}
        </div>
        <div className="text-gray-400 text-sm">
          {label}
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

const About = () => {
  const stats = [
    { icon: Award, number: '50+', label: 'Proyectos Completados' },
    { icon: Users, number: '25+', label: 'Clientes Satisfechos' },
    { icon: Clock, number: '5+', label: 'Años de Experiencia' },
    { icon: Star, number: '4.9', label: 'Rating Promedio' }
  ];

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
                Spiriwors es una empresa de animación fundada y dirigida por <strong className="text-yellow-400">Camilo Ayala</strong>,
                ilustrador y animador profesional con más de 5 años de experiencia en la industria.
                Camilo, como fundador y dueño de Spiriwors, ha desarrollado un enfoque único que combina
                sus habilidades como ilustrador con técnicas avanzadas de animación stop-motion y 2D.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Bajo la dirección de Camilo, Spiriwors se especializa en crear experiencias visuales
                únicas que conectan marcas con audiencias. Su visión artística y experiencia técnica
                han llevado a la empresa a trabajar en proyectos diversos, desde comerciales hasta
                cortometrajes independientes, siempre manteniendo la calidad y creatividad como pilares fundamentales.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.5}>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Nuestro enfoque combina las técnicas tradicionales de ilustración y animación con
                tecnología moderna, creando animaciones que no solo son visualmente impactantes,
                sino que también conectan emocionalmente con la audiencia a través de narrativas
                cuidadosamente diseñadas.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <StatCounter
                  key={index}
                  icon={stat.icon}
                  number={stat.number}
                  label={stat.label}
                  delay={0.6 + index * 0.1}
                />
              ))}
            </div>
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
                  src="/images/about/Camilo-Ayala.jpg"
                  alt="Equipo Spiriwors"
                  className="rounded-lg shadow-2xl w-full object-cover h-96"
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