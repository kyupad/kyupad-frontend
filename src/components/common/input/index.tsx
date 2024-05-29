import * as React from 'react';
import { cn } from 'src/utils/helpers';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  actionMore?: {
    name: string;
    onClick: () => void;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, actionMore, ...props }, ref) => {
    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={props.id}
            className="font-bold absolute top-1/2 -translate-y-1/2 translate-x-3"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-[52px] w-full rounded-[8px] border-2 border-kyu-color-11 bg-kyu-color-12 pr-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-kyu-color-11 font-medium',
            className,
            label ? 'pl-16' : 'pl-4',
          )}
          ref={ref}
          {...props}
        />
        {actionMore?.name && (
          <button
            onClick={actionMore?.onClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-[32px] bg-kyu-color-3 px-2 py-1 leading-none rounded-[8px] font-bold"
          >
            {actionMore.name?.toUpperCase() || ''}
          </button>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
