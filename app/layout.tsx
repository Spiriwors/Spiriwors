import './globals.css';
import type { Metadata } from 'next';
import { Inter, Creepster, Amatic_SC } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const creepster = Creepster({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-creepster'
});
const amaticSC = Amatic_SC({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-amatic-sc'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://spiriwors.com'),
  title: 'Spiriwors - Empresa de Animación | Stop-Motion & Animación 2D',
  description: 'Spiriwors es una empresa especializada en animación stop-motion y 2D. Creamos experiencias visuales únicas que conectan marcas con audiencias. Bogotá, Colombia.',
  keywords: 'animación, stop-motion, animación 2D, empresa animación, Spiriwors, Colombia, videos comerciales, producción visual',
  icons: {
    icon: '/assets/logoSW.ico',
  },
  openGraph: {
    title: 'Spiriwors - Empresa de Animación',
    description: 'Especialistas en animación stop-motion y 2D. Convirtiendo ideas en experiencias visuales únicas.',
    type: 'website',
    locale: 'es_CO',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} ${creepster.variable} ${amaticSC.variable}`}>{children}</body>
    </html>
  );
}