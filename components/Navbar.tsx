"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DURATION } from '@/lib/animation-tokens';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      const isScrollingDown = currentY > lastScrollYRef.current;
      const nearTop = currentY < 10;

      if (isOpen) {
        setIsHidden(false);
      } else {
        if (isScrollingDown && !nearTop) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      }

      lastScrollYRef.current = currentY;

      // Detect active section
      const sections = ['hero', 'projects', 'about', 'services', 'contact'];
      const scrollPosition = currentY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const navItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Acerca', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Contacto', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: isHidden ? '-100%' : '0%', opacity: isHidden ? 0 : 1 }}
      transition={{ duration: DURATION.base }}
      className="fixed top-0 w-full z-50 transition-all duration-300 bg-transparent py-6 amatic-sc-bold"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: DURATION.fast }}
          >
            <img
              src="/assets/SW.png"
              alt="Spiriwors Logo"
              className="w-16 h-16 object-contain"
              width="64"
              height="64"
              loading="eager"
              decoding="async"
            />
            <span className="text-3xl md:text-4xl font-bold amatic-sc-bold">SPIRIWORS</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative font-medium transition-colors duration-200 group text-xl md:text-2xl"
                >
                  <span className={isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}>
                    {item.name}
                  </span>
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-yellow-400"
                    initial={{ width: isActive ? '100%' : '0%' }}
                    whileHover={{ width: '100%' }}
                    animate={{ width: isActive ? '100%' : '0%' }}
                    transition={{ duration: DURATION.fast }}
                  />
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: DURATION.base }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 py-4 bg-gray-800/95 backdrop-blur-sm rounded-lg">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: DURATION.fast }}
                      className={`block w-full text-left px-4 py-2 transition-colors duration-200 text-2xl ${
                        isActive ? 'text-yellow-400 bg-yellow-400/10' : 'hover:text-yellow-400'
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;