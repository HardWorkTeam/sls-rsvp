'use client';

import React from 'react';
import { m } from 'framer-motion';
import { LoveStoryMilestone } from '@/types/invitation';
import { Photo } from '@/components/Photo';

interface LoveStoryProps { milestones: LoveStoryMilestone[]; }

export const LoveStory: React.FC<LoveStoryProps> = ({ milestones }) => {
  const sorted = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <section className="py-20 px-6 bg-transparent">
      <div className="max-w-md mx-auto space-y-10">
        <div className="text-center space-y-2">
          <p className="font-editorial-serif text-[10px] tracking-[0.45em] uppercase font-bold text-[#C5A059]" style={{ opacity: 0.85 }}>Our Love Story</p>
          <h2 className="font-sans font-bold text-xl text-[#2A2A2A]" style={{ lineHeight: 1.7 }}>រឿងរ៉ាវស្នេហា</h2>
          <div className="h-[0.5px] w-16 mx-auto bg-[#C5A059]/30" />
        </div>

        <div className="relative pl-6">
          <div className="absolute left-[11px] top-0 bottom-0 w-[0.5px]"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(197,160,89,0.3) 10%, rgba(197,160,89,0.3) 90%, transparent)' }} />
          <div className="space-y-10">
            {sorted.map((milestone, i) => (
              <m.div
                key={milestone.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-5 relative"
              >
                <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full border flex items-center justify-center relative z-10"
                  style={{ borderColor: 'rgba(197,160,89,0.5)', background: '#FCFBF9' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#5A121D' }} />
                </div>
                <div className="flex-1 space-y-2 p-4 rounded-xl border border-[#C5A059]/20 bg-white/80 backdrop-blur-md shadow-sm">
                  {milestone.photoUrl && (
                    <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                      <Photo src={milestone.photoUrl} alt={milestone.title} fill sizes="(max-width: 768px) 90vw, 400px" className="transition-transform duration-700 hover:scale-105" />
                    </div>
                  )}
                  <span className="font-editorial-serif text-[9px] tracking-widest uppercase font-bold text-[#C5A059]">{milestone.dateLabel}</span>
                  <h4 className="font-sans font-bold text-[15px] text-[#2A2A2A]">{milestone.title}</h4>
                  <p className="font-sans text-[13px] leading-relaxed text-[#2A2A2A]/70 font-light">{milestone.description}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoveStory;
