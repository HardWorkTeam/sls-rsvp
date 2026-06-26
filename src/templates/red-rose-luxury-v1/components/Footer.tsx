'use client';

import React from 'react';
import { Couple } from '@/types/invitation';

interface FooterProps {
  couple: Couple;
}

export const Footer: React.FC<FooterProps> = ({ couple }) => {
  return (
    <footer
      className="py-16 px-6 text-center"
      style={{
        background: 'linear-gradient(180deg, rgba(92,3,12,0.7) 0%, rgba(26,2,2,0.96) 100%)',
      }}
    >
      <div className="space-y-4">
        <span style={{ fontSize: '2rem' }}>🌹</span>
        <h3 className="font-khmer-title text-xl text-[#E8C97A]" style={{ lineHeight: 1.7 }}>
          {couple.groom.nameKh} &amp; {couple.bride.nameKh}
        </h3>
        <p className="font-serif-en italic text-sm text-[#FAF6EF]/60">
          {couple.groom.nameEn} &amp; {couple.bride.nameEn}
        </p>
        <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.4), transparent)' }} />
        <p className="font-khmer-body text-xs text-[#FAF6EF]/50">
          សូមអរគុណចំពោះការចូលរួម
        </p>
        <p className="font-serif-en text-[10px] tracking-widest uppercase text-[#E8C97A]/40">
          Srolanh Wedding · Phanaroth Luxury Template
        </p>
      </div>
    </footer>
  );
};

export default Footer;
