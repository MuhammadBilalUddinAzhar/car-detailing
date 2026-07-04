import type { Metadata } from 'next';
import ServicesClient from '@/components/ServicesClient';

export const metadata: Metadata = {
  title: 'Services — Auto Extreme',
  description:
    'Signature details, paint correction, ceramic coating, PPF, interior restoration and maintenance washes.',
};

export default function ServicesPage() {
  return <ServicesClient />;
}
