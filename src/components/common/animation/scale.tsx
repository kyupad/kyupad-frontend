'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';
import lightbluecloud from 'public/images/home/kyupad-bg-home.png';

const ScaleAnimation = ({ className }: { className: string }) => {
  return (
    <m.div
      className={className}
      initial={{ scale: 1.7 }}
      animate={{ scale: 1 }}
      style={{ willChange: 'transform' }}
      transition={{
        duration: 6,
        type: 'keyframes',
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 2,
        ease: 'linear',
      }}
    >
      <Image
        src={lightbluecloud}
        alt="kyupad cloud"
        fill
        className="w-full h-auto  absolute object-cover top-0 left-0"
      />
    </m.div>
  );
};

export default memo(ScaleAnimation);
