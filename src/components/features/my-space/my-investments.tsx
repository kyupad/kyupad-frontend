import React, { memo } from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { doGetMyInvestments } from '@/actions/my-space';
import PrimaryButton from '@/components/common/button/primary';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/common/table';
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
        <Table parent="max-w-[1080px] mx-auto py-[20px] max-h-[520px]">
          <TableBody>
            {myInvested?.map((item: any) => (
              <TableRow key={item?.project_id + item?.invested_amount}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="relative min-w-[64px] min-h-[64px] max-w-[64px] rounded-[100px] overflow-hidden">
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
                </TableCell>

                <TableCell className="text-2xl whitespace-nowrap text-right">
                  <span className="font-bold">
                    {item?.invested_amount?.toLocaleString('en-US') || 0}
                  </span>{' '}
                  ${item?.token?.toUpperCase() || ''}
                </TableCell>
                <TableCell className="flex justify-end">
                  {item?.claim_available ? (
                    <Link
                      href={
                        item?.project_slug
                          ? `${WEB_ROUTES.PROJECT_DETAIL.replace(
                              '[id]',
                              item?.project_slug,
                            )}?view=claim`
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
                    <PrimaryButton className="min-w-[200px]" disabled>
                      Claim
                    </PrimaryButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default memo(MyInvestments);
