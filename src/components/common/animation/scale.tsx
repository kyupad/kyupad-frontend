'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';

const ScaleAnimation = ({ className }: { className: string }) => {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1.7 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 6,
        type: 'keyframes',
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 2,
      }}
    />
  );
};

export default memo(ScaleAnimation);
