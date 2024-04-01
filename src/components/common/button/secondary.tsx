import React, { memo, ReactNode } from 'react';
import { cn } from '@/utils/helpers';
import { ReloadIcon } from '@radix-ui/react-icons';

interface IPrimaryButtonProps {
  className?: string;
  children: ReactNode;
  [key: string]: any;
  block?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const SecondaryButton = ({
  className,
  children,
  block = false,
  loading,
  loadingText,
  ...props
}: IPrimaryButtonProps) => {
  return (
    <button
      className={cn(
        'transition-all py-2 px-4 bg-button-secondary font-bold text-button-primary-border rounded-[8px] border-2 border-button-primary-border hover:bg-button-secondary-hover hover:shadow-[8px_8px_0px_0px_#2a273a26] active:shadow-none group relative overflow-hidden hover:text-[#D8D9DF] text-xl',
        className,
        block ? 'w-full' : '',
        loading
          ? 'cursor-not-allowed hover:bg-button-secondary hover:text-button-primary-border hover:shadow-none'
          : '',
      )}
      disabled={loading}
      {...props}
    >
      <div className="flex items-center justify-center">
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}{' '}
        {loading && loadingText ? loadingText : children}
      </div>
      <div
        className={`absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine ${loading ? 'hidden' : ''}`}
      />
    </button>
  );
};

export default memo(SecondaryButton);
