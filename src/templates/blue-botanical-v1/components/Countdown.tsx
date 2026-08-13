'use client';

import React from 'react';
import { Countdown as SharedCountdown } from '@/components/countdown/Countdown';

interface CountdownProps {
  targetDate: string;
  isCompleted?: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, isCompleted }) => {
  return <SharedCountdown targetDate={targetDate} isCompleted={isCompleted} />;
};

export default Countdown;
