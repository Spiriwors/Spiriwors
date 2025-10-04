"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Carousel from '@/components/Carousel';
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

      {/* Portfolio / Projects */}
      <Projects />
      <Carousel />

      {/* Additional sections */}
      <About />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}