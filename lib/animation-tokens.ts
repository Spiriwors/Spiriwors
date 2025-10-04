/**
 * Animation Design Tokens for Spiriwors
 * Centralized animation configuration based on actual usage patterns
 */

// Durations (in seconds) - used in Tailwind and Framer Motion
export const DURATION = {
  fast: 0.2,      // Quick hovers, color changes
  base: 0.3,      // Standard transitions
  medium: 0.6,    // Card movements, scales
  slow: 0.8,      // Page entrance animations
  infinite: 1.5,  // Continuous animations (breathe, float)
} as const;

// Easing curves - matching actual usage
export const EASING = {
  spiriwors: [0.25, 0.4, 0.25, 1],  // Custom brand easing (ScrollReveal)
  easeInOut: 'easeInOut' as const,   // Continuous animations
} as const;

// Spring configs - only the patterns actually used
export const SPRING = {
  default: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  cursor: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 28,
  },
  cursorScale: {
    type: 'spring' as const,
    stiffness: 150,
    damping: 15,
  },
} as const;

// Delays - for stagger animations
export const DELAY = {
  none: 0,
  sm: 0.1,
  md: 0.2,
  lg: 0.4,
} as const;

// Translation distances for ScrollReveal
export const TRANSLATE = {
  sm: 10,
  md: 30,
  lg: 50,
  xl: 75,
} as const;

// Scale values - actual usage patterns
export const SCALE = {
  hover: 1.02,    // Card hover
  hoverMd: 1.05,  // Button hover
  hoverLg: 1.1,   // Icon/small element hover
  down: 0.95,     // Button tap
} as const;

// Viewport settings for IntersectionObserver optimization
export const VIEWPORT = {
  default: {
    once: true,
    margin: '-100px', // Current ScrollReveal margin
    amount: 0.2,
  },
} as const;
