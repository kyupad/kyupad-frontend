import * as React from 'react';
import { cn } from 'src/utils/helpers';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="relative">
        <label
          htmlFor={props.id}
          className="font-bold absolute top-1/2 -translate-y-1/2 translate-x-3"
        >
          {label}
        </label>
        <input
          type={type}
          className={cn(
            'flex h-[52px] w-full rounded-[8px] border-2 border-kyu-color-11 bg-kyu-color-12 pl-16 pr-4 py-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-kyu-color-11',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
