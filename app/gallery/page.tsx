import type { Metadata } from 'next';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery — Auto Extreme',
  description: 'Ceramic coatings, corrections, PPF installs and interior revivals from the Auto Extreme studio.',
};

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8">
      <p className="eyebrow">Gallery</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tightest text-chrome md:text-6xl">Proof, panel by panel.</h1>
      <p className="mt-5 max-w-2xl text-mist">A selection of recent work from the studio. Filter by service to see what your car could look like.</p>
      <div className="mt-14">
        <GalleryClient />
      </div>
    </main>
  );
}
