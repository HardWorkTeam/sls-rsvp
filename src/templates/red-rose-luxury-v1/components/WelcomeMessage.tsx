'use client';

import React from 'react';
import { m } from 'framer-motion';
import { PetalRain } from './PetalRain';

interface WelcomeMessageProps {
  invitationTextKh?: string;
  invitationTextEn?: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  invitationTextKh = 'មានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោកអ្នកស្រី អ្នកនាងកញ្ញា ចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីជ័យមង្គលក្នុងពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ',
  invitationTextEn = '',
}) => {
  const headline = "You're Cordially Invited";
  const words = headline.split(' ');

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const wordVariants = {
    hidden: { filter: 'blur(8px)', opacity: 0, y: 10 },
    visible: {
      filter: 'blur(0px)', opacity: 1, y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section className="relative py-24 px-6 bg-transparent text-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#5C030C]/10 to-transparent pointer-events-none" />
      <div className="absolute top-10 right-5 opacity-20 transform scale-75 pointer-events-none">
        <PetalRain />
      </div>

      <div className="max-w-2xl mx-auto space-y-12 relative z-10">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="space-y-4"
        >
          <span className="font-serif-en text-[10px] tracking-[0.4em] text-[#E8C97A] uppercase font-bold">
            Welcome Greeting
          </span>
          <h2 className="font-serif-en text-3xl md:text-4xl text-[#FAF6EF] flex flex-wrap justify-center gap-x-2.5">
            {words.map((word, i) => (
              <m.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </m.span>
            ))}
          </h2>
          <div className="w-16 h-[1px] bg-[#E8C97A]/40 mx-auto mt-4" />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-12 rounded-xl border border-[#E8C97A]/20 shadow-sm"
          style={{ background: 'rgba(92, 3, 12, 0.4)', backdropFilter: 'blur(5px)' }}
        >
          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#E8C97A]/50" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#E8C97A]/50" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#E8C97A]/50" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#E8C97A]/50" />

          <span className="absolute -top-6 left-6 font-serif-en text-7xl text-[#E8C97A]/10 leading-none">“</span>
          <span className="absolute -bottom-10 right-6 font-serif-en text-7xl text-[#E8C97A]/10 leading-none">”</span>

          <div className="space-y-6 relative z-10">
            {invitationTextKh && (
              <p className="font-khmer-body text-sm md:text-[15px] leading-loose text-[#FAF6EF] tracking-wide">
                {invitationTextKh}
              </p>
            )}
            {invitationTextKh && invitationTextEn && (
              <div className="w-12 h-[1px] bg-[#E8C97A]/30 mx-auto" />
            )}
            {invitationTextEn && (
              <p className="font-serif-en text-[10px] md:text-xs leading-[2.2] tracking-[0.2em] text-[#E8C97A] uppercase">
                {invitationTextEn}
              </p>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
