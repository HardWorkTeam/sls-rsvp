'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { GiftRegistryItem } from '@/types/invitation';
import { SectionHeading, DiamondDivider, DrawBorderFrame } from '../../royal-khmer-v1/components/KhmerOrnaments';

interface GiftProps {
  registries: GiftRegistryItem[];
}

export const GiftRegistry: React.FC<GiftProps> = ({ registries }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (num: string, id: string) => {
    navigator.clipboard.writeText(num.replace(/\s+/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      className="rk-section"
      style={{ background: 'linear-gradient(180deg, #3D0207 0%, #260206 100%)' }}
    >
      <div className="max-w-lg mx-auto space-y-10">
        <SectionHeading
          en="Gift Registry"
          kh="អំណោយអាពាហ៍ពិពាហ៍"
          sub="Your presence is our greatest gift"
        />

        <p
          className="font-khmer-body text-sm text-center leading-relaxed text-[#FAF6EF]/60"
        >
          ប្រសិនបើលោកអ្នកចង់ចូលរួមចងដៃអបអរសាទរ អ្នកអាចផ្ញើតាម ABA តាមរយៈ :
        </p>

        <div className="space-y-6">
          {registries.map((item, index) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="card-tilt-hover transition-all w-full"
            >
              <DrawBorderFrame className="p-0 overflow-hidden w-full" style={{ background: 'rgba(92, 3, 12, 0.65)', borderColor: 'rgba(232, 201, 122, 0.2)' }}>
                {/* Bank name header bar */}
                <div
                  className="px-5 py-3 flex items-center justify-between"
                  style={{
                    background: 'rgba(232,201,122,0.12)',
                    borderBottom: '1px solid rgba(232,201,122,0.15)',
                  }}
                >
                  <span
                    className="font-serif-en text-xs font-bold tracking-[0.2em] uppercase text-[#E8C97A]"
                  >
                    {item.bankName}
                  </span>
                  <span className="text-[#E8C97A]" style={{ opacity: 0.5 }}>✦</span>
                </div>

                <div className="p-5 flex gap-5 items-center">
                  {/* QR Code */}
                  {item.qrCodeUrl && (
                    <div
                      className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden"
                      style={{
                        border: '1px solid rgba(232,201,122,0.3)',
                        background: 'rgba(250,246,239,0.05)',
                        padding: '4px',
                      }}
                    >
                      <img
                        src={item.qrCodeUrl}
                        alt={`QR Code ${item.bankName}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Account detail & Copy Button */}
                  <div className="flex-1 space-y-3 text-[#FAF6EF]">
                    <div>
                      <p className="font-serif-en text-[9px] tracking-widest uppercase text-[#E8C97A] opacity-65">
                        Account Name
                      </p>
                      <p className="font-khmer-body font-bold text-[#E8C97A]" style={{ fontSize: '0.9rem' }}>
                        {item.accountName}
                      </p>
                    </div>

                    <DiamondDivider color="#E8C97A" />

                    <div>
                      <p className="font-serif-en text-[9px] tracking-widest uppercase text-[#E8C97A] opacity-65">
                        Account Number
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="font-serif-en font-bold tracking-widest text-[1rem]">
                          {item.accountNumber}
                        </p>

                        <button
                          onClick={() => copyToClipboard(item.accountNumber, item.id)}
                          className="px-2 py-0.5 text-[9px] rounded border border-[#E8C97A]/30 text-[#E8C97A] cursor-pointer hover:bg-[#E8C97A]/10 active:scale-95 transition-all flex items-center gap-1 font-khmer-body"
                        >
                          {copiedId === item.id ? '✓ ចម្លងរួច' : 'ចម្លង / Copy'}
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
