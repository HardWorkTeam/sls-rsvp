'use client';

import React from 'react';
import { m } from 'framer-motion';
import { LoveStoryMilestone } from '@/types/invitation';
import { Photo } from '@/components/Photo';

interface LoveStoryProps { milestones: LoveStoryMilestone[]; }

export const LoveStory: React.FC<LoveStoryProps> = ({ milestones }) => {
  const sorted = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, rgba(255, 243, 208, 0.85) 0%, rgba(255, 232, 160, 0.75) 40%, rgba(255, 243, 208, 0.85) 100%)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-md mx-auto space-y-10">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#B8860B' }}>Our Love Story</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#5C3A00', lineHeight: 1.7 }}>រឿងរ៉ាវស្នេហា</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #D4A020, transparent)' }} />
        </div>

        <div className="relative pl-6">
          <div className="absolute left-[11px] top-0 bottom-0 w-[1px]"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(180,120,20,0.5) 10%, rgba(180,120,20,0.5) 90%, transparent)' }}
          />
          <div className="space-y-8">
            {sorted.map((milestone, i) => (
              <m.div
                key={milestone.id}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: '#D4A020', background: '#FFFBF0', boxShadow: '0 0 10px rgba(212,160,32,0.3)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: '#D4A020' }} />
                </div>
                <div className="flex-1 rounded-xl p-4 space-y-2"
                  style={{ background: 'rgba(255,255,240,0.7)', border: '1px solid rgba(180,120,20,0.2)', backdropFilter: 'blur(4px)' }}>
                  {milestone.photoUrl && (
                    <div className="relative h-36 rounded-lg overflow-hidden mb-2">
                      <Photo src={milestone.photoUrl} alt={milestone.title} fill sizes="(max-width: 768px) 90vw, 400px" />
                    </div>
                  )}
                  <span className="font-serif-en text-xs tracking-widest uppercase" style={{ color: '#B8860B', opacity: 0.8 }}>{milestone.dateLabel}</span>
                  <h4 className="font-khmer-body font-bold" style={{ color: '#5C3A00' }}>{milestone.title}</h4>
                  <p className="font-khmer-body text-sm leading-relaxed" style={{ color: '#6B4C10', opacity: 0.85 }}>{milestone.description}</p>
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
