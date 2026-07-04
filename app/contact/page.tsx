import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact & Booking — Auto Extreme',
  description: 'Book a detail, ceramic coating or PPF install at Auto Extreme.',
};

export default function ContactPage() {
  return (
    <Suspense>
      <ContactClient />
    </Suspense>
  );
}
