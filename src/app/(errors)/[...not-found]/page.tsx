'use client';

import { Knewave } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import Primary from '@/components/common/button/primary';
import { WEB_ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import meow404 from 'public/images/common/kyupad-meow-404.png';
import yellowCloud from 'public/images/footer/yellow-cloud.png';

const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});
const NotFound = () => {
  return (
    <div className="size-full py-3 md:mt-10">
      <div
        className={cn('flex flex-col items-center px-1', fontHeading.variable)}
      >
        <h1 className="leading-tight pt-[10vh] sm:pt-0 text-kyu-color-11 flex items-center gap-3">
          <span className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-heading text-shadow-primary-mobile lg:pt-[26px] sm:py-[26px] text-center">
            Error 404
          </span>
        </h1>

        <b className="text-lg md:text-xl my-2 lg:text-2xl text-center">
          The page you are trying to access does not exist.
        </b>
        <Link href={WEB_ROUTES.HOME}>
          <Primary>Take me home</Primary>
        </Link>
      </div>
      <div className="fixed max-h-[40vh] md:max-h-[50vh] bottom-10 z-20 flex justify-center w-full">
        <Image
          src={meow404}
          className="max-w-[600px] object-contain px-10"
          alt="404"
        />
      </div>
      <Image
        className="max-w-screen w-full fixed bottom-0"
        src={yellowCloud}
        alt="404"
      />
    </div>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default NotFound;
