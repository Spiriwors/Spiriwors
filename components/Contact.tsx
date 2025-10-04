"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Mail, Phone, MapPin, Clock, Instagram, Linkedin, Youtube, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Esquema de validación con Zod
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  company: z.string().optional(),
  project: z.string().min(1, 'Por favor selecciona un tipo de proyecto'),
  budget: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      project: '',
      budget: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctame directamente por email.');
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 amatic-sc-bold text-white">
            Contacto
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? Nos encantaría escuchar tu idea y ayudarte a hacerla realidad
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-6">
              Cuéntanos sobre tu proyecto
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Nombre *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
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
                    {...register('company')}
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
                    {...register('budget')}
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
                  {...register('project')}
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
                {errors.project && (
                  <p className="text-red-400 text-sm mt-1">{errors.project.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  {...register('message')}
                  rows={6}
                  className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400"
                  placeholder="Cuéntame sobre tu proyecto, objetivos, timeline y cualquier detalle relevante..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Mensajes de estado */}
              {submitStatus === 'success' && (
                <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>¡Mensaje enviado exitosamente! Te contactaré pronto.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:bg-gray-600 disabled:text-gray-400 py-3 text-lg font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
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
        </div>
      </div>
    </section>
  );
};

export default Contact;