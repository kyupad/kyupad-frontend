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
import { useSessionStore } from '@/contexts/session-store-provider';
import { isFloat } from '@/utils/helpers';
import PrimaryButton from '@components/common/button/primary';

function InvestMorePopup({
  children,
  amount,
  handleInvest,
  loading,
  visible,
  setVisible,
}: {
  children: ReactNode;
  amount?: number;
  handleInvest: (_: any, numberTicket: number) => void;
  loading?: boolean;
  visible: boolean;
  setVisible: (_: boolean) => void;
}) {
  const [numberTicket, setNumberTicket] = useState<number>(1);
  const investedTickets = useSessionStore((state) => state.investedTickets);

  const handleChangeNumberTicket = useCallback((e: any) => {
    const value = e.target.value;

    return setNumberTicket(value);
  }, []);

  const renderError = useCallback(() => {
    if (!Number(numberTicket)) {
      return (
        <div className="text-red-500 text-sm">
          Please enter the number of tickets
        </div>
      );
    }

    if (isFloat(Number(numberTicket))) {
      return (
        <div className="text-red-500 text-sm">
          The number of tickets must be an integer
        </div>
      );
    }

    if (Number(numberTicket) < 1) {
      return (
        <div className="text-red-500 text-sm">
          The number of tickets must be greater than 0
        </div>
      );
    }
    if (amount && Number(numberTicket) > amount) {
      return (
        <div className="text-red-500 text-sm">
          You can&apos;t invest more than {amount} tickets
        </div>
      );
    }

    if (Number(numberTicket) > (investedTickets || 0)) {
      return (
        <div className="text-red-500 text-sm">
          You can&apos;t invest more than {investedTickets} tickets
        </div>
      );
    }
  }, [amount, investedTickets, numberTicket]);

  const validator = (cb: Function) => {
    if (!numberTicket) {
      return ShowAlert.error({
        message: 'Please enter the number of tickets',
      });
    }

    if (isFloat(numberTicket)) {
      return ShowAlert.error({
        message: 'The number of tickets must be an integer',
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

    if (Number(numberTicket) > (investedTickets || 0)) {
      return ShowAlert.error({
        message: `You can't invest more than ${investedTickets} tickets`,
      });
    }

    return cb(undefined, numberTicket);
  };

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
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
