'use client';

import React, { useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { RsvpSettings } from '@/types/invitation';
import { submitRsvp } from '@/lib/rsvp';

interface RsvpProps { weddingId: string; rsvpSettings: RsvpSettings; guestName?: string; }

type Status = 'attending' | 'declined' | '';

export const RsvpForm: React.FC<RsvpProps> = ({ weddingId, rsvpSettings, guestName }) => {
  const [name, setName] = useState(guestName ?? '');
  const [status, setStatus] = useState<Status>('');
  const [guests, setGuests] = useState<number | string>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomGuests, setIsCustomGuests] = useState(false);
  const [wishes, setWishes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [, setError] = useState<string | null>(null);
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

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,240,0.7)',
    border: '1px solid rgba(180,120,20,0.3)',
    borderRadius: '0.75rem',
    color: '#3D2200',
    fontFamily: 'var(--font-khmer-body)',
    fontSize: '0.85rem',
    padding: '0.75rem 1rem',
    width: '100%',
    outline: 'none',
  };

  const submit = async (e: React.FormEvent) => {
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

  if (success) return (
    <section className="py-24 px-6 flex flex-col items-center justify-center text-center min-h-[40vh]"
      style={{ background: 'linear-gradient(180deg, rgba(255, 243, 208, 0.85) 0%, rgba(255, 232, 154, 0.85) 100%)', backdropFilter: 'blur(8px)' }}>
      <div className="space-y-4">
        <span style={{ fontSize: '3rem' }}>🌸</span>
        <h3 className="font-khmer-title text-xl" style={{ color: '#5C3A00', lineHeight: 1.7 }}>អរគុណសម្រាប់ការឆ្លើយតប!</h3>
        <p className="font-serif-en italic text-sm" style={{ color: '#8B6014', opacity: 0.8 }}>Thank you. We look forward to celebrating with you.</p>
        <button onClick={() => { setSuccess(false); setName(guestName ?? ''); setStatus(''); setWishes(''); }}
          className="font-serif-en text-xs tracking-widest underline" style={{ color: '#B8860B' }}>
          Submit another response
        </button>
      </div>
    </section>
  );

  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, rgba(255, 243, 208, 0.85) 0%, rgba(255, 248, 232, 0.85) 100%)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#B8860B' }}>RSVP</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#5C3A00', lineHeight: 1.7 }}>សូមបញ្ជាក់ការចូលរួម</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #D4A020, transparent)' }} />
        </div>

        <m.form
          initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          onSubmit={submit} className="space-y-5"
        >
          <div className="space-y-1.5">
            <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase" style={{ color: '#B8860B', opacity: 0.8 }}>Full Name *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="ឧ. សុខ វិសាល" style={inputStyle} />
          </div>

          <div className="space-y-1.5">
            <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase" style={{ color: '#B8860B', opacity: 0.8 }}>Attendance *</label>
            <div className="grid grid-cols-2 gap-3">
              {(['attending', 'declined'] as Status[]).map((s) => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  className="py-3 rounded-xl font-khmer-body text-sm transition-all"
                  style={{
                    border: `1px solid ${status === s ? '#D4A020' : 'rgba(180,120,20,0.25)'}`,
                    background: status === s ? (s === 'attending' ? 'rgba(212,160,32,0.18)' : 'rgba(180,60,60,0.1)') : 'rgba(255,255,240,0.6)',
                    color: status === s ? '#5C3A00' : 'rgba(92,58,0,0.5)',
                    fontWeight: status === s ? 700 : 400,
                    transform: status === s ? 'scale(1.02)' : 'scale(1)',
                  }}>
                  {s === 'attending' ? '✓ ចូលរួម' : '✗ មិនអាចចូលរួម'}
                </button>
              ))}
            </div>
          </div>

          {status === 'attending' && (
            <m.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
              <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase" style={{ color: '#B8860B', opacity: 0.8 }}>
                Number of Guests
              </label>
              {isCustomGuests ? (
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="4"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value === '' ? '' : Number(e.target.value))}
                    style={inputStyle}
                    className="pr-16 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                    placeholder="Enter number of guests"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomGuests(false);
                      setGuests(1);
                    }}
                    className="absolute right-3 text-[#B8860B] hover:text-[#D4A020] transition-colors text-[10px] uppercase font-bold tracking-widest"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between cursor-pointer transition-colors"
                    style={inputStyle}
                  >
                    <span>{guests} {guests === 1 ? 'Guest' : 'Guests'} / នាក់</span>
                    <m.svg 
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                      className="w-4 h-4 text-[#B8860B]" 
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
                        className="mt-2 bg-[#FFF8E8]/95 backdrop-blur-md border border-[#D4A020]/30 rounded-lg shadow-[0_4px_20px_rgba(180,120,20,0.15)] z-20 overflow-hidden"
                      >
                        {[1, 2, 3].map((n) => (
                          <div 
                            key={n}
                            onClick={() => {
                              setGuests(n);
                              setIsDropdownOpen(false);
                            }}
                            className="px-4 py-3 cursor-pointer text-[#3D2200] hover:bg-[#D4A020]/15 transition-colors border-b border-[#D4A020]/15"
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
                          className="px-4 py-3 cursor-pointer text-[#3D2200] hover:bg-[#D4A020]/15 transition-colors"
                        >
                          4+ Guests (Enter number)...
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </m.div>
          )}

          <div className="space-y-1.5">
            <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase" style={{ color: '#B8860B', opacity: 0.8 }}>Wishes</label>
            <textarea rows={3} value={wishes} onChange={(e) => setWishes(e.target.value)}
              placeholder="សូមជូនពរឱ្យអ្នកទាំងពីរ..." style={{ ...inputStyle, resize: 'none' }} />
          </div>

          <p className="font-serif-en text-xs text-center" style={{ color: '#8B6014', opacity: 0.5 }}>
            Reply by {new Date(rsvpSettings.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <button type="submit" disabled={submitting || !name || !status}
            className="w-full py-3.5 rounded-xl font-khmer-body font-bold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
            style={{
              background: 'linear-gradient(135deg, #C97010, #E8A020, #F0B840, #E8A020, #C97010)',
              color: '#fff',
              boxShadow: submitting ? 'none' : '0 4px 20px rgba(200,120,0,0.4)',
              textShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }}>
            {submitting ? 'កំពុងផ្ញើ...' : 'ផ្ញើការឆ្លើយតប · Submit RSVP'}
          </button>
        </m.form>
      </div>
    </section>
  );
};
export default RsvpForm;
