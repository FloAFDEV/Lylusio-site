import { Metadata } from 'next';
import CGU from '@/src/page-components/CGU';
import { generateMetadata as genMeta } from '@/content/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('cgu');

export default function CGUPage() {
  return <CGU />;
}
