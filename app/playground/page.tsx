"use client";

import React from 'react';
import MegaCard from '@/components/ui/megaCard';

const PlaygroundPage = () => {
  // Datos de ejemplo para el MegaCard
  const images = [
    {
      src: '/images/projects/LJDP_HD_FULL_DEFF.webp',
      alt: 'La Joya Del Pantano - Portada',
      title: 'La Joya Del Pantano'
    },
    {
      src: '/images/projects/SALU_AFICHE.webp',
      alt: 'SALÚ - Portada',
      title: 'SALÚ'
    }
  ];

  const videoUrl = 'https://vimeo.com/896578269?fl=pl&fe=sh'; // URL de ejemplo del proyecto

  return (
    <main className="min-h-screen bg-gray-700 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 amatic-sc-bold text-white">
            Playground - MegaCard Component
          </h1>
          <p className="text-gray-300 text-lg">
            Prueba del componente MegaCard con carrusel y video
          </p>
        </div>

        {/* MegaCard Component */}
        <div className="flex justify-center items-center">
          <MegaCard
            images={images}
            videoSrc={videoUrl}
            videoTitle="Trailer La Joya Del Pantano"
          />
        </div>

        {/* Información adicional */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
            <h2 className="text-2xl font-bold text-white mb-4">
              Cómo funciona:
            </h2>
            <ul className="text-gray-300 space-y-2">
              <li>• <strong>Frente:</strong> Carrusel de imágenes que cambia automáticamente</li>
              <li>• <strong>Navegación:</strong> Usa las flechas o indicadores para cambiar manualmente</li>
              <li>• <strong>Click:</strong> Haz click en cualquier parte para girar la tarjeta</li>
              <li>• <strong>Reverso:</strong> Reproductor de video (YouTube, Vimeo o video directo)</li>
              <li>• <strong>Cerrar:</strong> Botón X en la esquina superior derecha para volver</li>
            </ul>
          </div>
        </div>

        {/* Código de ejemplo */}
        <div className="mt-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
            <h2 className="text-2xl font-bold text-white mb-4">
              Código de ejemplo:
            </h2>
            <pre className="text-gray-300 text-sm overflow-x-auto">
{`import MegaCard from '@/components/ui/megaCard';

const images = [
  {
    src: '/images/projects/image1.jpg',
    alt: 'Descripción imagen 1',
    title: 'Proyecto 1'
  },
  {
    src: '/images/projects/image2.jpg', 
    alt: 'Descripción imagen 2',
    title: 'Proyecto 2'
  }
];

<MegaCard 
  images={images}
  videoSrc="https://www.youtube.com/watch?v=VIDEO_ID"
  videoTitle="Mi Video"
/>`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlaygroundPage;
