"use client";

import React, { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeRemaining = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;
    return difference > 0 ? difference : 0;
  }, [targetDate]);

  const [timeRemaining, setTimeRemaining] = useState<number>(
    calculateTimeRemaining
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeRemaining]);

  const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);

  const formatDigit = (digit: string) => (
    <div className="w-8 h-14 md:w-12 md:h-20 mx-[2px] overflow-hidden relative">
      <div className="h-1/2 bg-black text-white flex items-center justify-center"></div>
      <div className="h-1/2 bg-[#626262] text-white flex items-center justify-center"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl text-white font-bold">
        {digit}
      </div>
    </div>
  );

  const formatDigitsOnly = (value: number) => {
    const padded = String(value).padStart(2, "0").split("");
    return (
      <div className="flex">
        {padded.map((d, i) => (
          <div key={i}>{formatDigit(d)}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="flex items-center justify-center mb-2 space-x-6 md:space-x-16 text-sm text-orange-400">
        <span className="w-[72px] text-center">Days</span>
        <span className="w-[72px] text-center">Hours</span>
        <span className="w-[72px] text-center">Minutes</span>
        <span className="w-[72px] text-center">Seconds</span>
      </div>

      <div className="flex items-center text-[#626262]">
        {formatDigitsOnly(days)}
        <span className="text-5xl md:text-7xl font-bold mx-2">:</span>
        {formatDigitsOnly(hours)}
        <span className="text-5xl md:text-7xl font-bold mx-2">:</span>
        {formatDigitsOnly(minutes)}
        <span className="text-5xl md:text-7xl font-bold mx-2">:</span>
        {formatDigitsOnly(seconds)}
      </div>
    </div>
  );
};

export default CountdownTimer;
