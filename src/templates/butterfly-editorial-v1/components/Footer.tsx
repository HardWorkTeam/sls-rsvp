'use client';

import React from 'react';
import { Couple } from '@/types/invitation';

interface FooterProps {
  couple: Couple;
}

export const Footer: React.FC<FooterProps> = ({ couple }) => {
  return (
    <footer className="py-16 px-6 text-center bg-transparent">
      <div className="space-y-4 max-w-sm mx-auto">
        <span style={{ fontSize: '1.5rem' }}>✨</span>
        <h3 className="font-sans font-bold text-sm text-[#2A2A2A] leading-relaxed">
          {couple.groom.nameKh} &amp; {couple.bride.nameKh}
        </h3>
        <p className="font-editorial-serif italic text-base tracking-wide text-[#5A121D] mt-1 font-medium">
          {couple.groom.nameEn.split(' ')[0]} &amp; {couple.bride.nameEn.split(' ')[0]}
        </p>
        <div className="h-[0.5px] w-12 mx-auto my-3 bg-[#C5A059]/40" />
        <p className="font-sans text-[10px] tracking-wide text-[#2A2A2A]/60">
          សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះការចូលរួម
        </p>
        <p className="font-editorial-serif text-[8px] tracking-[0.3em] uppercase text-[#C5A059]/60 font-bold mt-4">
          Srolanh Wedding · Butterfly Editorial
        </p>
      </div>
    </footer>
  );
};

export default Footer;
