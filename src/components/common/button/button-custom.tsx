import React, { memo } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/helpers';

interface ButtonProps {
  children: string | React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}
const ButtonCustom = ({
  children,
  onClick,
  disabled,
  className,
  loading,
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-[#FABF52] lg:w-[200px] hover:bg-button-primary-hover transition-all hover:shadow-[8px_8px_0px_0px_#2a273a26] active:shadow-none group relative overflow-hidden font-bold h-[52px]  text-[#31313A] rounded-lg text-xl disabled:bg-[#B6B7C3] disabled:text-[#251F1F] border-2 border-solid border-[#31313A]',
        className,
      )}
      onClick={disabled ? () => null : onClick}
      disabled={disabled || loading}
    >
      {!loading ? (
        children
      ) : (
        <Image
          src="/images/detail/spin.svg"
          width={20}
          height={20}
          alt="spin"
        />
      )}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
    </button>
  );
};

export default memo(ButtonCustom);
