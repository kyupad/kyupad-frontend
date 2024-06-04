'use client';

import * as React from 'react';
import { memo, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      zIndex: -1,
    };
  },
  center: {
    zIndex: 20,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: -1,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Slide = ({
  children,
  showCount,
  infinite,
  autoPlay,
  interval,
}: {
  children: React.ReactNode[];
  showCount?: boolean;
  infinite?: boolean;
  autoPlay?: boolean;
  interval?: number;
}) => {
  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    if (autoPlay && infinite) {
      const autoSlide = setInterval(() => {
        paginate(1);
      }, interval ?? 5000);

      return () => clearInterval(autoSlide); // Clean up the interval on unmount
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, autoPlay, interval]);

  const paginate = (newDirection: number) => {
    let newPage = page + newDirection;

    if (infinite) {
      if (newPage >= children.length) {
        newPage = 0;
      } else if (newPage < 0) {
        newPage = children.length - 1;
      }
    } else {
      if (newPage >= children.length || newPage < 0) {
        return;
      }
    }
    setPage([newPage, newDirection]);
  };

  return (
    <>
      <div className="relative min-h-[250px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
              opacity: { duration: 0.5 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            style={{ position: 'absolute', width: '100%', padding: '10px' }}
          >
            {children[page]}
          </motion.div>
        </AnimatePresence>
      </div>
      {showCount ? (
        <p className="text-center mt-8">
          {page + 1} / {children.length}
        </p>
      ) : null}
    </>
  );
};
export default memo(Slide);
