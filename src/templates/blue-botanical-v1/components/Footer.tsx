'use client';

import React from 'react';
import { Couple } from '@/types/invitation';

interface FooterProps {
  couple: Couple;
}

export const Footer: React.FC<FooterProps> = ({ couple }) => {
  return (
    <footer
      className="py-16 px-6 text-center relative overflow-hidden mt-10"
      style={{
        background: 'linear-gradient(180deg, rgba(28, 48, 74, 0.96) 0%, rgba(14, 28, 48, 1) 100%)',
        borderTop: '1px solid rgba(232, 201, 122, 0.2)'
      }}
    >
      <div className="relative z-10 space-y-4 max-w-lg mx-auto">
        <span style={{ fontSize: '2rem' }}>💙</span>
        <h3 className="font-khmer-title text-xl" style={{ color: '#FAF6EF', lineHeight: 1.7 }}>
          {couple.groom.nameKh} &amp; {couple.bride.nameKh}
        </h3>
        <p className="font-serif-en italic text-sm" style={{ color: '#E8C97A' }}>
          {couple.groom.nameEn} &amp; {couple.bride.nameEn}
        </p>
        <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(232, 201, 122, 0.4), transparent)' }} />
        <p className="font-khmer-body text-xs" style={{ color: 'rgba(250, 246, 239, 0.7)' }}>
          សូមអរគុណចំពោះការចូលរួម
        </p>
        <p className="font-serif-en text-[10px] tracking-widest uppercase mt-6" style={{ color: 'rgba(232, 201, 122, 0.4)' }}>
          Srolanh Wedding · Blue Botanical Template
        </p>
      </div>
    </footer>
  );
};

export default Footer;
