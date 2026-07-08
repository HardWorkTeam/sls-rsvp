'use client';

import React from 'react';
import { m } from 'framer-motion';

interface WelcomeMessageProps {
  invitationTextKh?: string;
  invitationTextEn?: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  invitationTextKh = 'មានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោកអ្នកស្រី អ្នកនាងកញ្ញា ចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីជ័យមង្គលក្នុងពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ',
  invitationTextEn = 'CORDIALLY REQUEST THE HONOR OF YOUR PRESENCE ON THE AUSPICIOUS OCCASION OF THE WEDDING OF OUR CHILDREN',
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
    <section className="relative py-24 px-6 rk-section text-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#2C1810]/30 to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-12 relative z-10">
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="space-y-4"
        >
          <span className="font-serif-en text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: 'var(--rk-gold)' }}>
            Welcome Greeting
          </span>
          <h2 className="font-serif-en text-3xl md:text-4xl flex flex-wrap justify-center gap-x-2.5" style={{ color: 'var(--rk-gold-light)' }}>
            {words.map((word, i) => (
              <m.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </m.span>
            ))}
          </h2>
          <div className="w-16 h-[1px] mx-auto mt-4" style={{ background: 'var(--rk-gold)', opacity: 0.4 }} />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-12 rounded-xl border"
          style={{ background: 'rgba(26,14,8,0.7)', borderColor: 'rgba(201,168,76,0.2)', backdropFilter: 'blur(5px)' }}
        >
          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l" style={{ borderColor: 'var(--rk-gold)', opacity: 0.5 }} />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r" style={{ borderColor: 'var(--rk-gold)', opacity: 0.5 }} />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l" style={{ borderColor: 'var(--rk-gold)', opacity: 0.5 }} />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r" style={{ borderColor: 'var(--rk-gold)', opacity: 0.5 }} />

          <span className="absolute -top-6 left-6 font-serif-en text-7xl leading-none" style={{ color: 'var(--rk-gold)', opacity: 0.1 }}>“</span>
          <span className="absolute -bottom-10 right-6 font-serif-en text-7xl leading-none" style={{ color: 'var(--rk-gold)', opacity: 0.1 }}>”</span>

          <div className="space-y-6 relative z-10">
            <p className="font-khmer-body text-sm md:text-[15px] leading-loose tracking-wide" style={{ color: 'var(--rk-ivory)' }}>
              {invitationTextKh}
            </p>
            <div className="w-12 h-[1px] mx-auto" style={{ background: 'var(--rk-gold)', opacity: 0.3 }} />
            <p className="font-serif-en text-[10px] md:text-xs leading-[2.2] tracking-[0.2em] uppercase" style={{ color: 'var(--rk-gold)' }}>
              {invitationTextEn}
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
