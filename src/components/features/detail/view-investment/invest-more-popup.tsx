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
import { ShowAlert } from '@/components/common/toast';
import PrimaryButton from '@components/common/button/primary';

function InvestMorePopup({
  children,
  amount,
  handleInvest,
  loading,
}: {
  children: ReactNode;
  amount?: number;
  handleInvest: (_: any, numberTicket: number) => void;
  loading?: boolean;
}) {
  const [numberTicket, setNumberTicket] = useState<number>(1);

  const handleChangeNumberTicket = useCallback((e: any) => {
    const value = e.target.value;

    return setNumberTicket(value);
  }, []);

  const renderError = useCallback(() => {
    if (!numberTicket) {
      return (
        <div className="text-red-500 text-sm">
          Please enter the number of tickets
        </div>
      );
    }

    if (numberTicket < 1) {
      return (
        <div className="text-red-500 text-sm">
          The number of tickets must be greater than 0
        </div>
      );
    }
    if (amount && numberTicket > amount) {
      return (
        <div className="text-red-500 text-sm">
          You can&apos;t invest more than {amount} tickets
        </div>
      );
    }
  }, [amount, numberTicket]);

  const validator = (cb: Function) => {
    if (!numberTicket) {
      return ShowAlert.error({
        message: 'Please enter the number of tickets',
      });
    }

    if (numberTicket < 1) {
      return ShowAlert.error({
        message: 'The number of tickets must be greater than 0',
      });
    }
    if (amount && numberTicket > amount) {
      return ShowAlert.error({
        message: `You can't invest more than ${amount} tickets`,
      });
    }

    return cb(undefined, numberTicket);
  };
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
            value={numberTicket}
            label=""
            type="number"
            max={amount || 1}
            min={1}
            placeholder="1"
            onChange={handleChangeNumberTicket}
          />
          {renderError()}
        </div>
        <DialogFooter className="-mt-3">
          <PrimaryButton
            disabled={loading}
            loading={loading}
            block
            onClick={() => validator(handleInvest)}
          >
            Invest
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(InvestMorePopup);
