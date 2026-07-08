'use client';

import React, { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { RsvpSettings } from '@/types/invitation';
import { submitRsvp } from '@/lib/rsvp';
import { SectionHeading, DiamondDivider, LotusOrnament, DrawBorderFrame } from './KhmerOrnaments';

interface RsvpFormProps {
  weddingId: string;
  rsvpSettings: RsvpSettings;
  guestName?: string;
}

type AttendStatus = 'attending' | 'declined' | '';

export const RsvpForm: React.FC<RsvpFormProps> = ({ weddingId, rsvpSettings, guestName }) => {
  const [name, setName] = useState(guestName ?? '');
  const [status, setStatus] = useState<AttendStatus>('');
  const [guests, setGuests] = useState<number | string>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomGuests, setIsCustomGuests] = useState(false);
  const [wishes, setWishes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the guest-count dropdown when tapping anywhere outside it.
  useEffect(() => {
    if (!isDropdownOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isDropdownOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !status) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitRsvp(weddingId, { name, status, guests: Number(guests) || 1, wishes });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'មិនអាចផ្ញើបានទេ សូមព្យាយាមម្តងទៀត / Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <section
        className="rk-section flex flex-col items-center justify-center text-center"
        style={{ background: 'linear-gradient(180deg, #1a0e08 0%, #221208 100%)', minHeight: '40vh' }}
      >
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 max-w-sm px-6"
        >
          <div className="animate-subtle-float flex justify-center">
            <LotusOrnament size={60} />
          </div>
          <h3
            className="font-khmer-title text-lg"
            style={{ color: 'var(--rk-gold-light)' }}
          >
            អរគុណសម្រាប់ការឆ្លើយតប!
          </h3>
          <p className="font-serif-en italic text-xs" style={{ color: 'var(--rk-ivory)', opacity: 0.65 }}>
            Thank you for your response. We look forward to celebrating with you.
          </p>
          <DiamondDivider />
          <button
            onClick={() => { setSuccess(false); setName(guestName ?? ''); setStatus(''); setWishes(''); setGuests(1); }}
            className="font-serif-en text-[11px] tracking-widest underline hover:text-gold-light cursor-pointer"
            style={{ color: 'var(--rk-gold)' }}
          >
            Submit another response
          </button>
        </m.div>
      </section>
    );
  }

  return (
    <section
      className="rk-section"
      style={{ background: 'linear-gradient(180deg, #1f100a 0%, #2C1810 100%)' }}
    >
      <div className="max-w-lg mx-auto space-y-8">
        <SectionHeading
          en="RSVP"
          kh="សូមបញ្ជាក់ការចូលរួម"
          sub="Kindly reply by the deadline"
        />

        <m.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="card-tilt-hover transition-all w-full"
        >
          <DrawBorderFrame className="p-6 md:p-8 space-y-6 w-full">
          {/* Name */}
          <div className="space-y-2">
            <label
              className="font-serif-en text-[10px] tracking-[0.3em] uppercase block font-semibold"
              style={{ color: 'var(--rk-gold)', opacity: 0.85 }}
            >
              Full Name / នាមខ្លួន *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ឧ. សុខ វិសាល"
              className="w-full bg-[#faf6ef]/[0.04] border border-[#C9A84C]/25 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/35 rounded-xl text-[#FAF6EF] text-xs px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-stone-500 font-khmer-body"
            />
          </div>

          {/* Attendance choice */}
          <div className="space-y-2">
            <label
              className="font-serif-en text-[10px] tracking-[0.3em] uppercase block font-semibold"
              style={{ color: 'var(--rk-gold)', opacity: 0.85 }}
            >
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
                    border: `1px solid ${status === s ? 'var(--rk-gold)' : 'rgba(201,168,76,0.2)'}`,
                    background: status === s
                      ? s === 'attending' ? 'rgba(201,168,76,0.2)' : 'rgba(122,28,28,0.3)'
                      : 'rgba(250,246,239,0.04)',
                    color: status === s ? 'var(--rk-gold-light)' : 'rgba(250,246,239,0.5)',
                    transform: status === s ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  {s === 'attending' ? '✓ ចូលរួម' : '✗ មិនអាចចូលរួម'}
                </button>
              ))}
            </div>
          </div>

          {/* Guests count — only when attending */}
          <AnimatePresence>
            {status === 'attending' && (
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 overflow-hidden"
              >
                <div className="space-y-2">
                  <label
                    className="font-serif-en text-[10px] tracking-[0.3em] uppercase block font-semibold"
                    style={{ color: 'var(--rk-gold)', opacity: 0.85 }}
                  >
                    Number of Guests
                  </label>
                  {isCustomGuests ? (
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="4"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full bg-[#faf6ef]/[0.04] border border-[#C9A84C]/25 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/35 rounded-xl text-[#FAF6EF] text-xs px-4 py-3.5 pr-16 outline-none transition-all duration-300 font-khmer-body appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                        placeholder="Enter number of guests"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomGuests(false);
                          setGuests(1);
                        }}
                        className="absolute right-3 hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest"
                        style={{ color: 'var(--rk-gold)' }}
                      >
                        Reset
                      </button>
                    </div>
                  ) : (
                    <div className="relative" ref={dropdownRef}>
                      <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between cursor-pointer w-full bg-[#faf6ef]/[0.04] border border-[#C9A84C]/25 hover:border-[#C9A84C]/50 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/35 rounded-xl text-[#FAF6EF] text-xs px-4 py-3.5 outline-none transition-all duration-300 font-khmer-body"
                      >
                        <span>{guests} {guests === 1 ? 'Guest' : 'Guests'} / នាក់</span>
                        <m.svg 
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                          className="w-4 h-4" 
                          style={{ color: 'var(--rk-gold)' }}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </m.svg>
                      </div>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <m.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 bg-[#2C1810]/95 backdrop-blur-md border border-[#C9A84C]/30 rounded-xl shadow-[0_4px_20px_rgba(201,168,76,0.15)] z-20 overflow-hidden"
                          >
                            {[1, 2, 3].map((n) => (
                              <div 
                                key={n}
                                onClick={() => {
                                  setGuests(n);
                                  setIsDropdownOpen(false);
                                }}
                                className="px-4 py-3.5 cursor-pointer text-[#FAF6EF] hover:bg-[#C9A84C]/15 transition-colors border-b border-[#C9A84C]/15 text-xs font-khmer-body"
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
                              className="px-4 py-3.5 cursor-pointer text-[#FAF6EF] hover:bg-[#C9A84C]/15 transition-colors text-xs font-khmer-body"
                            >
                              4+ Guests (Enter number)...
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
                </m.div>
            )}
          </AnimatePresence>

          {/* Wishes */}
          <div className="space-y-2">
            <label
              className="font-serif-en text-[10px] tracking-[0.3em] uppercase block font-semibold"
              style={{ color: 'var(--rk-gold)', opacity: 0.85 }}
            >
              Wishes for the Couple / ពាក្យជូនពរ
            </label>
            <textarea
              rows={4}
              value={wishes}
              onChange={(e) => setWishes(e.target.value)}
              placeholder="សូមជូនពរឱ្យអ្នកទាំងពីរ..."
              className="w-full bg-[#faf6ef]/[0.04] border border-[#C9A84C]/25 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C]/35 rounded-xl text-[#FAF6EF] text-xs px-4 py-3.5 outline-none transition-all duration-300 placeholder:text-stone-500 font-khmer-body resize-none"
            />
          </div>

          {/* Deadline */}
          <p
            className="font-serif-en text-[11px] text-center"
            style={{ color: 'var(--rk-ivory)', opacity: 0.5 }}
          >
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
              background: 'linear-gradient(135deg, #8B6914, #C9A84C, #E8C97A, #C9A84C, #8B6914)',
              color: 'var(--rk-brown)',
              letterSpacing: '0.06em',
              boxShadow: submitting ? 'none' : '0 6px 20px rgba(201,168,76,0.25)',
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

          {error && (
            <p className="font-serif-en text-xs text-center text-red-400 mt-2">{error}</p>
          )}
          </DrawBorderFrame>
        </m.form>
      </div>
    </section>
  );
};

export default RsvpForm;
