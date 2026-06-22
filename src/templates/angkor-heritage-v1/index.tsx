'use client';

/**
 * Angkor Heritage V1 — Master Template Entry
 * ════════════════════════════════════════════════════════════════════════
 * Theme:      Angkor Heritage (Traditional Cambodian with Angkor Wat)
 * Mood:       Warm · Cultural · Heritage · Natural
 * Colors:     Amber #D4A020 · Cream #FFF8E8 · Warm Brown #5C3A00 · Gold #FFE566
 * Fonts:      Moul (Khmer Title) · Battambang (Khmer Body) · Cormorant Garamond (English)
 * Animations: Falling golden petals · Scroll-triggered warm reveals
 * Background: Illustrated Angkor Wat with lotus pond at sunset
 * ════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps } from '../registry';

import { Cover } from './components/Cover';
import { CoupleInfo } from './components/CoupleInfo';
import { WelcomeMessage } from './components/WelcomeMessage';
import { LoveStory } from './components/LoveStory';
import { Location } from './components/Location';
import { Footer } from './components/Footer';
import { EventSchedule } from './components/EventSchedule';
import { Countdown } from './components/Countdown';
import { Gallery } from './components/Gallery';
import { GiftRegistry } from './components/GiftRegistry';
import { RsvpForm } from './components/RsvpSection';

// ── Section transition wrapper ────────────────────────────────────────────────
const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8% 0px' }}
    transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ── Thin divider ──────────────────────────────────────────────────────────────
const WarmDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-3 py-4 px-8">
    <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(180,120,20,0.3))' }} />
    <span style={{ color: '#D4A020', opacity: 0.5 }}>✿</span>
    <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, rgba(180,120,20,0.3))' }} />
  </div>
);

export default function AngkorHeritageV1Template({ data, guestName }: TemplateProps) {
  const { sectionsVisibility } = data;
  const primaryEvent = data.events[0];

  return (
    <div className="min-h-screen antialiased bg-transparent relative" style={{ color: '#3D2200' }}>
      {/* Fixed Angkor Wat background underlay */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/angkor-heritage-bg.jpg')" }}
      />

      {/* ── COVER ── */}
      {sectionsVisibility.Cover && (
        <Cover couple={data.couple} events={data.events} guestName={guestName} />
      )}

      {/* 2. WELCOME MESSAGE */}
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
          <section className="py-14 px-6 text-center" style={{ background: 'linear-gradient(180deg, rgba(255,248,232,0.6) 0%, rgba(255,243,208,0.2) 100%)', backdropFilter: 'blur(8px)' }}>
            <div className="max-w-md mx-auto space-y-5">
              <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#B8860B', opacity: 0.8 }}>
                Counting Down · រាប់ថយក្រោយ
              </p>
              {/* Override countdown style with amber colors via inline wrapper */}
              <div className="[&_.font-serif-en]:!text-amber-800 [&_div]:!border-amber-400/40">
                <Countdown targetDate={primaryEvent.dateSolar} />
              </div>
            </div>
          </section>
        </Reveal>
      )}

      <WarmDivider />

      {/* ── COUPLE ── */}
      {sectionsVisibility.CoupleInfo && (
        <Reveal>
          <CoupleInfo data={data} />
        </Reveal>
      )}

      <WarmDivider />

      {/* ── LOVE STORY ── */}
      {sectionsVisibility.LoveStory && data.loveStory?.length > 0 && (
        <Reveal>
          <LoveStory milestones={data.loveStory} />
        </Reveal>
      )}

      <WarmDivider />

      {/* ── SCHEDULE ── */}
      {sectionsVisibility.Schedule && (
        <Reveal>
          <EventSchedule events={data.events} lunarDateText={data.lunarDateText} />
        </Reveal>
      )}

      <WarmDivider />
      {/* ── LOCATION ── */}
      {sectionsVisibility.Location && primaryEvent && (
        <Reveal>
          <Location primaryEvent={primaryEvent} />
        </Reveal>
      )}

      <WarmDivider />

      {/* ── GALLERY ── */}
      {sectionsVisibility.Gallery && data.gallery.length > 0 && (
        <Reveal>
          <Gallery photos={data.gallery} />
        </Reveal>
      )}

      <WarmDivider />

      {/* ── GIFT REGISTRY ── */}
      {sectionsVisibility.GiftRegistry && data.giftRegistries.length > 0 && (
        <Reveal>
          <GiftRegistry registries={data.giftRegistries} />
        </Reveal>
      )}

      <WarmDivider />

      {/* ── RSVP ── */}
      {sectionsVisibility.RSVP && (
        <Reveal>
          <RsvpForm weddingId={data.slug} rsvpSettings={data.rsvpSettings} />
        </Reveal>
      )}

      {/* ── FOOTER ── */}
      <Footer couple={data.couple} />
    </div>
  );
}
