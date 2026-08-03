'use client';

import React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { RsvpSettings } from '@/types/invitation';
import { useRsvpForm, type RsvpAttendStatus } from '@/lib/useRsvpForm';
import { EtherealBorderFrame, ThinGoldRule } from './BotanicalAssets';

interface RsvpProps {
  rsvpSettings: RsvpSettings;
  weddingId: string;
  guestName?: string;
}

type Status = RsvpAttendStatus;

export const RsvpSection: React.FC<RsvpProps> = ({ rsvpSettings, weddingId, guestName }) => {
  const {
    name, setName,
    status, setStatus,
    guests, setGuests,
    isDropdownOpen, setIsDropdownOpen,
    isCustomGuests, setIsCustomGuests,
    wishes, setWishes,
    submitting, success,
    dropdownRef, submit, reset,
  } = useRsvpForm(weddingId, guestName);

  const deadlineDate = new Date(rsvpSettings.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid rgba(201, 168, 76, 0.4)',
    borderRadius: '0.5rem',
    color: 'var(--ee-ivory)',
    fontFamily: 'var(--font-emerald-serif)',
    fontSize: '1rem',
    padding: '0.75rem 1rem',
    width: '100%',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  if (success) {
    return (
      <section className="relative w-full py-20 bg-transparent overflow-hidden px-6">
        <div className="max-w-2xl mx-auto space-y-10">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full mt-10"
          >
            <EtherealBorderFrame className="shadow-[0_8px_30px_rgba(201,168,76,0.1)] py-16 px-6 text-center">
              <div className="space-y-6">
                <span className="text-4xl">🤍</span>
                <h3 className="font-emerald-serif text-2xl text-emerald-gradient leading-relaxed">
                  អរគុណសម្រាប់ការឆ្លើយតប!
                </h3>
                <p className="font-emerald-serif italic text-sm text-emerald-ivory/80 max-w-sm mx-auto">
                  Thank you. We look forward to celebrating with you.
                </p>
                <div className="w-16 mx-auto my-6">
                  <ThinGoldRule />
                </div>
                <button 
                  onClick={reset}
                  className="font-emerald-sans text-[10px] tracking-widest uppercase text-emerald-gold hover:text-emerald-ivory transition-colors underline"
                >
                  Submit another response
                </button>
              </div>
            </EtherealBorderFrame>
          </m.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full py-20 bg-transparent overflow-hidden px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <p className="font-emerald-sans text-[10px] tracking-[0.35em] uppercase text-emerald-gold">
            RSVP
          </p>
          <h2 className="font-emerald-serif text-3xl md:text-4xl text-emerald-gradient leading-relaxed">
            សូមបញ្ជាក់ការចូលរួម
          </h2>
          <div className="w-24 mx-auto mt-4">
            <ThinGoldRule />
          </div>
        </div>

        {/* Form Frame Wrapper */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mt-10"
        >
          <EtherealBorderFrame className="shadow-[0_8px_30px_rgba(201,168,76,0.1)] py-10 px-6 md:px-12">
            
            <form onSubmit={submit} className="space-y-6">
              
              <div className="space-y-2 text-left">
                <label className="font-emerald-sans text-[9px] tracking-[0.3em] uppercase text-emerald-gold font-bold">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="ឧ. សុខ វិសាល / John Doe" 
                  style={inputStyle} 
                  className="focus:border-emerald-gold focus:bg-white/60"
                />
              </div>

              <div className="space-y-2 text-left">
                <label className="font-emerald-sans text-[9px] tracking-[0.3em] uppercase text-emerald-gold font-bold">
                  Attendance *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {(['attending', 'declined'] as Status[]).map((s) => (
                    <button 
                      key={s} 
                      type="button" 
                      onClick={() => setStatus(s)}
                      className="py-3 rounded-lg font-emerald-sans tracking-widest text-[10px] uppercase transition-all duration-300"
                      style={{
                        border: `1px solid ${status === s ? 'var(--ee-gold)' : 'rgba(201,168,76,0.2)'}`,
                        background: status === s 
                          ? (s === 'attending' ? 'rgba(201,168,76,0.15)' : 'rgba(100,20,20,0.05)') 
                          : 'rgba(255,255,255,0.3)',
                        color: status === s ? 'var(--ee-ivory)' : 'var(--ee-gray-warm)',
                        fontWeight: status === s ? 800 : 400,
                        transform: status === s ? 'scale(1.02)' : 'scale(1)',
                      }}>
                      {s === 'attending' ? '✓ Joyfully Accept' : '✗ Regretfully Decline'}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {status === 'attending' && (
                  <m.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 text-left overflow-hidden"
                  >
                    <label className="font-emerald-sans text-[9px] tracking-[0.3em] uppercase text-emerald-gold font-bold">
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
                          className="focus:border-emerald-gold focus:bg-white/60 pr-16 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                          placeholder="Enter number of guests"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustomGuests(false);
                            setGuests(1);
                          }}
                          className="absolute right-3 text-emerald-gold hover:text-emerald-ivory transition-colors text-[10px] uppercase font-bold tracking-widest"
                        >
                          Reset
                        </button>
                      </div>
                    ) : (
                      <div className="relative" ref={dropdownRef}>
                        <div 
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="flex items-center justify-between cursor-pointer focus:border-emerald-gold hover:bg-white/60 transition-colors"
                          style={inputStyle}
                        >
                          <span>{guests} {guests === 1 ? 'Guest' : 'Guests'} / នាក់</span>
                          <m.svg 
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }} 
                            className="w-4 h-4 text-emerald-gold" 
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
                              className="mt-2 bg-white/95 backdrop-blur-md border border-emerald-gold/30 rounded-lg shadow-[0_4px_20px_rgba(201,168,76,0.15)] z-20 overflow-hidden"
                            >
                              {[1, 2, 3].map((n) => (
                                <div 
                                  key={n}
                                  onClick={() => {
                                    setGuests(n);
                                    setIsDropdownOpen(false);
                                  }}
                                  className="px-4 py-3 cursor-pointer font-emerald-serif text-[#1e4529] hover:bg-emerald-gold/10 transition-colors border-b border-emerald-gold/10"
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
                                className="px-4 py-3 cursor-pointer font-emerald-serif text-[#1e4529] hover:bg-emerald-gold/10 transition-colors"
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
              </AnimatePresence>

              <div className="space-y-2 text-left">
                <label className="font-emerald-sans text-[9px] tracking-[0.3em] uppercase text-emerald-gold font-bold">
                  Wishes (Optional)
                </label>
                <textarea 
                  rows={3} 
                  value={wishes} 
                  onChange={(e) => setWishes(e.target.value)}
                  placeholder="សូមជូនពរឱ្យអ្នកទាំងពីរ..." 
                  style={{ ...inputStyle, resize: 'none' }} 
                  className="focus:border-emerald-gold focus:bg-white/60"
                />
              </div>

              <div className="pt-4 pb-2">
                <p className="font-emerald-serif italic text-xs text-center text-emerald-ivory/70">
                  Kindly reply by {deadlineDate}
                </p>
              </div>

              <button 
                type="submit" 
                disabled={submitting || !name || !status}
                className="w-full py-4 rounded-lg font-emerald-sans tracking-[0.2em] uppercase font-bold text-[10px] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, #1e4529 0%, #468c59 50%, #12301a 100%)',
                  color: '#ffffff',
                  boxShadow: submitting ? 'none' : '0 4px 15px rgba(30, 69, 41, 0.3)',
                }}>
                {submitting ? 'SENDING...' : 'SEND MY RSVP'}
              </button>

            </form>

          </EtherealBorderFrame>
        </m.div>
      </div>
    </section>
  );
};
