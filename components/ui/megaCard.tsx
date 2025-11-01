"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MegaCardProps {
  images: Array<{
    src: string;
    alt: string;
    title: string;
  }>;
  videoSrc: string;
  videoTitle?: string;
}

const MegaCard: React.FC<MegaCardProps> = ({
  images,
  videoSrc,
  videoTitle = "Video",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    if (isFlipped || images.length <= 1) return; // Stop auto-slide when flipped or only one image

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length, isFlipped]);

  // Cerrar modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showInfoModal) {
          setShowInfoModal(false);
        }
      }
    };

    if (showInfoModal) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showInfoModal]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCloseVideo = () => {
    setIsFlipped(false);
  };

  // Get YouTube ID from URL
  const getYouTubeId = (url: string) => {
    const short = url.match(/youtu\.be\/([\w-]{11})/);
    if (short) return short[1];
    const reg = url.match(/[?&]v=([\w-]{11})/);
    return reg ? reg[1] : null;
  };

  // Get Vimeo ID from URL
  const getVimeoId = (url: string) => {
    const m = url.match(/vimeo\.com\/(\d+)/);
    return m ? m[1] : null;
  };

  const buildYouTubeEmbed = (id: string) =>
    `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&showinfo=0&iv_load_policy=3&fs=1`;

  const buildVimeoEmbed = (id: string) =>
    `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&title=0&byline=0&portrait=0&badge=0&sidedock=0`;

  const getVideoEmbedSrc = (url: string) => {
    const yt = getYouTubeId(url);
    if (yt) return buildYouTubeEmbed(yt);

    const vm = getVimeoId(url);
    if (vm) return buildVimeoEmbed(vm);

    return url; // Fallback for direct video URLs
  };

  return (
    <div className="card-container w-full max-w-md mx-auto">
      <div
        className="card relative w-full h-64 cursor-pointer transition-transform duration-700"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={handleCardClick}
      >
        {/* Front Side - Carousel */}
        <div
          className="card-face card-front absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-800 group">
            {/* Carousel Images */}
            <div className="relative w-full h-full">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-lg font-bold">
                      {image.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows - Only show if multiple images */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentSlide(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-yellow-400" : "bg-white/50"
                      }`}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Back Side - Video Player */}
        <div
          className="card-face card-back absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-900">
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseVideo();
              }}
              className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
              aria-label="Cerrar video"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Info Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowInfoModal(true);
              }}
              className="absolute top-2 left-2 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors"
              aria-label="Mostrar información del video"
            >
              <Info className="w-4 h-4" />
            </button>

            {/* Video Player */}
            <div className="video-container relative w-full h-full group">
              {videoSrc.includes("youtube.com") ||
              videoSrc.includes("youtu.be") ||
              videoSrc.includes("vimeo.com") ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={getVideoEmbedSrc(videoSrc)}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={videoTitle}
                  />
                  {/* Overlay para ocultar controles inicialmente */}
                  <div className="absolute inset-0 bg-black/20 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>
              ) : (
                <video
                  src={videoSrc}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  preload="metadata"
                  style={
                    {
                      // Los controles aparecerán automáticamente en hover
                    }
                  }
                >
                  Tu navegador no soporta la reproducción de video.
                </video>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-gray-900 rounded-xl shadow-2xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">
                Información del Video
              </h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-yellow-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {videoTitle}
                </h4>
                <p className="text-gray-300 mb-4">
                  Video disponible para reproducción automática. Los controles
                  aparecen al pasar el mouse sobre el área del video.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => setShowInfoModal(false)}
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    Entendido
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MegaCard;
