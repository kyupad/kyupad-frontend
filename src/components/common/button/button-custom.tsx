import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: string | React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
const ButtonCustom = ({
  children,
  onClick,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'bg-[#FABF52] hover:bg-button-primary-hover transition-all overflow-hidden hover:shadow-[8px_8px_0px_0px_#2a273a26] active:shadow-none group relative overflow-hiddenfont-bold py-3 px-12 text-[#31313A] rounded-lg w-fit text-xl disabled:bg-[#B6B7C3] disabled:text-[#251F1F] border-2 border-solid border-[#31313A]',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
    </button>
  );
};

export default ButtonCustom;
