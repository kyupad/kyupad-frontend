import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { env } from 'env.mjs';

import logoFooter from '/public/images/footer/logo-footer.svg';

function Footer() {
  return (
    <footer className="bg-kyu-color-4 flex items-center justify-center min-h-[80px]">
      <div className="max-w-8xl w-full flex flex-col items-center gap-3 pt-5">
        {/* <div className="max-w-[150px] min-w-[150px] xl:min-w-[240px]">
          <Image src={logoFooter} alt="Logo Footer" draggable={false} />
        </div> */}
        <div className="flex justify-between items-center w-full px-[60px] py-5 gap-8 xl:gap-[60px] flex-col lg:flex-row">
          <div className="max-w-[150px] min-w-[150px] xl:min-w-[240px]">
            <Image src={logoFooter} alt="Logo Footer" draggable={false} />
          </div>

          <div className="flex gap-5 sm:text-xl xl:gap-[60px] flex-wrap justify-center">
            <Link
              href={env.NEXT_PUBLIC_DOCS_URL + '/our-product/faq'}
              className="relative group"
              target="_blank"
            >
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
            </Link>
            {/* <Link href={'#'} className="group relative">
              Performance
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
            </Link> */}
            <Link
              href={
                env.NEXT_PUBLIC_DOCS_URL + '/our-product/terms-and-condition'
              }
              className="group relative"
              target="_blank"
            >
              Terms & Conditions
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
            </Link>
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
