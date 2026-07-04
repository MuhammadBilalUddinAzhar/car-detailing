import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact & Booking — Auto Extreme',
  description: 'Book a detail via WhatsApp — pick a service, tell us about your car, done.',
};

export default function ContactPage() {
  return <ContactClient />;
}
