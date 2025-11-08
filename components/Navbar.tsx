"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DURATION } from '@/lib/animation-tokens';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const { theme, toggleTheme, accentColor } = useTheme();

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
              src="/assets/logoSW_beige.png"
              alt="Spiriwors Logo"
              className="w-16 h-16 object-contain cursor-pointer"
              width="64"
              height="64"
              loading="eager"
              decoding="async"
              onClick={() => window.location.reload()}
            />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="relative font-medium transition-colors duration-200 group text-xl md:text-2xl"
                  >
                    <span style={{ color: isActive ? accentColor : 'white' }} className="hover:opacity-80">
                      {item.name}
                    </span>
                    {/* Animated underline */}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5"
                      style={{ backgroundColor: accentColor }}
                      initial={{ width: isActive ? '100%' : '0%' }}
                      whileHover={{ width: '100%' }}
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: DURATION.fast }}
                    />
                  </button>
                );
              })}
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-white/10"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{ color: accentColor }}
            >
              {theme === 'light' ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-white/10"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{ color: accentColor }}
            >
              {theme === 'light' ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-lg transition-all duration-200 hover:bg-white/10"
              style={{ color: accentColor }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.fast }}
                className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/60 backdrop-blur-md z-40 md:hidden"
                onClick={() => setIsOpen(false)}
                style={{ width: '100vw', height: '100vh' }}
              />
              
              {/* Slide-in Menu */}
              <motion.div
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: DURATION.base, ease: 'easeInOut' }}
                className="fixed top-0 left-0 right-0 h-full w-full bg-gray-900/98 backdrop-blur-md z-50 md:hidden shadow-2xl"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                    <h2 className="text-4xl font-bold text-white amatic-sc-bold">Menú</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-800"
                      aria-label="Close menu"
                      style={{ color: accentColor }}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto py-4">
                    {navItems.map((item, index) => {
                      const isActive = activeSection === item.href.replace('#', '');
                      return (
                        <motion.button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08, duration: DURATION.fast }}
                          className={`block w-full text-left px-6 py-5 transition-all duration-200 text-3xl font-medium ${
                            isActive ? '' : 'hover:bg-gray-800/50'
                          }`}
                          style={isActive ? { 
                            color: accentColor, 
                            backgroundColor: `${accentColor}15`,
                            borderLeft: `3px solid ${accentColor}`
                          } : { color: 'white' }}
                        >
                          {item.name}
                        </motion.button>
                      );
                    })}
                  </div>
                  
                  {/* Footer */}
                  <div className="p-6 border-t border-gray-700/50">
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                      <span>Spiriwors</span>
                      <span>•</span>
                      <span>2024</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;