import "./globals.css";
import type { Metadata } from "next";
import { Inter, Creepster, Amatic_SC } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
});
const creepster = Creepster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-creepster",
  display: 'swap',
  preload: false, // Defer decorative font
  fallback: ['cursive']
});
const amaticSC = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-amatic-sc",
  display: 'swap',
  preload: true, // Used in headings
  fallback: ['cursive', 'Comic Sans MS']
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://spiriwors.com"
  ),
  title: "Spiriwors - Animación Stop-Motion & 2D en Colombia",
  description:
    "Spiriwors es una empresa especializada en animación stop-motion y 2D. Creamos experiencias visuales únicas que conectan marcas con audiencias. Bogotá, Colombia.",
  keywords:
    "animación, stop-motion, animación 2D, empresa animación, Spiriwors, Colombia, videos comerciales, producción visual, Camilo Ayala, Bogotá",
  authors: [{ name: "Camilo Ayala" }, { name: "Spiriwors" }],
  creator: "Spiriwors",
  publisher: "Spiriwors",
  applicationName: "Spiriwors",
  icons: {
    icon: "/assets/logoSW.ico",
    apple: [
      { url: "/assets/logoSW.png", sizes: "180x180", type: "image/png" },
      { url: "/assets/logoSW.png", sizes: "152x152", type: "image/png" },
      { url: "/assets/logoSW.png", sizes: "120x120", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#facc15",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://spiriwors.com",
    siteName: "Spiriwors",
    title: "Spiriwors - Animación Stop-Motion & 2D en Colombia",
    description:
      "Especialistas en animación stop-motion y 2D. Creamos experiencias visuales únicas que conectan marcas con audiencias.",
    images: [
      {
        url: "/assets/logoSW.png",
        width: 1200,
        height: 630,
        alt: "Spiriwors - Empresa de Animación Stop-Motion y 2D",
        type: "image/png",
      },
    ],
    countryName: "Colombia",
    emails: ["hola@spiriwors.com"],
    phoneNumbers: ["+57-300-123-4567"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spiriwors - Animación Stop-Motion & 2D en Colombia",
    description:
      "Especialistas en animación stop-motion y 2D. Creamos experiencias visuales únicas que conectan marcas con audiencias.",
    images: ["/assets/logoSW.png"],
    creator: "@spiriwors",
  },
  alternates: {
    canonical: "https://spiriwors.com",
    languages: {
      "es-CO": "https://spiriwors.com",
      "es": "https://spiriwors.com",
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
  },
  category: "business",
  classification: "Animation Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Spiriwors",
    url: "https://spiriwors.com",
    logo: "https://spiriwors.com/assets/logoSW.png",
    description:
      "Empresa especializada en animación stop-motion y 2D en Colombia",
    founder: {
      "@type": "Person",
      name: "Camilo Ayala",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hola@spiriwors.com",
      contactType: "customer service",
      availableLanguage: ["Spanish"],
    },
    sameAs: [
      "https://instagram.com/spiriwors",
      "https://linkedin.com/company/spiriwors",
      "https://youtube.com/@spiriwors",
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Spiriwors",
    image: "https://spiriwors.com/assets/logoSW.png",
    "@id": "https://spiriwors.com",
    url: "https://spiriwors.com",
    telephone: "+57-300-123-4567",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bogotá",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.6097,
      longitude: -74.0817,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "$$",
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* DNS Prefetch and Preconnect for Google Fonts - Faster font loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body
        className={`${inter.className} ${creepster.variable} ${amaticSC.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
