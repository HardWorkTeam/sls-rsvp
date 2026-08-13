'use client';

/**
 * Blue Botanical V1 — Master Template Entry
 * ════════════════════════════════════════════════════════════════════════
 * Theme:      Blue Watercolor Botanical
 * Mood:       Modern · Elegant · Romantic · Fresh
 * Colors:     Navy #2C3E56 · Blue #6A8CB2 · Soft Blue #9BB0C8 · White #FFF
 * Accents:    Gold ring #BEA56E · Light wash #F5F8FC
 * Fonts:      Moul (Khmer Title) · Battambang (Khmer Body) · Cormorant Garamond (English)
 * Animations: Scroll-triggered clean reveals · No particles (clean aesthetic)
 * Background: White with watercolor botanical corner decorations
 * ════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { m } from 'framer-motion';
import { MotionProvider } from '@/components/MotionProvider';
import { TemplateProps } from '../registry';

import { Cover }          from './components/Cover';
import { WelcomeMessage } from './components/WelcomeMessage';
import { CoupleInfo }     from './components/CoupleInfo';
import { LoveStory }      from './components/LoveStory';
import { Location }      from './components/Location';
import { EventSchedule }  from './components/EventSchedule';
import { Gallery }        from './components/Gallery';
import { GiftRegistry }   from './components/GiftRegistry';
import { RsvpForm }       from './components/RsvpSection';
import { Footer }        from './components/Footer';
import { Countdown }      from './components/Countdown';
import { FallingLeaves }  from './components/FallingLeaves';

// ── Clean reveal wrapper ──────────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <m.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-6% 0px' }}
    transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </m.div>
);

// ── Botanical divider ─────────────────────────────────────────────────────────
const BotanicalDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-3 py-6 px-8">
    <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(106,140,178,0.2))' }} />
    <span style={{ color: '#6A8CB2', opacity: 0.3, fontSize: '0.7rem' }}>❀</span>
    <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, rgba(106,140,178,0.2))' }} />
  </div>
);

export default function BlueBotanicalV1Template({ data, guestName }: TemplateProps) {
  const { sectionsVisibility } = data;
  const primaryEvent = data.events[0];
  const isCompleted = data.weddingStatus === 'completed';

  return (
    <MotionProvider>
    <div className="min-h-screen antialiased relative bg-pattern-botanical" style={{ color: '#2C3E56' }}>
      {/* Background drifting leaves */}
      <FallingLeaves />

      {/* ── COVER ── */}
      {sectionsVisibility.Cover && (
        <Cover couple={data.couple} events={data.events} guestName={guestName} coverImage={data.coverImage} />
      )}

      {/* ── WELCOME MESSAGE ── */}
      {sectionsVisibility.Cover && (
        <Reveal>
          <WelcomeMessage
            invitationTextKh={data.invitationTextKh}
            invitationTextEn={data.invitationTextEn}
          />
        </Reveal>
      )}

      {/* ── COUNTDOWN ── */}
      {primaryEvent && (
        <Reveal>
          <section className="py-14 px-6 text-center" style={{ background: 'linear-gradient(180deg, rgba(245,248,252,0.5), rgba(255,255,255,0.25))', backdropFilter: 'blur(8px)' }}>
            <div className="max-w-md mx-auto space-y-5">
              <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#9BB0C8' }}>
                Counting Down · រាប់ថយក្រោយ
              </p>
              {/* Override countdown colors to blue palette */}
              <div
                className="[&_span]:!text-[#2C3E56] [&_.text-amber-800]:!text-[#2C3E56]"
                style={{
                  ['--tw-ring-color' as string]: 'rgba(106,140,178,0.3)',
                }}
              >
                <Countdown targetDate={primaryEvent.dateSolar} isCompleted={isCompleted} />
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <BotanicalDivider />

      {/* ── COUPLE ── */}
      {sectionsVisibility.CoupleInfo && (
        <Reveal>
          <CoupleInfo data={data} />
        </Reveal>
      )}

      <BotanicalDivider />

      {/* ── LOVE STORY ── */}
      {sectionsVisibility.LoveStory && data.loveStory?.length > 0 && (
        <Reveal>
          <LoveStory milestones={data.loveStory} />
        </Reveal>
      )}

      <BotanicalDivider />

      {/* ── SCHEDULE ── */}
      {sectionsVisibility.Schedule && (
        <Reveal>
          <EventSchedule events={data.scheduleEvents} lunarDateText={data.lunarDateText} />
        </Reveal>
      )}

      <BotanicalDivider />

      {/* ── LOCATION ── */}
      {sectionsVisibility.Location && primaryEvent && (
        <Reveal>
          <Location primaryEvent={primaryEvent} />
        </Reveal>
      )}

      <BotanicalDivider />

      {/* ── GALLERY ── */}
      {sectionsVisibility.Gallery && data.gallery.length > 0 && (
        <Reveal>
          <Gallery photos={data.gallery} />
        </Reveal>
      )}

      <BotanicalDivider />

      {/* ── GIFT REGISTRY ── */}
      {sectionsVisibility.GiftRegistry && data.giftRegistries.length > 0 && (
        <Reveal>
          <GiftRegistry registries={data.giftRegistries} />
        </Reveal>
      )}

      <BotanicalDivider />

      {/* ── RSVP ── */}
      {sectionsVisibility.RSVP && !isCompleted && (
        <Reveal>
          <RsvpForm weddingId={data.slug} rsvpSettings={data.rsvpSettings} guestName={guestName} />
        </Reveal>
      )}

      {/* ── FOOTER ── */}
      <Footer couple={data.couple} />
    </div>
    </MotionProvider>
  );
}
