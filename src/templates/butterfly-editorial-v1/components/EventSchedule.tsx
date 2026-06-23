'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WeddingEvent } from '@/types/invitation';
import { Butterfly } from './Butterfly';

interface EventScheduleProps {
  events: WeddingEvent[];
  lunarDateText?: string;
}

const toKhmerNumber = (num: number | string): string => {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return String(num)
    .split('')
    .map((char) => {
      const parsed = parseInt(char, 10);
      return isNaN(parsed) ? char : khmerDigits[parsed];
    })
    .join('');
};

const getKhmerMonth = (monthIndex: number): string => {
  const months = [
    'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
    'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
  ];
  return months[monthIndex];
};

const formatKhmerEventDate = (dateSolar: string): string => {
  const dateStr = (dateSolar ?? '').split('T')[0];
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return '';
  return `ថ្ងៃទី ${toKhmerNumber(d)} ខែ${getKhmerMonth(m - 1)} ឆ្នាំ${toKhmerNumber(y)}`;
};

const translateTimeToKhmer = (timeStr: string): string => {
  const clean = timeStr.trim().toUpperCase();
  const match = clean.match(/(\d+):?(\d+)?\s*(AM|PM)?/);
  if (!match) return timeStr;

  const hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3] || '';

  const khmerHours = toKhmerNumber(hours.toString().padStart(2, '0'));
  const khmerMinutes = toKhmerNumber(minutes.toString().padStart(2, '0'));

  let periodKh = 'ព្រឹក';
  if (period === 'PM') {
    if (hours === 12) {
      periodKh = 'ថ្ងៃត្រង់';
    } else if (hours >= 1 && hours < 5) {
      periodKh = 'រសៀល';
    } else if (hours >= 5 && hours < 7) {
      periodKh = 'ល្ងាច';
    } else {
      periodKh = 'យប់';
    }
  } else if (period === 'AM') {
    if (hours === 12 || hours < 1) {
      periodKh = 'យប់';
    } else if (hours >= 1 && hours < 5) {
      periodKh = 'ទៀបភ្លឺ';
    }
  }

  if (hours === 12 && minutes === 0 && period === 'PM') {
    return `វេលាម៉ោង ១២:០០ ថ្ងៃត្រង់`;
  }

  return `វេលាម៉ោង ${khmerHours}:${khmerMinutes} ${periodKh}`;
};

const getEventIcon = (title: string, color: string) => {
  const lower = title.toLowerCase();

  // 1. Procession / Umbrella
  if (lower.includes('ហែ') || lower.includes('ជំនូន') || lower.includes('procession')) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M3 12c0-4.5 4-8 9-8s9 3.5 9 8H3z" />
        <path d="M12 20c-1 0-2-1-2-2" />
        <circle cx="6" cy="12" r="0.5" fill={color} />
        <circle cx="18" cy="12" r="0.5" fill={color} />
        <path d="M12 4V2" />
      </svg>
    );
  }

  // 2. Signing / Pen
  if (lower.includes('ចុះសំបុត្រ') || lower.includes('ច្បាប់') || lower.includes('signing') || lower.includes('contract') || lower.includes('សំបុត្រ')) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M8 12h4M8 16h8" />
      </svg>
    );
  }

  // 3. Scissors / Hair Cut
  if (lower.includes('កាត់សក់') || lower.includes('បង្កក់') || lower.includes('hair')) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="8.12" y1="8.12" x2="20" y2="20" />
        <line x1="8.12" y1="15.88" x2="20" y2="4" />
      </svg>
    );
  }

  // 4. Bowing Couple / Knot Tying / Ring
  if (lower.includes('សំពះ') || lower.includes('ផ្ទឹម') || lower.includes('ចងដៃ') || lower.includes('ចង') || lower.includes('thread') || lower.includes('knot')) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="12" r="4.5" />
        <circle cx="15" cy="12" r="4.5" />
        <path d="M9 7.5L10.5 6L9 4.5L7.5 6Z" fill={color} />
        <path d="M15 7.5L16.5 6L15 4.5L13.5 6Z" fill={color} />
      </svg>
    );
  }

  // 5. Lunch / Food / Cutlery
  if (lower.includes('ថ្ងៃត្រង់') || lower.includes('lunch') || (lower.includes('ពិសាអាហារ') && !lower.includes('ល្ងាច'))) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="6" />
        <path d="M6 8v4a1 1 0 0 0 1 1h1V8M8 13v4M7 13v4" />
        <path d="M18 8v4a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2V8M16 14v3" />
        <path d="M12 10.5s-.5-.5-1-.5-.8.3-.8.8c0 .8 1.8 2.2 1.8 2.2s1.8-1.4 1.8-2.2c0-.5-.3-.8-.8-.8s-1 .5-1 .5z" fill={color} />
      </svg>
    );
  }

  // 6. Dinner / Reception / House
  if (lower.includes('ល្ងាច') || lower.includes('reception') || lower.includes('dinner') || lower.includes('ភោជន') || lower.includes('ទទួលភ្ញៀវ')) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V11l7-6 7 6v10" />
        <path d="M9 21v-6a3 3 0 0 1 6 0v6" />
      </svg>
    );
  }

  // Default: Parents/Gathering (ជួបជុំភ្ញៀវ)
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21v-2a3 3 0 0 1 3-3h0a3 3 0 0 1 3-3v2" />
      <circle cx="8" cy="11" r="2.5" />
      <path d="M13 21v-2a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2" />
      <circle cx="16" cy="11" r="2.5" />
      <path d="M9 16.5v-1.5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1.5" />
      <circle cx="12" cy="7.5" r="2.5" />
    </svg>
  );
};

export const EventSchedule: React.FC<EventScheduleProps> = ({ events, lunarDateText }) => {
  const sorted = [...events].sort((a, b) => a.sortOrder - b.sortOrder);
  const primaryEvent = sorted[0];

  const defaultLunar = primaryEvent ? primaryEvent.dateKh : '';
  const displayLunar = lunarDateText || defaultLunar;

  const dateStr = (primaryEvent?.dateSolar ?? '').split('T')[0];
  const [yearNum = 0, monthNum = 1, dayNum = 1] = dateStr ? dateStr.split('-').map(Number) : [];
  const beYear = yearNum ? toKhmerNumber(yearNum + 544) : '';
  const khSolarDate = yearNum
    ? `ព.ស. ${beYear} ត្រូវនឹងថ្ងៃទី ${toKhmerNumber(dayNum)} ខែ${getKhmerMonth(monthNum - 1)} ឆ្នាំ${toKhmerNumber(yearNum)}`
    : '';

  const themeColor = '#C5A059'; // Gold
  const textColor = '#2A2A2A'; // Charcoal
  const burgundyColor = '#5A121D'; // Burgundy

  // Stagger rows variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -15, y: 15 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section className="relative py-28 px-4 md:px-8 bg-transparent overflow-hidden">
      {/* Soft gradient divider */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#F5E6E3]/35 to-transparent pointer-events-none" />

      {/* Center top floating butterfly */}
      <div className="flex justify-center mb-10">
        <Butterfly size={72} delay={0.25} interactive={true} />
      </div>

      <div className="max-w-2xl mx-auto space-y-16 relative z-10">
        {/* Save The Date Header */}
        <div className="text-center space-y-4">
          <p className="font-editorial-serif text-[9px] tracking-[0.5em] text-[#C5A059] uppercase font-bold">
            Save The Date
          </p>
          <h2 className="font-editorial-title text-3xl md:text-4xl text-[#5A121D] font-light leading-tight">
            The Wedding Itinerary
          </h2>
          
          <div className="space-y-2 mt-4 bg-[#F5E6E3]/30 px-6 py-4 rounded-xl border border-[#C5A059]/10 max-w-md mx-auto shadow-xs">
            <p className="font-sans font-bold tracking-wide text-[#5A121D] text-xs md:text-sm">{displayLunar}</p>
            <p className="font-sans font-light tracking-wide text-xs text-[#2A2A2A]">{khSolarDate}</p>
          </div>
          <div className="h-[0.5px] w-24 mx-auto mt-4 bg-[#C5A059]/40" />
        </div>

        {/* Editorial container card (filled blush card style) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 md:p-10 bg-white border border-[#C5A059]/25 shadow-[0_30px_70px_rgba(90,18,29,0.04)] relative overflow-hidden"
          style={{
            boxShadow: '0 35px 80px rgba(0,0,0,0.03), inset 0 0 50px rgba(255,255,255,0.95)',
          }}
        >
          {/* Inner border margin line */}
          <div className="absolute inset-3.5 border border-[#C5A059]/10 rounded-xl pointer-events-none" />

          {/* Timeline Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative space-y-2 max-w-lg mx-auto z-10"
          >
            {sorted.map((evt, index) => (
              <motion.div
                key={evt.id}
                variants={rowVariants}
                className="grid grid-cols-[56px_28px_1fr] gap-x-4 items-center min-h-[95px] group hover:bg-[#F5E6E3]/10 p-2.5 rounded-xl transition-colors duration-300"
              >
                {/* 1. Icon column */}
                <div className="flex justify-center">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      border: `1px solid ${themeColor}`,
                      background: 'rgba(197, 160, 89, 0.04)',
                      boxShadow: `0 4px 12px rgba(197,160,89,0.06)`,
                    }}
                  >
                    {getEventIcon(evt.title, burgundyColor)}
                  </div>
                </div>

                {/* 2. Timeline Divider line & Node */}
                <div className="relative h-full flex justify-center items-center">
                  {index > 0 && (
                    <div className="absolute top-0 bottom-1/2 w-[0.5px]" style={{ backgroundColor: themeColor, opacity: 0.25 }} />
                  )}
                  {index < sorted.length - 1 && (
                    <div className="absolute top-1/2 bottom-0 w-[0.5px]" style={{ backgroundColor: themeColor, opacity: 0.25 }} />
                  )}

                  <div className="relative z-10 py-1 bg-transparent text-[#C5A059] transition-transform duration-300 group-hover:scale-125">
                    {/* Pulsing timeline dot */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <circle cx="12" cy="12" r="3.5" fill="currentColor" />
                      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
                    </svg>
                  </div>
                </div>

                {/* 3. Event Detail texts */}
                <div className="py-2 space-y-1 text-left">
                  <span className="font-sans font-bold text-xs tracking-wider text-[#C5A059] block">
                    {translateTimeToKhmer(evt.timeLabel)}
                  </span>
                  {formatKhmerEventDate(evt.dateSolar) ? (
                    <span className="block font-sans text-[11px] opacity-70" style={{ color: textColor }}>
                      📅 {formatKhmerEventDate(evt.dateSolar)}
                    </span>
                  ) : null}
                  <h4 className="font-sans font-bold text-sm leading-relaxed" style={{ color: textColor }}>
                    {evt.title}
                  </h4>
                  {evt.locationName && (
                    <p className="font-sans text-[11px] opacity-70 leading-relaxed" style={{ color: textColor }}>
                      📍 {evt.locationName}
                    </p>
                  )}
                  <a
                    href={evt.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[9px] font-sans font-bold tracking-wider uppercase hover:text-[#5A121D] transition-colors mt-2 cursor-pointer text-[#C5A059] border-b border-transparent hover:border-[#5A121D]"
                  >
                    🗺️ មើលផែនទី · View on Maps
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventSchedule;
