'use client';

/**
 * Phanaroth Luxury V1 — Master Template Entry
 * ════════════════════════════════════════════════════════════════════════
 * Theme:      Phanaroth Luxury (Crimson & Gold Premium Cambodian Wedding)
 * Mood:       Wow · Prestige · Cultural · High-Prestige
 * Colors:     Crimson #5C030C · Gold #E8C97A · Ivory #FAF6EF
 * Fonts:      Moul (Khmer Title) · Battambang (Khmer Body) · Playfair Display (English)
 * Animations: Falling rose petals · Scroll-drawn borders · Bi-parting door opening
 * ════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps } from '../registry';

// ─── Section components ──────────────────────────────────────────────────────
import { Cover }         from './components/Cover';
import { CoupleInfo }    from './components/CoupleInfo';
import { WelcomeMessage } from './components/WelcomeMessage';
import { LoveStory }     from './components/LoveStory';
import { EventSchedule } from './components/EventSchedule';
import { Location }      from './components/Location';
import { Gallery }       from './components/Gallery';
import { GiftRegistry }  from './components/GiftRegistry';
import { RsvpForm }      from './components/RsvpSection';
import { Footer }        from './components/Footer';
import { Countdown }     from './components/Countdown';
import { DiamondDivider, LotusOrnament } from '../royal-khmer-v1/components/KhmerOrnaments';

// ─── Scroll Reveal Wrapper ──────────────────────────────────────────────────
const CinematicReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 45 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8% 0px' }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ─── Gold Crimson Divider ───────────────────────────────────────────────────
const CrimsonDivider: React.FC = () => (
  <div className="py-2 px-8 flex items-center justify-center gap-3">
    <div className="flex-1 h-[0.5px]" style={{ background: 'linear-gradient(to right, transparent, rgba(232,201,122,0.3))' }} />
    <LotusOrnament size={24} color="#E8C97A" />
    <div className="flex-1 h-[0.5px]" style={{ background: 'linear-gradient(to left, transparent, rgba(232,201,122,0.3))' }} />
  </div>
);

export default function PhanarothLuxuryV1Template({ data, guestName }: TemplateProps) {
  const { sectionsVisibility } = data;
  const primaryEvent = data.events[0];

  return (
    <div
      className="min-h-screen antialiased bg-pattern-phanaroth"
      style={{ color: 'var(--rk-ivory)' }}
    >
      {/* 1. COVER (Bi-parting doors gate opener) */}
      {sectionsVisibility.Cover && (
        <Cover couple={data.couple} events={data.events} guestName={guestName} coverImage={data.coverImage} />
      )}

      {/* 2. WELCOME MESSAGE */}
      {sectionsVisibility.Cover && (
        <CinematicReveal>
          <WelcomeMessage
            invitationTextKh={data.invitationTextKh}
            invitationTextEn={data.invitationTextEn}
          />
        </CinematicReveal>
      )}

      {/* 2. COUNTDOWN PANEL */}
      {primaryEvent && (
        <CinematicReveal>
          <section
            className="py-16 px-6 text-center"
            style={{
              background: 'linear-gradient(180deg, rgba(92,3,12,0.65) 0%, rgba(26,2,2,0.4) 100%)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="max-w-lg mx-auto space-y-6">
              <p
                className="font-serif-en text-xs tracking-[0.45em] uppercase font-bold text-[#E8C97A]"
                style={{ opacity: 0.8 }}
              >
                Counting Down · រាប់ថយក្រោយ
              </p>
              <div className="[&_.font-serif-en]:!text-[#E8C97A] [&_div]:!border-[#E8C97A]/40 text-[#FAF6EF]">
                <Countdown targetDate={primaryEvent.dateSolar} />
              </div>
            </div>
          </section>
        </CinematicReveal>
      )}

      <CrimsonDivider />

      {/* 3. COUPLE PROFILES */}
      {sectionsVisibility.CoupleInfo && (
        <CinematicReveal delay={0.05}>
          <CoupleInfo data={data} />
        </CinematicReveal>
      )}

      <CrimsonDivider />

      {/* 4. LOVE STORY TIMELINE */}
      {sectionsVisibility.LoveStory && data.loveStory && data.loveStory.length > 0 && (
        <CinematicReveal>
          <LoveStory milestones={data.loveStory} />
        </CinematicReveal>
      )}

      <CrimsonDivider />

      {/* 5. EVENT SCHEDULE */}
      {sectionsVisibility.Schedule && (
        <CinematicReveal>
          <EventSchedule events={data.scheduleEvents} lunarDateText={data.lunarDateText} />
        </CinematicReveal>
      )}

      <CrimsonDivider />

      {/* 7. LOCATION SECTION */}
      {sectionsVisibility.Location && primaryEvent && (
        <CinematicReveal>
          <Location primaryEvent={primaryEvent} />
        </CinematicReveal>
      )}

      <CrimsonDivider />

      {/* 7. PHOTO GALLERY CAROUSEL */}
      {sectionsVisibility.Gallery && data.gallery.length > 0 && (
        <CinematicReveal>
          <Gallery photos={data.gallery} />
        </CinematicReveal>
      )}

      <CrimsonDivider />

      {/* 8. GIFT REGISTRY */}
      {sectionsVisibility.GiftRegistry && data.giftRegistries.length > 0 && (
        <CinematicReveal>
          <GiftRegistry registries={data.giftRegistries} />
        </CinematicReveal>
      )}

      <CrimsonDivider />

      {/* 9. RSVP & LIVE WISHES WALL */}
      {sectionsVisibility.RSVP && (
        <CinematicReveal>
          <RsvpForm weddingId={data.slug} rsvpSettings={data.rsvpSettings} />
        </CinematicReveal>
      )}

      {/* 10. WEDDING FOOTER */}
      <CrimsonDivider />
      <CinematicReveal>
        <Footer couple={data.couple} />
      </CinematicReveal>
    </div>
  );
}
