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
                Sobre SpiriWors
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                <strong style={{ color: accentColor }}>SPIRIWORS</strong> nace
                como una criatura que rompe el cascarón hacia lo desconocido. Es
                una palabra creada para definir el acto de explorar a través de
                la imaginación.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Aquí, la animación tradicional y el stop-motion no son solo
                técnicas; son el puente entre la materia y el espíritu. Con las
                manos como herramienta principal, buscamos la vida en el
                movimiento, transformando dibujos y esculturas en historias que
                sorprenden por su autenticidad. En{" "}
                <strong style={{ color: accentColor }}>SPIRIWORS</strong>, cada
                proyecto es un organismo vivo esperando a ser descubierto.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.45}>
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

            <ScrollReveal direction="right" delay={0.5}>
              <h3 className="text-[48px] md:text-4xl font-bold mb-6 amatic-sc-bold text-white leading-tight">
                Sobre mí
              </h3>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.55}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Soy{" "}
                <strong style={{ color: accentColor }}>
                  Camilo Ayala Nieto
                </strong>
                , director y animador con más de 20 años de experiencia
                transformando conceptos en movimiento para videoclips,
                comerciales y cine independiente. Mi trabajo se centra
                principalmente en la{" "}
                <strong style={{ color: accentColor }}>
                  animación 2D en TVPaint
                </strong>
                , donde busco rescatar la textura y la sensibilidad del dibujo a
                mano dentro del entorno digital.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.6}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Esta visión técnica se complementa con mi faceta como{" "}
                <strong style={{ color: accentColor }}>
                  animador stop-motion
                </strong>
                , una disciplina que aporta una perspectiva orgánica y táctil a
                los proyectos.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.65}>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Con base en Colombia y{" "}
                <strong style={{ color: accentColor }}>
                  plena capacidad operativa para la Unión Europea
                </strong>{" "}
                gracias a mi ciudadanía española, trabajo de manera remota para
                estudios y marcas globales. Esta dualidad me permite ofrecer una
                colaboración fluida y sin barreras administrativas, uniendo una
                visión multicultural con la agilidad logística que el mercado
                internacional demanda.
              </p>
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