'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiftRegistryItem as RegistryType } from '@/types/invitation';
import { EtherealBorderFrame, ThinGoldRule, DiamondSeparator } from './BotanicalAssets';

export const GiftRegistry: React.FC<{ registries: RegistryType[] }> = ({ registries }) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(accountNumber);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <section className="relative w-full py-20 bg-transparent overflow-hidden px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="font-emerald-sans text-[10px] tracking-[0.35em] uppercase text-emerald-gold">
            Gift Registry
          </p>
          <h2 className="font-emerald-serif text-3xl md:text-4xl text-emerald-gradient leading-relaxed">
            ចំណងដៃ
          </h2>
          <div className="w-24 mx-auto mt-4">
            <ThinGoldRule />
          </div>
        </div>

        {/* Registry Frame Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-10"
        >
          <EtherealBorderFrame className="shadow-[0_8px_30px_rgba(201,168,76,0.1)] py-10 px-6 text-center">
            
            <p className="font-emerald-serif text-[15px] text-emerald-ivory/90 max-w-[320px] mx-auto leading-[1.8] mb-8">
              វត្តមានរបស់ឯកឧត្តម លោកជំទាវ លោកអ្នកស្រី គឺជាកិត្តិយសដ៏ឧត្តុង្គឧត្តមបំផុតសម្រាប់គ្រួសារយើងខ្ញុំ។ ប្រសិនបើលោកអ្នកមានបំណងចង់ចូលរួមជាចំណងដៃ យើងខ្ញុំសូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ។
            </p>
            <p className="font-emerald-serif text-[13px] text-emerald-ivory/70 max-w-[300px] mx-auto leading-[1.6] mb-10 italic">
              Your presence at our wedding is the greatest gift of all. However, should you wish to help us celebrate with a gift, a registry is available below.
            </p>

            {registries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
                {registries.map((registry) => (
                  <div 
                    key={registry.id}
                    className="relative flex flex-col items-center p-6 rounded-xl border border-emerald-gold/30"
                    style={{ background: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    <h3 className="font-emerald-serif text-lg text-emerald-gradient mb-4 font-bold tracking-wide">
                      {registry.bankName}
                    </h3>
                    
                    {registry.qrCodeUrl && (
                      <div className="w-32 h-32 relative mb-4 p-2 bg-white rounded-lg shadow-sm border border-emerald-gold/20 flex items-center justify-center overflow-hidden">
                        <img 
                          src={registry.qrCodeUrl} 
                          alt={`${registry.bankName} QR Code`}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                    )}
                    
                    <p className="font-emerald-sans text-xs tracking-wider text-emerald-ivory mb-2 font-semibold">
                      {registry.accountName}
                    </p>
                    
                    <div 
                      onClick={() => handleCopy(registry.accountNumber)}
                      className="cursor-pointer group flex items-center justify-center gap-2 bg-white/60 hover:bg-white/90 border border-emerald-gold/40 transition-colors px-4 py-2 rounded-full w-full"
                    >
                      <p className="font-emerald-sans text-[11px] tracking-widest text-emerald-gold group-hover:text-emerald-ivory font-bold transition-colors">
                        {copiedAccount === registry.accountNumber ? 'COPIED!' : registry.accountNumber}
                      </p>
                      {copiedAccount !== registry.accountNumber && (
                        <svg className="w-3 h-3 text-emerald-gold group-hover:text-emerald-ivory transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-emerald-sans text-xs tracking-widest text-emerald-gold/60 uppercase">
                No registry information available
              </p>
            )}

            <div className="w-1/3 mx-auto mt-10">
              <DiamondSeparator />
            </div>

          </EtherealBorderFrame>
        </motion.div>
      </div>
    </section>
  );
};
