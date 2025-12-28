import { Metadata } from 'next';
import MonApproche from '@/src/page-components/MonApproche';
import { generateMetadata as genMeta } from '@/content/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('approche');

export default function ApprochePage() {
  return <MonApproche />;
}
