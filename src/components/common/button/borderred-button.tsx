import React, { memo, ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface IPrimaryButtonProps {
  className?: string;
  children: ReactNode;
  [key: string]: any;
}

const BorderredButton = ({
  className,
  children,
  ...props
}: IPrimaryButtonProps) => {
  return (
    <button
      className={cn(
        'transition-all py-2 px-4 font-bold text-button-primary-border rounded-[8px] border-2 border-button-primary-border hover:bg-kyu-color-2 hover:shadow-[8px_8px_0px_0px_#2a273a26] active:shadow-none group relative overflow-hidden w-full text-xl',
        className,
      )}
      {...props}
    >
      {children}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
    </button>
  );
};

export default memo(BorderredButton);
