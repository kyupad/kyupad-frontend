import React, { memo } from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { doGetMyParticipations } from '@/actions/my-space';
import SecondaryButton from '@/components/common/button/secondary';
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

async function MyParticipations() {
  const data = await doGetMyParticipations();
  const myParticipations = data?.data?.my_registered;
  return (
    <div className={cn('relative min-h-[350px]', fontHeading.variable)}>
      <Image
        className="absolute top-28 left-[1280px] max-w-[428px]"
        src={catRight}
        alt="Cat Right"
        draggable={false}
      />
      {(!myParticipations || myParticipations?.length === 0) && (
        <p className="text-center font-heading text-4xl h-[400px]">No data!</p>
      )}
      {myParticipations && myParticipations?.length > 0 && (
        <Table parent="max-w-[1080px] mx-auto py-[20px] max-h-[525px]">
          <TableBody>
            {myParticipations?.map((item: any) => {
              const statusColor =
                item?.project_participation_status?.toLowerCase() === 'ongoing'
                  ? 'text-kyu-color-17'
                  : item?.project_participation_status?.toLowerCase() ===
                      'ended'
                    ? 'text-kyu-color-18'
                    : 'text-kyu-color-13';
              return (
                <TableRow key={item?.project_id}>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-2xl whitespace-nowrap text-right">
                    <span className={cn('font-bold capitalize', statusColor)}>
                      {item?.project_participation_status || ''}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-end">
                    <Link
                      href={
                        item?.project_slug
                          ? WEB_ROUTES.PROJECT_DETAIL?.replace(
                              '[id]',
                              item?.project_slug,
                            )
                          : '#'
                      }
                    >
                      <SecondaryButton className="min-w-[200px]">
                        Details
                      </SecondaryButton>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default memo(MyParticipations);
