import React, { useEffect, useState } from 'react';

type time = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
const CountdownTimer = ({
  time,
  action,
}: {
  time: string;
  action: () => void;
}) => {
  const calculateTimeLeft = (): time => {
    const difference = +new Date(time) - +new Date();
    // @ts-ignore
    let timeLeft: time = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<time>(calculateTimeLeft());
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      if (Object.keys(newTimeLeft).length === 0) {
        setEnded(true);
        action();
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const addLeadingZeros = (value: number) => {
    return value < 10 ? `0${value}` : value;
  };

  const { days, hours, minutes, seconds }: time = timeLeft;

  return (
    <>
      {ended ? (
        <span className="text-[#F8A627]">Ended</span>
      ) : (
        <>
          {addLeadingZeros(days) ? (
            <span className="text-[#18CF6A]">
              {days + 'd '}
              {addLeadingZeros(hours) + 'h '}
              {addLeadingZeros(minutes) + 'm '}
              {addLeadingZeros(seconds) + 's'}
            </span>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default CountdownTimer;
