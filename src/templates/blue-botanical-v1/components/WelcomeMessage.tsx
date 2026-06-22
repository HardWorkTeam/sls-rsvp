'use client';

import React from 'react';
import { motion } from 'framer-motion';

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
    <section className="relative py-24 px-6 bg-transparent overflow-hidden text-center">
      {/* Background Decor */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#E8EFF6]/50 to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="space-y-4"
        >
          <span className="font-serif-en text-[10px] tracking-[0.4em] text-[#6A8CB2] uppercase font-bold">
            Welcome Greeting
          </span>
          <h2 className="font-serif-en text-3xl md:text-4xl text-[#2C3E56] flex flex-wrap justify-center gap-x-2.5">
            {words.map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            ))}
          </h2>
          <div className="w-16 h-[1px] bg-[#6A8CB2]/40 mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative p-8 md:p-12 rounded-xl bg-white border border-[#6A8CB2]/20 shadow-sm"
        >
          <span className="absolute -top-6 left-6 font-serif-en text-7xl text-[#6A8CB2]/10 leading-none">“</span>
          <span className="absolute -bottom-10 right-6 font-serif-en text-7xl text-[#6A8CB2]/10 leading-none">”</span>

          <div className="space-y-6 relative z-10">
            <p className="font-khmer-body text-sm md:text-[15px] leading-loose text-[#2C3E56] tracking-wide">
              {invitationTextKh}
            </p>
            <div className="w-12 h-[1px] bg-[#6A8CB2]/20 mx-auto" />
            <p className="font-serif-en text-[10px] md:text-xs leading-[2.2] tracking-[0.2em] text-[#6A8CB2] uppercase">
              {invitationTextEn}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeMessage;
