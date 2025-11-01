"use client";

import React, { useState, useEffect } from "react";

interface ParallaxAnimationProps {
  frameRate?: number; // Frames por segundo (por defecto 15 fps)
  className?: string;
}

const ParallaxAnimation: React.FC<ParallaxAnimationProps> = ({
  frameRate = 15,
  className = "",
}) => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const totalFrames = 30;

  useEffect(() => {
    const interval = 1000 / frameRate; // Calcular intervalo en ms
    const timer = setInterval(() => {
      setCurrentFrame((prev) => {
        // Al llegar al final, volver al inicio para crear el loop
        return prev >= totalFrames ? 1 : prev + 1;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [frameRate, totalFrames]);

  // Formatear el número del frame con padding de 2 dígitos
  const formatFrameNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const imageSrc = `/parallax/${formatFrameNumber(currentFrame)}.png`;

  return (
    <div
      className={`relative w-full h-64 rounded-lg overflow-hidden bg-gray-800 ${className}`}
    >
      <img
        src={imageSrc}
        alt={`Parallax frame ${currentFrame}`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
};

export default ParallaxAnimation;

