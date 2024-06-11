'use client';

import { useEffect } from 'react';
import Error from 'next/error';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import { cn } from '@/utils/helpers';
import * as Sentry from '@sentry/nextjs';

import '@styles/globals.css';

import meowError from 'public/images/common/kyupad-meow-404.png';
import yellowCloud from 'public/images/footer/yellow-cloud.png';

const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});
const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { message?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return (
    <html>
      <body>
        <div className="size-full py-5">
          <div
            className={cn(
              'flex flex-col items-center px-1',
              fontHeading.variable,
            )}
          >
            <h1 className="leading-tight pt-[10vh] lg:pt-0 text-kyu-color-11 flex items-center gap-3">
              <span className="text-4xl sm:text-4xl md:text-4xl lg:text-[72px] font-heading text-shadow-primary-mobile lg:pt-[26px] sm:py-[26px] text-center">
                Error 500
              </span>
            </h1>
            <b className="text-lg md:text-xl my-2 lg:text-2xl text-center">
              Something went wrong!
            </b>
          </div>
          <div className="fixed max-h-[50vh] bottom-10 z-20 flex justify-center w-full">
            <Image src={meowError} className="max-w-[600px] px-10" alt="500" />
          </div>
          <Image
            className="max-w-screen w-full fixed bottom-0"
            src={yellowCloud}
            alt="500"
          />
        </div>
      </body>
    </html>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default GlobalError;
