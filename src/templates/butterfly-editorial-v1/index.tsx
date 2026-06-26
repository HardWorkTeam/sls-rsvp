'use client';

/**
 * Butterfly Editorial V1 — Master Template Entry
 * ════════════════════════════════════════════════════════════════════════
 * Theme:      Butterfly Editorial (Luxury Minimalist Wedding Stationery)
 * Mood:       Elegant · Romantic · Timeless · Magazine-Inspired
 * Colors:     Burgundy #5A121D · Blush Pink #F5E6E3 · Champagne Gold #C5A059 · Ivory #FCFBF9
 * Fonts:      Cormorant Garamond / Cinzel (Serifs) · Kantumruy Pro (Khmer Body) · Pinyon Script (Script)
 * Animations: Smooth 3D butterfly floats & wing-flaps · Blur-to-focus reveals
 * ════════════════════════════════════════════════════════════════════════
 */

import React from 'react';
import { motion } from 'framer-motion';
import { TemplateProps } from '../registry';

// ─── Section Components ──────────────────────────────────────────────────────
import { Cover }          from './components/Cover';
import { WelcomeMessage } from './components/WelcomeMessage';
import { CoupleInfo }     from './components/CoupleInfo';
import { LoveStory }      from './components/LoveStory';
import { EventSchedule }  from './components/EventSchedule';
import { Location }       from './components/Location';
import { Gallery }        from './components/Gallery';
import { GiftRegistry }   from './components/GiftRegistry';
import { RsvpSection }    from './components/RsvpSection';
import { Footer }         from './components/Footer';
import { Countdown }      from '@/components/countdown/Countdown';

// ─── Scroll Reveal Wrapper ──────────────────────────────────────────────────
const CinematicReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ─── Fine Gold Butterfly Divider ─────────────────────────────────────────────
const EditorialDivider: React.FC = () => (
  <div className="py-2 px-8 flex items-center justify-center gap-3 bg-transparent">
    <div className="flex-1 h-[0.5px]" style={{ background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.25))' }} />
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#C5A059] opacity-50">
      <path d="M12,11.5 C10.8,9 7,8 6,10 C5,12 8,15 12,16.5 C16,15 19,12 18,10 C17,8 13.2,9 12,11.5 Z" />
    </svg>
    <div className="flex-1 h-[0.5px]" style={{ background: 'linear-gradient(to left, transparent, rgba(197,160,89,0.25))' }} />
  </div>
);

export default function ButterflyEditorialV1Template({ data, guestName }: TemplateProps) {
  const { sectionsVisibility } = data;
  const primaryEvent = data.events[0];

  return (
    <div
      className="min-h-screen antialiased bg-transparent text-[#2A2A2A] relative"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Fixed Butterfly background underlay */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/butterfly-artwork-bg.png')" }}
      />

      {/* 1. COVER (Envelope reveal and first slide card) */}
      {sectionsVisibility.Cover && (
        <Cover couple={data.couple} events={data.events} guestName={guestName} coverImage={data.coverImage} />
      )}

      {/* 2. WELCOME STATEMENT */}
      {sectionsVisibility.Cover && (
        <WelcomeMessage
          invitationTextKh={data.invitationTextKh}
          invitationTextEn={data.invitationTextEn}
        />
      )}

      {/* 3. COUNTDOWN PANEL */}
      {primaryEvent && (
        <CinematicReveal>
          <section className="py-16 px-6 text-center bg-transparent">
            <div className="max-w-lg mx-auto space-y-5">
              <p
                className="font-editorial-serif text-[10px] tracking-[0.45em] uppercase font-bold text-[#C5A059]"
                style={{ opacity: 0.85 }}
              >
                Counting Down
              </p>
              <div className="[&_.font-serif-en]:!text-[#5A121D] [&_div]:!border-[#C5A059]/30 text-[#2A2A2A] font-medium font-editorial-serif">
                <Countdown targetDate={primaryEvent.dateSolar} />
              </div>
            </div>
          </section>
        </CinematicReveal>
      )}

      <EditorialDivider />

      {/* 4. COUPLE PROFILE DETAILS */}
      {sectionsVisibility.CoupleInfo && (
        <CinematicReveal delay={0.05}>
          <CoupleInfo data={data} />
        </CinematicReveal>
      )}

      <EditorialDivider />

      {/* 5. LOVE STORY TIMELINE */}
      {sectionsVisibility.LoveStory && data.loveStory && data.loveStory.length > 0 && (
        <CinematicReveal>
          <LoveStory milestones={data.loveStory} />
        </CinematicReveal>
      )}

      <EditorialDivider />

      {/* 6. EVENT SCHEDULE TIMELINE */}
      {sectionsVisibility.Schedule && (
        <CinematicReveal>
          <EventSchedule events={data.scheduleEvents} lunarDateText={data.lunarDateText} />
        </CinematicReveal>
      )}

      <EditorialDivider />

      {/* 7. LOCATION */}
      {sectionsVisibility.Location && primaryEvent && (
        <CinematicReveal>
          <Location primaryEvent={primaryEvent} />
        </CinematicReveal>
      )}

      <EditorialDivider />

      {/* 8. PHOTO GALLERY (If photos are configured) */}
      {sectionsVisibility.Gallery && data.gallery && data.gallery.length > 0 && (
        <CinematicReveal>
          <Gallery photos={data.gallery} />
        </CinematicReveal>
      )}

      <EditorialDivider />

      {/* 9. GIFT REGISTRY (If registries are configured) */}
      {sectionsVisibility.GiftRegistry && data.giftRegistries && data.giftRegistries.length > 0 && (
        <CinematicReveal>
          <GiftRegistry registries={data.giftRegistries} />
        </CinematicReveal>
      )}

      <EditorialDivider />

      {/* 10. RSVP FORM AND WISHES WALL */}
      {sectionsVisibility.RSVP && (
        <CinematicReveal>
          <RsvpSection
            weddingId={data.slug}
            rsvpSettings={data.rsvpSettings}
          />
        </CinematicReveal>
      )}

      {/* 9. WEDDING FOOTER */}
      <EditorialDivider />
      <CinematicReveal>
        <Footer couple={data.couple} />
      </CinematicReveal>
    </div>
  );
}
