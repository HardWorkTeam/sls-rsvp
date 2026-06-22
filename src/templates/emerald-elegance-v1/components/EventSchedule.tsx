'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WeddingEvent } from '@/types/invitation';
import { EtherealBorderFrame, ThinGoldRule } from './BotanicalAssets';

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

  // Procession / Umbrella
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

  // Signing / Pen
  if (lower.includes('ចុះសំបុត្រ') || lower.includes('ច្បាប់') || lower.includes('signing') || lower.includes('contract') || lower.includes('សំបុត្រ')) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M8 12h4M8 16h8" />
      </svg>
    );
  }

  // Scissors / Hair Cut
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

  // Bowing Couple / Knot Tying / Ring
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

  // Lunch / Food / Cutlery
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

  // Dinner / Reception / House
  if (lower.includes('ល្ងាច') || lower.includes('reception') || lower.includes('dinner') || lower.includes('ភោជន') || lower.includes('ទទួលភ្ញៀវ')) {
    return (
      <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V11l7-6 7 6v10" />
        <path d="M9 21v-6a3 3 0 0 1 6 0v6" />
      </svg>
    );
  }

  // Default: Parents/Gathering
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 21v-2a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2" />
      <circle cx="8" cy="11" r="2.5" />
      <path d="M13 21v-2a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2" />
      <circle cx="16" cy="11" r="2.5" />
      <path d="M9 16.5v-1.5a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v1.5" />
      <circle cx="12" cy="7.5" r="2.5" />
    </svg>
  );
};

export const EventSchedule: React.FC<EventScheduleProps> = ({ events, lunarDateText }) => {
  if (!events || events.length === 0) return null;

  const sorted = [...events].sort((a, b) => a.sortOrder - b.sortOrder);
  const primaryEvent = sorted[0];
  
  const solarDate = new Date(primaryEvent.dateSolar);
  const defaultLunar = primaryEvent.dateKh;
  const displayLunar = lunarDateText || defaultLunar;

  const beYear = toKhmerNumber(solarDate.getFullYear() + 544);
  const khSolarDate = `ព.ស. ${beYear} ត្រូវនឹងថ្ងៃទី ${toKhmerNumber(solarDate.getDate())} ខែ${getKhmerMonth(solarDate.getMonth())} ឆ្នាំ${toKhmerNumber(solarDate.getFullYear())}`;

  const themeColor = 'var(--ee-gold)';
  const textColor = 'var(--ee-ivory)';

  return (
    <section className="py-20 px-6 bg-transparent overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="font-emerald-sans text-[10px] tracking-[0.35em] uppercase text-emerald-gold">
            Event Schedule
          </p>
          <h2 className="font-emerald-serif text-3xl md:text-4xl text-emerald-gradient leading-relaxed">
            កម្មវិធីមង្គលអាពាហ៍ពិពាហ៍
          </h2>
          <div className="space-y-1 text-xs md:text-sm text-emerald-ivory/80">
            <p className="font-emerald-serif font-semibold text-emerald-gold">{displayLunar}</p>
            <p className="font-emerald-serif opacity-90">{khSolarDate}</p>
          </div>
          <div className="w-24 mx-auto mt-4">
            <ThinGoldRule />
          </div>
        </div>

        {/* Timeline Frame Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-10"
        >
          <EtherealBorderFrame className="shadow-[0_8px_30px_rgba(201,168,76,0.1)] py-10 px-4 md:px-8">
            
            {/* Timeline Rows */}
            <div className="relative space-y-0 max-w-xl mx-auto">
              {sorted.map((evt, index) => (
                <div
                  key={evt.id}
                  className="grid grid-cols-[56px_32px_1fr] md:grid-cols-[64px_32px_1fr] gap-x-3 md:gap-x-4 items-center min-h-[90px]"
                >
                  {/* 1. Icon Column */}
                  <div className="flex justify-center">
                    <div 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ 
                        border: `1px solid rgba(201,168,76,0.5)`, 
                        background: 'rgba(201,168,76,0.05)',
                        boxShadow: `0 0 10px rgba(201,168,76,0.1)`
                      }}
                    >
                      {getEventIcon(evt.title, themeColor)}
                    </div>
                  </div>

                  {/* 2. Timeline Divider / Node */}
                  <div className="relative h-full flex justify-center items-center">
                    {index > 0 && (
                      <div className="absolute top-0 bottom-1/2 w-[1px]" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
                    )}
                    {index < sorted.length - 1 && (
                      <div className="absolute top-1/2 bottom-0 w-[1px]" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
                    )}
                    
                    <div className="relative z-10 py-1 bg-transparent">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-gold">
                        <circle cx="12" cy="12" r="3" fill="currentColor" />
                        <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
                        <path d="M12 7c0-1.5-0.75-2.5-0.75-2.5s0.75 1 0.75 2.5zM12 17c0 1.5-0.75 2.5-0.75 2.5s0.75-1 0.75-2.5zM7 12c-1.5 0-2.5-0.75-2.5-0.75s1 0.75 2.5 0.75zM17 12c1.5 0 2.5-0.75 2.5-0.75s-1 0.75-2.5 0.75z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>

                  {/* 3. Text Column */}
                  <div className="py-5 space-y-1.5 text-left">
                    <span className="font-emerald-serif font-bold text-[11px] md:text-xs tracking-wider text-emerald-gold">
                      {translateTimeToKhmer(evt.timeLabel)}
                    </span>
                    <h4 className="font-emerald-serif font-bold text-sm md:text-base leading-relaxed" style={{ color: textColor }}>
                      {evt.title}
                    </h4>
                    {evt.locationName && (
                      <p className="font-emerald-sans text-[10px] md:text-xs opacity-75 leading-relaxed tracking-wide" style={{ color: textColor }}>
                        📍 {evt.locationName}
                      </p>
                    )}
                    {evt.googleMapsUrl && (
                      <a 
                        href={evt.googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-[9px] md:text-[10px] font-emerald-sans font-bold tracking-widest uppercase hover:opacity-80 mt-1 cursor-pointer text-emerald-gold underline"
                      >
                        🗺️ មើលផែនទី · View on Maps
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </EtherealBorderFrame>
        </motion.div>
      </div>
    </section>
  );
};
