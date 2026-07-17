'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';

interface CountdownProps {
  targetDate: string; // ISO string
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        ended: true,
      };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          ended: false,
        };
      }

      setTimeLeft(newTimeLeft);
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    // Avoid layout shifting or hydration mismatch by rendering a static placeholder frame during SSR
    return (
      <div className="flex justify-center items-center gap-4 text-center select-none opacity-50">
        {['ថ្ងៃ', 'ម៉ោង', 'នាទី', 'វិនាទី'].map((label, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-3xl font-bold min-w-[50px]">-</span>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.ended) {
    return (
      <div className="text-center font-semibold text-lg text-amber-700 animate-pulse">
        ថ្ងៃមង្គលការបានមកដល់ហើយ! 🎉
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center gap-4 text-center select-none">
      {[
        { value: timeLeft.days, labelKh: 'ថ្ងៃ', labelEn: 'Days' },
        { value: timeLeft.hours, labelKh: 'ម៉ោង', labelEn: 'Hrs' },
        { value: timeLeft.minutes, labelKh: 'នាទី', labelEn: 'Mins' },
        { value: timeLeft.seconds, labelKh: 'វិនាទី', labelEn: 'Secs' },
      ].map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-amber-50/70 border border-amber-200/50 backdrop-blur-sm rounded-lg p-2.5 min-w-[64px] shadow-sm">
            <span className="text-3xl font-extrabold text-amber-800 tracking-tight">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-700/80 mt-1.5">
            {item.labelKh}
          </span>
        </div>
      ))}
    </div>
  );
};
export default Countdown;
