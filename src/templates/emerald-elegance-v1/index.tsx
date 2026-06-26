'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { TemplateProps } from '../registry';

// ─── Section components ──────────────────────────────────────────────────────
import { Cover } from './components/Cover';
import { Countdown } from './components/Countdown';
import { WelcomeMessage } from './components/WelcomeMessage';
import { CoupleInfo } from './components/CoupleInfo';
import { LoveStory } from './components/LoveStory';
import { Location } from './components/Location';
import { EventSchedule } from './components/EventSchedule';
import { Gallery } from './components/Gallery';
import { GiftRegistry } from './components/GiftRegistry';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';
import { DiamondSeparator, EtherealBorderFrame } from './components/BotanicalAssets';

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

// ─── Emerald Gold Divider ───────────────────────────────────────────────────
const EmeraldDivider: React.FC = () => (
  <div className="py-4 px-8 flex items-center justify-center gap-3 w-full">
    <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, rgba(201, 168, 76, 0.4))' }} />
    <DiamondSeparator />
    <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, rgba(201, 168, 76, 0.4))' }} />
  </div>
);

export default function EmeraldEleganceV1Template({ data, guestName }: TemplateProps) {
  const { sectionsVisibility } = data;

  // Dates are driven by the real wedding/event date. We parse the calendar
  // parts straight from the date string (like EventSchedule) so timezone never
  // shifts the day, and build the display labels from them. The static literals
  // inside Cover/Footer remain ONLY as a preview fallback when there is no
  // event data (these resolve to undefined → component shows its placeholder).
  const eventDateStr = (data.events[0]?.dateSolar ?? '').split('T')[0];
  const [evtY, evtM, evtD] = eventDateStr ? eventDateStr.split('-').map(Number) : [];
  const eventDate = evtY && evtM && evtD ? new Date(Date.UTC(evtY, evtM - 1, evtD, 12)) : null;
  const eventWeekday = eventDate?.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  const eventMonth = eventDate?.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });

  // "SATURDAY · 15 FEBRUARY 2025" for the Cover.
  const coverDateLabel = data.lunarDateText
    || (eventDate ? `${eventWeekday} · ${evtD} ${eventMonth} ${evtY}`.toUpperCase() : undefined);
  // "February 15, 2025" for the Footer.
  const footerDateLabel = data.lunarDateText
    || (eventDate ? `${eventMonth} ${evtD}, ${evtY}` : undefined);

  // Custom Cursor state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isDesktop) {
      window.addEventListener('mousemove', updateMousePosition);
    }
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100, damping: 30, restDelta: 0.001
  });

  return (
    <div className={`min-h-screen antialiased bg-pattern-emerald text-emerald-ivory selection:bg-emerald-gold/30 selection:text-emerald-gold-bright overflow-x-hidden ${isDesktop ? 'emerald-cursor' : ''}`}>
      {/* ── Custom Cursor ── */}
      {isDesktop && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-3 h-3 rounded-full bg-emerald-gold pointer-events-none z-50 mix-blend-screen shadow-[0_0_8px_rgba(201,168,76,0.8)]"
            animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-1 h-1 rounded-full bg-emerald-gold pointer-events-none z-50 mix-blend-screen"
            animate={{ x: mousePosition.x - 2, y: mousePosition.y - 2 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.8 }}
          />
        </>
      )}

      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 right-0 w-[2px] h-full bg-emerald-gold origin-top z-40 opacity-70 shadow-[0_0_8px_rgba(201,168,76,0.5)]"
        style={{ scaleY }}
      />

      {/* ── Sections ── */}
      {sectionsVisibility.Cover && (
        <Cover
          couple={data.couple}
          dateLabel={coverDateLabel}
          venueName={data.events[0]?.locationName}
          coverImage={data.coverImage}
        />
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

      {sectionsVisibility.Schedule && data.events.length > 0 && (
        <CinematicReveal>
          <Countdown targetDate={data.events[0].dateSolar} />
        </CinematicReveal>
      )}

      <EmeraldDivider />

      {sectionsVisibility.CoupleInfo && (
        <CinematicReveal delay={0.05}>
          <CoupleInfo data={data} />
        </CinematicReveal>
      )}

      <EmeraldDivider />

      {sectionsVisibility.LoveStory && data.loveStory && data.loveStory.length > 0 && (
        <CinematicReveal>
          <LoveStory milestones={data.loveStory} />
        </CinematicReveal>
      )}

      <EmeraldDivider />

      {sectionsVisibility.Schedule && (
        <CinematicReveal>
          <EventSchedule events={data.scheduleEvents} />
        </CinematicReveal>
      )}

      <EmeraldDivider />

      {sectionsVisibility.Location && data.events[0] && (
        <CinematicReveal>
          <Location primaryEvent={data.events[0]} />
        </CinematicReveal>
      )}

      <EmeraldDivider />

      {sectionsVisibility.Gallery && data.gallery.length > 0 && (
        <CinematicReveal>
          <Gallery photos={data.gallery} />
        </CinematicReveal>
      )}

      <EmeraldDivider />

      {sectionsVisibility.GiftRegistry && data.giftRegistries.length > 0 && (
        <CinematicReveal>
          <GiftRegistry registries={data.giftRegistries} />
        </CinematicReveal>
      )}

      <EmeraldDivider />

      {sectionsVisibility.RSVP && (
        <CinematicReveal>
          <RsvpSection rsvpSettings={data.rsvpSettings} weddingId={data.slug} />
        </CinematicReveal>
      )}



      <CinematicReveal>
        <Footer
          couple={data.couple}
          dateLabel={footerDateLabel}
          thankYouText={data.thankYouText}
        />
      </CinematicReveal>
    </div>
  );
}
