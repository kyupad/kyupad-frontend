import React, { useCallback, useState } from 'react';
import { cn } from '@/utils/helpers';

type tabItems = {
  key: string;
  label: string;
  children: React.ReactNode;
};

const Tabs = ({
  data,
  className,
  gap,
}: {
  data: tabItems[];
  className?: string;
  gap?: number;
}) => {
  const [activeTab, setActiveTab] = useState<string>(data[0].key);

  const handleClick = useCallback(
    (e: React.MouseEvent, newActiveTab: string) => {
      e.preventDefault();
      setActiveTab(newActiveTab);
    },
    [],
  );

  return (
    <div className={cn('mx-auto w-full', className)}>
      <div className="border-b-2 border-black w-full">
        <div
          style={{ gap: `${gap}px` }}
          className="flex max-w-3xl mx-auto justify-center"
        >
          {data.map((child: tabItems) => (
            <button
              key={child.key}
              className={`${
                activeTab === child.key
                  ? 'bg-black rounded-t-lg !text-[#FDEDC8] '
                  : ''
              } px-4 text-gray-700 font-bold text-2xl py-2`}
              onClick={(e: React.MouseEvent) => handleClick(e, child.key)}
            >
              {child.label}
            </button>
          ))}
        </div>
      </div>
      <div className="py-4 ">
        {data.map((child: tabItems) => {
          if (child.key === activeTab) {
            return <div key={child.key}>{child.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
