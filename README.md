# 🎬 Spiriwors - Empresa de Animación

**Spiriwors** es una empresa especializada en animación y producción visual, fundada y dirigida por **Camilo Ayala**, ilustrador y animador profesional. Creamos experiencias únicas que conectan marcas con audiencias a través de historias visuales impactantes, combinando las habilidades artísticas de Camilo con técnicas avanzadas de animación stop-motion y 2D.

## 🚀 Tecnologías Utilizadas

- **Framework**: Next.js 13.5.1 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con animaciones personalizadas
- **Componentes UI**: Radix UI con shadcn/ui
- **Fuentes**: Inter, Creepster y Amatic SC (Google Fonts)
- **Build**: Configuración de exportación estática

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

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

## 📁 Estructura del Proyecto

```
Spiriwors/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raíz con fuentes y metadatos
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales y configuración Tailwind
├── components/            # Componentes React
│   ├── Hero.tsx          # Sección de inicio con animaciones
│   ├── Navbar.tsx        # Navegación con efectos de scroll
│   ├── Projects.tsx     # Portafolio de videos con filtros
│   ├── About.tsx         # Información de la empresa
│   ├── Services.tsx      # Servicios ofrecidos
│   ├── Contact.tsx       # Formulario de contacto
│   ├── Footer.tsx        # Componente de pie de página
│   └── ui/               # Componentes UI reutilizables
├── public/               # Recursos estáticos
│   ├── assets/           # Imágenes y logos
│   └── videos/           # Contenido de video organizado por categorías
└── Archivos de configuración # Next.js, TypeScript, Tailwind, etc.
```

## 🎥 Categorías de Contenido

El sitio web incluye un portafolio de videos organizado en las siguientes categorías:

### 🎭 Spiriwors Historias Originales
- **La Joya Del Pantano** - Trailer de historia original
- **SALU** - Trailer de historia original

### 🌲 Un Bosque Encantado
- **El Abrazo del Ciempiés** - Un Bosque Encantado 2
- **LOBOS** - Un Bosque Encantado 2

### 🎪 Venturia Historias Originales
- **COPPOLA** - Historia original

### 🎵 Venturia Servicios Creativos
- **AJR - My Play** - Video oficial
- **ONR - It Gets to a Point** - Video musical
- **We The Kingdom - Christmas In Hawaii** - Video oficial

## ✨ Características Principales

### 🎨 Diseño y UX
- **Diseño Responsivo**: Enfoque mobile-first con animaciones suaves
- **Tema Oscuro**: Esquema de colores profesional (gris/amarillo)
- **Tipografía Personalizada**: Fuentes artísticas y profesionales
- **Animaciones**: Transiciones y efectos visuales únicos

### 🎬 Funcionalidades de Video
- **Reproductor Modal**: Sistema avanzado de reproducción de videos
- **Filtros por Categoría**: Navegación intuitiva del portafolio
- **Soporte Multi-formato**: Compatibilidad con MP4, MOV, AVI
- **Fallbacks Inteligentes**: Opciones de descarga y mensajes de error

### 🧭 Navegación
- **Scroll Suave**: Navegación fluida entre secciones
- **Menú Responsivo**: Adaptable a dispositivos móviles
- **Indicadores Visuales**: Efectos de scroll y estados activos

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint para verificar el código
```

## 🌐 Despliegue

El proyecto está configurado para exportación estática (`output: 'export'` en `next.config.js`), lo que permite:

- Despliegue en cualquier servidor web estático
- Compatibilidad con GitHub Pages, Netlify, Vercel
- Optimización automática de imágenes y recursos

### Despliegue en Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Despliegue en Netlify

```bash
npm run build
# Subir la carpeta 'out' generada
```

## 🎨 Personalización

### Colores del Tema
Los colores principales se definen en `tailwind.config.ts`:
- **Primario**: Amarillo (#FBBF24)
- **Secundario**: Gris oscuro (#374151)
- **Fondo**: Gradientes de gris

### Fuentes
- **Títulos**: Amatic SC (artística)
- **Texto**: Inter (legible)
- **Acentos**: Creepster (dramática)

## 📱 Responsive Design

El sitio está optimizado para:
- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

## 🔧 Solución de Problemas

### Error de Video No Cargado
Si los videos no se reproducen:
1. Verifica que los archivos existen en `/public/videos/`
2. Usa Chrome o Firefox para mejor compatibilidad
3. Convierte archivos a formato MP4
4. Usa la opción de descarga como alternativa

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

## 📞 Contacto

**Spiriwors**
- **Fundador**: Camilo Ayala
- **Especialidad**: Animación Stop-Motion y 2D
- **Ubicación**: Bogotá, Colombia

## 📄 Licencia

Este proyecto es propiedad de Spiriwors. Todos los derechos reservados.

---

*Creado con ❤️ por el equipo de Spiriwors*
