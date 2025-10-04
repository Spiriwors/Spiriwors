"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Linkedin,
  Youtube,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SCALE } from "@/lib/animation-tokens";

// Esquema de validación con Zod
const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  company: z.string().optional(),
  project: z.string().min(1, "Por favor selecciona un tipo de proyecto"),
  budget: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      project: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        // Auto-dismiss success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } else {
        throw new Error(result.error || "Error al enviar el mensaje");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctame directamente por email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hola@spiriwors.com",
      link: "mailto:hola@spiriwors.com",
    },
    {
      icon: Phone,
      title: "Teléfono",
      value: "+57 300 123 4567",
      link: "tel:+573001234567",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      value: "Bogotá, Colombia",
      link: "#",
    },
    {
      icon: Clock,
      title: "Horario",
      value: "Lun - Vie: 9:00 - 18:00",
      link: "#",
    },
  ];

  const socialLinks = [
    { icon: Instagram, url: "https://instagram.com/spiriwors", label: "@spiriwors" },
    { icon: Linkedin, url: "https://linkedin.com/company/spiriwors", label: "Spiriwors" },
    { icon: Youtube, url: "https://youtube.com/@spiriwors", label: "Spiriwors Studio" },
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
              ¿Tienes un proyecto en mente? Nos encantaría escuchar tu idea y
              ayudarte a hacerla realidad
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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                      Nombre *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      {...register("name")}
                      disabled={isSubmitting}
                      className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Tu nombre completo"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-400 text-sm mt-1" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      {...register("email")}
                      disabled={isSubmitting}
                      className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="tu@email.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-gray-300 mb-2"
                    >
                      Empresa
                    </label>
                    <Input
                      type="text"
                      id="company"
                      {...register("company")}
                      disabled={isSubmitting}
                      className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-gray-300 mb-2"
                    >
                      Presupuesto
                    </label>
                    <Select onValueChange={(value) => register("budget").onChange({ target: { name: "budget", value } })} disabled={isSubmitting}>
                      <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                        <SelectValue placeholder="Selecciona un rango" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                        <SelectItem value="25000+">$25,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="project" className="block text-gray-300 mb-2">
                    Tipo de Proyecto *
                  </label>
                  <Select onValueChange={(value) => register("project").onChange({ target: { name: "project", value } })} disabled={isSubmitting}>
                    <SelectTrigger
                      className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-invalid={errors.project ? "true" : "false"}
                      aria-describedby={errors.project ? "project-error" : undefined}
                    >
                      <SelectValue placeholder="Selecciona el tipo de proyecto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stop-motion">Animación Stop-Motion</SelectItem>
                      <SelectItem value="2d-animation">Animación 2D</SelectItem>
                      <SelectItem value="commercial">Video Comercial</SelectItem>
                      <SelectItem value="music-video">Video Musical</SelectItem>
                      <SelectItem value="short-film">Cortometraje</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.project && (
                    <p id="project-error" className="text-red-400 text-sm mt-1" role="alert">
                      {errors.project.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className="block text-gray-300">
                      Mensaje *
                    </label>
                    <span className={`text-sm ${messageLength < 10 ? 'text-gray-500' : messageLength > 450 ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {messageLength}/500
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    {...register("message", {
                      onChange: (e) => setMessageLength(e.target.value.length)
                    })}
                    disabled={isSubmitting}
                    rows={6}
                    maxLength={500}
                    className="w-full bg-gray-800 border-gray-700 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Cuéntame sobre tu proyecto, objetivos, timeline y cualquier detalle relevante..."
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error message-counter" : "message-counter"}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-red-400 text-sm mt-1" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Mensajes de estado */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2"
                    role="alert"
                    aria-live="polite"
                  >
                    <CheckCircle className="w-5 h-5" aria-hidden="true" />
                    <span>
                      ¡Mensaje enviado exitosamente! Te contactaré pronto.
                    </span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center gap-2"
                    role="alert"
                    aria-live="assertive"
                  >
                    <AlertCircle className="w-5 h-5" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: SCALE.hover }}
                  whileTap={{ scale: SCALE.down }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:bg-gray-600 disabled:text-gray-400 py-3 text-lg font-semibold flex items-center justify-center gap-2 will-change-transform"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensaje
                      </>
                    )}
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
                    <motion.div
                      key={index}
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <info.icon className="w-6 h-6 text-black" />
                      </motion.div>
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
                    </motion.div>
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
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(social.url, '_blank');
                      }}
                      className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110"
                      title={social.label}
                      aria-label={social.label}
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
                    <h5 className="font-semibold text-yellow-400">
                      ¿Cuánto tiempo toma un proyecto?
                    </h5>
                    <p className="text-sm">
                      Depende del alcance, pero típicamente entre 2-8 semanas.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-yellow-400">
                      ¿Trabajas con clientes internacionales?
                    </h5>
                    <p className="text-sm">
                      ¡Sí! Trabajo con clientes de todo el mundo remotamente.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-yellow-400">
                      ¿Ofreces revisiones?
                    </h5>
                    <p className="text-sm">
                      Incluyo 3 rondas de revisiones en todos mis proyectos.
                    </p>
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
