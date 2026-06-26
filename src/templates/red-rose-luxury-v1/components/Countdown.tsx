'use client';

import React from 'react';
import { Countdown as SharedCountdown } from '@/components/countdown/Countdown';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  return <SharedCountdown targetDate={targetDate} />;
};

export default Countdown;
