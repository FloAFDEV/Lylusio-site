import { Metadata } from 'next';
import Confidentialite from '@/src/page-components/Confidentialite';
import { generateMetadata as genMeta } from '@/content/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('confidentialite');

export default function ConfidentialitePage() {
  return <Confidentialite />;
}
