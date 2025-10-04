"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FadeOnScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const FadeOnScroll: React.FC<FadeOnScrollProps> = ({
  children,
  className = ''
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'] // Start when entering viewport, end when leaving
  });

  // Fade in as section enters, fade out as it leaves
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],      // Scroll progress points
    [0, 1, 1, 0]           // Opacity values: fade in -> stay visible -> fade out
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.95, 1, 1, 0.95]     // Subtle scale effect
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
