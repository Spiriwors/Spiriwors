"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { CustomCursor } from '@/components/animations/CustomCursor';

export default function Home() {
  return (
    <main className="bg-gray-700 text-white overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      {/* Header / Intro */}
      <Hero />

      {/* Brief company description */}
      <section className="py-16 bg-gray-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 amatic-sc-bold text-white">
            Spiriwors
          </h2>
          <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Somos una empresa especializada en animación y producción visual, fundada y dirigida por 
            <strong className="text-yellow-400"> Camilo Ayala</strong>, ilustrador y animador profesional. 
            Creamos experiencias únicas que conectan marcas con audiencias a través de historias visuales 
            impactantes, combinando las habilidades artísticas de Camilo con técnicas avanzadas de 
            animación stop-motion y 2D.
          </p>
        </div>
      </section>
      
      {/* Portfolio / Projects */}
      <Projects />

      {/* Additional sections */}
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}