# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Spiriwors is a Next.js 13 animation company website showcasing stop-motion and 2D animation work. The site features a portfolio of animation projects, company information, services, and contact details. The website is configured for static export and uses TypeScript, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3 with custom Amatic SC and Creepster Google Fonts
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion 12.x, React Scroll Parallax 3.5
- **Build Output**: Static export (`output: 'export'` in next.config.js)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production (static export to /out)
npm run build

# Start production server (after build)
npm start

# Run linting
npm run lint
```

## Architecture & Code Structure

### App Router Structure

- **`app/layout.tsx`**: Root layout with font configurations (Inter, Creepster, Amatic SC) and SEO metadata
- **`app/page.tsx`**: Main homepage that composes all sections (Hero, Reel, Projects, Carousel, About, Services, Contact, Footer)
- **`app/globals.css`**: Global styles with Tailwind utilities and custom font classes

### Component Organization

All components use `"use client"` directive as the app is interactive:

- **Layout Components**: `Navbar.tsx`, `Footer.tsx`
- **Section Components**: `Hero.tsx`, `Reel.tsx`, `Projects.tsx`, `Carousel.tsx`, `About.tsx`, `Services.tsx`, `Contact.tsx`, `Testimonials.tsx`
- **UI Components**: Located in `components/ui/` - shadcn/ui primitives (buttons, cards, dialogs, etc.)
- **Animation Components**: `components/animations/` - Reusable animation wrappers
  - `ScrollReveal.tsx` - Scroll-triggered reveal animations
  - `ParallaxSection.tsx` - Parallax scrolling effects
  - `AnimatedCard.tsx` - Animated card component with hover effects
  - `FloatingParticles.tsx` - Floating particle background
  - `CustomCursor.tsx` - Custom animated cursor (desktop only)

### Animation System

The site uses a comprehensive animation system built on Framer Motion:

#### Hooks
- **`useScrollReveal.ts`**: Hook for scroll-triggered animations with IntersectionObserver
- **`useParallax.ts`**: Custom parallax scrolling with configurable speed/direction

#### Animation Components
- **ScrollReveal**: Wraps content with scroll-triggered animations (fade, slide, scale)
  - Directions: `up`, `down`, `left`, `right`, `scale`, `fade`
  - Configurable delay and duration
  - Once or repeat on scroll

- **ParallaxSection**: Creates parallax effects on scroll
  - Multi-speed parallax layers
  - 4 directional movements

- **FloatingParticles**: Animated background particles
  - Configurable count and color
  - Organic floating motion

- **CustomCursor**: Custom animated cursor (desktop only)
  - Follows mouse with spring physics
  - Scales on hover over interactive elements
  - Hidden on mobile/touch devices

#### CSS Animations
- Custom keyframes in `app/animations.css`
- Utility classes for common animations
- Hover effects and transitions

### Key Implementation Details

#### Projects Section (`components/Projects.tsx`)
- Displays video portfolio organized by categories:
  - Spiriwors Historias Originales
  - Un Bosque Encantado (UBE)
  - Venturia Historias Originales
  - Venturia Servicios Creativos
- Uses video modal with multiple format support (MP4, MOV, AVI)
- Video paths reference `/public/videos/` directory
- Implements error handling for missing/incompatible videos
- Filter system to view videos by category

#### Navbar (`components/Navbar.tsx`)
- Fixed position with scroll-based background opacity
- Smooth scroll navigation to section IDs
- Responsive mobile menu with hamburger toggle
- Uses Spiriwors logo from `/public/assets/logoSW.png`

#### Hero (`components/Hero.tsx`)
- Multi-layer parallax background scrolling
- Framer Motion entrance animations with staggered delays
- Floating particle effects
- Animated gradient orbs with breathing effect
- Spring-based button interactions
- Smooth scroll indicators

### Styling Conventions

- **Custom Fonts**:
  - `.amatic-sc-bold` - Amatic SC 700 weight for headings
  - `.amatic-sc-regular` - Amatic SC 400 weight for body text
  - `.font-artistic` / `.artistic-title` - Creepster font for artistic elements

- **Color Scheme**:
  - Primary: Gray scale (gray-600 to gray-900)
  - Accent: Yellow-400 for CTAs and highlights
  - Background: Dark theme with gray-700 base

- **Responsive**: Mobile-first approach using Tailwind's `md:` and `lg:` breakpoints

### Path Aliases

Configure in `tsconfig.json`:
```
"@/*" -> "./*"
```

Used for imports like: `@/components/...`, `@/lib/utils`

### Static Assets

- **Images**: `/public/images/`
  - `about/Camilo-Ayala.jpg`
  - `projects/` - Project posters/thumbnails
- **Videos**: `/public/videos/` (Git LFS tracked for large files)
- **Assets**: `/public/assets/` - Logo files (PNG, ICO)

### Configuration Notes

- **Next.js Config**:
  - Static export enabled
  - ESLint ignored during builds
  - Unoptimized images (for static hosting)

- **Git LFS**: Large video files tracked with Git LFS (see .gitignore line 40)

- **Tailwind**: Uses shadcn/ui configuration with CSS variables for theming

## Development Workflow

1. Components are client-side rendered (`"use client"`)
2. Static export targets platforms like Vercel, Netlify, or GitHub Pages
3. Video files should be optimized before adding to `/public/videos/`
4. Use existing shadcn/ui components from `components/ui/` when possible
5. Follow established naming: PascalCase for components, kebab-case for assets

## Performance Considerations

- **Animation Performance**: Framer Motion uses GPU-accelerated transforms
- **Mobile Optimization**: Custom cursor disabled on touch devices
- **Scroll Performance**: IntersectionObserver for efficient scroll detection
- **Once animations**: Most scroll reveals trigger once to reduce re-renders

## Important Notes

- **No README.md exists** - this CLAUDE.md serves as primary documentation
- **Static Site**: No server-side features (API routes, ISR, SSR) - only static generation
- **Video Compatibility**: The site handles MP4, MOV, and AVI formats with browser fallbacks
- **SEO**: Metadata configured in `app/layout.tsx` with Spanish locale (es_CO)
- **Animations**: Built with Framer Motion - use sparingly to maintain performance
