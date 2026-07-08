'use client';

import React from 'react';
import { m } from 'framer-motion';
import { LoveStoryMilestone } from '@/types/invitation';
import { Photo } from '@/components/Photo';
import { EtherealBorderFrame } from './BotanicalAssets';

interface LoveStoryProps { milestones: LoveStoryMilestone[]; }

export const LoveStory: React.FC<LoveStoryProps> = ({ milestones }) => {
  const sorted = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <section className="py-20 px-6 bg-transparent">
      <div className="max-w-md mx-auto space-y-10">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-[10px] tracking-[0.45em] uppercase font-bold text-emerald-gold" style={{ opacity: 0.85 }}>Our Love Story</p>
          <h2 className="font-sans font-bold text-xl text-emerald-ivory" style={{ lineHeight: 1.7 }}>រឿងរ៉ាវស្នេហា</h2>
          <div className="h-[0.5px] w-16 mx-auto bg-emerald-gold/30" />
        </div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-10"
        >
          <EtherealBorderFrame className="shadow-[0_8px_30px_rgba(201,168,76,0.1)] py-10 px-4 md:px-8">
            <div className="relative pl-6 max-w-xl mx-auto">
              <div className="absolute left-[11px] top-0 bottom-0 w-[0.5px]"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.6) 10%, rgba(201,168,76,0.6) 90%, transparent)' }} />
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
                      style={{ borderColor: 'rgba(201,168,76,0.8)', background: '#F8F5EE' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-gold" />
                    </div>
                    <div className="flex-1 space-y-2 pt-1 pb-4">
                      {milestone.photoUrl && (
                        <div className="relative h-40 rounded-lg overflow-hidden mb-3 shadow-md">
                          <Photo src={milestone.photoUrl} alt={milestone.title} fill sizes="(max-width: 768px) 90vw, 400px" className="transition-transform duration-700 hover:scale-105" />
                        </div>
                      )}
                      <span className="font-serif-en text-[9px] tracking-widest uppercase font-bold text-emerald-gold">{milestone.dateLabel}</span>
                      <h4 className="font-sans font-bold text-[15px] text-[#0A1C16]">{milestone.title}</h4>
                      <p className="font-sans text-[13px] leading-relaxed text-[#0A1C16]/80 font-light">{milestone.description}</p>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </EtherealBorderFrame>
        </m.div>
      </div>
    </section>
  );
};
export default LoveStory;
