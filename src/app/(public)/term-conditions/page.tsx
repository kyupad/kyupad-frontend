import React from 'react';
import { Metadata } from 'next';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import { cn } from '@/utils/helpers';
import termImage from 'public/images/term-conditions/kyupad-meow-term.png';

const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});
// eslint-disable-next-line import/no-unused-modules
export const metadata: Metadata = {
  title: 'Term & Conditions',
};

const TermConditionsPage = () => {
  return (
    <>
      <div
        className={cn(
          'lg:px-[60px] max-w-[1440px] px-4 mx-auto',
          fontHeading.variable,
        )}
      >
        <div className="flex flex-col items-center pb-6">
          <h1 className="leading-tight text-kyu-color-11 flex items-center gap-3">
            <Image
              src={termImage}
              className="md:w-24 w-20 lg:w-32"
              alt="kyupad-policy"
            />
            <span className="text-4xl sm:text-4xl md:text-4xl lg:text-[60px] font-heading text-shadow-primary-mobile lg:pt-[26px] sm:py-[26px]">
              Term & Conditions
            </span>
          </h1>
        </div>
        <div className="max-w-8xl mx-auto flex justify-start items-start flex-col">
          <h2 className="leading-tight text-kyu-color-11 flex gap-3">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-heading">
              Acceptance of the Terms of Use
            </span>
          </h2>
          <p className="py-3">
            {
              'Welcome to SeaPad, the multichain web3 launchpad developed by SeaPad ("we," "us," or "our"). Protecting your privacy is a top priority for us. This Privacy Policy (" Privacy Policy ") explains how we collect, use, disclose, and safeguard your personal information when you use our services (the "Services"). By accessing or using our Services, you agree to the practices described in this Privacy Policy.'
            }
          </p>
        </div>
        <div className="max-w-8xl mx-auto flex justify-start items-start flex-col">
          <h2 className="leading-tight text-kyu-color-11 flex gap-3">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-heading">
              Account Registration and Security
            </span>
          </h2>
          <ol>
            <li className="max-w-8xl mx-auto flex justify-start items-start flex-col">
              <h3 className="leading-tight text-kyu-color-11 flex py-2">
                <span className="text-lg font-heading">
                  a. Personal Information
                </span>
              </h3>
              <p className="py-2">
                {
                  'Welcome to SeaPad, the multichain web3 launchpad developed by SeaPad ("we," "us," or "our"). Protecting your privacy is a top priority for us. This Privacy Policy (" Privacy Policy ") explains how we collect, use, disclose, and safeguard your personal information when you use our services (the "Services"). By accessing or using our Services, you agree to the practices described in this Privacy Policy.'
                }
              </p>
            </li>
            <li className="max-w-8xl mx-auto flex justify-start items-start flex-col">
              <h3 className="leading-tight text-kyu-color-11 flex py-2">
                <span className="text-lg font-heading">
                  a. Personal Information
                </span>
              </h3>
              <p className="py-2">
                {
                  'Welcome to SeaPad, the multichain web3 launchpad developed by SeaPad ("we," "us," or "our"). Protecting your privacy is a top priority for us. This Privacy Policy (" Privacy Policy ") explains how we collect, use, disclose, and safeguard your personal information when you use our services (the "Services"). By accessing or using our Services, you agree to the practices described in this Privacy Policy.'
                }
              </p>
            </li>
            <li className="max-w-8xl mx-auto flex justify-start items-start flex-col">
              <h3 className="leading-tight text-kyu-color-11 flex py-2">
                <span className="text-lg font-heading">
                  a. Personal Information
                </span>
              </h3>
              <p className="py-2">
                {
                  'Welcome to SeaPad, the multichain web3 launchpad developed by SeaPad ("we," "us," or "our"). Protecting your privacy is a top priority for us. This Privacy Policy (" Privacy Policy ") explains how we collect, use, disclose, and safeguard your personal information when you use our services (the "Services"). By accessing or using our Services, you agree to the practices described in this Privacy Policy.'
                }
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default TermConditionsPage;
