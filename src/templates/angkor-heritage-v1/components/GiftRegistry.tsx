'use client';

import React from 'react';
import { m } from 'framer-motion';
import { GiftRegistryItem } from '@/types/invitation';

interface GiftProps { registries: GiftRegistryItem[]; }

export const GiftRegistry: React.FC<GiftProps> = ({ registries }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
  <section className="py-20 px-6" style={{ /*background: 'linear-gradient(180deg, rgba(255, 248, 232, 0.85) 0%, rgba(255, 243, 208, 0.85) 100%)',*/
    backdropFilter: 'blur(1px)'
  }}>
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#ffffffff' }}>Gift Registry</p>
        <h2 className="font-khmer-title text-xl" style={{ color: '#ffffff', lineHeight: 1.7 }}>អំណោយអាពាហ៍ពិពាហ៍</h2>
        <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #ffffff, transparent)' }} />
        <p className="font-khmer-body text-sm" style={{ color: '#ffffff', opacity: 0.7 }}>
          ប្រសិនបើអ្នកចង់ផ្ញើអំណោយ អ្នកអាចធ្វើប្រតិបត្តិការតាមរយៈ
        </p>
      </div>

      {registries.map((item, i) => (
        <m.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.1 }}
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,240,0.85)', border: '1px solid rgba(180,120,20,0.25)' }}
        >
          <div className="px-5 py-3 flex items-center justify-between"
            style={{ background: 'rgba(212,160,32,0.12)', borderBottom: '1px solid rgba(180,120,20,0.15)' }}>
            <span className="font-serif-en text-xs font-bold tracking-widest uppercase" style={{ color: '#8B6000' }}>{item.bankName}</span>
            <span style={{ color: '#D4A020', opacity: 0.6 }}>✦</span>
          </div>
          <div className="p-5 flex gap-4 items-center">
            {item.qrCodeUrl && (
              <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden p-1"
                style={{ border: '1px solid rgba(180,120,20,0.3)', background: '#fff' }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- QR sources may be data URLs. */}
                <img src={item.qrCodeUrl} alt={item.bankName} className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
            <div className="space-y-2">
              <div>
                <p className="font-serif-en text-[10px] tracking-widest uppercase" style={{ color: '#B8860B', opacity: 0.6 }}>Account Name</p>
                <p className="font-khmer-body font-bold" style={{ color: '#5C3A00' }}>{item.accountName}</p>
              </div>
              <div>
                <p className="font-serif-en text-[10px] tracking-widest uppercase" style={{ color: '#B8860B', opacity: 0.6 }}>Account Number</p>
                <div className="flex items-center gap-3">
                  <p className="font-serif-en font-bold tracking-widest" style={{ color: '#3D2200', fontSize: '1rem' }}>{item.accountNumber}</p>
                  <button
                    onClick={() => copyToClipboard(item.accountNumber, item.id)}
                    className="text-[9px] uppercase tracking-widest px-2 py-1 rounded border hover:bg-[#D4A020]/10 transition-colors"
                    style={{ borderColor: '#D4A020', color: '#8B6000' }}
                  >
                    {copiedId === item.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      ))}
    </div>
  </section>
  );
};
export default GiftRegistry;
