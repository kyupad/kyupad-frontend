import React from 'react';
import { cn } from '@/utils/helpers';

type Props = {
  title: string;
  value: string | number;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

const Item = ({
  title,
  value,
  className,
  labelClassName,
  valueClassName,
}: Props) => (
  <div className={cn('w-2/5 py-2', className)}>
    <span className={cn('w-2/4 inline-block text-xl', labelClassName)}>
      {title}
    </span>
    <span
      className={cn(
        'w-2/4 inline-block text-2xl font-medium text-end',
        valueClassName,
      )}
    >
      {value}
    </span>
  </div>
);

const ModalItems = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn('', className)}>{children}</div>;

export { Item, ModalItems };
