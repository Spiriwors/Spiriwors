"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { useTheme } from "@/contexts/ThemeContext";

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
                Como un huevo que eclosiona para dar paso a la misteriosa vida
                de una nueva criatura, así son los proyectos de{" "}
                <strong style={{ color: accentColor }}>SPIRIWORS</strong>; una
                palabra que no significa nada, excepto ganas de explorar con
                imaginación cada nuevo proyecto.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Nos gusta la naturaleza artesanal que hay en los dibujos
                animados y el stop motion; un arte hecho con las manos -y el
                corazón-, que busca la belleza del movimiento, el dibujo y la
                escultura, entre muchas otras disciplinas.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.5}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Con más de 20 años de experiencia en la industria, trabajando en
                diversos proyectos, desde comerciales y videoclips hasta
                cortometrajes independientes, la misión de{" "}
                <strong style={{ color: accentColor }}>SPIRIWORS</strong> es
                sorprender a la audiencia y a nuestros clientes… partiendo de la{" "}
                <strong style={{ color: accentColor }}>CREATIVIDAD</strong>, que
                más allá de la técnica, es la que lleva a la innovación
                y originalidad.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={0.55}>
              <div className="mb-10 -ml-4">
                <Image
                  src="/images/signature.png"
                  alt="Camilo Ayala Nieto"
                  width={200}
                  height={128}
                  className="h-23 object-contain"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Content - Image */}
          <ScrollReveal direction="left" delay={0.3}>
            <div className="relative max-w-md mx-auto">
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/about/Foto.jpeg"
                  alt="Equipo Spiriwors"
                  width={600}
                  height={450}
                  className="rounded-lg shadow-2xl w-full object-contain"
                  loading="lazy"
                />
              </motion.div>
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-full h-full rounded-lg -z-10"
                style={{ backgroundColor: `${accentColor}33` }}
                animate={{
                  rotate: [0, 2, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-full h-full bg-blue-400/20 rounded-lg -z-20"
                animate={{
                  rotate: [0, -2, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
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
