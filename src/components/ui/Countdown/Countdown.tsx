'use client';

import React, { useState, useEffect } from 'react';
import data from '@/data/common.json';
import { getFormattedTime } from '@/utils';
import { CountdownProps } from './types';

export const Countdown: React.FC<CountdownProps> = ({ className }) => {
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    let offerTime = Date.now() + data.countdown * 60 * 60 * 1000 - 1;
    if (typeof window !== 'undefined' && localStorage.getItem('timer')) {
      offerTime = Number(localStorage.getItem('timer'));
    } else {
      localStorage.setItem('timer', JSON.stringify(offerTime));
    }

    const interval = setInterval(() => {
      setTime(offerTime - Date.now());
      if (offerTime <= Date.now()) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (time === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`text-5xl text-slate-300 ${className}`}>
      {getFormattedTime(time)}
    </div>
  );
};
