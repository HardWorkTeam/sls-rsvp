'use client';

import React from 'react';
import { m } from 'framer-motion';
import { InvitationData } from '@/types/invitation';
import { khmerSolarDate, khmerTimeLabel } from '@/lib/khmer';
import { Photo } from '@/components/Photo';
import { Butterfly } from './Butterfly';

interface CoupleInfoProps {
  data: InvitationData;
}

const ElegantDivider: React.FC = () => (
  <div className="flex items-center justify-center gap-3 w-full my-4">
    <div className="h-[0.5px] bg-[#C5A059]/25 flex-1 max-w-[80px]" />
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#C5A059] opacity-40">
      <path d="M12,11.5 C10.8,9 7,8 6,10 C5,12 8,15 12,16.5 C16,15 19,12 18,10 C17,8 13.2,9 12,11.5 Z" />
    </svg>
    <div className="h-[0.5px] bg-[#C5A059]/25 flex-1 max-w-[80px]" />
  </div>
);

export const CoupleInfo: React.FC<CoupleInfoProps> = ({ data }) => {
  const { couple } = data;
  const { groom, bride } = couple;
  const primaryEvent = data.events[0];

  // Dynamic customization strings with fallbacks
  const fatherGroomEn = groom.fatherEn || '';
  const motherGroomEn = groom.motherEn || '';
  const fatherBrideEn = bride.fatherEn || '';
  const motherBrideEn = bride.motherEn || '';

  const inviteKh = data.invitationTextKh ?? 'មានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោកអ្នកស្រី អ្នកនាងកញ្ញា ចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីជ័យមង្គលក្នុងពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ';
  const inviteEn = data.invitationTextEn ?? 'CORDIALLY REQUEST THE HONOR OF YOUR PRESENCE ON THE AUSPICIOUS OCCASION OF THE WEDDING OF OUR CHILDREN';

  const lunarDate = data.lunarDateText || (primaryEvent ? primaryEvent.dateKh : '');
  const thankYou = data.thankYouText || 'THANK YOU! / សូមអរគុណ';

  // One date/venue entry per wedding day — Khmer weddings often span two days.
  // data.events carries one event per wedding day (see mapInvitation).
  const eventDays = data.events.slice(0, 1).map((evt) => {
    const d = new Date(evt.dateSolar);
    return {
      id: evt.id,
      monthName: d.toLocaleDateString('en-US', { month: 'long' }).toUpperCase(),
      dayName: d.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
      dateDay: d.getDate(),
      dateYear: d.getFullYear(),
      solarKh: khmerSolarDate(d),
      timeLabel: evt.timeLabel,
      locationName: evt.locationName,
    };
  });
  const multiDay = eventDays.length > 1;

  // Clip path reveal for handwriting names
  const nameRevealVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      opacity: 1,
      transition: { duration: 1.6, ease: 'easeOut' as any },
    },
  };

  return (
    <section className="relative py-28 px-4 md:px-8 bg-transparent overflow-hidden">
      {/* Dynamic Background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#F5E6E3]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#FFEFCB]/15 blur-3xl pointer-events-none" />

      {/* Decorative center top butterfly */}
      <div className="flex justify-center mb-10 relative">
        <Butterfly size={72} delay={0.1} interactive={true} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10 px-4">
        <m.div
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

          <div className="space-y-10 relative z-10">
            {/* Header (The Invitation) */}
            <div className="text-center space-y-2">
              <p className="font-editorial-serif text-[9px] tracking-[0.5em] text-[#C5A059] uppercase font-bold">
                The Wedding Invitation
              </p>
              <h2 className="font-editorial-title text-2xl md:text-3xl text-[#5A121D] font-light tracking-wide leading-tight">
                សេចក្តីអញ្ជើញអាពាហ៍ពិពាហ៍
              </h2>
              <div className="w-16 h-[0.5px] bg-[#C5A059]/40 mx-auto mt-2" />
            </div>

            {/* Parents columns block (Bilingual) */}
            <div className="grid grid-cols-2 gap-4 w-full text-center">
              {/* Groom's parents */}
              <div className="space-y-1.5">
                <p className="font-sans text-xs font-bold text-[#2A2A2A]">
                  {groom.father}
                </p>
                <p className="font-sans text-xs font-bold text-[#2A2A2A]">
                  {groom.mother}
                </p>
                {(fatherGroomEn || motherGroomEn) && (
                  <div className="space-y-0.5 pt-1">
                    {fatherGroomEn && (
                      <p className="font-editorial-serif text-[8px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
                        {fatherGroomEn}
                      </p>
                    )}
                    {motherGroomEn && (
                      <p className="font-editorial-serif text-[8px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
                        {motherGroomEn}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Bride's parents */}
              <div className="space-y-1.5 border-l border-[#C5A059]/10">
                <p className="font-sans text-xs font-bold text-[#2A2A2A]">
                  {bride.father}
                </p>
                <p className="font-sans text-xs font-bold text-[#2A2A2A]">
                  {bride.mother}
                </p>
                {(fatherBrideEn || motherBrideEn) && (
                  <div className="space-y-0.5 pt-1">
                    {fatherBrideEn && (
                      <p className="font-editorial-serif text-[8px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
                        {fatherBrideEn}
                      </p>
                    )}
                    {motherBrideEn && (
                      <p className="font-editorial-serif text-[8px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
                        {motherBrideEn}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <ElegantDivider />

            {/* Formal request texts */}
            <div className="space-y-4 max-w-lg mx-auto text-center">
              {inviteKh && (
                <p className="font-sans text-xs leading-[2] text-[#2A2A2A]/85 px-2">
                  {inviteKh}
                </p>
              )}
              {inviteEn && (
                <p className="font-editorial-serif text-[9px] md:text-[10px] leading-[2] tracking-[0.15em] text-[#5A121D] uppercase font-light px-2">
                  {inviteEn}
                </p>
              )}
            </div>

            <ElegantDivider />

            {/* Overlapping Profiles Layout (The Groom & Bride photo grid) */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-2">
              {/* Groom Profile Card */}
              <div className="flex flex-col items-center space-y-4 w-full max-w-[200px]">
                {/* Elegant double border frame with image hover scale */}
                <div className="relative p-2 bg-white border border-[#C5A059]/25 shadow-[0_15px_35px_rgba(90,18,29,0.04)] rounded-2xl w-full aspect-[3/4] overflow-hidden group">
                  <div className="absolute inset-3 border border-[#C5A059]/15 rounded-xl pointer-events-none z-10 transition-transform duration-500 group-hover:scale-[0.98]" />
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Photo
                      src={groom.photo}
                      alt={groom.nameEn}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="filter sepia-[15%] transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <span className="font-editorial-serif text-[8px] tracking-[0.35em] text-[#C5A059] uppercase font-bold block mb-0.5">
                    The Groom
                  </span>
                  <h4 className="font-sans text-sm font-semibold text-[#2A2A2A]">
                    {groom.nameKh}
                  </h4>
                  <m.h3
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={nameRevealVariants}
                    className="font-editorial-serif italic text-lg md:text-xl text-[#5A121D] leading-none"
                  >
                    {groom.nameEn}
                  </m.h3>
                </div>
              </div>

              {/* Large Decorative Ampersand & Separator */}
              <div className="flex flex-col items-center justify-center my-2 md:my-0">
                <div className="hidden md:block h-16 w-[0.5px] bg-[#C5A059]/20" />
                <div className="w-12 h-12 rounded-full bg-white border border-[#C5A059]/25 flex items-center justify-center z-10 shadow-sm relative my-2">
                  <span
                    className="font-editorial-serif text-2xl font-light italic text-[#C5A059]"
                    style={{ fontFamily: 'Georgia, serif', lineHeight: 0.6 }}
                  >
                    &amp;
                  </span>
                </div>
                <div className="hidden md:block h-16 w-[0.5px] bg-[#C5A059]/20" />
              </div>

              {/* Bride Profile Card */}
              <div className="flex flex-col items-center space-y-4 w-full max-w-[200px]">
                {/* Elegant double border frame with image hover scale */}
                <div className="relative p-2 bg-white border border-[#C5A059]/25 shadow-[0_15px_35px_rgba(90,18,29,0.04)] rounded-2xl w-full aspect-[3/4] overflow-hidden group">
                  <div className="absolute inset-3 border border-[#C5A059]/15 rounded-xl pointer-events-none z-10 transition-transform duration-500 group-hover:scale-[0.98]" />
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <Photo
                      src={bride.photo}
                      alt={bride.nameEn}
                      fill
                      sizes="(max-width: 768px) 50vw, 200px"
                      className="filter sepia-[15%] transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <span className="font-editorial-serif text-[8px] tracking-[0.35em] text-[#C5A059] uppercase font-bold block mb-0.5">
                    The Bride
                  </span>
                  <h4 className="font-sans text-sm font-semibold text-[#2A2A2A]">
                    {bride.nameKh}
                  </h4>
                  <m.h3
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={nameRevealVariants}
                    className="font-editorial-serif italic text-lg md:text-xl text-[#5A121D] leading-none"
                  >
                    {bride.nameEn}
                  </m.h3>
                </div>
              </div>
            </div>

            <ElegantDivider />

            {/* Date solar & lunar blocks — one entry per wedding day */}
            <div className="text-center space-y-4 w-full text-xs text-[#2A2A2A]">
              {/* Khmer Lunar/Solar Date text (applies to the whole celebration) */}
              {lunarDate && (
                <p className="font-sans text-xs font-semibold leading-relaxed text-[#5A121D] px-4">
                  {lunarDate}
                </p>
              )}

              {eventDays.map((day, i) => (
                <div key={day.id} className="space-y-2">
                  {multiDay && (
                    <p className="font-editorial-serif text-[10px] font-bold uppercase tracking-widest text-[#C5A059]">
                      ថ្ងៃទី{i + 1} · Day {i + 1}
                    </p>
                  )}
                  {day.solarKh && (
                    <p className="font-light text-xs text-[#2A2A2A]">
                      {day.solarKh}
                    </p>
                  )}

                  {/* English Calendar date grid */}
                  <div className="border-y border-[#C5A059]/25 py-3 max-w-sm mx-auto flex items-center justify-center gap-6 font-editorial-serif text-[10px] tracking-widest text-[#C5A059] uppercase font-bold">
                    <span>{day.monthName}</span>
                    <div className="flex flex-col items-center border-x border-[#C5A059]/20 px-6">
                      <span className="text-[8px] opacity-70 font-light">{day.dayName}</span>
                      <span className="text-2xl font-bold my-1 text-[#5A121D]">{day.dateDay}</span>
                      <span className="text-[8px] opacity-70 font-light">{day.dateYear}</span>
                    </div>
                    <span>AT {day.timeLabel.toUpperCase() || '5 PM'}</span>
                  </div>

                  {/* Khmer time label details */}
                  {day.timeLabel && (
                    <p className="font-sans text-[11px] opacity-75 font-light">
                      {khmerTimeLabel(day.timeLabel)} ទៅ / Starting at {day.timeLabel}
                    </p>
                  )}

                  {/* Ceremony location venue */}
                  {day.locationName && (
                    <p className="font-sans text-[#5A121D] text-xs font-bold tracking-wide">
                      📍 {day.locationName}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="w-1/4 mx-auto my-2">
              <ElegantDivider />
            </div>

            {/* Thank you */}
            <p className="text-center font-editorial-serif text-[9px] tracking-[0.25em] text-[#C5A059] font-bold uppercase">
              {thankYou}
            </p>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default CoupleInfo;
