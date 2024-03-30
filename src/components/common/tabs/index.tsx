'use client';

import React, { memo, useCallback } from 'react';
import { cn } from '@/utils/helpers';

import InOutAnimation from '../animation/in-out';

interface ITabs {
  items: {
    key: string;
    label: string;
    children: React.ReactNode;
  }[];
}

function Tabs({ items }: ITabs) {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabClick = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  return (
    <div>
      <div className="border-b-2 border-kyu-color-11 overflow-x-auto">
        <div className="flex px-4 sm:gap-16 w-fit mx-auto">
          {items.map(({ key, label }, index) => (
            <div
              className={cn(
                'text-lg sm:text-2xl font-bold text-kyu-color-11 py-2 px-4 rounded-t-[8px] cursor-pointer whitespace-nowrap',
                activeTab === index ? 'bg-kyu-color-11 text-kyu-color-2' : '',
              )}
              key={key}
              onClick={() => handleTabClick(index)}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="py-[60px] bg-kyu-color-12">
        <div className="w-full max-w-8xl mx-auto px-4 lg:px-[60px]">
          <InOutAnimation key={activeTab}>
            {items[activeTab].children}
          </InOutAnimation>
        </div>
      </div>
    </div>
  );
}

export default memo(Tabs);
