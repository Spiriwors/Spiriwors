"use client";

import dynamic from 'next/dynamic';

// Lazy load Contact with all its heavy dependencies (react-hook-form, zod)
const ContactForm = dynamic(() => import('./Contact'), {
  ssr: false,
  loading: () => (
    <section id="contact" className="py-20 bg-gray-700">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 amatic-sc-bold text-white">
            Contacto
          </h2>
          <p className="text-xl text-gray-300">Cargando formulario...</p>
        </div>
      </div>
    </section>
  ),
});

export default ContactForm;
