'use client';

import React from 'react';
import { Couple } from '@/types/invitation';

interface FooterProps {
  couple: Couple;
}

export const Footer: React.FC<FooterProps> = ({ couple }) => {
  return (
    <footer
      className="py-16 px-6 text-center relative"
      style={{
        background: 'rgba(92,58,0,0.85)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="relative z-10 space-y-4">
        <span style={{ fontSize: '2rem' }}>🌸</span>
        <h3 className="font-khmer-title text-xl" style={{ color: '#FFE566', lineHeight: 1.7 }}>
          {couple.groom.nameKh} &amp; {couple.bride.nameKh}
        </h3>
        <p className="font-serif-en italic text-sm" style={{ color: 'rgba(255,245,180,0.7)' }}>
          {couple.groom.nameEn} &amp; {couple.bride.nameEn}
        </p>
        <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,220,80,0.5), transparent)' }} />
        <p className="font-khmer-body text-xs" style={{ color: 'rgba(255,245,180,0.5)' }}>
          សូមអរគុណចំពោះការចូលរួម
        </p>
        <p className="font-serif-en text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,220,80,0.3)' }}>
          Srolanh Wedding · Angkor Heritage Template
        </p>
      </div>
    </footer>
  );
};

export default Footer;
