'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { MotionDiv } from '@/components/common/animation/motion-animation';
import { AnimatePresence } from 'framer-motion';
import multiSystemOver from 'public/images/home/multi-system-open.png';
import nftPassOpen from 'public/images/home/nft-pass-open.png';

const IninativeSystem = (props: any) => {
  const [type, setType] = React.useState('');
  return (
    <div className="duration-500 flex mt-10 gap-4 min-h-[250px] lg:gap-16 justify-center *:flex-auto flex-nowrap">
      <AnimatePresence initial={false}>
        {!type ? (
          <>
            <MotionDiv
              onClick={() => setType('nftpass')}
              initial={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.75, type: 'tween' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={props.nftPass}
                className="lg:max-w-[400px] cursor-pointer"
                alt="nft pass"
              />
              <h3 className="md:text-3xl text-xl font-bold text-center py-4">
                NFT Pass
              </h3>
            </MotionDiv>
            <MotionDiv
              onClick={() => setType('multiSystem')}
              initial={{ opacity: 0, y: 100 }}
              transition={{ duration: 1, type: 'tween' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0 }}
            >
              <Image
                src={props.multiSystem}
                className="lg:max-w-[400px] cursor-pointer"
                alt="multi system"
              />
              <h3 className="md:text-3xl text-xl font-bold text-center py-4">
                Multiplier System
              </h3>
            </MotionDiv>
          </>
        ) : (
          <AnimatePresence>
            {type === 'multiSystem' ? (
              <MotionDiv
                className="mx-auto h-min "
                initial={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Image
                  src={multiSystemOver}
                  alt="multisystem"
                  className="h-auto object-contain w-auto mx-auto max-h-[467px] cursor-pointer"
                  onClick={() => setType('')}
                  onMouseOut={() => setType('')}
                />
              </MotionDiv>
            ) : (
              <MotionDiv
                className="mx-auto h-min max-h-[467px]"
                initial={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.5, type: 'tween', ease: 'linear' }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Image
                  src={nftPassOpen}
                  alt="nftpass"
                  className="h-auto object-contain w-auto mx-auto max-h-[467px] cursor-pointer"
                  onClick={() => setType('')}
                  onMouseOut={() => setType('')}
                />
              </MotionDiv>
            )}
          </AnimatePresence>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(IninativeSystem);
