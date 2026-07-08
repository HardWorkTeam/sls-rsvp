'use client';

import React from 'react';
import { m } from 'framer-motion';
import { LoveStoryMilestone } from '@/types/invitation';
import { Photo } from '@/components/Photo';
import { SectionHeading, DrawBorderFrame } from './KhmerOrnaments';

interface LoveStoryProps {
  milestones: LoveStoryMilestone[];
}

export const LoveStory: React.FC<LoveStoryProps> = ({ milestones }) => {
  const sorted = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section
      className="rk-section"
      style={{ background: 'linear-gradient(180deg, rgba(26,14,8,0.75) 0%, rgba(34,18,8,0.4) 100%)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-lg mx-auto space-y-12">
        <SectionHeading en="Our Love Story" kh="រឿងរ៉ាវស្នេហា" sub="Every love story is beautiful" />

        {/* Vertical timeline */}
        <div className="relative pl-6">
          {/* Timeline line */}
          <m.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute left-[11px] top-0 bottom-0 w-[1px] origin-top"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.5) 10%, rgba(201,168,76,0.5) 90%, transparent)' }}
          />

          <div className="space-y-10">
            {sorted.map((milestone, index) => (
              <m.div
                key={milestone.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-5"
              >
                {/* Timeline dot */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: 'var(--rk-gold)',
                      background: 'var(--rk-brown)',
                      boxShadow: '0 0 12px rgba(201,168,76,0.4)',
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: 'var(--rk-gold)' }}
                    />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 card-tilt-hover transition-all">
                  <DrawBorderFrame className="w-full p-0 overflow-hidden">
                  {milestone.photoUrl && (
                    <div className="h-44 overflow-hidden relative">
                      <Photo
                        src={milestone.photoUrl}
                        alt={milestone.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 400px"
                        className="transition-transform duration-700 hover:scale-105"
                        style={{ filter: 'sepia(15%) brightness(0.85)' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e08]/90 via-transparent to-transparent" />
                    </div>
                  )}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-serif-en text-[10px] tracking-widest uppercase font-semibold"
                        style={{ color: 'var(--rk-gold)', opacity: 0.75 }}
                      >
                        {milestone.dateLabel}
                      </span>
                      <span style={{ color: 'var(--rk-gold)', opacity: 0.4 }}>✦</span>
                    </div>
                    <h4
                      className="font-khmer-title leading-relaxed"
                      style={{ fontSize: '0.9rem', color: 'var(--rk-gold-light)' }}
                    >
                      {milestone.title}
                    </h4>
                    <p
                      className="font-khmer-body text-xs leading-relaxed"
                      style={{ color: 'var(--rk-ivory)', opacity: 0.65 }}
                    >
                      {milestone.description}
                    </p>
                  </div>
                  </DrawBorderFrame>
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
