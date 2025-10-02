"use client";

import React from 'react';
import { Play, Instagram, Linkedin, Youtube, Mail, Phone, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Animación Stop-Motion', href: '#services' },
      { name: 'Animación 2D', href: '#services' },
      { name: 'Videos Comerciales', href: '#services' },
      { name: 'Cortometrajes', href: '#services' }
    ],
    company: [
      { name: 'Sobre Mí', href: '#about' },
      { name: 'Mis Proyectos', href: '#projects' },
      { name: 'Ver Reel', href: '#reel' },
      { name: 'Testimonios', href: '#testimonials' }
    ],
    contact: [
      { name: 'Contacto', href: '#contact' },
      { name: 'hola@spiriwors.com', href: 'mailto:hola@spiriwors.com' },
      { name: '+57 300 123 4567', href: 'tel:+573001234567' },
      { name: 'Bogotá, Colombia', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Linkedin, url: '#', label: 'LinkedIn' },
    { icon: Youtube, url: '#', label: 'YouTube' },
    { icon: Mail, url: 'mailto:hola@spiriwors.com', label: 'Email' }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white amatic-sc-bold">SPIRIWORS</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empresa especializada en animación stop-motion y 2D, fundada por Camilo Ayala, 
              ilustrador y animador profesional. Convirtiendo ideas en experiencias visuales 
              únicas que conectan marcas con audiencias.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 amatic-sc-bold">Servicios</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 amatic-sc-bold">Empresa</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 amatic-sc-bold">Contacto</h3>
            <ul className="space-y-2">
              {footerLinks.contact.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('mailto:') || link.href.startsWith('tel:') ? (
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 amatic-sc-bold">
                Mantente al día
              </h3>
              <p className="text-gray-300">
                Recibe actualizaciones sobre mis últimos proyectos y consejos de animación
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-yellow-400 focus:outline-none"
              />
              <button className="bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © {currentYear} Spiriwors. Todos los derechos reservados.
            </p>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Términos de Servicio
              </a>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-4 text-gray-400">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 mx-2 text-red-500" />
            <span>en Colombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;