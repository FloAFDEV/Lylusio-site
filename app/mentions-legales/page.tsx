import { Metadata } from 'next';
import MentionsLegales from '@/src/page-components/MentionsLegales';
import { generateMetadata as genMeta } from '@/content/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('mentionsLegales');

export default function MentionsLegalesPage() {
  return <MentionsLegales />;
}
