'use client';

import * as React from 'react';
import Image from 'next/image';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Wallet } from '@solana/wallet-adapter-react';
import { cn } from 'src/utils/helpers';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger> & { icon: Wallet[] },
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    icon: Wallet[];
  }
>(({ className, children, icon, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline accordion-button',
        className,
      )}
      {...props}
    >
      {children}
      <div className="flex gap-4">
        <div className="flex gap-1">
          {icon?.map((icon) => (
            <Image
              key={icon.adapter.name}
              src={icon.adapter.icon}
              width={24}
              height={24}
              alt={icon.adapter.name}
            />
          ))}
        </div>
        <div>
          <Image
            className="h-6 w-6 shrink-0 transition-transform duration-200"
            src="/images/header/arrow-down.svg"
            width={24}
            height={24}
            alt="Arrow Down"
            id="arrow-down"
          />
        </div>
      </div>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
