"use client";

import React from 'react';
import { Instagram, Linkedin, Youtube, Mail, Heart, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { accentColor, theme, toggleTheme } = useTheme();

  const quickLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Sobre Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Contacto', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Instagram, url: 'https://instagram.com/spiriwors', label: 'Instagram', username: '@spiriwors' },
    { icon: Linkedin, url: 'https://linkedin.com/company/spiriwors', label: 'LinkedIn', username: 'Spiriwors' },
    { icon: Youtube, url: 'https://youtube.com/@spiriwors', label: 'YouTube', username: 'Spiriwors Studio' },
    { icon: Mail, url: 'mailto:hola@spiriwors.com', label: 'Email', username: 'hola@spiriwors.com' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/assets/SW.png"
                alt="Spiriwors Logo"
                className="w-16 h-16 object-contain"
                width="64"
                height="64"
                loading="lazy"
                decoding="async"
              />
              <span className="text-2xl font-bold text-white amatic-sc-bold">SPIRIWORS</span>
            </div>
            <p className="text-gray-400 text-sm">
              Animación Stop-Motion y 2D
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 amatic-sc-bold">Navegación</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 transition-colors duration-200 text-sm"
                    style={{ color: 'rgb(156, 163, 175)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 amatic-sc-bold">Conecta</h3>
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : undefined}
                  rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (social.url.startsWith('http')) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(social.url, '_blank');
                    }
                  }}
                  className="flex items-center gap-3 text-gray-400 transition-colors duration-200 group"
                  style={{ color: 'rgb(156, 163, 175)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}
                  aria-label={social.label}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center transition-colors duration-200"
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = accentColor}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgb(31, 41, 55)'}
                  >
                    <social.icon className="w-4 h-4 group-hover:text-black transition-colors duration-200" />
                  </div>
                  <span className="text-sm">{social.username}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Spiriwors. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center text-gray-500 text-sm">
              <span>Hecho con</span>
              <Heart className="w-4 h-4 mx-2 text-red-500 fill-current" />
              <span>en Colombia</span>
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-white/10"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{ color: accentColor }}
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
