import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
): MotionValue<number> => {
  const { speed = 0.5, direction = 'up' } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  let outputRange: [number, number];

  switch (direction) {
    case 'up':
      outputRange = [100 * speed, -100 * speed];
      break;
    case 'down':
      outputRange = [-100 * speed, 100 * speed];
      break;
    case 'left':
      outputRange = [100 * speed, -100 * speed];
      break;
    case 'right':
      outputRange = [-100 * speed, 100 * speed];
      break;
    default:
      outputRange = [100 * speed, -100 * speed];
  }

  return useTransform(scrollYProgress, [0, 1], outputRange);
};
