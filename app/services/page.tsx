import type { Metadata } from 'next';
import ServicesClient from '@/components/ServicesClient';

export const metadata: Metadata = {
  title: 'Services — Auto Extreme',
  description:
    'Ceramic coating, paint correction, PPF, interior deep details and maintenance washes.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
