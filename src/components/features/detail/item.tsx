import React from 'react';
import clsx from 'clsx';

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
  <div className={clsx('w-2/5 py-2', className)}>
    <span className={clsx('w-2/4 inline-block text-xl', labelClassName)}>
      {title}
    </span>
    <span
      className={clsx(
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
}) => <div className={clsx('', className)}>{children}</div>;

export { Item, ModalItems };
