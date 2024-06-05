'use client';

import React, { memo } from 'react';
import { m } from 'framer-motion';

const BottomTopAnimation = ({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5, delay: delay ?? 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </m.div>
  );
};

export default memo(BottomTopAnimation);
