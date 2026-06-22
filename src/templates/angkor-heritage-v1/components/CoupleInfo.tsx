'use client';

import React from 'react';
import { color, motion } from 'framer-motion';
import { InvitationData } from '@/types/invitation';
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

  const inviteKh = data.invitationTextKh || 'មានកិត្តិយសសូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោកអ្នកស្រី អ្នកនាងកញ្ញា ចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីជ័យមង្គលក្នុងពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ';
  const inviteEn = data.invitationTextEn || 'CORDIALLY REQUEST THE HONOR OF YOUR PRESENCE ON THE AUSPICIOUS OCCASION OF THE WEDDING OF OUR CHILDREN';

  const lunarDate = data.lunarDateText || (primaryEvent ? primaryEvent.dateKh : '');
  const thankYou = data.thankYouText || 'THANK YOU! / សូមអរគុណ';

  const locationName = primaryEvent ? primaryEvent.locationName : '';
  const timeLabel = primaryEvent ? primaryEvent.timeLabel : '';

  const weddingDate = primaryEvent
    ? new Date(primaryEvent.dateSolar)
    : new Date();

  const monthName = weddingDate.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
  const dayName = weddingDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const dateDay = weddingDate.getDate();
  const dateYear = weddingDate.getFullYear();

  const formattedSolarKh = primaryEvent
    ? `ត្រូវនឹងថ្ងៃទី ${weddingDate.getDate()} ខែ${weddingDate.toLocaleDateString('kh-KH', { month: 'long' })} ឆ្នាំ ${weddingDate.getFullYear()}`
    : '';

  return (
    <section
      className="py-24 px-6 relative"
      style={{
        /*background: 'linear-gradient(180deg, rgba(255, 248, 232, 0.85) 0%, rgba(255, 243, 208, 0.75) 50%, rgba(255, 248, 232, 0.85) 100%)',*/
        backdropFilter: 'blur(1px)',
      }}
    >
      {/* Subtle texture watermark */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #D4A020 0px, #D4A020 1px, transparent 1px, transparent 18px)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center space-y-2 mb-10">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#ffffff' }}>
            The Couple &amp; Invitation
          </p>
          <h2 className="font-khmer-title text-2xl" style={{ color: '#ffffff', lineHeight: 1.7 }}>
            សេចក្តីអញ្ជើញអាពាហ៍ពិពាហ៍
          </h2>
          <div
            className="h-[1px] w-20 mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, #D4A020, transparent)' }}
          />
        </div>

        {/* Digital Representation of the Physical Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="card-tilt-hover transition-all w-full"
        >
          <DrawBorderFrame
            className="p-6 md:p-10 text-center flex flex-col items-center gap-6"
            style={{
              background: 'linear-gradient(185deg, rgba(92, 58, 0, 0.94) 0%, rgba(61, 34, 0, 0.98) 100%)',
              borderColor: 'rgba(212, 160, 32, 0.35)',
            }}
          >
            {/* Top Emblem */}
            <div className="flex justify-center scale-90 opacity-90 animate-subtle-float">
              <LotusOrnament size={50} color="#D4A020" />
            </div>

            {/* Khmer Card Title */}
            <h3
              className="font-khmer-title text-base md:text-lg tracking-wide"
              style={{ color: '#FFE566', lineHeight: 1.7 }}
            >
              សិរីសួស្តីអាពាហ៍ពិពាហ៍
            </h3>

            {/* Parents Column Grid (Bilingual) */}
            <div className="grid grid-cols-2 gap-6 w-full text-xs md:text-sm mt-2 text-[#FFF8E8]">
              {/* Groom's parents */}
              <div className="space-y-1 text-center">
                <p className="font-khmer-body font-bold text-[#D4A020]">
                  {groom.father}
                </p>
                <p className="font-khmer-body font-bold text-[#D4A020]">
                  {groom.mother}
                </p>
                {(fatherGroomEn || motherGroomEn) && (
                  <>
                    <div className="h-[0.5px] w-12 bg-[#D4A020]/25 mx-auto my-1" />
                    {fatherGroomEn && (
                      <p className="font-serif-en text-[9px] tracking-wider opacity-60 uppercase">
                        {fatherGroomEn}
                      </p>
                    )}
                    {motherGroomEn && (
                      <p className="font-serif-en text-[9px] tracking-wider opacity-60 uppercase">
                        {motherGroomEn}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Bride's parents */}
              <div className="space-y-1 text-center">
                <p className="font-khmer-body font-bold text-[#D4A020]">
                  {bride.father}
                </p>
                <p className="font-khmer-body font-bold text-[#D4A020]">
                  {bride.mother}
                </p>
                {(fatherBrideEn || motherBrideEn) && (
                  <>
                    <div className="h-[0.5px] w-12 bg-[#D4A020]/25 mx-auto my-1" />
                    {fatherBrideEn && (
                      <p className="font-serif-en text-[9px] tracking-wider opacity-60 uppercase">
                        {fatherBrideEn}
                      </p>
                    )}
                    {motherBrideEn && (
                      <p className="font-serif-en text-[9px] tracking-wider opacity-60 uppercase">
                        {motherBrideEn}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="w-1/3">
              <DiamondDivider color="#D4A020" />
            </div>

            {/* Invitation English header */}
            <h4 className="font-serif-en text-sm tracking-[0.3em] text-[#D4A020] uppercase font-bold">
              Invitation
            </h4>

            {/* Formal Request text */}
            <div className="space-y-3 max-w-lg mx-auto text-[11.5px] md:text-xs text-[#FFF8E8]/85 leading-relaxed">
              <p className="font-khmer-body">
                {inviteKh}
              </p>
              <p className="font-serif-en tracking-wider text-[9px] md:text-[10px] text-[#FFF8E8]/60 italic uppercase mt-1">
                {inviteEn}
              </p>
            </div>

            <div className="w-full">
              <DiamondDivider color="#D4A020" />
            </div>

            {/* Couple photos */}
            {(groom.photo || bride.photo) && (
              <div className="flex items-end justify-center gap-4 w-full py-2">
                {groom.photo && (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4A020]/50 shadow-[0_0_0_3px_rgba(212,160,32,0.12)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={groom.photo} alt={groom.nameEn} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
                <div className="w-[1px] h-16 self-center" style={{ background: 'rgba(212,160,32,0.2)' }} />
                {bride.photo && (
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4A020]/50 shadow-[0_0_0_3px_rgba(212,160,32,0.12)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={bride.photo} alt={bride.nameEn} className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Couple names */}
            <div className="flex flex-col items-center gap-3 w-full py-2">
              <div className="flex flex-col items-center">
                <span className="font-khmer-body text-[10px] text-[#D4A020]/80 uppercase tracking-widest">
                  កូនប្រុសនាម / Groom
                </span>
                <span className="font-khmer-title text-base md:text-lg text-[#FFF8E8] mt-1">
                  {groom.nameKh}
                </span>
                <span className="font-serif-en italic text-xs text-[#D4A020]/75 mt-0.5">
                  {groom.nameEn}
                </span>
              </div>

              <div
                className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-khmer-body text-[#D4A020]"
                style={{ borderColor: 'rgba(212, 160, 32, 0.3)', background: 'rgba(212, 160, 32, 0.04)' }}
              >
                ជាគូនឹង
              </div>

              <div className="flex flex-col items-center">
                <span className="font-khmer-body text-[10px] text-[#D4A020]/80 uppercase tracking-widest">
                  កូនស្រីនាម / Bride
                </span>
                <span className="font-khmer-title text-base md:text-lg text-[#FFF8E8] mt-1">
                  {bride.nameKh}
                </span>
                <span className="font-serif-en italic text-xs text-[#D4A020]/75 mt-0.5">
                  {bride.nameEn}
                </span>
              </div>
            </div>

            <div className="w-full">
              <DiamondDivider color="#D4A020" />
            </div>

            {/* Dates & Location block */}
            <div className="space-y-4 w-full text-xs text-[#FFF8E8]">
              {/* Lunar Khmer date */}
              <p className="font-khmer-body leading-relaxed text-[#D4A020]">
                {lunarDate}
                {formattedSolarKh && (
                  <span className="block mt-1 font-semibold text-[#FFF8E8]">
                    {formattedSolarKh}
                  </span>
                )}
              </p>

              {/* English grid date format */}
              <div className="border-y border-[#D4A020]/25 py-2 max-w-sm mx-auto flex items-center justify-center gap-6 font-serif-en text-[11px] md:text-xs tracking-widest text-[#D4A020]">
                <span>{monthName}</span>
                <div className="flex flex-col items-center border-x border-[#D4A020]/20 px-4">
                  <span className="text-[9px]">{dayName}</span>
                  <span className="text-xl md:text-2xl font-bold my-0.5 text-[#FFF8E8]">{dateDay}</span>
                  <span className="text-[9px]">{dateYear}</span>
                </div>
                <span>AT {timeLabel.toUpperCase() || '5 PM'}</span>
              </div>

              {/* Time detail */}
              <p className="font-khmer-body text-xs opacity-75">
                វេលាម៉ោង {timeLabel} ទៅ / Starting at {timeLabel}
              </p>

              {/* Location */}
              {locationName && (
                <div className="space-y-1">
                  <p className="font-khmer-body text-[#D4A020] text-sm font-bold">
                    📍 {locationName}
                  </p>
                </div>
              )}
            </div>

            <div className="w-1/4 my-2">
              <DiamondDivider color="#D4A020" />
            </div>

            {/* Thank you */}
            <p className="font-serif-en text-xs tracking-[0.25em] text-[#D4A020] font-bold uppercase">
              {thankYou}
            </p>
          </DrawBorderFrame>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleInfo;
