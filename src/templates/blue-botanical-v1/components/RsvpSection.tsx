'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(106,140,178,0.3)',
    borderRadius: '0.75rem',
    color: '#FAF6EF',
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
      style={{ background: 'linear-gradient(180deg, #F5F8FC, #fff)' }}>
      <div className="space-y-4">
        <span style={{ fontSize: '3rem' }}>💙</span>
        <h3 className="font-khmer-title text-xl" style={{ color: '#2C3E56', lineHeight: 1.7 }}>អរគុណសម្រាប់ការឆ្លើយតប!</h3>
        <p className="font-serif-en italic text-sm" style={{ color: '#6A8CB2' }}>Thank you. We look forward to celebrating with you.</p>
        <button onClick={() => { setSuccess(false); setName(guestName ?? ''); setStatus(''); setWishes(''); }}
          className="font-serif-en text-xs tracking-widest underline" style={{ color: '#6A8CB2' }}>Submit another response</button>
      </div>
    </section>
  );

  return (
    <section className="py-20 px-6" style={{ background: 'transparent' }}>
      <div className="max-w-md mx-auto relative z-10 space-y-8">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#9BB0C8' }}>RSVP</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#2C3E56', lineHeight: 1.7 }}>សូមបញ្ជាក់ការចូលរួម</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(106,140,178,0.4), transparent)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="p-6 md:p-8 rounded-xl"
          style={{ background: 'linear-gradient(185deg, rgba(28, 48, 74, 0.94) 0%, rgba(14, 28, 48, 0.98) 100%)', border: '1px solid rgba(106, 140, 178, 0.3)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
        >
        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(232, 201, 122, 0.7)' }}>Full Name *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="ឧ. សុខ វិសាល" style={inputStyle} />
          </div>

          <div className="space-y-1.5">
            <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(232, 201, 122, 0.7)' }}>Attendance *</label>
            <div className="grid grid-cols-2 gap-3">
              {(['attending', 'declined'] as Status[]).map((s) => (
                <button key={s} type="button" onClick={() => setStatus(s)}
                  className="py-3 rounded-xl font-khmer-body text-sm transition-all"
                  style={{
                    border: `1px solid ${status === s ? '#E8C97A' : 'rgba(106,140,178,0.3)'}`,
                    background: status === s ? (s === 'attending' ? 'rgba(232, 201, 122, 0.15)' : 'rgba(200,80,80,0.15)') : 'rgba(255,255,255,0.05)',
                    color: status === s ? '#FAF6EF' : 'rgba(250, 246, 239, 0.5)',
                    fontWeight: status === s ? 700 : 400,
                    transform: status === s ? 'scale(1.02)' : 'scale(1)',
                  }}>
                  {s === 'attending' ? '✓ ចូលរួម' : '✗ មិនអាចចូលរួម'}
                </button>
              ))}
            </div>
          </div>

          {status === 'attending' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
              <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(232, 201, 122, 0.7)' }}>
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
                    className="absolute right-3 text-[#E8C97A] hover:text-[#FAF6EF] transition-colors text-[10px] uppercase font-bold tracking-widest"
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
                    <motion.svg 
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                      className="w-4 h-4 text-[#6A8CB2]" 
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
                        className="mt-2 bg-[#1c304a]/98 backdrop-blur-md border border-[rgba(106,140,178,0.3)] rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.3)] z-20 overflow-hidden"
                      >
                        {[1, 2, 3].map((n) => (
                          <div 
                            key={n}
                            onClick={() => {
                              setGuests(n);
                              setIsDropdownOpen(false);
                            }}
                            className="px-4 py-3 cursor-pointer text-[#FAF6EF] hover:bg-white/5 transition-colors border-b border-[#6A8CB2]/10"
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
                          className="px-4 py-3 cursor-pointer text-[#FAF6EF] hover:bg-white/5 transition-colors"
                        >
                          4+ Guests (Enter number)...
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}

          <div className="space-y-1.5">
            <label className="font-serif-en text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(232, 201, 122, 0.7)' }}>Wishes (Optional)</label>
            <textarea rows={3} value={wishes} onChange={(e) => setWishes(e.target.value)}
              placeholder="សូមជូនពរ..." style={{ ...inputStyle, resize: 'none' }} />
          </div>

          <p className="font-serif-en text-xs text-center" style={{ color: '#9BB0C8' }}>
            Reply by {new Date(rsvpSettings.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <button type="submit" disabled={submitting || !name || !status}
            className="w-full py-3.5 rounded-xl font-khmer-body font-bold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
            style={{
              background: 'linear-gradient(135deg, #E8C97A, #C6A24D)',
              color: '#141c27',
              boxShadow: submitting ? 'none' : '0 4px 20px rgba(232,201,122,0.15)',
            }}>
            {submitting ? 'កំពុងផ្ញើ...' : 'ផ្ញើការឆ្លើយតប · Submit RSVP'}
          </button>
        </form>
        </motion.div>
      </div>
    </section>
  );
};
export default RsvpForm;
