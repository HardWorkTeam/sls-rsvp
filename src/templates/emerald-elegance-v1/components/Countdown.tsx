import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { DiamondSeparator, ThinGoldRule } from './BotanicalAssets';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function TimeUnit({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  return (
    <m.div
      className="flex flex-col items-center justify-center w-[70px]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <AnimatePresence mode="popLayout">
        <m.span
          key={value}
          initial={{ y: -10, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="font-emerald-serif text-4xl sm:text-5xl font-bold text-emerald-gradient"
        >
          {String(value).padStart(2, '0')}
        </m.span>
      </AnimatePresence>
      <span className="font-emerald-sans text-[9px] tracking-[0.2em] text-emerald-ivory mt-2 uppercase font-semibold">
        {label}
      </span>
    </m.div>
  );
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [targetDate]);

  if (!mounted) return null;

  return (
    <m.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      className="relative w-full py-12 bg-white/40 backdrop-blur-md border-y border-emerald-gold/20 flex flex-col items-center"
    >
      <p className="font-emerald-sans text-[9px] tracking-[0.3em] text-emerald-gold mb-8 text-center uppercase">
        COUNTING DOWN TO THE BIG DAY
      </p>

      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
        <TimeUnit label="DAYS" value={timeLeft.days} delay={0.1} />
        <DiamondSeparator className="text-emerald-gold" />
        <TimeUnit label="HOURS" value={timeLeft.hours} delay={0.2} />
        <DiamondSeparator className="text-emerald-gold" />
        <TimeUnit label="MINUTES" value={timeLeft.minutes} delay={0.3} />
        <DiamondSeparator className="text-emerald-gold" />
        <TimeUnit label="SECONDS" value={timeLeft.seconds} delay={0.4} />
      </div>

      <ThinGoldRule width="60px" />
    </m.section>
  );
};
