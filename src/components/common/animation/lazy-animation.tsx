'use client';

import { memo } from 'react';
import { domAnimation, LazyMotion } from 'framer-motion';

function LazyAnimation({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
export default memo(LazyAnimation);
