"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FloatingParticles } from '@/components/animations/FloatingParticles';
import { DURATION, DELAY, SCALE, EASING } from '@/lib/animation-tokens';

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Track if hero is in viewport to pause animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToReel = () => {
    document.querySelector('#reel')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: y1 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </motion.div>

      {/* Floating Particles */}
      <FloatingParticles count={30} />

      {/* Animated Background Elements with Parallax */}
      <motion.div
        className="absolute inset-0 z-10 will-change-transform"
        style={{ y: y2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl will-change-transform"
          animate={isInView ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: EASING.easeInOut
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl will-change-transform"
          animate={isInView ? {
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          } : {}}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: EASING.easeInOut,
            delay: 1
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity, scale }}
      >
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight amatic-sc-bold">
            <motion.span
              className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent will-change-transform-opacity"
              initial={{ opacity: 0, x: -100, rotateY: -90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: DURATION.slow,
                delay: DELAY.md,
                ease: EASING.spiriwors
              }}
            >
              SPIRI
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent will-change-transform-opacity"
              initial={{ opacity: 0, x: 100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: DURATION.slow,
                delay: DELAY.lg,
                ease: EASING.spiriwors
              }}
            >
              WORS
            </motion.span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-gray-300 mb-4 amatic-sc-regular">
            Empresa de Animación
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Especialistas en <span className="text-yellow-400 font-semibold">Stop-Motion</span> y
            <span className="text-yellow-400 font-semibold"> Animación 2D</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: SCALE.hoverMd }}
            whileTap={{ scale: SCALE.down }}
            className="will-change-transform"
          >
            <Button
              onClick={scrollToProjects}
              className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Ver Proyectos
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: SCALE.hoverMd }}
            whileTap={{ scale: SCALE.down }}
            className="will-change-transform"
          >
            <Button
              onClick={scrollToReel}
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Ver Reel
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6 text-yellow-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;