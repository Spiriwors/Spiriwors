"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { SimpleFade } from '@/components/SimpleFade';

// Dynamic imports for below-the-fold components to reduce initial bundle size
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false });
const About = dynamic(() => import('@/components/About'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Contact = dynamic(() => import('@/components/ContactWrapper'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/animations/CustomCursor').then(mod => ({ default: mod.CustomCursor })), { ssr: false });

export default function Home() {
  return (
    <main className="bg-gray-700 text-white overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Header / Intro - Has built-in fade */}
      <Hero />

      {/* All sections fade in as they scroll into view */}
      <SimpleFade>
        <Projects />
      </SimpleFade>

      <SimpleFade>
        <About />
      </SimpleFade>

      <SimpleFade>
        <Carousel />
      </SimpleFade>

      <SimpleFade>
        <Services />
      </SimpleFade>

      <SimpleFade>
        <Contact />
      </SimpleFade>

      <SimpleFade>
        <Footer />
      </SimpleFade>
    </main>
  );
}