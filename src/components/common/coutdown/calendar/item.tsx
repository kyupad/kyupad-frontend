import React, { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function CountdownItem({ num, text }: { num: number; text: string }) {
  return (
    <div className="flex flex-col">
      <div className="w-full max-w-[72px] text-center relative overflow-hidden">
        <div>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={num}
              initial={{ y: num === 0 ? '0' : '100%' }}
              animate={{ y: '0' }}
              exit={{ y: '-100%' }}
              transition={{ ease: 'backIn', duration: 0.75 }}
              className="block text-[32px] font-bold"
            >
              {num <= 9 ? `0${num}` : num}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="text-base font-medium">{text}</span>
    </div>
  );
}

export default memo(CountdownItem);
