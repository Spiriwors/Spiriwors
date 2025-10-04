"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { DURATION, EASING, TRANSLATE } from '@/lib/animation-tokens';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

const getVariants = (direction: string): Variants => {
  const variants: Record<string, Variants> = {
    up: {
      hidden: { opacity: 0, y: TRANSLATE.xl },
      visible: { opacity: 1, y: 0 }
    },
    down: {
      hidden: { opacity: 0, y: -TRANSLATE.xl },
      visible: { opacity: 1, y: 0 }
    },
    left: {
      hidden: { opacity: 0, x: TRANSLATE.xl },
      visible: { opacity: 1, x: 0 }
    },
    right: {
      hidden: { opacity: 0, x: -TRANSLATE.xl },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    }
  };

  return variants[direction] || variants.up;
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = DURATION.medium,
  once = true,
  className = ''
}) => {
  const { ref, controls } = useScrollReveal(once);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants(direction)}
      transition={{
        duration,
        delay,
        ease: EASING.spiriwors
      }}
      className={`will-change-transform-opacity ${className}`}
    >
      {children}
    </motion.div>
  );
};
