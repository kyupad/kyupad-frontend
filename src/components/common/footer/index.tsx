import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WEB_ROUTES } from '@/utils/constants';

import logoFooter from '/public/images/footer/logo-footer.svg';
import telegram from '/public/images/footer/telegram.svg';
import x from '/public/images/footer/x.svg';

function Footer() {
  return (
    <footer className="bg-kyu-color-4 flex items-center justify-center min-h-[244px]">
      <div className="max-w-8xl w-full flex flex-col items-center gap-3">
        <div className="flex justify-between items-center w-full px-[60px] py-5 gap-8 xl:gap-[60px] flex-col lg:flex-row">
          <div className="max-w-[150px] xl:min-w-[240px]">
            <Image src={logoFooter} alt="Logo Footer" draggable={false} />
          </div>

          <div className="flex gap-5 sm:text-xl xl:gap-[60px] flex-wrap justify-center">
            <Link href={WEB_ROUTES.FAQ} className="relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
            </Link>
            <Link href={WEB_ROUTES.PERFORMANCE} className="group relative">
              Performance
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
            </Link>
            <Link href={WEB_ROUTES.TERMS} className="group relative">
              Terms & Conditions
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
            </Link>
          </div>

          <div className="flex gap-8 items-center flex-wrap justify-center">
            <div className="text-xl xl:text-2xl font-bold text-center">
              Join our community
            </div>
            <div className="flex gap-3">
              <a
                href="https://t.co/9NEs1U1r46"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image src={telegram} alt="Telegram" />
              </a>
              <a
                href="https://twitter.com/Kyupad_"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image src={x} alt="X" />
              </a>
            </div>
          </div>
        </div>
        <div className="font-medium pb-5">
          Kyupad © 2024. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
