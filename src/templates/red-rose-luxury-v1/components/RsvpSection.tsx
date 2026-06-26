'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RsvpSettings } from '@/types/invitation';
import { submitRsvp } from '@/lib/rsvp';
import { SectionHeading, DiamondDivider, LotusOrnament, DrawBorderFrame } from '../../royal-khmer-v1/components/KhmerOrnaments';

interface RsvpFormProps {
  weddingId: string;
  rsvpSettings: RsvpSettings;
}

type AttendStatus = 'attending' | 'declined' | '';

interface Wish {
  id: string;
  name: string;
  message: string;
}

const INITIAL_WISHES: Wish[] = [
  { id: 'w-1', name: 'ចាន់ សុភ័ក្រ', message: 'សូមជូនពរឱ្យអ្នកទាំងពីរស្រលាញ់គ្នារហូតដល់ចាស់កោងខ្នង ជួបតែសុភមង្គល!' },
  { id: 'w-2', name: 'លី ម៉ាណែត', message: 'Happy Wedding Day! Wish you a lifetime of love and happiness.' },
  { id: 'w-3', name: 'សុខ គង់', message: 'សូមឱ្យជីវិតអាពាហ៍ពិពាហ៍របស់អ្នកទាំងពីរពេញដោយសំណើច និងភាពរីករាយ!' },
  { id: 'w-4', name: 'គង់ ស្រីលក្ខ', message: 'សូមអបអរសាទរ! ជូនពរគូស្វាមីភរិយាថ្មីមានទ្រព្យសម្បត្តិហូរហៀរ និងសុខសន្តិភាពក្នុងគ្រួសារ។' },
  { id: 'w-5', name: 'ណារ៉ុង វិចិត្រ', message: 'Congratulations on your special day! Best wishes for a bright future together.' }
];

export const RsvpForm: React.FC<RsvpFormProps> = ({ weddingId, rsvpSettings }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<AttendStatus>('');
  const [guests, setGuests] = useState<number | string>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomGuests, setIsCustomGuests] = useState(false);
  const [wishes, setWishes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Wishes live state wall
  const [wishesList, setWishesList] = useState<Wish[]>(INITIAL_WISHES);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !status) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitRsvp(weddingId, { name, status, guests: Number(guests) || 1, wishes });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
      setSubmitting(false);
      return;
    }

    // Add wishes to live board if written
    if (wishes.trim()) {
      const newWish: Wish = {
        id: `w-user-${Date.now()}`,
        name: name,
        message: wishes,
      };
      setWishesList((prev) => [newWish, ...prev]);
    }

    setSubmitting(false);
    setSuccess(true);
  };

  return (
    <section
      className="rk-section"
      style={{ background: 'linear-gradient(180deg, #260206 0%, #3D0207 100%)' }}
    >
      <div className="max-w-lg mx-auto space-y-10">
        <SectionHeading
          en="RSVP &amp; Wishes"
          kh="សូមបញ្ជាក់ការចូលរួម និងពាក្យជូនពរ"
          sub="Kindly reply by the deadline and leave a blessing"
        />

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-tilt-hover w-full"
          >
            <DrawBorderFrame className="p-8 text-center flex flex-col items-center justify-center gap-6" style={{ background: 'rgba(92, 3, 12, 0.65)', borderColor: 'rgba(232, 201, 122, 0.2)' }}>
              <div className="animate-subtle-float flex justify-center">
                <LotusOrnament size={55} color="#E8C97A" />
              </div>
              <h3 className="font-khmer-title text-base text-[#E8C97A]">
                អរគុណសម្រាប់ការឆ្លើយតបរបស់អ្នក!
              </h3>
              <p className="font-serif-en italic text-xs text-[#FAF6EF]/75">
                Thank you for your response. We look forward to celebrating with you.
              </p>
              <DiamondDivider color="#E8C97A" />
              <button
                onClick={() => { setSuccess(false); setName(''); setStatus(''); setWishes(''); setGuests(1); }}
                className="font-serif-en text-[11px] tracking-widest underline text-[#E8C97A] cursor-pointer hover:text-white"
              >
                Submit another response
              </button>
            </DrawBorderFrame>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="card-tilt-hover transition-all w-full"
          >
            <DrawBorderFrame className="p-6 md:p-8 space-y-6 w-full" style={{ background: 'rgba(92, 3, 12, 0.65)', borderColor: 'rgba(232, 201, 122, 0.2)' }}>
              {/* Name */}
              <div className="space-y-2">
                <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase block font-bold text-[#E8C97A]">
                  Full Name / នាមខ្លួន *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ឧ. សូ ផាណារ័ត្ន"
                  className="w-full bg-[#FAF6EF]/[0.05] border border-[#E8C97A]/25 focus:border-[#E8C97A] focus:ring-1 focus:ring-[#E8C97A]/30 rounded-xl text-[#FAF6EF] text-xs px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-stone-500 font-khmer-body"
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase block font-bold text-[#E8C97A]">
                  Attendance / ការចូលរួម *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['attending', 'declined'] as AttendStatus[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(s)}
                      className="py-3 rounded-xl font-khmer-body text-xs font-bold transition-all cursor-pointer"
                      style={{
                        border: `1px solid ${status === s ? '#E8C97A' : 'rgba(232,201,122,0.2)'}`,
                        background: status === s
                          ? s === 'attending' ? 'rgba(232,201,122,0.2)' : 'rgba(186,12,47,0.3)'
                          : 'rgba(250,246,239,0.04)',
                        color: status === s ? '#FAF6EF' : 'rgba(250,246,239,0.5)',
                        transform: status === s ? 'scale(1.02)' : 'scale(1)',
                      }}
                    >
                      {s === 'attending' ? '✓ ចូលរួម' : '✗ មិនអាចចូលរួម'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count / Details */}
              <AnimatePresence>
                {status === 'attending' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="space-y-2">
                      <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase block font-bold text-[#E8C97A]">
                        Number of Guests
                      </label>
                      {isCustomGuests ? (
                        <div className="relative flex items-center">
                          <input
                            type="number"
                            min="4"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value === '' ? '' : Number(e.target.value))}
                            className="w-full bg-[#FAF6EF]/[0.05] border border-[#E8C97A]/25 focus:border-[#E8C97A] rounded-xl text-[#FAF6EF] text-xs px-4 py-3.5 pr-16 outline-none transition-all duration-300 font-khmer-body appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                            placeholder="Enter number of guests"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsCustomGuests(false);
                              setGuests(1);
                            }}
                            className="absolute right-3 text-[#E8C97A] hover:text-[#FAF6EF] transition-colors text-[10px] uppercase font-bold tracking-widest"
                          >
                            Reset
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <div 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center justify-between cursor-pointer w-full bg-[#FAF6EF]/[0.05] border border-[#E8C97A]/25 hover:border-[#E8C97A]/50 rounded-xl text-[#FAF6EF] text-xs px-4 py-3.5 outline-none transition-all duration-300 font-khmer-body"
                          >
                            <span>{guests} {guests === 1 ? 'Guest' : 'Guests'} / នាក់</span>
                            <motion.svg 
                              animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                              className="w-4 h-4 text-[#E8C97A]" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                          </div>

                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 bg-[#5C030C]/95 backdrop-blur-md border border-[#E8C97A]/30 rounded-xl shadow-[0_4px_20px_rgba(232,201,122,0.15)] z-20 overflow-hidden"
                              >
                                {[1, 2, 3].map((n) => (
                                  <div 
                                    key={n}
                                    onClick={() => {
                                      setGuests(n);
                                      setIsDropdownOpen(false);
                                    }}
                                    className="px-4 py-3.5 cursor-pointer text-[#FAF6EF] hover:bg-[#E8C97A]/15 transition-colors border-b border-[#E8C97A]/15 text-xs font-khmer-body"
                                  >
                                    {n} {n === 1 ? 'Guest' : 'Guests'} / នាក់
                                  </div>
                                ))}
                                <div 
                                  onClick={() => {
                                    setIsCustomGuests(true);
                                    setGuests('');
                                    setIsDropdownOpen(false);
                                  }}
                                  className="px-4 py-3.5 cursor-pointer text-[#FAF6EF] hover:bg-[#E8C97A]/15 transition-colors text-xs font-khmer-body"
                                >
                                  4+ Guests (Enter number)...
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wishes */}
              <div className="space-y-2">
                <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase block font-bold text-[#E8C97A]">
                  Wishes for the Couple / ពាក្យជូនពរ
                </label>
                <textarea
                  rows={4}
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="សូមជូនពរឱ្យអ្នកទាំងពីរ..."
                  className="w-full bg-[#FAF6EF]/[0.05] border border-[#E8C97A]/25 focus:border-[#E8C97A] rounded-xl text-[#FAF6EF] text-xs px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-stone-500 font-khmer-body resize-none"
                />
              </div>

              {/* Deadline */}
              <p className="font-serif-en text-[11px] text-center text-[#FAF6EF]/50">
                Please reply by{' '}
                {new Date(rsvpSettings.deadline).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting || !name || !status}
                className="relative w-full py-3.5 rounded-xl font-khmer-body font-bold text-xs transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #8B6914, #C9A84C, #FFE5A3, #C9A84C, #8B6914)',
                  color: '#5C030C',
                  letterSpacing: '0.06em',
                  boxShadow: submitting ? 'none' : '0 6px 20px rgba(232,201,122,0.25)',
                }}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin text-sm">◌</span>
                    <span>កំពុងផ្ញើ... / Submitting...</span>
                  </span>
                ) : (
                  'ផ្ញើការឆ្លើយតប · Submit RSVP'
                )}
              </button>
            </DrawBorderFrame>
          </motion.form>
        )}

        {/* ─── LIVE BLESSINGS / WISHES WALL MARQUEE ─── */}
        <div className="space-y-4 pt-6">
          <div className="text-center space-y-1">
            <h4 className="font-khmer-title text-sm text-[#E8C97A]">
              ពាក្យជូនពរផ្ទាល់
            </h4>
            <p className="font-serif-en text-[9px] tracking-widest text-[#FAF6EF]/50 uppercase">
              Live blessings wall
            </p>
          </div>

          <div
            className="relative h-[250px] overflow-hidden rounded-2xl p-4 border border-[#E8C97A]/25"
            style={{
              background: 'linear-gradient(180deg, rgba(92, 3, 12, 0.4) 0%, rgba(38, 2, 6, 0.6) 100%)',
            }}
          >
            {/* Soft vertical fade borders */}
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#260206] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#3D0207] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex flex-col gap-3 py-2">
              {/* Render the lists twice so marquee scrolls infinitely without gaps */}
              {[...wishesList, ...wishesList].map((wish, index) => (
                <div
                  key={`${wish.id}-${index}`}
                  className="p-3 border border-[#E8C97A]/12 rounded-xl space-y-1"
                  style={{
                    background: 'rgba(92, 3, 12, 0.5)',
                  }}
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-khmer-title text-[#E8C97A]">{wish.name}</span>
                    <span className="text-[#E8C97A]/60 flex items-center gap-1">
                      <span className="text-[7px]">✦</span> ជូនពរ
                    </span>
                  </div>
                  <p className="font-khmer-body text-xs text-[#FAF6EF]/90 italic leading-relaxed">
                    &quot;{wish.message}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RsvpForm;
