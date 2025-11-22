# 🎬 Spiriwors - Portafolio de Animación

**Spiriwors** es una empresa especializada en animación y producción visual, fundada y dirigida por **Camilo Ayala**, ilustrador y animador profesional. Este repositorio contiene el sitio web corporativo que muestra el portafolio de trabajos en animación stop-motion y 2D, conectando marcas con audiencias a través de historias visuales impactantes.

## 🚀 Stack Tecnológico

### Core
- **Framework**: [Next.js 13.5.1](https://nextjs.org/) con App Router y Server Components
- **Lenguaje**: TypeScript 5.2.2
- **Estilos**: Tailwind CSS 3.3.3 con animaciones personalizadas
- **Runtime**: Node.js 18+

### Animaciones y Efectos
- **Framer Motion** 12.23.22 - Animaciones fluidas y transiciones
- **React Scroll Parallax** 3.5.0 - Efectos parallax avanzados
- **Custom Hooks** - Sistema de animaciones personalizado con IntersectionObserver

### UI y Componentes
- **Radix UI** - Componentes accesibles y sin estilos
- **shadcn/ui** - Componentes UI reutilizables
- **Lucide React** - Iconografía moderna
- **Tailwind Animate** - Utilidades de animación CSS

### Formularios y Validación
- **React Hook Form** 7.53.0 - Manejo de formularios
- **Zod** 3.23.8 - Validación de esquemas TypeScript-first
- **EmailJS** 4.4.1 - Envío de emails desde el cliente

### Fuentes
- **Amatic SC** - Títulos y encabezados (estilo artístico)
- **Inter** - Texto general (legibilidad)
- **Creepster** - Acentos y elementos dramáticos

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) 18 o superior
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Git (para clonar el repositorio)

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Spiriwors/Spiriwors.git
cd Spiriwors
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar en Modo Desarrollo

```bash
npm run dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

### 4. Construir para Producción

```bash
npm run build
npm start
```

La carpeta `out/` contendrá los archivos estáticos listos para desplegar.

## 📁 Estructura del Proyecto

```
Spiriwors/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raíz con fuentes, metadatos y favicon
│   ├── page.tsx                 # Página principal con lazy loading
│   └── globals.css              # Estilos globales y configuración Tailwind
│
├── components/                   # Componentes React
│   ├── Hero.tsx                 # Sección hero con video de fondo y parallax
│   ├── Navbar.tsx               # Navegación fija con scroll detection y tema dinámico
│   ├── Projects.tsx            # Portafolio con filtros animados (2D/Stop Motion)
│   ├── Carousel.tsx             # Carrusel de trabajos destacados
│   ├── About.tsx                # Información sobre Spiriwors
│   ├── Services.tsx             # Servicios ofrecidos
│   ├── Contact.tsx              # Formulario de contacto con validación
│   ├── Footer.tsx               # Pie de página con enlaces sociales
│   │
│   ├── animations/              # Componentes de animación
│   │   ├── ScrollReveal.tsx    # Animaciones activadas por scroll
│   │   ├── CustomCursor.tsx    # Cursor personalizado (desktop)
│   │   └── ParallaxAnimation.tsx # Animación parallax del murciélago
│   │
│   └── ui/                      # Componentes UI reutilizables (shadcn/ui)
│       ├── FilterButton.tsx     # Botones de filtro con animación stop-motion
│       ├── megaCard.tsx         # Tarjetas de proyecto con flip animation
│       └── button.tsx           # Botones base
│
├── contexts/                    # Context API
│   └── ThemeContext.tsx         # Gestión de tema y colores dinámicos
│
├── hooks/                       # Custom Hooks
│   ├── useParallax.ts          # Hook para efectos parallax
│   └── useScrollReveal.ts     # Hook para animaciones por scroll
│
├── lib/                         # Utilidades y configuraciones
│   └── animation-tokens.ts     # Tokens de animación (duración, delays)
│
└── public/                      # Recursos estáticos
    ├── assets/                 # Logos e imágenes
    ├── heroVideoDesktop/       # Videos hero para desktop
    ├── heroMobileVideo/        # Videos hero para móvil
    ├── images/                # Imágenes organizadas por sección
    │   ├── trabajos_huevos/   # Botones de filtro animados
    │   └── megaCard/          # Imágenes de proyectos
    ├── parallax/              # Frames de animación parallax (30 frames)
    └── swLogo/                # Logos de Spiriwors
```

## ✨ Características Principales

### 🎨 Sistema de Diseño

- **Tema Oscuro**: Esquema de colores profesional con grises y acentos amarillos
- **Colores Dinámicos**: Sistema de temas con colores personalizables vía Context API
- **Tipografía Jerárquica**: Sistema de fuentes que refleja la identidad artística
- **Responsive Mobile-First**: Diseño adaptativo con breakpoints optimizados

### 🎬 Portafolio Interactivo

- **Filtros Animados**: Botones con animación stop-motion (4 frames) al hacer hover
- **Categorización Inteligente**: Filtrado por tipo de animación (2D, Stop Motion, Todos)
- **Tarjetas Interactivas**: MegaCards con efecto flip para mostrar videos
- **Reproductor Modal**: Sistema avanzado con soporte para YouTube, Vimeo y archivos locales
- **Animación Parallax**: Efecto parallax del murciélago posicionado dinámicamente según filtro

### 🎭 Sistema de Animaciones

#### Scroll-Based Animations
- **ScrollReveal**: Componente wrapper para animaciones activadas por scroll
- **Direcciones**: `up`, `down`, `left`, `right`, `scale`, `fade`
- **Configuración**: Delays y duraciones personalizables

#### Parallax Effects
- **Multi-layer Parallax**: Efectos parallax en múltiples capas del Hero
- **Parallax Animation**: Animación de 30 frames con loop continuo
- **Custom Hooks**: `useParallax` para efectos parallax configurables

#### Interactivas
- **Custom Cursor**: Cursor personalizado con física de spring (solo desktop)
- **Hover Effects**: Transiciones suaves en elementos interactivos
- **Flip Cards**: Animación 3D en tarjetas de proyecto

### 🧭 Navegación Avanzada

- **Scroll Detection**: Detección de sección activa para cambio dinámico de logo
- **Menú Responsive**: Menú móvil full-screen con animaciones de slide
- **Smooth Scroll**: Navegación fluida entre secciones
- **UI Toggle**: Botón para ocultar/mostrar UI y apreciar mejor el video de fondo

### 📱 Optimizaciones

- **Lazy Loading**: Carga diferida de componentes con `dynamic()` de Next.js
- **Image Optimization**: Optimización automática con Next.js Image
- **Video Optimization**: Videos separados para desktop y móvil
- **Static Export**: Exportación estática para mejor rendimiento

## 🎥 Estructura de Contenido

### Secciones del Sitio

1. **Hero** - Video de fondo con texto animado y scroll indicator
2. **Trabajo** - Portafolio con filtros y grid de proyectos
3. **Sobre Spiriwors** - Información de la empresa y filosofía
4. **Trabajos Destacados** - Carrusel de proyectos principales
5. **Servicios** - Servicios creativos y contenidos originales
6. **Contacto** - Formulario con validación y enlaces sociales
7. **Footer** - Información adicional y enlaces

### Categorías de Proyectos

- **Spiriwors Historias Originales**: Proyectos propios de la empresa
- **Un Bosque Encantado**: Serie de animación
- **Venturia Historias Originales**: Colaboraciones
- **Venturia Servicios Creativos**: Trabajos comerciales

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo en http://localhost:3000

# Producción
npm run build        # Construye la aplicación para producción
npm start            # Inicia servidor de producción (requiere build previo)

# Calidad de Código
npm run lint         # Ejecuta ESLint para verificar el código
```

## 🌐 Despliegue

El proyecto está configurado para **exportación estática** (`output: 'export'`), lo que permite:

- ✅ Despliegue en cualquier servidor web estático
- ✅ Compatibilidad con GitHub Pages, Netlify, Vercel, AWS S3
- ✅ Optimización automática de imágenes y recursos
- ✅ Sin necesidad de servidor Node.js en producción

### Opciones de Despliegue

#### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Arrastra la carpeta 'out' a Netlify Drop
```

#### GitHub Pages
```bash
npm run build
# Sube la carpeta 'out' a la rama gh-pages
```

## 🎨 Personalización

### Sistema de Temas

El tema se gestiona mediante `ThemeContext` y permite:

- **Colores Dinámicos**: Cambio de acentos según preferencia
- **Modo Oscuro/Claro**: Toggle entre temas (implementado pero no activo)
- **UI Visibility**: Control de visibilidad de elementos UI

### Colores Principales

Definidos en `tailwind.config.ts` y `ThemeContext`:

- **Primario**: Amarillo (#FBBF24) - Acentos y elementos destacados
- **Fondo Hero**: Gradiente oscuro
- **Fondo Secciones**: 
  - `bg-gray-700` - Trabajo y Servicios
  - `bg-gray-800` - Trabajos Destacados y Contacto
  - `bg-gray-600` - Sobre Spiriwors

### Fuentes

- **Amatic SC**: Títulos principales (estilo artístico)
- **Inter**: Texto general (máxima legibilidad)
- **Creepster**: Elementos dramáticos y acentos

## 📱 Responsive Design

### Breakpoints

- **Móviles**: < 768px
  - Menú full-screen
  - Videos optimizados para móvil
  - Botones de filtro reducidos 40%
  - Títulos aumentados 40%

- **Tablets**: 768px - 1024px
  - Grid de 2 columnas en proyectos
  - Layout adaptativo

- **Desktop**: > 1024px
  - Grid de 3 columnas
  - Cursor personalizado activo
  - Efectos parallax completos

## 🔧 Solución de Problemas

### Videos No Se Reproducen

1. Verifica que los archivos existen en `/public/heroVideoDesktop/` o `/public/heroMobileVideo/`
2. Usa Chrome o Firefox para mejor compatibilidad
3. Convierte archivos a formato MP4 con codec H.264
4. Verifica que los videos tengan `playsInline` para móviles

### Problemas de Dependencias

```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Puerto en Uso

```bash
# Cambiar puerto
npm run dev -- -p 3001
```

### Errores de Build

```bash
# Limpiar caché de Next.js
rm -rf .next
npm run build
```

## 🏗️ Arquitectura Técnica

### Componentes Clave

- **Hero**: Video de fondo responsivo con detección de tamaño de pantalla
- **Projects**: Sistema de filtrado con lógica condicional para parallax
- **Navbar**: Scroll detection con IntersectionObserver para cambio de logo
- **MegaCard**: Componente con flip animation y soporte multi-formato de video

### Patrones de Diseño

- **Context API**: Gestión global de tema y estado
- **Custom Hooks**: Reutilización de lógica de animaciones
- **Dynamic Imports**: Code splitting para mejor rendimiento
- **Component Composition**: Componentes pequeños y reutilizables

## 📞 Contacto y Soporte

**Spiriwors**
- **Fundador**: Camilo Ayala
- **Especialidad**: Animación Stop-Motion y 2D
- **Ubicación**: Bogotá, Colombia
- **Redes**: Instagram, LinkedIn (ver Footer del sitio)

## 📄 Licencia

Este proyecto es propiedad de Spiriwors. Todos los derechos reservados.

---

*Creado con ❤️ por el equipo de Spiriwors*
