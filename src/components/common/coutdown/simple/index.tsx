'use client';

import React, { memo, useEffect, useState } from 'react';
import { cn } from '@/utils/helpers';

import CountdownItem from './item';

const SimpleCountdown = ({
  time,
  className,
  action,
}: {
  time: number;
  className?: string;
  action?: Function;
}) => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateTime = () => {
      const now = new Date().getTime();

      const difference = time - now;

      const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      const newHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const newMinutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
      animationFrameId = requestAnimationFrame(updateTime);

      if (difference <= 0) {
        action && action();
        cancelAnimationFrame(animationFrameId);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    updateTime();

    return () => cancelAnimationFrame(animationFrameId);
  }, [action, time]);

  return (
    <div
      className={cn(
        'flex font-bold text-sm sm:text-xl text-[#18CF6A] whitespace-nowrap gap-1',
        className,
      )}
    >
      <CountdownItem num={days} text="d" /> :
      <CountdownItem num={hours} text="h" /> :
      <CountdownItem num={minutes} text="m" /> :
      <CountdownItem num={seconds} text="s" />
    </div>
  );
};

export default memo(SimpleCountdown);
