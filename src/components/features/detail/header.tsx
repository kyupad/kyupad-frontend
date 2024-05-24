'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';

import Back from './back';
import discord from '/public/images/detail/discord.svg';
import telegram from '/public/images/detail/telegram.svg';
import web from '/public/images/detail/web.svg';
import x from '/public/images/detail/x.svg';

function ProjectDetailHeader({ detail }: { detail?: any }) {
  const viewMode = useProjectDetailStore((state) => state.viewMode);
  return viewMode !== 'snapshot' && viewMode !== 'investment' ? (
    <>
      <div className="max-w-8xl mx-auto px-4 lg:px-[60px] pt-5 flex items-center">
        <Back />
      </div>
      <div className="max-w-8xl py-5 px-4 lg:px-[60px] mx-auto flex justify-between gap-5 items-center flex-col md:items-center md:flex-row">
        <div className="flex gap-5 items-center">
          <div className="relative border-2 border-kyu-color-4 min-w-[100px] sm:min-w-[150px] xl:min-w-[200px] rounded-full min-h-[100px] sm:min-h-[150px] xl:min-h-[200px] overflow-hidden">
            <Image
              className="absolute"
              src={detail?.logo}
              fill
              alt="project logo"
              draggable={false}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-4xl xl:text-5xl font-bold xl:leading-[60px] line-clamp-2">
              {detail?.name || ''}
            </h1>
            <p className="text-xl sm:text-3xl xl:text-4xl font-bold xl:leading-[48px] line-clamp-1">
              {detail?.token_info?.symbol
                ? `$${detail?.token_info?.symbol.toUpperCase()}`
                : ''}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex gap-3 items-center">
            {(detail?.socials?.x ||
              detail?.socials?.discord ||
              detail?.socials?.telegram ||
              detail?.socials?.website) && (
              <div className="text-2xl font-bold">Social:</div>
            )}
            <div>
              {detail?.socials?.x && (
                <a
                  href={detail.socials.x}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Image src={x} alt="X" draggable={false} />
                </a>
              )}
            </div>
            <div>
              {detail?.socials?.discord && (
                <a
                  href={detail.socials.discord}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Image src={discord} alt="Discord" draggable={false} />
                </a>
              )}
            </div>
            <div>
              {detail?.socials?.telegram && (
                <a
                  href={detail.socials.telegram}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Image src={telegram} alt="Telegram" draggable={false} />
                </a>
              )}
            </div>
            <div>
              {detail?.socials?.website && (
                <a
                  href={detail.socials.website}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Image src={web} alt="Web" draggable={false} />
                </a>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {detail?.tags?.map((tag: string) => (
              <div
                key={tag}
                className="px-4 py-2 rounded-[8px] bg-kyu-color-6 font-medium whitespace-nowrap"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default memo(ProjectDetailHeader);
