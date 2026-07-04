import type { Metadata } from 'next';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery — Auto Extreme',
  description: 'Recent ceramic, correction, PPF and interior work from the studio.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
