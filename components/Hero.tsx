"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LightParticles } from "@/components/animations/LightParticles";
import { DURATION, DELAY, EASING } from "@/lib/animation-tokens";

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
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

  // Try to autoplay the background video when ready
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const playPromise = v.play();
      if (playPromise && typeof (playPromise as any).then === 'function') {
        (playPromise as Promise<void>).catch(() => {
          v.muted = true;
          v.play().catch(() => {});
        });
      }
    };
    if (v.readyState >= 2) tryPlay();
    v.addEventListener('loadeddata', tryPlay);
    return () => v.removeEventListener('loadeddata', tryPlay);
  }, []);

  

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
        {/* Fallback gradient if video fails or while loading */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <video
          ref={videoRef}
          id="hero-bg-video"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src="/gif/Gif.mov"
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
        >
          <source src="/gif/Gif.mov" type="video/quicktime" />
          <source src="/gif/Gif.mp4" type="video/mp4" />
          <source src="/gif/Gif.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Floating Particles - Lightweight CSS version */}
      <LightParticles count={30} />

      {/* Animated Background Elements with Parallax */}
      <motion.div
        className="absolute inset-0 z-10 will-change-transform"
        style={{ y: y2 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-lg will-change-transform"
          animate={
            isInView
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }
              : {}
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: EASING.easeInOut,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-lg will-change-transform"
          animate={
            isInView
              ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                }
              : {}
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: EASING.easeInOut,
            delay: 1,
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity, scale }}
      >
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight amatic-sc-bold whitespace-nowrap">
            <motion.span
              className="inline-block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent will-change-transform-opacity"
              initial={{ opacity: 0, x: -100, rotateY: -90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: DURATION.slow,
                delay: DELAY.md,
                ease: EASING.spiriwors,
              }}
            >
              SPIRI
            </motion.span>
            {/* no space */}
            <motion.span
              className="inline-block bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent will-change-transform-opacity"
              initial={{ opacity: 0, x: 100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: DURATION.slow,
                delay: DELAY.lg,
                ease: EASING.spiriwors,
              }}
            >
              WORS
            </motion.span>
          </h1>
        </div>

        
      </motion.div>

      {/* Scroll Indicator - Outside content div */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-yellow-400" />
      </motion.div>
    </section>
  );
};

export default Hero;
