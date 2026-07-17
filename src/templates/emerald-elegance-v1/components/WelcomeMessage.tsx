'use client';

import React from 'react';
import { m } from 'framer-motion';
import { EtherealBorderFrame } from './BotanicalAssets';

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
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative py-24 px-6 bg-transparent text-center">
      <EtherealBorderFrame className="max-w-2xl mx-auto space-y-12 py-16 px-6 md:px-12 bg-white/60 shadow-sm relative z-10">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="space-y-4"
        >
          <span className="font-serif-en text-[10px] tracking-[0.4em] text-emerald-gold uppercase font-bold">
            Welcome Greeting
          </span>
          <h2 className="font-serif-en text-3xl md:text-4xl text-[#0A1C16] flex flex-wrap justify-center gap-x-2.5">
            {words.map((word, i) => (
              <m.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </m.span>
            ))}
          </h2>
          <div className="w-16 h-[1px] bg-emerald-gold/40 mx-auto mt-4" />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative px-4"
        >
          <span className="absolute -top-10 left-0 font-serif-en text-7xl text-emerald-gold/10 leading-none">“</span>
          <span className="absolute -bottom-10 right-0 font-serif-en text-7xl text-emerald-gold/10 leading-none">”</span>

          <div className="space-y-6 relative z-10">
            {invitationTextKh && (
              <p className="font-khmer-body text-sm md:text-[15px] leading-loose text-[#0A1C16] tracking-wide">
                {invitationTextKh}
              </p>
            )}
            {invitationTextKh && invitationTextEn && (
              <div className="w-12 h-[1px] bg-emerald-gold/30 mx-auto" />
            )}
            {invitationTextEn && (
              <p className="font-serif-en text-[10px] md:text-xs leading-[2.2] tracking-[0.2em] text-[#0A1C16]/70 uppercase">
                {invitationTextEn}
              </p>
            )}
          </div>
        </m.div>
      </EtherealBorderFrame>
    </section>
  );
};

export default WelcomeMessage;
