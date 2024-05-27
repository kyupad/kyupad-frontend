import React, { memo } from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { doGetMyInvestments } from '@/actions/my-space';
import PrimaryButton from '@/components/common/button/primary';
import { WEB_ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import catRight from 'public/images/my-space/cat-right.png';

const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});

async function MyInvestments() {
  const data = await doGetMyInvestments();
  const myInvested = data?.data?.my_invested;
  return (
    <div className={cn('relative min-h-[350px]', fontHeading.variable)}>
      <Image
        className="absolute top-28 left-[1280px] max-w-[428px]"
        src={catRight}
        alt="Cat Right"
        draggable={false}
      />
      {(!myInvested || myInvested?.length === 0) && (
        <p className="text-center font-heading text-4xl h-[400px]">No data!</p>
      )}
      {myInvested && myInvested?.length > 0 && (
        <div className="px-4 py-10 sm:p-10 border-2 border-kyu-color-10 rounded-[16px] max-w-[1080px] mx-auto flex gap-6 flex-col overflow-x-auto">
          {myInvested?.map((item: any) => (
            <div
              key={item?.project_id + item?.invested_amount}
              className="flex items-center justify-between gap-[100px]"
            >
              <div className="flex items-center gap-4">
                <div className="max-w-16 min-w-16 min-h-16 relative rounded-[100px] overflow-hidden">
                  <Image
                    src={item?.project_logo || ''}
                    alt={item?.project_name || ''}
                    className="absolute"
                    fill
                    style={{ objectFit: 'cover' }}
                    draggable={false}
                  />
                </div>
                <div className="font-bold text-2xl whitespace-nowrap">
                  {item?.project_name || ''}
                </div>
              </div>
              <div className="flex items-center gap-[100px]">
                <div className="text-2xl whitespace-nowrap">
                  <span className="font-bold">
                    {item?.invested_amount || 0}
                  </span>{' '}
                  ${item?.token?.toUpperCase() || ''}
                </div>
                {item?.claim_available ? (
                  <Link
                    href={
                      item?.project_slug
                        ? WEB_ROUTES.PROJECT_DETAIL.replace(
                            '[id]',
                            item?.project_slug,
                          )
                        : '#'
                    }
                  >
                    <PrimaryButton
                      className="min-w-[200px]"
                      disabled={!item?.claim_available}
                    >
                      Claim
                    </PrimaryButton>
                  </Link>
                ) : (
                  <PrimaryButton
                    className="min-w-[200px]"
                    disabled={!item?.claim_available}
                  >
                    Claimed
                  </PrimaryButton>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(MyInvestments);
