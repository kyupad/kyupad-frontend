import React, { memo, ReactNode } from 'react';
import { cn } from '@/utils/helpers';
import { ReloadIcon } from '@radix-ui/react-icons';

interface IPrimaryButtonProps {
  className?: string;
  children: ReactNode;
  block?: boolean;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  [key: string]: any;
}

const PrimaryButton = ({
  className,
  children,
  block = false,
  loading = false,
  loadingText,
  disabled,
  ...props
}: IPrimaryButtonProps) => {
  return (
    <button
      className={cn(
        'transition-all py-2 px-5 bg-button-primary font-bold text-button-primary-border rounded-[8px] border-2 border-button-primary-border hover:bg-button-primary-hover hover:shadow-[8px_8px_0px_0px_#2a273a26] active:shadow-none group relative overflow-hidden text-xl',
        className,
        block ? 'w-full' : '',
        loading || disabled
          ? 'cursor-not-allowed bg-button-secondary hover:shadow-none hover:bg-button-secondary'
          : '',
      )}
      disabled={loading || disabled}
      {...props}
    >
      <div className="flex items-center justify-center">
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}{' '}
        {loading && loadingText ? loadingText : children}
      </div>
      <div
        className={`absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine ${loading || disabled ? 'hidden' : ''}`}
      />
    </button>
  );
};

export default memo(PrimaryButton);
