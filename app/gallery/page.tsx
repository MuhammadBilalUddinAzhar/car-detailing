import type { Metadata } from 'next';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery — Auto Extreme',
  description: 'Recent corrections, coatings and interior restorations from the studio.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
