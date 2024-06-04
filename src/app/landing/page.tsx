import React from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import BottomTopAnimation from '@/components/common/animation/bottom-top';
import { MotionDiv } from '@/components/common/animation/motion-animation';
import ScaleAnimation from '@/components/common/animation/scale';
import PrimaryButton from '@/components/common/button/primary';
import ChooseWinner from '@/components/features/landing/choose-winners';
import IninativeSystem from '@/components/features/landing/ininative-system';
import { cn } from '@/utils/helpers';
import { env } from 'env.mjs';
import meowSpacing from 'public/images/home/meow-spacing.png';
import catRight from 'public/images/my-space/cat-right.png';

import caculator from '/public/images/home/caculator.png';
import guard from '/public/images/home/guard.png';
import kyupadHeartSpace from '/public/images/home/kyupad-heart-space.png';
import kyupadMeowSpace from '/public/images/home/kyupad-meow-space.png';
import kyupad1 from '/public/images/home/kyupad-section1.png';
import kyupad2 from '/public/images/home/kyupad-section2.png';
import kyupad3 from '/public/images/home/kyupad-section3.png';
import latDecorator from '/public/images/home/last-decorator.svg';
import multiSpacing from '/public/images/home/multi-spacing.png';
import multiSystem from '/public/images/home/multi-system.png';
import nftPass from '/public/images/home/nft-pass.png';
import tropical from '/public/images/home/tropical.png';

const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});

const stepData = [
  {
    step: 'Step 1',
    title: 'Connect wallet',
    description: 'Connect your crypto wallet',
  },
  {
    step: 'Step 2',
    title: 'Register for IDO',
    description:
      'Click 1 button to register for the IDO, no token staking or fund committing required',
  },
  {
    step: 'Step 3',
    title: 'KYC',
    description: 'You only need to KYC if you win an allocation',
  },
  {
    step: 'Step 4',
    title: 'Invest',
    description:
      'Deposit crypto to buy your winning sale, claim your token upon TGE',
  },
];
const chooseWinnerData = [
  {
    title: 'Wallet snapshot',
    image: guard,
    description:
      'All whitelisted assets will be snapshot. Staked or lended assets will also be counted.',
  },
  {
    title: 'Catnip Point Calculating',
    image: caculator,
    description:
      'All whitelisted assets will be snapshot. Staked or lended assets will also be counted.',
  },
  {
    title: 'Ranking & Raffling',
    image: tropical,
    description:
      'All whitelisted assets will be snapshot. Staked or lended assets will also be counted.',
  },
];

const Home = () => {
  return (
    <>
      <div
        className={cn(
          'max-w-8xl  mx-auto flex flex-col items-center mt-[-40px] md:mt-[-70px]  lg:px-[60px] gap-2 sm:gap-[100px]',
          fontHeading.variable,
        )}
      >
        <div className="relative px-4 w-screen  sm:px-8 md:px-16  pt-[80px] pb-[100px]">
          <ScaleAnimation className="absolute top-0 z-[-1] size-full left-0 bg-light-blue-cloud bg-cover bg-center bg-no-repeat lg:bg-[length:100vw_1000px]" />
          <div className=" mx-auto w-full py-8 xl:py-0 max-w-[1300px] flex flex-col-reverse sm:flex-row items-center xl:mt-[65px] justify-start">
            <div className="w-[100%] sm:w-[50%] lg:pr-10">
              <BottomTopAnimation>
                <h2 className="text-3xl md:text-5xl font-heading text-center md:leading-[4rem] sm:text-left">
                  A community-based launchpad on Solana
                </h2>
              </BottomTopAnimation>
              <BottomTopAnimation delay={0.5}>
                <p className="text-xl my-5 text-center sm:text-left">
                  We offer Solana native a fair experience of joining an IDO
                  based on their contribution to the ecosystem
                </p>
              </BottomTopAnimation>
              <div className="flex justify-center sm:justify-start">
                <BottomTopAnimation delay={1}>
                  <PrimaryButton>Apply for launchpad</PrimaryButton>
                </BottomTopAnimation>
              </div>
            </div>
            <div className="flex sm:w-2/4 relative ml-[12vw]">
              <MotionDiv
                className="absolute -left-11 sm:-left-28 md:-left-32 xl:-left-52  z-20"
                initial={{ x: 100, rotate: -45, opacity: 0 }}
                animate={{ x: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <Image
                  src={kyupadHeartSpace}
                  className="h-[25vw] w-auto object-contain sm:h-[180px] lg:h-[240px] xl:h-[40vh]"
                  alt="kyupad meow rocket"
                />
              </MotionDiv>
              <MotionDiv
                initial={{ x: 100, rotate: 45, opacity: 0 }}
                animate={{ x: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <Image
                  src={kyupadMeowSpace}
                  className="h-[50vw] w-auto object-cover xl:h-[70vh]"
                  alt="kyupad meow rocket"
                />
              </MotionDiv>
            </div>
          </div>
        </div>

        <div className="w-screen -translate-y-32 sm:-translate-y-60 lg:-translate-y-64 bg-golden-cloud py-28 lg:py-36 bg-[length:100vw_540px] sm:bg-[length:100vw_650px] lg:bg-[length:100vw_1100px] bg-no-repeat  max-h-[1100px]">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-heading text-center mt-0 sm:mt-10  py-4 lg:mt-16">
            Why KyuPad?
          </h2>
          <div className="flex gap-4 md:gap-14 justify-center my-2 sm:my-6 lg:my-16">
            <div className="flex items-center flex-col">
              <MotionDiv
                animate={{ rotateY: '3.142rad' }}
                transition={{
                  delay: 3,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 12,
                }}
              >
                <Image
                  src={kyupad1}
                  alt="kyupad section 1"
                  className="w-24 sm:w-32 lg:w-56 hover:scale-110 duration-500"
                />
              </MotionDiv>
              <h3 className="font-bold text-md  lg:text-2xl py-4 text-center lg:mx-auto w-3/4 md:w-3/5">
                Fair chance for all users
              </h3>
            </div>
            <div className="flex items-center flex-col">
              <MotionDiv
                animate={{ rotateY: '3.142rad' }}
                transition={{
                  delay: 4.5,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
              >
                <Image
                  src={kyupad2}
                  alt="kyupad section 2"
                  className="w-24 sm:w-32 lg:w-56 hover:scale-110 duration-500"
                />
              </MotionDiv>
              <h3 className="font-bold text-md  lg:text-2xl py-4 text-center lg:mx-auto w-3/4 md:w-3/5">
                No entry threshold
              </h3>
            </div>
            <div className="flex items-center flex-col">
              <MotionDiv
                animate={{ rotateY: '3.142rad' }}
                transition={{
                  delay: 1.5,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 8,
                }}
              >
                <Image
                  src={kyupad3}
                  alt="kyupad section 3"
                  className="w-24 sm:w-32 lg:w-56 hover:scale-110 duration-500"
                />
              </MotionDiv>
              <h3 className="font-bold text-md  lg:text-2xl py-4 text-center lg:mx-auto w-3/4 md:w-3/5">
                Seamless experience
              </h3>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 -translate-y-32 sm:-translate-y-64 items-center">
          <div className="w-screen relative">
            <Image
              src={meowSpacing}
              alt="meow spacing"
              className="absolute w-28 sm:w-32 md:w-48 lg:w-64 -top-16 xl:left-32 sm:-top-[11rem]"
            />
          </div>
          <div>
            <div className="flex gap-4 flex-col items-center">
              <div className="text-2xl font-heading sm:text-4xl text-center">
                How to join IDO?
              </div>
              <div className="text-sm text-kyu-color-8 font-bold sm:text-xl text-center">
                The most user-friendly method to join an IDO. No staking or
                entry-threshold!
              </div>
              <div className="w-fit mt-8 sm:gap-10 flex  flex-wrap xl:flex-nowrap justify-center">
                {stepData.map((step, index) => (
                  <BottomTopAnimation
                    key={index}
                    delay={index * 0.25}
                    className="p-1"
                  >
                    <div className="hover:scale-105 md:hover:scale-110 gap-1 p-2 hover:shadow-sm duration-500 flex even:bg-kyu-color-2 odd:bg-kyu-color-1 md:p-3 xl:gap-6 shadow-[4px_3px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[19px_18px_0px_0px_rgba(0,0,0,0.1)] flex-col items-start sm:gap-4 w-[46vw] h-[46vw] sm:w-[40vw] sm:h-56  xl:w-[20vw] xl:max-w-72 xl:h-72 rounded-xl lg:p-5 border-4 border-kyu-color-11 ">
                      <div className="text-md md:text-2xl  font-heading relative before:absolute before:w-8 md:before:w-12 before:h-1 before:bg-kyu-color-13 before:-bottom-1 md:before:-bottom-3">
                        {step.step}
                      </div>
                      <div className="text-lg md:text-3xl md:mt-4 font-bold">
                        {step.title}
                      </div>
                      <div className="text-kyu-color-8 text-sm md:text-base">
                        {step.description}
                      </div>
                    </div>
                  </BottomTopAnimation>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen relative -translate-y-32 sm:-translate-y-56 lg:-translate-y-72 bg-golden-cloud py-20 sm:py-28 lg:py-36 bg-[length:100vw_540px] sm:bg-[length:100vw_830px] lg:bg-[length:100vw_1100px] bg-no-repeat  max-h-[1100px]">
          <Image
            src={catRight}
            className="absolute -right-16 -top-8 md-top-16 w-28 sm:w-32 md:w-48 lg:w-64"
            alt="cat right"
          />

          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-heading text-center mt-4 sm:mt-10  py-4 lg:mt-16">
            How we choose winners
          </h2>
          <ChooseWinner data={chooseWinnerData} />
        </div>
        <div className="px-4 -translate-y-32 sm:-translate-y-56 lg:-translate-y-80">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-heading text-center sm:mt-[2vh] py-4">
            Our Iniatives System{' '}
          </h2>
          <div className="text-sm text-kyu-color-8 font-bold sm:text-xl text-center">
            Give rewards to Solana contributors
          </div>
          <IninativeSystem nftPass={nftPass} multiSystem={multiSystem} />
        </div>
        <div className="-translate-y-32 -mb-32  md:-mb-64 sm:-translate-y-56 lg:-translate-y-72 flex flex-col gap-4 items-center">
          <Image
            src={multiSpacing}
            className=" max-w-[300px] md:max-w-[585px]"
            alt="multi spacing"
          />
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-heading text-center">
            Our Partners
          </h2>
          <div className="flex gap-x-9 py-5 items-center gap-y-5 flex-wrap justify-center">
            {Array.from(
              { length: env.NEXT_PUBLIC_PARTNER_LENGTH },
              (_, index) => (
                <BottomTopAnimation delay={index * 0.15} key={index}>
                  <Image
                    src={`${env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/public/images/landing/community/community_${index + 1}.jpg`}
                    width={56}
                    height={56}
                    alt="logo"
                    className="duration-500 mt-5 max-w-16 w-auto rounded-full shadow-[4px_3px_2px_2px_rgba(0,0,0,0.1)] hover:shadow-[0px_30px_25px_-20px_rgba(0,0,0,1)] hover:-translate-y-4"
                  />
                </BottomTopAnimation>
              ),
            )}
          </div>
        </div>
      </div>
      <Image
        src={latDecorator}
        alt="decorator"
        className="mx-auto 2xl:-mt-16 w-full"
        draggable={false}
      />
    </>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default Home;
