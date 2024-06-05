'use client';

import React, { memo } from 'react';
import { m } from 'framer-motion';

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
    />
  );
};

export default memo(ScaleAnimation);
