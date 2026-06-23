'use client';

/**
 * Royal Khmer V1 — Master Template Entry
 * ════════════════════════════════════════════════════════════════════════
 * Theme:      Royal Khmer (Traditional Cambodian Wedding)
 * Mood:       Elegant · Traditional · Luxury
 * Colors:     Gold #C9A84C · Ivory #FAF6EF · Dark Brown #2C1810
 * Fonts:      Moul (Khmer Title) · Battambang (Khmer Body) · Cormorant Garamond (English)
 * Animations: Slow Fade · Floating Gold Particles · Scroll-triggered cinematic reveals
 * ════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps } from '../registry';

// ─── Section components ──────────────────────────────────────────────────────
import { WelcomeMessage } from './components/WelcomeMessage';
import { Cover }         from './components/Cover';
import { CoupleInfo }    from './components/CoupleInfo';
import { LoveStory }     from './components/LoveStory';
import { Location }      from './components/Location';
import { EventSchedule } from './components/EventSchedule';
import { Gallery }       from './components/Gallery';
import { GiftRegistry }  from './components/GiftRegistry';
import { RsvpForm }      from './components/RsvpSection';
import { RoyalFooter }   from './components/Footer';
import { Countdown }     from './components/Countdown';
import { DiamondDivider } from './components/KhmerOrnaments';

// ─── Cinematic section wrapper ───────────────────────────────────────────────
const CinematicSection: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8% 0px' }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ─── Thin gold section separator ─────────────────────────────────────────────
const SectionDivider: React.FC = () => (
  <div className="py-2 px-8">
    <DiamondDivider />
  </div>
);

// ─── Template root ────────────────────────────────────────────────────────────
export default function RoyalKhmerV1Template({ data, guestName }: TemplateProps) {
  const { sectionsVisibility } = data;
  const primaryEvent = data.events[0];

  return (
    <div
      className="min-h-screen antialiased bg-pattern-royal"
      style={{ color: 'var(--rk-ivory)' }}
    >
      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 · COVER
          Full-screen cinematic opener with gold particles & splash gate.
      ══════════════════════════════════════════════════════════════════ */}
      {sectionsVisibility.Cover && (
        <Cover couple={data.couple} events={data.events} guestName={guestName} coverImage={data.coverImage} />
      )}

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 · WELCOME MESSAGE
      ══════════════════════════════════════════════════════════════════ */}
      {sectionsVisibility.Cover && (
        <CinematicSection>
          <WelcomeMessage
            invitationTextKh={data.invitationTextKh}
            invitationTextEn={data.invitationTextEn}
          />
        </CinematicSection>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          COUNTDOWN INTERSTITIAL
          Appears between Cover and Couple — a subtle prestige moment.
      ══════════════════════════════════════════════════════════════════ */}
      {primaryEvent && (
        <CinematicSection>
          <section
            className="py-16 px-6 text-center"
            style={{ background: 'linear-gradient(180deg, rgba(26,14,8,0.75) 0%, rgba(44,24,16,0.35) 100%)', backdropFilter: 'blur(8px)' }}
          >
            <div className="max-w-lg mx-auto space-y-6">
              <p
                className="font-serif-en text-xs tracking-[0.4em] uppercase"
                style={{ color: 'var(--rk-gold)', opacity: 0.65 }}
              >
                Counting Down · រាប់ថយក្រោយ
              </p>
              <Countdown targetDate={primaryEvent.dateSolar} />
            </div>
          </section>
        </CinematicSection>
      )}

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 · COUPLE INFO
      ══════════════════════════════════════════════════════════════════ */}
      {sectionsVisibility.CoupleInfo && (
        <CinematicSection delay={0.05}>
          <CoupleInfo data={data} />
        </CinematicSection>
      )}

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 · LOVE STORY
      ══════════════════════════════════════════════════════════════════ */}
      {sectionsVisibility.LoveStory && data.loveStory && data.loveStory.length > 0 && (
        <CinematicSection>
          <LoveStory milestones={data.loveStory} />
        </CinematicSection>
      )}

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 · EVENT SCHEDULE
      ══════════════════════════════════════════════════════════════════ */}
      {sectionsVisibility.Schedule && (
        <CinematicSection>
          <EventSchedule events={data.scheduleEvents} lunarDateText={data.lunarDateText} />
        </CinematicSection>
      )}

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 · LOCATION
      ══════════════════════════════════════════════════════════════════ */}
      {sectionsVisibility.Location && primaryEvent && (
        <CinematicSection>
          <Location primaryEvent={primaryEvent} />
        </CinematicSection>
      )}

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 · PHOTO GALLERY
      ══════════════════════════════════════════════════════════════════ */}
      {sectionsVisibility.Gallery && data.gallery.length > 0 && (
        <CinematicSection>
          <Gallery photos={data.gallery} />
        </CinematicSection>
      )}

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 · GIFT REGISTRY
      ══════════════════════════════════════════════════════════════════ */}
      {sectionsVisibility.GiftRegistry && data.giftRegistries.length > 0 && (
        <CinematicSection>
          <GiftRegistry registries={data.giftRegistries} />
        </CinematicSection>
      )}

      <SectionDivider />

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 8 · RSVP
      ══════════════════════════════════════════════════════════════════ */}
      {sectionsVisibility.RSVP && (
        <CinematicSection>
          <RsvpForm weddingId={data.slug} rsvpSettings={data.rsvpSettings} />
        </CinematicSection>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════════ */}
      <CinematicSection>
        <RoyalFooter couple={data.couple} />
      </CinematicSection>
    </div>
  );
}
