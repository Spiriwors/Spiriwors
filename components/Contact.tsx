"use client";

import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, Instagram, Linkedin, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SCALE } from '@/lib/animation-tokens';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí implementarías el envío del formulario
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hola@spiriwors.com',
      link: 'mailto:hola@spiriwors.com'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+57 300 123 4567',
      link: 'tel:+573001234567'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'Bogotá, Colombia',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Horario',
      value: 'Lun - Vie: 9:00 - 18:00',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: Instagram, url: '#', label: '@spiriwors' },
    { icon: Linkedin, url: '#', label: 'Spiriwors' },
    { icon: Youtube, url: '#', label: 'Spiriwors Studio' }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-700">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 amatic-sc-bold text-white">
              Contacto
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ¿Tienes un proyecto en mente? Nos encantaría escuchar tu idea y ayudarte a hacerla realidad
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <ScrollReveal direction="right">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">
              Cuéntanos sobre tu proyecto
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Nombre *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-gray-300 mb-2">
                    Empresa
                  </label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div>
                  <label htmlFor="budget" className="block text-gray-300 mb-2">
                    Presupuesto
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400 rounded-md p-2"
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000-25000">$10,000 - $25,000</option>
                    <option value="25000+">$25,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="project" className="block text-gray-300 mb-2">
                  Tipo de Proyecto *
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400 rounded-md p-2"
                >
                  <option value="">Selecciona el tipo de proyecto</option>
                  <option value="stop-motion">Animación Stop-Motion</option>
                  <option value="2d-animation">Animación 2D</option>
                  <option value="commercial">Video Comercial</option>
                  <option value="music-video">Video Musical</option>
                  <option value="short-film">Cortometraje</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                  placeholder="Cuéntame sobre tu proyecto, objetivos, timeline y cualquier detalle relevante..."
                />
              </div>

              <motion.div whileHover={{ scale: SCALE.hover }} whileTap={{ scale: SCALE.down }}>
                <Button
                  type="submit"
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500 py-3 text-lg font-semibold flex items-center justify-center gap-2 will-change-transform"
                >
                  <Send className="w-5 h-5" />
                  Enviar Mensaje
                </Button>
              </motion.div>
            </form>
            </div>
          </ScrollReveal>

          {/* Contact Information */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Información de Contacto
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mr-4">
                      <info.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {info.title}
                      </h4>
                      <a 
                        href={info.link} 
                        className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">
                Sígueme en redes
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110"
                    title={social.label}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h4 className="text-xl font-bold text-white mb-4">
                Preguntas Frecuentes
              </h4>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h5 className="font-semibold text-yellow-400">¿Cuánto tiempo toma un proyecto?</h5>
                  <p className="text-sm">Depende del alcance, pero típicamente entre 2-8 semanas.</p>
                </div>
                <div>
                  <h5 className="font-semibold text-yellow-400">¿Trabajas con clientes internacionales?</h5>
                  <p className="text-sm">¡Sí! Trabajo con clientes de todo el mundo remotamente.</p>
                </div>
                <div>
                  <h5 className="font-semibold text-yellow-400">¿Ofreces revisiones?</h5>
                  <p className="text-sm">Incluyo 3 rondas de revisiones en todos mis proyectos.</p>
                </div>
              </div>
            </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;