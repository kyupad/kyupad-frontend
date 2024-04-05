import React, { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0, // 0.5
    },
  },
  out: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      duration: 0.75,
    },
  },
};

const InOutAnimation = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: any;
}) => {
  return (
    <div>
      <AnimatePresence initial={true} mode="wait">
        <motion.div
          key={id}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default memo(InOutAnimation);
