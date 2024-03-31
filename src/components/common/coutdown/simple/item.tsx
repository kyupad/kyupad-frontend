import React, { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function CountdownItem({ num, text }: { num: number; text: string }) {
  return (
    <div>
      <div className="w-full text-center relative overflow-hidden">
        <div className="flex">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={num}
              initial={{ y: num === 0 ? '0' : '100%' }}
              animate={{ y: '0' }}
              exit={{ y: '-100%' }}
              transition={{ ease: 'backIn', duration: 0.75 }}
              className="block"
            >
              {num}
            </motion.span>
          </AnimatePresence>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(CountdownItem);
