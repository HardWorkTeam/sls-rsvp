'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';

interface CountdownProps {
  targetDate: string;
  isCompleted?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, isCompleted }) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: false });

  useEffect(() => {
    const calc = () => {
      const diff = +new Date(targetDate) - +new Date();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        ended:   false,
      });
    };
    const timer = setInterval(calc, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days,    labelKh: 'ថ្ងៃ',    labelEn: 'DAYS' },
    { value: timeLeft.hours,   labelKh: 'ម៉ោង',   labelEn: 'HRS'  },
    { value: timeLeft.minutes, labelKh: 'នាទី',   labelEn: 'MINS' },
    { value: timeLeft.seconds, labelKh: 'វិនាទី', labelEn: 'SECS' },
  ];

  if (!mounted) {
    return (
      <div className="flex justify-center gap-4 opacity-30 select-none">
        {units.map((u, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="w-[66px] h-[66px] rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <span className="font-serif-en text-2xl font-light" style={{ color: 'var(--rk-gold)' }}>--</span>
            </div>
            <span className="font-serif-en text-[9px] tracking-widest" style={{ color: 'var(--rk-gold)', opacity: 0.5 }}>{u.labelEn}</span>
          </div>
        ))}
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="space-y-3 text-center">
        <p className="font-khmer-title text-lg animate-pulse-glow" style={{ color: 'var(--rk-gold-light)' }}>
          ពិធីមង្គលការបានបញ្ចប់ 🎉
        </p>
        <p className="font-serif-en text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--rk-gold)', opacity: 0.7 }}>
          The wedding has been celebrated
        </p>
      </div>
    );
  }

  if (timeLeft.ended) {
    return (
      <p className="font-khmer-title text-lg text-center animate-pulse-glow" style={{ color: 'var(--rk-gold-light)' }}>
        ថ្ងៃមង្គលការបានមកដល់ហើយ! 🎉
      </p>
    );
  }

  return (
    <div className="flex justify-center gap-3 select-none" aria-label="Wedding countdown">
      {units.map((unit, index) => (
        <div key={index} className="flex flex-col items-center gap-1.5">
          <div
            className="w-[66px] h-[66px] rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.3)',
              boxShadow: '0 0 20px rgba(201,168,76,0.1) inset',
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 70%)',
              }}
            />
            <span
              className="font-serif-en text-2xl font-light relative z-10"
              style={{ color: 'var(--rk-gold-light)', letterSpacing: '-0.02em' }}
            >
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span
            className="font-serif-en text-[9px] tracking-[0.2em]"
            style={{ color: 'var(--rk-gold)', opacity: 0.55 }}
          >
            {unit.labelEn}
          </span>
          <span
            className="font-khmer-body text-[10px]"
            style={{ color: 'var(--rk-ivory)', opacity: 0.4 }}
          >
            {unit.labelKh}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
