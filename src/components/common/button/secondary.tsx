import React, { memo, ReactNode } from 'react';
import { cn } from '@/utils/helpers';

interface IPrimaryButtonProps {
  className?: string;
  children: ReactNode;
}

const SecondaryButton = ({ className, children }: IPrimaryButtonProps) => {
  return (
    <button
      className={cn(
        'transition-all py-2 px-4 bg-button-secondary font-bold text-button-primary-border rounded-[8px] border-2 border-button-primary-border hover:bg-button-secondary-hover hover:shadow-[8px_8px_0px_0px_#2a273a26] active:shadow-none group relative overflow-hidden w-full hover:text-[#D8D9DF] text-xl',
        className,
      )}
    >
      {children}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
    </button>
  );
};

export default memo(SecondaryButton);
