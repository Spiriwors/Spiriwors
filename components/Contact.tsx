"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Mail,
  Globe2,
  Clock3,
  BadgeEuro,
  Instagram,
  Linkedin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SCALE } from "@/lib/animation-tokens";
import { useTheme } from "@/contexts/ThemeContext";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  company: z.string().optional(),
  project: z.string().min(1, "Por favor selecciona un tipo de proyecto"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { accentColor, theme } = useTheme();

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
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      project: "",
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
        setMessageLength(0);

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
      value: "spiriwors@gmail.com",
      link: "mailto:spiriwors@gmail.com",
    },
    {
      icon: Globe2,
      title: "Alcance",
      value: "Proyectos remotos a nivel global.",
    },
    {
      icon: Clock3,
      title: "Zona Horaria",
      value:
        "Basado en Bogotá, Colombia (GMT-5). Amplia ventana de solapamiento en América y mañanas sincronizadas con Europa.",
    },
    {
      icon: BadgeEuro,
      title: "Facilidad para la UE",
      value:
        "Ciudadano español con plena capacidad legal para facturar y colaborar con empresas de la Unión Europea (sin requerimientos de visa).",
    },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      url: "https://www.instagram.com/camiloayalanieto?igsh=eHhiNGMwdmZ1dWM5&utm_source=qr",
      label: "@spiriwors",
    },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/camilo-ayala-nieto-125730388?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      label: "Spiriwors",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <h2 className="text-[60px] md:text-5xl font-bold mb-4 amatic-sc-bold text-white leading-tight">
              Contacto
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? ¡Hablemos!.
            Estoy disponible para colaboraciones en animación 2D y Stop-motion, aportando una visión artesanal a flujos de trabajo globales.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
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
                      className="w-full bg-gray-800 border-gray-700 text-white focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={
                        {
                          "--tw-ring-color": accentColor,
                        } as React.CSSProperties
                      }
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = accentColor;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${accentColor}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.boxShadow = "";
                      }}
                      placeholder="Tu nombre completo"
                    />

                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1" role="alert">
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
                      className="w-full bg-gray-800 border-gray-700 text-white focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={
                        {
                          "--tw-ring-color": accentColor,
                        } as React.CSSProperties
                      }
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = accentColor;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${accentColor}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.boxShadow = "";
                      }}
                      placeholder="tu@email.com"
                    />

                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

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
                    className="w-full bg-gray-800 border-gray-700 text-white focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={
                      {
                        "--tw-ring-color": accentColor,
                      } as React.CSSProperties
                    }
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = accentColor;
                      e.currentTarget.style.boxShadow = `0 0 0 2px ${accentColor}33`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                    placeholder="Nombre de tu empresa"
                  />
                </div>

                <div>
                  <label
                    htmlFor="project"
                    className="block text-gray-300 mb-2"
                  >
                    Tipo de Proyecto *
                  </label>

                  <input type="hidden" {...register("project")} />

                  <Select
                    disabled={isSubmitting}
                    onValueChange={(value) =>
                      setValue("project", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      id="project"
                      className="w-full bg-gray-800 border-gray-700 text-white focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={
                        {
                          "--tw-ring-color": accentColor,
                        } as React.CSSProperties
                      }
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = accentColor;
                        e.currentTarget.style.boxShadow = `0 0 0 2px ${accentColor}33`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      <SelectValue placeholder="Selecciona el tipo de proyecto" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="stop-motion">
                        Animación Stop-Motion
                      </SelectItem>
                      <SelectItem value="2d-animation">Animación 2D</SelectItem>
                      <SelectItem value="commercial">Video Comercial</SelectItem>
                      <SelectItem value="music-video">Video Musical</SelectItem>
                      <SelectItem value="short-film">Cortometraje</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.project && (
                    <p className="text-red-400 text-sm mt-1" role="alert">
                      {errors.project.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="message" className="block text-gray-300">
                      Mensaje *
                    </label>

                    <span
                      className={`text-sm ${
                        messageLength < 10 ? "text-gray-500" : "text-gray-400"
                      }`}
                      style={messageLength > 450 ? { color: accentColor } : {}}
                    >
                      {messageLength}/500
                    </span>
                  </div>

                  <Textarea
                    id="message"
                    {...register("message", {
                      onChange: (e) => setMessageLength(e.target.value.length),
                    })}
                    disabled={isSubmitting}
                    rows={3}
                    maxLength={500}
                    className="w-full bg-gray-800 border-gray-700 text-white focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                    style={
                      {
                        "--tw-ring-color": accentColor,
                      } as React.CSSProperties
                    }
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = accentColor;
                      e.currentTarget.style.boxShadow = `0 0 0 2px ${accentColor}33`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                    placeholder="Cuéntame sobre tu proyecto, objetivos, timeline y cualquier detalle relevante..."
                  />

                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      ¡Mensaje enviado exitosamente! Te contactaré pronto.
                    </span>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
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
                    className="w-full text-white disabled:bg-gray-600 disabled:text-gray-400 py-3 text-lg font-semibold flex items-center justify-center gap-2 will-change-transform"
                    style={
                      {
                        backgroundColor: accentColor,
                        "--hover-bg":
                          theme === "light" ? "#ff9500" : "#2190a8",
                      } as React.CSSProperties
                    }
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        theme === "light" ? "#ff9500" : "#2190a8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = accentColor;
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
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

          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Información de Contacto
                </h3>

                <div className="space-y-7">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-5"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="w-16 h-16 min-w-16 rounded-lg flex items-center justify-center shadow-lg border border-gray-700/60"
                        style={{
                          backgroundColor: "rgba(17, 24, 39, 0.95)",
                          boxShadow: `0 0 0 1px ${accentColor}22, 0 10px 25px rgba(0,0,0,0.25)`,
                        }}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                      >
                        <info.icon
                          className="w-8 h-8"
                          style={{
                            color: accentColor,
                            strokeWidth: 2,
                          }}
                        />
                      </motion.div>

                      <div className="pt-1">
                        <h4 className="text-white text-xl font-bold leading-tight">
                          {info.title}
                        </h4>

                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-300 text-lg leading-relaxed transition-colors duration-200"
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.color = accentColor)
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.color =
                                "rgb(209, 213, 219)")
                            }
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

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
                      className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center hover:text-black transition-all duration-300 transform hover:scale-110"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = accentColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgb(55, 65, 81)";
                      }}
                      title={social.label}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
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