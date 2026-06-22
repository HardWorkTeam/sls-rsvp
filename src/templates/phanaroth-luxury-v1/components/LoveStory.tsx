'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LoveStoryMilestone } from '@/types/invitation';
import { SectionHeading, DrawBorderFrame } from '../../royal-khmer-v1/components/KhmerOrnaments';

interface LoveStoryProps {
  milestones: LoveStoryMilestone[];
}

export const LoveStory: React.FC<LoveStoryProps> = ({ milestones }) => {
  const sorted = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <section
      className="rk-section"
      style={{
        background: 'linear-gradient(180deg, rgba(92,3,12,0.3) 0%, rgba(26,2,2,0.7) 100%)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-lg mx-auto space-y-12">
        <SectionHeading
          en="Our Love Story"
          kh="រឿងរ៉ាវស្នេហា"
          sub="Every love story is beautiful"
        />

        {/* Vertical timeline */}
        <div className="relative pl-6">
          {/* Scroll-growing line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute left-[11px] top-0 bottom-0 w-[1px] origin-top"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(232,201,122,0.55) 10%, rgba(232,201,122,0.55) 90%, transparent)',
            }}
          />

          <div className="space-y-10">
            {sorted.map((milestone, index) => (
              <motion.div
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
                      borderColor: '#E8C97A',
                      background: '#5C030C',
                      boxShadow: '0 0 12px rgba(232,201,122,0.4)',
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#E8C97A' }}
                    />
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 card-tilt-hover transition-all">
                  <DrawBorderFrame className="w-full p-0 overflow-hidden" style={{ background: 'rgba(92, 3, 12, 0.65)', borderColor: 'rgba(232, 201, 122, 0.2)' }}>
                    {milestone.photoUrl && (
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={milestone.photoUrl}
                          alt={milestone.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          style={{ filter: 'sepia(10%) brightness(0.8) contrast(1.1)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#260206]/95 via-transparent to-transparent" />
                      </div>
                    )}
                    <div className="p-5 space-y-2 text-[#FAF6EF]">
                      <div className="flex items-center justify-between">
                        <span
                          className="font-serif-en text-[10px] tracking-widest uppercase font-bold text-[#E8C97A]"
                        >
                          {milestone.dateLabel}
                        </span>
                        <span className="text-[#E8C97A]" style={{ opacity: 0.5 }}>✦</span>
                      </div>
                      <h4
                        className="font-khmer-title leading-relaxed"
                        style={{ fontSize: '0.9rem', color: '#E8C97A' }}
                      >
                        {milestone.title}
                      </h4>
                      <p
                        className="font-khmer-body text-xs leading-relaxed opacity-75"
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </DrawBorderFrame>
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
