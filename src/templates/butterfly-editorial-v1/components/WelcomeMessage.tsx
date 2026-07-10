'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Butterfly } from './Butterfly';

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

  // Easing transition variables
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const wordVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 15 },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <section className="relative py-28 px-4 md:px-8 bg-transparent overflow-hidden flex flex-col items-center justify-center">
      {/* Decorative luxury gradient lighting */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F5E6E3]/35 to-transparent pointer-events-none" />

      {/* Floating Center Butterfly with Glow Ring */}
      <div className="flex justify-center mb-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#FFEFCB] blur-3xl opacity-35 pointer-events-none" />
        <Butterfly size={75} delay={0.2} interactive={true} />
      </div>

      {/* High-end magazine paper block */}
      <div className="max-w-2xl w-full mx-auto text-center space-y-10 relative z-10 px-4">
        {/* Word-by-word reveal headline */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="space-y-4"
        >
          <span className="font-editorial-serif text-[9px] tracking-[0.5em] text-[#C5A059] uppercase font-bold block">
            Welcome Greeting
          </span>
          
          <h2 className="font-editorial-serif text-3xl md:text-4xl text-[#5A121D] font-light leading-tight tracking-wide flex flex-wrap justify-center gap-x-2.5">
            {words.map((word, i) => (
              <m.span key={i} variants={wordVariants} className="inline-block">
                {word}
              </m.span>
            ))}
          </h2>
          <div className="w-12 h-[0.5px] bg-[#C5A059]/40 mx-auto mt-3" />
        </m.div>

        {/* Paper texture quote block */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative p-6 md:p-10 rounded-2xl bg-white border border-[#C5A059]/15 shadow-[0_20px_50px_rgba(90,18,29,0.02)]"
        >
          {/* Inner card border */}
          <div className="absolute inset-2 border border-[#C5A059]/5 rounded-xl pointer-events-none" />

          {/* Large Gold Quotation Marks */}
          <span className="absolute top-2 left-4 font-editorial-serif text-5xl text-[#C5A059]/15 leading-none pointer-events-none">
            “
          </span>
          <span className="absolute bottom-[-15px] right-4 font-editorial-serif text-5xl text-[#C5A059]/15 leading-none pointer-events-none">
            ”
          </span>

          <div className="space-y-6 relative z-10">
            {/* Traditional Khmer text */}
            {invitationTextKh && (
              <p className="font-sans text-sm md:text-base leading-[2.2] text-[#2A2A2A] font-light tracking-wide px-4">
                {invitationTextKh}
              </p>
            )}

            {invitationTextKh && invitationTextEn && (
              <div className="w-16 h-[0.5px] bg-[#C5A059]/25 mx-auto" />
            )}

            {/* Premium English text */}
            {invitationTextEn && (
              <p className="font-editorial-serif text-[10px] md:text-xs leading-[2.4] tracking-[0.2em] text-[#2A2A2A]/60 uppercase px-4 font-light">
                {invitationTextEn}
              </p>
            )}
          </div>
        </m.div>
      </div>

      {/* Decorative gold vector line */}
      <div className="h-20 w-[0.5px] bg-gradient-to-b from-[#C5A059]/35 to-transparent mt-16" />
    </section>
  );
};

export default WelcomeMessage;
