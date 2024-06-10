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
import { isFloat } from '@/utils/helpers';
import PrimaryButton from '@components/common/button/primary';

function ClaimMorePopup({
  children,
  amount,
  handleClaim,
  loading,
  visible,
  setVisible,
  tokenSymbol,
}: {
  children: ReactNode;
  amount?: number;
  handleClaim: (_: any, amount: number) => void;
  loading?: boolean;
  visible: boolean;
  setVisible: (_: boolean) => void;
  tokenSymbol: string;
}) {
  const [amountToken, setAmountToken] = useState<number>(1);

  const handleChangeAmountToken = useCallback((e: any) => {
    const value = e.target.value;

    return setAmountToken(value);
  }, []);

  const renderError = useCallback(() => {
    if (!Number(amountToken)) {
      return (
        <div className="text-red-500 text-sm">
          Please enter the number of tokens.
        </div>
      );
    }

    if (isFloat(Number(amountToken))) {
      return (
        <div className="text-red-500 text-sm">
          The number of tokens must be an integer.
        </div>
      );
    }

    if (Number(amountToken) < 1) {
      return (
        <div className="text-red-500 text-sm">
          The number of tokens must be greater than 0.
        </div>
      );
    }

    if (amount && Number(amountToken) > amount) {
      return (
        <div className="text-red-500 text-sm">
          You can&apos;t claim more than {Math.floor(Number(amount))} tokens.
        </div>
      );
    }
  }, [amountToken, amount]);

  const validator = (cb: Function) => {
    if (!amountToken) {
      return ShowAlert.error({
        message: 'Please enter the number of tokens!',
      });
    }

    if (isFloat(amountToken)) {
      return ShowAlert.error({
        message: 'The number of tokens must be an integer!',
      });
    }

    if (amountToken < 1) {
      return ShowAlert.error({
        message: 'The number of tokens must be greater than 0!',
      });
    }

    if (amount && amountToken > amount) {
      return ShowAlert.error({
        message: `You can't claim more than ${Math.floor(Number(amount))} tokens!`,
      });
    }

    return cb(undefined, amountToken);
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
              {amount && amount < 10
                ? `0${amount?.toLocaleString('en-US')}`
                : amount?.toLocaleString('en-US')}
            </span>{' '}
            {tokenSymbol?.toUpperCase() || ''} to claim
          </DialogTitle>
          <DialogDescription>
            Enter the number of tokens to claim
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            value={amountToken}
            label=""
            type="number"
            max={amount || 1}
            min={1}
            placeholder="1"
            onChange={handleChangeAmountToken}
            actionMore={{
              name: 'Max',
              onClick: () => {
                setAmountToken(Math.floor(Number(amount || 1)));
              },
            }}
            className="pr-20"
          />

          {renderError()}
        </div>
        <DialogFooter className="-mt-3">
          <PrimaryButton
            disabled={loading}
            loading={loading}
            block
            onClick={() => validator(handleClaim)}
          >
            Claim
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ClaimMorePopup);
