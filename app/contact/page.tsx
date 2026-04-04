import { Metadata } from 'next';
import Contact from '@/src/page-components/Contact';
import { generateMetadata as genMeta } from '@/content/seo';

export const metadata: Metadata = genMeta('contact');

export default function ContactPage() {
  return <Contact />;
}
