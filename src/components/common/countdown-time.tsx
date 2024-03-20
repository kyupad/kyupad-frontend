'use client';

import React, { memo, useEffect, useState } from 'react';

const CountdownTime = ({ time }: { time: number }) => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const updateTime = setInterval(() => {
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

      if (difference <= 0) {
        clearInterval(updateTime);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1);

    return () => clearInterval(updateTime);
  }, [time]);

  return (
    <span className="font-bold text-sm sm:text-xl text-[#18CF6A] whitespace-nowrap">
      {days}d : {hours}h : {minutes}m : {seconds}s
    </span>
  );
};

export default memo(CountdownTime);
