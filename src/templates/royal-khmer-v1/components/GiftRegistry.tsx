'use client';

import React from 'react';
import { m } from 'framer-motion';
import { GiftRegistryItem } from '@/types/invitation';
import { SectionHeading, DiamondDivider, DrawBorderFrame } from './KhmerOrnaments';

interface GiftProps {
  registries: GiftRegistryItem[];
}

export const GiftRegistry: React.FC<GiftProps> = ({ registries }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  return (
    <section
      className="rk-section"
      style={{ background: 'linear-gradient(180deg, #221208 0%, #1a0e08 100%)' }}
    >
      <div className="max-w-lg mx-auto space-y-10">
        <SectionHeading
          en="Gift Registry"
          kh="អំណោយអាពាហ៍ពិពាហ៍"
          sub="Your presence is our greatest gift"
        />

        <p
          className="font-khmer-body text-sm text-center leading-relaxed"
          style={{ color: 'var(--rk-ivory)', opacity: 0.6 }}
        >
          ប្រសិនបើអ្នកចង់ផ្ញើអំណោយ អ្នកអាចធ្វើប្រតិបត្តិការតាមរយៈ​ :
        </p>

        <div className="space-y-4">
          {registries.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-tilt-hover transition-all w-full"
            >
              <DrawBorderFrame className="p-0 overflow-hidden w-full">
              {/* Bank name header */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  borderBottom: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                <span
                  className="font-serif-en text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ color: 'var(--rk-gold)' }}
                >
                  {item.bankName}
                </span>
                <span style={{ color: 'var(--rk-gold)', opacity: 0.5 }}>✦</span>
              </div>

              <div className="p-5 flex gap-5 items-center">
                {/* QR Code */}
                {item.qrCodeUrl && (
                  <div
                    className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden"
                    style={{
                      border: '1px solid rgba(201,168,76,0.3)',
                      background: 'rgba(250,246,239,0.05)',
                      padding: '4px',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- QR sources may be data URLs. */}
                    <img
                      src={item.qrCodeUrl}
                      alt={`QR Code ${item.bankName}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Account info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <p
                      className="font-serif-en text-[10px] tracking-widest uppercase"
                      style={{ color: 'var(--rk-gold)', opacity: 0.5 }}
                    >
                      Account Name
                    </p>
                    <p
                      className="font-khmer-body font-bold"
                      style={{ color: 'var(--rk-gold-light)', fontSize: '0.9rem' }}
                    >
                      {item.accountName}
                    </p>
                  </div>
                  <DiamondDivider />
                  <div>
                    <p
                      className="font-serif-en text-[10px] tracking-widest uppercase"
                      style={{ color: 'var(--rk-gold)', opacity: 0.5 }}
                    >
                      Account Number
                    </p>
                    <div className="flex items-center gap-3">
                      <p
                        className="font-serif-en font-bold tracking-widest"
                        style={{ color: 'var(--rk-ivory)', opacity: 0.9, fontSize: '1rem' }}
                      >
                        {item.accountNumber}
                      </p>
                      <button
                        onClick={() => copyToClipboard(item.accountNumber, item.id)}
                        className="text-[9px] uppercase tracking-widest px-2 py-1 rounded border hover:bg-white/5 transition-colors"
                        style={{ borderColor: 'var(--rk-gold)', color: 'var(--rk-gold)' }}
                      >
                        {copiedId === item.id ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </DrawBorderFrame>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftRegistry;
