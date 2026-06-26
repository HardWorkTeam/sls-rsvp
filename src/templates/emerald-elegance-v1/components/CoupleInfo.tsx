'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { InvitationData } from '@/types/invitation';
import { khmerSolarDate, khmerTimeLabel } from '@/lib/khmer';
import { EtherealBorderFrame, DiamondSeparator, ThinGoldRule } from './BotanicalAssets';

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

  const formattedSolarKh = primaryEvent ? khmerSolarDate(weddingDate) : '';

  return (
    <section className="relative w-full py-20 overflow-hidden flex flex-col items-center bg-transparent">
      
      {/* Section Header */}
      <div className="flex flex-col items-center gap-3 text-center mb-10">
        <p className="font-emerald-sans text-[10px] tracking-[0.35em] uppercase text-emerald-gold">
          Wedding Invitation
        </p>
        <h2 className="font-emerald-serif text-3xl text-emerald-gradient">
          សេចក្តីអញ្ជើញ
        </h2>
        <p className="font-emerald-script text-xl text-emerald-gradient/70">
          Two families united in love
        </p>
        <div className="w-24 mt-2">
          <ThinGoldRule />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4">
        {/* Digital Representation of the Physical Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <EtherealBorderFrame className="text-center flex flex-col items-center gap-6 shadow-[0_8px_30px_rgba(201,168,76,0.1)]">
            
            {/* Top Emblem */}
            <div className="flex justify-center mb-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-emerald-gold">
                <path d="M20 5 L25 15 L35 20 L25 25 L20 35 L15 25 L5 20 L15 15 Z" fill="currentColor" opacity="0.8" />
                <circle cx="20" cy="20" r="4" fill="#1a2818" />
              </svg>
            </div>

            {/* Khmer Card Title */}
            <h3 className="font-emerald-serif text-lg md:text-xl tracking-wide text-emerald-gold">
              សិរីសួស្តីអាពាហ៍ពិពាហ៍
            </h3>

            {/* Parents Column Grid (Bilingual) */}
            <div className="grid grid-cols-2 gap-6 w-full text-xs md:text-sm mt-2 text-emerald-ivory">
              {/* Groom's parents */}
              <div className="space-y-1 text-center">
                <p className="font-emerald-serif font-bold text-emerald-gold">
                  {groom.father}
                </p>
                <p className="font-emerald-serif font-bold text-emerald-gold">
                  {groom.mother}
                </p>
                {(fatherGroomEn || motherGroomEn) && (
                  <>
                    <div className="h-[0.5px] w-12 bg-emerald-gold/30 mx-auto my-2" />
                    {fatherGroomEn && (
                      <p className="font-emerald-sans text-[9px] tracking-wider opacity-70 uppercase">
                        {fatherGroomEn}
                      </p>
                    )}
                    {motherGroomEn && (
                      <p className="font-emerald-sans text-[9px] tracking-wider opacity-70 uppercase">
                        {motherGroomEn}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Bride's parents */}
              <div className="space-y-1 text-center">
                <p className="font-emerald-serif font-bold text-emerald-gold">
                  {bride.father}
                </p>
                <p className="font-emerald-serif font-bold text-emerald-gold">
                  {bride.mother}
                </p>
                {(fatherBrideEn || motherBrideEn) && (
                  <>
                    <div className="h-[0.5px] w-12 bg-emerald-gold/30 mx-auto my-2" />
                    {fatherBrideEn && (
                      <p className="font-emerald-sans text-[9px] tracking-wider opacity-70 uppercase">
                        {fatherBrideEn}
                      </p>
                    )}
                    {motherBrideEn && (
                      <p className="font-emerald-sans text-[9px] tracking-wider opacity-70 uppercase">
                        {motherBrideEn}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="w-1/3 my-2">
              <DiamondSeparator />
            </div>

            {/* Invitation English header */}
            <h4 className="font-emerald-sans text-[11px] tracking-[0.3em] text-emerald-gold uppercase font-bold">
              Invitation
            </h4>

            {/* Formal Request text */}
            <div className="space-y-4 max-w-lg mx-auto text-[11.5px] md:text-xs text-emerald-ivory/85 leading-relaxed">
              <p className="font-emerald-serif">
                {inviteKh}
              </p>
              <p className="font-emerald-sans tracking-wider text-[9px] md:text-[10px] text-emerald-ivory/60 uppercase">
                {inviteEn}
              </p>
            </div>

            <div className="w-full my-2">
              <ThinGoldRule />
            </div>

            {/* Couple photos */}
            {(groom.photo || bride.photo) && (
              <div className="flex items-end justify-center gap-4 w-full py-2">
                {groom.photo && (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-300/50 shadow-[0_0_0_3px_rgba(52,211,153,0.10)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={groom.photo} alt={groom.nameEn} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="w-[1px] h-16 self-center bg-emerald-200/30" />
                {bride.photo && (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-300/50 shadow-[0_0_0_3px_rgba(52,211,153,0.10)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={bride.photo} alt={bride.nameEn} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            )}

            {/* Couple names */}
            <div className="flex flex-col items-center gap-4 w-full py-2">
              <div className="flex flex-col items-center">
                <span className="font-emerald-sans text-[9px] text-emerald-gold/80 uppercase tracking-[0.2em] mb-2">
                  កូនប្រុសនាម / Groom
                </span>
                <span className="font-emerald-serif text-2xl md:text-3xl text-emerald-gradient mb-1">
                  {groom.nameKh}
                </span>
                <span className="font-emerald-script text-xl text-emerald-gold/90">
                  {groom.nameEn}
                </span>
              </div>

              <div className="w-10 h-10 rounded-full border border-emerald-gold/30 flex items-center justify-center text-[10px] font-emerald-serif text-emerald-gold bg-emerald-gold/5 my-2">
                &
              </div>

              <div className="flex flex-col items-center">
                <span className="font-emerald-sans text-[9px] text-emerald-gold/80 uppercase tracking-[0.2em] mb-2">
                  កូនស្រីនាម / Bride
                </span>
                <span className="font-emerald-serif text-2xl md:text-3xl text-emerald-gradient mb-1">
                  {bride.nameKh}
                </span>
                <span className="font-emerald-script text-xl text-emerald-gold/90">
                  {bride.nameEn}
                </span>
              </div>
            </div>

            <div className="w-full my-2">
              <ThinGoldRule />
            </div>

            {/* Dates & Location block */}
            <div className="space-y-5 w-full text-xs text-emerald-ivory">
              {/* Lunar Khmer date */}
              <p className="font-emerald-serif leading-relaxed text-emerald-gold">
                {lunarDate}
                {formattedSolarKh && (
                  <span className="block mt-1 font-semibold text-emerald-ivory">
                    {formattedSolarKh}
                  </span>
                )}
              </p>

              {/* English grid date format */}
              <div className="border-y border-emerald-gold/20 py-3 max-w-sm mx-auto flex items-center justify-center gap-6 font-emerald-sans text-[11px] md:text-xs tracking-[0.2em] text-emerald-gold uppercase">
                <span>{monthName}</span>
                <div className="flex flex-col items-center border-x border-emerald-gold/20 px-5">
                  <span className="text-[9px]">{dayName}</span>
                  <span className="text-2xl md:text-3xl font-emerald-serif font-bold my-1 text-emerald-ivory">{dateDay}</span>
                  <span className="text-[9px]">{dateYear}</span>
                </div>
                <span>AT {timeLabel || '5 PM'}</span>
              </div>

              {/* Time detail */}
              <p className="font-emerald-serif text-xs opacity-80">
                {khmerTimeLabel(timeLabel)} ទៅ / Starting at {timeLabel}
              </p>

              {/* Location */}
              {locationName && (
                <div className="space-y-1">
                  <p className="font-emerald-sans text-emerald-gold text-[11px] uppercase tracking-wider font-bold">
                    📍 {locationName}
                  </p>
                </div>
              )}
            </div>

            <div className="w-1/4 my-4">
              <DiamondSeparator />
            </div>

            {/* Thank you */}
            <p className="font-emerald-sans text-[10px] tracking-[0.25em] text-emerald-gold font-bold uppercase">
              {thankYou}
            </p>
          </EtherealBorderFrame>
        </motion.div>
      </div>
    </section>
  );
};
