import React, { memo, ReactNode, useCallback, useState } from 'react';
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
  handleInvest,
  loading,
}: {
  children: ReactNode;
  amount?: number;
  handleInvest: (numberTicket: number) => void;
  loading?: boolean;
}) {
  const [numberTicket, setNumberTicket] = useState<number>(1);

  const handleChangeNumberTicket = useCallback((e: any) => {
    const value = e.target.value || 1;
    setNumberTicket(value);
  }, []);
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
            defaultValue={numberTicket}
            onChange={handleChangeNumberTicket}
          />
        </div>
        <DialogFooter className="-mt-3">
          <PrimaryButton
            disabled={loading}
            loading={loading}
            block
            onClick={() => handleInvest(numberTicket)}
          >
            Invest
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(InvestMorePopup);
