'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import lightEffect from 'public/images/whitelist/light-effect.png';
import { useOnClickOutside, useScrollLock, useWindowSize } from 'usehooks-ts';

import whitelist from '/public/images/whitelist/nft-image.jpg';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

interface IMintedSuccessProps {
  visible?: boolean;
  setVisible?: (visible: boolean) => void;
}

const MintedSuccess = (props: IMintedSuccessProps) => {
  const { width, height } = useWindowSize();
  const ref = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const { unlock, lock } = useScrollLock({ autoLock: false });

  const handleClickOutside = () => {
    unlock();
    props?.setVisible && props.setVisible(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (props?.visible) {
      lock();
    }
  }, [props?.visible]);

  return (
    props?.visible &&
    isMounted && (
      <>
        <motion.div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 z-50 overflow-hidden">
          <Confetti width={width} height={height} />
          <motion.div
            animate={{
              rotateZ: [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
                66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
                82, 83, 84, 85, 86, 87, 88, 89, 90,
              ],
            }}
            transition={{
              ease: 'circInOut',
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Image src={lightEffect} alt="light-effect" draggable={false} />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            ref={ref}
            animate={{
              scale: [0, 1],
              top: ['50%', '50%'],
              left: ['50%', '50%'],
              translateX: ['-50%', '-50%'],
              translateY: ['-50%', '-50%'],
            }}
          >
            <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-white text-2xl w-full font-bold text-center">
              You got <span className="text-kyu-color-13">01</span> NFT Pass
            </p>
            <div className="rounded-[16px] overflow-hidden">
              <Image
                src={whitelist}
                alt="NFT"
                className="max-w-[250px]"
                draggable={false}
              />
            </div>
          </motion.div>
        </motion.div>
      </>
    )
  );
};

export default memo(MintedSuccess);
