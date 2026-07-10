'use client';

import React from 'react';
import { m } from 'framer-motion';
import { InvitationData } from '@/types/invitation';
import { khmerSolarDate, khmerTimeLabel } from '@/lib/khmer';
import { Photo } from '@/components/Photo';
import { SectionHeading, DiamondDivider, DrawBorderFrame, LotusOrnament } from '../../royal-khmer-v1/components/KhmerOrnaments';

interface CoupleInfoProps {
  data: InvitationData;
}

export const CoupleInfo: React.FC<CoupleInfoProps> = ({ data }) => {
  const couple = data.couple;
  const groom = couple.groom;
  const bride = couple.bride;
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

  return (
    <section
      className="relative w-full py-24 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'transparent' }}
    >
      {/* Soft blue wash accent */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(106,140,178,0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(106,140,178,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center space-y-2 mb-10">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#5B7A9D' }}>
            The Couple &amp; Invitation
          </p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#2C3E56', lineHeight: 1.7 }}>
            សេចក្តីអញ្ជើញអាពាហ៍ពិពាហ៍
          </h2>
          <div
            className="h-[1px] w-20 mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(106,140,178,0.5), transparent)' }}
          />
        </div>

        {/* Digital Representation of the Physical Invitation Card */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="card-tilt-hover transition-all w-full"
        >
          <DrawBorderFrame
            className="p-6 md:p-10 text-center flex flex-col items-center gap-6"
            style={{
              background: 'linear-gradient(185deg, rgba(28, 48, 74, 0.94) 0%, rgba(14, 28, 48, 0.98) 100%)',
              borderColor: 'rgba(106, 140, 178, 0.3)',
            }}
          >
            {/* Top Emblem */}
            <div className="flex justify-center scale-90 opacity-90 animate-subtle-float">
              <LotusOrnament size={50} color="#E8C97A" />
            </div>

            {/* Khmer Card Title */}
            <h3
              className="font-khmer-title text-base md:text-lg tracking-wide"
              style={{ color: '#E8C97A', lineHeight: 1.7 }}
            >
              សិរីសួស្តីអាពាហ៍ពិពាហ៍
            </h3>

            {/* Parents Column Grid (Bilingual) */}
            <div className="grid grid-cols-2 gap-6 w-full text-xs md:text-sm mt-2 text-[#FAF6EF]">
              {/* Groom's parents */}
              <div className="space-y-1 text-center">
                <p className="font-khmer-body font-bold text-[#E8C97A]">
                  {groom.father && `លោក ${groom.father}`}
                </p>
                <p className="font-khmer-body font-bold text-[#E8C97A]">
                  {groom.mother && `លោកស្រី ${groom.mother}`}
                </p>
                {(fatherGroomEn || motherGroomEn) && (
                  <>
                    <div className="h-[0.5px] w-12 bg-[#E8C97A]/25 mx-auto my-1" />
                    {fatherGroomEn && (
                      <p className="font-serif-en text-[9px] tracking-wider opacity-60 uppercase">
                        Mr. {fatherGroomEn}
                      </p>
                    )}
                    {motherGroomEn && (
                      <p className="font-serif-en text-[9px] tracking-wider opacity-60 uppercase">
                        Mrs. {motherGroomEn}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Bride's parents */}
              <div className="space-y-1 text-center">
                <p className="font-khmer-body font-bold text-[#E8C97A]">
                  {bride.father && `លោក ${bride.father}`}
                </p>
                <p className="font-khmer-body font-bold text-[#E8C97A]">
                  {bride.mother && `លោកស្រី ${bride.mother}`}
                </p>
                {(fatherBrideEn || motherBrideEn) && (
                  <>
                    <div className="h-[0.5px] w-12 bg-[#E8C97A]/25 mx-auto my-1" />
                    {fatherBrideEn && (
                      <p className="font-serif-en text-[9px] tracking-wider opacity-60 uppercase">
                        Mr. {fatherBrideEn}
                      </p>
                    )}
                    {motherBrideEn && (
                      <p className="font-serif-en text-[9px] tracking-wider opacity-60 uppercase">
                        Mrs. {motherBrideEn}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="w-1/3">
              <DiamondDivider color="#E8C97A" />
            </div>

            {/* Invitation English header */}
            <h4 className="font-serif-en text-sm tracking-[0.3em] text-[#E8C97A] uppercase font-bold">
              Invitation
            </h4>

            {/* Formal Request text */}
            <div className="space-y-3 max-w-lg mx-auto text-[11.5px] md:text-xs text-[#FAF6EF]/85 leading-relaxed">
              {inviteKh && (
                <p className="font-khmer-body">
                  {inviteKh}
                </p>
              )}
              {inviteEn && (
                <p className="font-serif-en tracking-wider text-[9px] md:text-[10px] text-[#FAF6EF]/60 italic uppercase mt-1">
                  {inviteEn}
                </p>
              )}
            </div>

            <div className="w-full">
              <DiamondDivider color="#E8C97A" />
            </div>

            {/* Couple photos */}
            {(groom.photo || bride.photo) && (
              <div className="flex items-end justify-center gap-4 w-full py-2">
                {groom.photo && (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#5B8DB8]/40 shadow-[0_0_0_3px_rgba(91,141,184,0.12)]">
                    <Photo src={groom.photo} alt={groom.nameEn} fill sizes="80px" />
                  </div>
                )}
                <div className="w-[1px] h-16 self-center bg-[#5B8DB8]/20" />
                {bride.photo && (
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#5B8DB8]/40 shadow-[0_0_0_3px_rgba(91,141,184,0.12)]">
                    <Photo src={bride.photo} alt={bride.nameEn} fill sizes="80px" />
                  </div>
                )}
              </div>
            )}

            {/* Couple names */}
            <div className="flex flex-col items-center gap-3 w-full py-2">
              <div className="flex flex-col items-center">
                <span className="font-khmer-body text-[10px] text-[#E8C97A]/80 uppercase tracking-widest">
                  កូនប្រុសនាម / Groom
                </span>
                <span className="font-khmer-title text-base md:text-lg text-[#FAF6EF] mt-1">
                  {groom.nameKh}
                </span>
                <span className="font-serif-en italic text-xs text-[#E8C97A]/75 mt-0.5">
                  {groom.nameEn}
                </span>
              </div>

              <div
                className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-khmer-body text-[#E8C97A]"
                style={{ borderColor: 'rgba(106, 140, 178, 0.3)', background: 'rgba(106, 140, 178, 0.04)' }}
              >
                ជាគូនឹង
              </div>

              <div className="flex flex-col items-center">
                <span className="font-khmer-body text-[10px] text-[#E8C97A]/80 uppercase tracking-widest">
                  កូនស្រីនាម / Bride
                </span>
                <span className="font-khmer-title text-base md:text-lg text-[#FAF6EF] mt-1">
                  {bride.nameKh}
                </span>
                <span className="font-serif-en italic text-xs text-[#E8C97A]/75 mt-0.5">
                  {bride.nameEn}
                </span>
              </div>
            </div>

            <div className="w-full">
              <DiamondDivider color="#E8C97A" />
            </div>

            {/* Dates & Location block — one entry per wedding day */}
            <div className="space-y-4 w-full text-xs text-[#FAF6EF]">
              {/* Lunar Khmer date (applies to the whole celebration) */}
              {lunarDate && (
                <p className="font-khmer-body leading-relaxed text-[#E8C97A]">
                  {lunarDate}
                </p>
              )}

              {eventDays.map((day, i) => (
                <div key={day.id} className="space-y-2">
                  {multiDay && (
                    <p className="font-khmer-body text-[11px] font-bold uppercase tracking-widest text-[#E8C97A]">
                      ថ្ងៃទី{i + 1} · Day {i + 1}
                    </p>
                  )}
                  {day.solarKh && (
                    <p className="font-khmer-body font-semibold text-[#FAF6EF]">
                      {day.solarKh}
                    </p>
                  )}

                  {/* English grid date format */}
                  <div className="border-y border-[#E8C97A]/25 py-2 max-w-sm mx-auto flex items-center justify-center gap-6 font-serif-en text-[11px] md:text-xs tracking-widest text-[#E8C97A]">
                    <span>{day.monthName}</span>
                    <div className="flex flex-col items-center border-x border-[#E8C97A]/20 px-4">
                      <span className="text-[9px]">{day.dayName}</span>
                      <span className="text-xl md:text-2xl font-bold my-0.5 text-[#FAF6EF]">{day.dateDay}</span>
                      <span className="text-[9px]">{day.dateYear}</span>
                    </div>
                    <span>AT {day.timeLabel.toUpperCase() || '5 PM'}</span>
                  </div>

                  {/* Time detail */}
                  {day.timeLabel && (
                    <p className="font-khmer-body text-xs opacity-75">
                      {khmerTimeLabel(day.timeLabel)} ទៅ / Starting at {day.timeLabel}
                    </p>
                  )}

                  {/* Location */}
                  {day.locationName && (
                    <p className="font-khmer-body text-[#E8C97A] text-sm font-bold">
                      📍 {day.locationName}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="w-1/4 my-2">
              <DiamondDivider color="#E8C97A" />
            </div>

            {/* Thank you */}
            <p className="font-serif-en text-xs tracking-[0.25em] text-[#E8C97A] font-bold uppercase">
              {thankYou}
            </p>
          </DrawBorderFrame>
        </m.div>
      </div>
    </section>
  );
};

export default CoupleInfo;
