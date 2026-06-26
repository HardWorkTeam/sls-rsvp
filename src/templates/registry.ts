import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { InvitationData } from '@/types/invitation';

export interface TemplateProps {
  data: InvitationData;
  guestName?: string; // From the ?to= URL param (set by the guest list "send" action)
}

export const TEMPLATE_REGISTRY: Record<string, ComponentType<TemplateProps>> = {
  'royal-khmer-v1': dynamic(() => import('./royal-khmer-v1'), { ssr: true }),
  'angkor-heritage-v1': dynamic(() => import('./angkor-heritage-v1'), { ssr: true }),
  'blue-botanical-v1': dynamic(() => import('./blue-botanical-v1'), { ssr: true }),
  'red-rose-luxury-v1': dynamic(() => import('./red-rose-luxury-v1'), { ssr: true }),
  'butterfly-editorial-v1': dynamic(() => import('./butterfly-editorial-v1'), { ssr: true }),
  'emerald-elegance-v1': dynamic(() => import('./emerald-elegance-v1'), { ssr: true }),
};
