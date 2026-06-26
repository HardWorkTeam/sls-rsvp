'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RsvpSettings } from '@/types/invitation';
import { submitRsvp } from '@/lib/rsvp';
import { Butterfly } from './Butterfly';

interface RsvpSectionProps {
  weddingId: string;
  rsvpSettings: RsvpSettings;
  deadlineText?: string;
}

type AttendStatus = 'attending' | 'declined' | '';

interface Wish {
  id: string;
  name: string;
  message: string;
}

const INITIAL_WISHES: Wish[] = [
  { id: 'w-1', name: 'ម៉េង ហួរ', message: 'សូមជូនពរឱ្យអ្នកទាំងពីរស្រលាញ់គ្នារហូតដល់ចាស់កោងខ្នង ជួបតែសុភមង្គល!' },
  { id: 'w-2', name: 'Sok Sopheak', message: 'Wishing you a beautiful wedding day and a lifetime of love and happiness.' },
  { id: 'w-3', name: 'លីណា & វិចិត្រ', message: 'សូមឱ្យជីវិតអាពាហ៍ពិពាហ៍របស់អ្នកទាំងពីរពេញដោយសំណើច និងក្តីស្រឡាញ់ជានិរន្តរ៍!' },
];

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  weddingId,
  rsvpSettings,
  deadlineText,
}) => {
  // RSVP deadline is driven by the real wedding data (rsvpSettings.deadline).
  // We read the calendar parts straight from the ISO string so timezone never
  // shifts the day. The static literal stays ONLY as a preview/no-data fallback.
  const deadlineStr = (rsvpSettings?.deadline ?? '').split('T')[0];
  const [dlY, dlM, dlD] = deadlineStr ? deadlineStr.split('-').map(Number) : [];
  const formattedDeadline = deadlineText
    ?? (dlY && dlM && dlD
      ? `${new Date(Date.UTC(dlY, dlM - 1, dlD, 12)).toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' })} ${dlD}, ${dlY}`
      : 'November 10, 2026');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<AttendStatus>('');
  const [guests, setGuests] = useState<number | string>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomGuests, setIsCustomGuests] = useState(false);
  const [wishes, setWishes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Wishes local state wall
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
    <section className="relative py-28 px-4 md:px-8 bg-transparent overflow-hidden">
      {/* Dynamic light glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#F5E6E3]/15 blur-3xl pointer-events-none" />

      {/* Decorative butterfly ornament */}
      <div className="flex justify-center mb-10 relative">
        <Butterfly size={72} delay={0.3} interactive={true} />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
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

          <div className="space-y-10 relative z-10">
            {/* Title */}
            <div className="text-center space-y-3">
              <p className="font-editorial-serif text-[9px] tracking-[0.5em] text-[#C5A059] uppercase font-bold">
                Kindly RSVP
              </p>
              <h2 className="font-editorial-title text-2xl md:text-3xl text-[#5A121D] font-light leading-tight">
                Confirm Your Presence
              </h2>
              <div className="text-xs text-[#2A2A2A]/70 mt-2 font-medium tracking-wider uppercase">
                Please reply by <span className="text-[#5A121D] font-bold">{formattedDeadline}</span>
              </div>
              <div className="h-[0.5px] w-20 mx-auto mt-4 bg-[#C5A059]/40" />
            </div>

            {/* Form Container with high-end card fill */}
            <div className="rounded-xl p-5 md:p-6 bg-[#FCFBF9] border border-[#C5A059]/15 relative overflow-hidden">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-4 relative z-10"
                >
                  <div className="flex justify-center scale-90">
                    <Butterfly size={60} interactive={true} />
                  </div>
                  <h3 className="font-editorial-serif text-lg text-[#5A121D] font-semibold">
                    Thank You for RSVPing!
                  </h3>
                  <p className="font-sans text-xs text-[#2A2A2A]/75 leading-relaxed px-4">
                    ការឆ្លើយតបរបស់អ្នកត្រូវបានរក្សាទុកដោយជោគជ័យ។ យើងទន្ទឹងរង់ចាំជួបអ្នកក្នុងថ្ងៃមង្គលនេះ!
                  </p>
                  <div className="w-16 h-[0.5px] bg-[#C5A059]/25 mx-auto" />
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setName('');
                      setStatus('');
                      setWishes('');
                      setGuests(1);
                    }}
                    className="font-editorial-serif text-[10px] tracking-[0.3em] uppercase underline text-[#C5A059] hover:text-[#5A121D] transition-colors cursor-pointer"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10 text-left">
                  {/* Full Name input */}
                  <div className="space-y-2">
                    <label className="font-editorial-serif text-[9px] tracking-widest uppercase block font-bold text-[#C5A059]">
                      Full Name / ឈ្មោះពេញ *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rath Sovann"
                      className="w-full bg-white border border-[#C5A059]/20 focus:border-[#5A121D] focus:ring-1 focus:ring-[#5A121D]/20 rounded-lg text-[#2A2A2A] text-xs px-3.5 py-3 outline-none transition-all duration-300 placeholder:text-stone-400 font-sans shadow-xs"
                    />
                  </div>

                  {/* Status button grid */}
                  <div className="space-y-2">
                    <label className="font-editorial-serif text-[9px] tracking-widest uppercase block font-bold text-[#C5A059]">
                      Attendance / វត្តមាន *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['attending', 'declined'] as AttendStatus[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setStatus(s)}
                          className="py-2.5 rounded-lg font-sans text-xs font-semibold transition-all duration-300 cursor-pointer border shadow-xs"
                          style={{
                            borderColor: status === s ? '#5A121D' : 'rgba(197,160,89,0.2)',
                            background: status === s
                              ? s === 'attending'
                                ? 'rgba(90,18,29,0.06)'
                                : 'rgba(186,12,47,0.04)'
                              : '#ffffff',
                            color: status === s ? '#5A121D' : 'rgba(42,42,42,0.6)',
                            transform: status === s ? 'scale(1.02)' : 'scale(1)',
                          }}
                        >
                          {s === 'attending' ? '✓ Attending' : '✗ Declined'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guests Selector */}
                  <AnimatePresence>
                    {status === 'attending' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="space-y-4 overflow-hidden"
                      >
                        <div className="space-y-2">
                          <label className="font-editorial-serif text-[9px] tracking-widest uppercase block font-bold text-[#C5A059]">
                            Guests count
                          </label>
                          {isCustomGuests ? (
                            <div className="relative flex items-center">
                              <input
                                type="number"
                                min="4"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full bg-white border border-[#C5A059]/20 focus:border-[#5A121D] rounded-lg text-[#2A2A2A] text-xs px-3.5 py-3 pr-16 outline-none transition-all duration-300 shadow-xs appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                                placeholder="Enter number of guests"
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCustomGuests(false);
                                  setGuests(1);
                                }}
                                className="absolute right-3 text-[#C5A059] hover:text-[#5A121D] transition-colors text-[10px] uppercase font-bold tracking-widest"
                              >
                                Reset
                              </button>
                            </div>
                          ) : (
                            <div className="relative">
                              <div 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center justify-between cursor-pointer w-full bg-white border border-[#C5A059]/20 hover:border-[#5A121D]/50 rounded-lg text-[#2A2A2A] text-xs px-3.5 py-3 outline-none transition-all duration-300 shadow-xs"
                              >
                                <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                                <motion.svg 
                                  animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                                  className="w-4 h-4 text-[#C5A059]" 
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
                                    className="mt-2 bg-white/95 backdrop-blur-md border border-[#C5A059]/30 rounded-lg shadow-lg z-20 overflow-hidden"
                                  >
                                    {[1, 2, 3].map((n) => (
                                      <div 
                                        key={n}
                                        onClick={() => {
                                          setGuests(n);
                                          setIsDropdownOpen(false);
                                        }}
                                        className="px-4 py-3 cursor-pointer text-[#2A2A2A] hover:bg-[#C5A059]/10 transition-colors border-b border-[#C5A059]/10 text-xs"
                                      >
                                        {n} {n === 1 ? 'Guest' : 'Guests'}
                                      </div>
                                    ))}
                                    <div 
                                      onClick={() => {
                                        setIsCustomGuests(true);
                                        setGuests('');
                                        setIsDropdownOpen(false);
                                      }}
                                      className="px-4 py-3 cursor-pointer text-[#2A2A2A] hover:bg-[#C5A059]/10 transition-colors text-xs"
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

                  {/* Blessings message */}
                  <div className="space-y-2">
                    <label className="font-editorial-serif text-[9px] tracking-widest uppercase block font-bold text-[#C5A059]">
                      Send wishes / ផ្ញើសារជូនពរ
                    </label>
                    <textarea
                      value={wishes}
                      onChange={(e) => setWishes(e.target.value)}
                      placeholder="Write your blessings for the couple here..."
                      rows={3}
                      className="w-full bg-white border border-[#C5A059]/20 focus:border-[#5A121D] rounded-lg text-[#2A2A2A] text-xs px-3.5 py-3 outline-none transition-all duration-300 placeholder:text-stone-400 font-sans resize-none shadow-xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting || !name || !status}
                    className="w-full cursor-pointer py-3.5 rounded-lg text-xs font-editorial-serif uppercase font-semibold tracking-widest text-[#FCFBF9] transition-all relative overflow-hidden bg-[#5A121D] hover:bg-[#7E1E2C] disabled:opacity-50 shadow-md hover:shadow-lg"
                  >
                    {submitting ? 'Sending...' : 'Confirm RSVP'}
                  </button>
                </form>
              )}
            </div>

            {/* Wishes wall block */}
            {wishesList.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-editorial-serif text-[10px] tracking-[0.3em] text-[#C5A059] uppercase text-center font-bold">
                  Wedding Wishes Wall
                </h4>
                <div className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-thin">
                  {wishesList.map((w, index) => (
                    <motion.div
                      key={w.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="p-4 rounded-xl border border-[#C5A059]/15 bg-[#FCFBF9] text-left shadow-xs space-y-1 hover:border-[#5A121D]/35 transition-colors duration-300"
                    >
                      <p className="font-sans text-xs font-bold text-[#5A121D]">{w.name}</p>
                      <p className="font-sans text-[10px] text-[#2A2A2A]/85 italic leading-relaxed">
                        &ldquo;{w.message}&rdquo;
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RsvpSection;
