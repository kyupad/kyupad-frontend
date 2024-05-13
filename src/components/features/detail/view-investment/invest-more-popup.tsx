import React, { memo, ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { Input } from '@/components/common/input';
import PrimaryButton from '@components/common/button/primary';

function InvestMorePopup({
  children,
  amount,
}: {
  children: ReactNode;
  amount?: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            You have{' '}
            <span className="text-kyu-color-13">
              {amount && amount < 10 ? `0${amount}` : 0}
            </span>{' '}
            winning tickets
          </DialogTitle>
          <DialogDescription>
            Enter the number of tickets to invest
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            label=""
            type="number"
            max={amount || 1}
            min={1}
            placeholder="1"
            defaultValue={1}
          />
        </div>
        <DialogFooter className="-mt-3">
          <PrimaryButton block>Invest</PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(InvestMorePopup);
