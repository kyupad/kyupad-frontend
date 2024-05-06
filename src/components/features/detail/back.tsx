'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';

import arrowLeft from '/public/images/detail/arrow-left.svg';

function Back() {
  const { viewMode, changeViewMode } = useProjectDetailStore((state) => state);
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (viewMode) {
          changeViewMode(null);
        } else {
          router.back();
        }
      }}
    >
      <Image src={arrowLeft} alt="Back" draggable={false} />
    </button>
  );
}

export default memo(Back);
