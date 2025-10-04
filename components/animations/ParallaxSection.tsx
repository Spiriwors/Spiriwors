"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const y = useParallax(ref, { speed, direction });

  const getMotionStyle = () => {
    if (direction === 'up' || direction === 'down') {
      return { y };
    } else {
      return { x: y };
    }
  };

  return (
    <div ref={ref} className={className}>
      <motion.div style={getMotionStyle()}>
        {children}
      </motion.div>
    </div>
  );
};
