'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GiftRegistryItem } from '@/types/invitation';

interface GiftRegistryProps {
  registries: GiftRegistryItem[];
}

export const GiftRegistry: React.FC<GiftRegistryProps> = ({ registries }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="relative py-20 px-4 md:px-8 bg-transparent overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 md:p-10 bg-white border border-[#C5A059]/25 shadow-[0_30px_70px_rgba(90,18,29,0.04)] relative overflow-hidden"
          style={{
            boxShadow: '0 35px 80px rgba(0,0,0,0.03), inset 0 0 50px rgba(255,255,255,0.95)',
          }}
        >
          {/* Inner border margin line */}
          <div className="absolute inset-3.5 border border-[#C5A059]/10 rounded-xl pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {/* Header */}
            <div className="text-center space-y-2">
              <p className="font-editorial-serif text-[10px] tracking-[0.4em] text-[#C5A059] uppercase font-semibold">
                Gift Registry
              </p>
              <h2 className="font-editorial-title text-2xl text-[#5A121D] font-light leading-tight">
                Wedding Gifts
              </h2>
              <div className="h-[0.5px] w-16 bg-[#C5A059]/40 mx-auto mt-3" />
              <p className="font-sans text-xs text-[#2A2A2A]/70 max-w-xs mx-auto leading-relaxed mt-3">
                Your presence is present enough, but if you wish to bless us with a gift:
              </p>
            </div>

            {/* Bank Tiles */}
            <div className="space-y-6">
              {registries.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="rounded-2xl p-5 bg-white border border-[#C5A059]/15 shadow-[0_10px_25px_rgba(90,18,29,0.02)] relative overflow-hidden"
                >
                  {/* Inner card corner frames */}
                  <div className="absolute inset-2 border border-[#C5A059]/5 rounded-xl pointer-events-none" />

                  <div className="relative z-10 flex gap-4 items-center">
                    {/* QR Code Container */}
                    {item.qrCodeUrl && (
                      <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden p-1 bg-white border border-[#C5A059]/20 shadow-xs">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.qrCodeUrl}
                          alt={item.bankName}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    )}

                    {/* Account Details */}
                    <div className="flex-1 space-y-2.5 text-left">
                      <div>
                        <span className="font-editorial-serif text-[8px] tracking-widest text-[#C5A059] uppercase block font-medium">
                          Bank Partner
                        </span>
                        <span className="font-sans text-xs font-bold text-[#5A121D] uppercase tracking-wider">
                          {item.bankName}
                        </span>
                      </div>

                      <div>
                        <span className="font-editorial-serif text-[8px] tracking-widest text-[#C5A059] uppercase block font-medium">
                          Account Name
                        </span>
                        <span className="font-sans text-xs font-semibold text-[#2A2A2A]">
                          {item.accountName}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <span className="font-editorial-serif text-[8px] tracking-widest text-[#C5A059] uppercase block font-medium">
                            Account Number
                          </span>
                          <span className="font-mono text-xs font-bold text-[#2A2A2A] tracking-wider">
                            {item.accountNumber}
                          </span>
                        </div>

                        <button
                          onClick={() => copyToClipboard(item.accountNumber, item.id)}
                          className="px-2.5 py-1 rounded text-[9px] font-editorial-serif uppercase tracking-widest bg-[#5A121D]/5 hover:bg-[#5A121D] hover:text-white text-[#5A121D] transition-colors border border-[#5A121D]/20 cursor-pointer"
                        >
                          {copiedId === item.id ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftRegistry;
