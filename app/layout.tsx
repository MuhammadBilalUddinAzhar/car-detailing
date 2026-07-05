import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { site } from '@/lib/data';

export const metadata: Metadata = {
  title: `${site.name} — Ceramic Coating, PPF & Detailing Studio`,
  description:
    'Cinematic-grade car detailing: 9H ceramic coatings, paint correction, PPF and interior detailing. Book your slot at Auto Extreme.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Swap for next/font if you prefer self-hosted fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-chrome font-body antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
