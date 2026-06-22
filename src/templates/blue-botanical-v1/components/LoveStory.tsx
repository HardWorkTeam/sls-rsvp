'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LoveStoryMilestone } from '@/types/invitation';

interface LoveStoryProps { milestones: LoveStoryMilestone[]; }

export const LoveStory: React.FC<LoveStoryProps> = ({ milestones }) => {
  if (!milestones || milestones.length === 0) return null;
  const sorted = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);
  return (
    <section className="py-20 px-6" style={{ background: 'transparent' }}>
      <div className="max-w-md mx-auto space-y-10">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#9BB0C8' }}>Our Love Story</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#2C3E56', lineHeight: 1.7 }}>រឿងរ៉ាវស្នេហា</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(106,140,178,0.4), transparent)' }} />
        </div>

        <div className="relative pl-6">
          <div className="absolute left-[11px] top-0 bottom-0 w-[1px]"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(106,140,178,0.35) 10%, rgba(106,140,178,0.35) 90%, transparent)' }} />
          <div className="space-y-8">
            {sorted.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: '#6A8CB2', background: '#fff', boxShadow: '0 0 8px rgba(106,140,178,0.2)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: '#6A8CB2' }} />
                </div>
                <div className="flex-1 rounded-xl p-4 space-y-2"
                  style={{ background: 'linear-gradient(185deg, rgba(28, 48, 74, 0.94) 0%, rgba(14, 28, 48, 0.98) 100%)', border: '1px solid rgba(106, 140, 178, 0.3)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                  {m.photoUrl && (
                    <div className="h-36 rounded-lg overflow-hidden mb-2">
                      <img src={m.photoUrl} alt={m.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="font-serif-en text-xs tracking-widest uppercase" style={{ color: '#E8C97A' }}>{m.dateLabel}</span>
                  <h4 className="font-khmer-body font-bold" style={{ color: '#FAF6EF' }}>{m.title}</h4>
                  <p className="font-khmer-body text-sm leading-relaxed" style={{ color: '#FAF6EF', opacity: 0.85 }}>{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoveStory;
