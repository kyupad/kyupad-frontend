import React, { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { ReloadIcon } from '@radix-ui/react-icons';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion';
import PrimaryButton from '../button/primary';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../dialog';

function WalletNotConnect({
  loading,
  setLoading,
  signin,
}: {
  loading?: boolean;
  setLoading?: Function;
  signin: Function;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { wallets, select } = useWallet();

  const handleOpen = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  const { is_agree_terms, agreeTerms } = useGlobalStore((state) => state);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <PrimaryButton
        className="min-h-[52px] w-[220px] flex items-center justify-center text-xl"
        onClick={() => handleOpen(!open)}
        disabled={loading}
      >
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}{' '}
        {loading ? 'Connecting' : 'Connect Wallet'}
      </PrimaryButton>
      <DialogContent className="sm:max-w-[680px] bg-kyu-color-12 p-10 rounded-[16px] border-2 border-kyu-color-11">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            {!is_agree_terms
              ? 'Acknowledge Terms'
              : 'How would you like to connect to Kyupad?'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid text-xl">
          {!is_agree_terms ? (
            <div className="flex flex-col gap-3">
              <p className="text-justify">
                By continuing, you agree to the Kyupad Terms and Conditions and
                acknowledge that you have read and understood the Kyupad
              </p>
              <div>
                <PrimaryButton onClick={agreeTerms}>
                  Agree and continue
                </PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {wallets
                .filter((wl) =>
                  ['Phantom', 'Backpack', 'Solflare'].includes(wl.adapter.name),
                )
                .map((wl) => {
                  return (
                    <button
                      className="hover:bg-kyu-color-2 py-2 px-2"
                      key={wl.adapter.name}
                      onClick={async () => {
                        try {
                          handleOpen(false);
                          if (wl.readyState !== WalletReadyState.Installed) {
                            window.open(wl.adapter.url, '_blank');
                            return;
                          }

                          select(wl.adapter.name);
                          await signin(wl.adapter);
                        } catch (e) {
                          setLoading && setLoading(false);

                          return false;
                        } finally {
                          setLoading && setLoading(false);
                        }
                      }}
                    >
                      <div className="flex gap-2 justify-between items-center flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className="min-w-9">
                            <Image
                              src={wl.adapter.icon}
                              alt={wl.adapter.name}
                              height={36}
                              width={36}
                            />
                          </div>
                          {wl.adapter.name}
                        </div>
                        {wl.readyState === WalletReadyState.Installed ? (
                          wl.adapter.connected ? (
                            <span className="text-green-500">Connected</span>
                          ) : (
                            <span className="text-orange-500">Detected</span>
                          )
                        ) : (
                          <span className="text-red-500">Not Installed</span>
                        )}
                      </div>
                    </button>
                  );
                })}

              <div className="mt-4">
                <div className="h-0.5 w-full bg-kyu-color-6" />
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className="text-2xl font-bold hover:no-underline"
                    icon={wallets
                      .filter(
                        (wl) =>
                          !['Phantom', 'Backpack', 'Solflare'].includes(
                            wl.adapter.name,
                          ),
                      )
                      .slice(0, 3)}
                  >
                    <div>Other Wallets</div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col text-xl">
                    {wallets
                      .filter(
                        (wl) =>
                          !['Phantom', 'Backpack', 'Solflare'].includes(
                            wl.adapter.name,
                          ),
                      )
                      .map((wl) => {
                        return (
                          <button
                            className="hover:bg-kyu-color-2 py-2 px-2"
                            key={wl.adapter.name}
                            onClick={async () => {
                              try {
                                handleOpen(false);
                                if (
                                  wl.readyState !== WalletReadyState.Installed
                                ) {
                                  window.open(wl.adapter.url, '_blank');
                                  return;
                                }

                                select(wl.adapter.name);
                                await signin(wl.adapter);
                              } catch (e) {
                                setLoading && setLoading(false);

                                return false;
                              } finally {
                                setLoading && setLoading(false);
                              }
                            }}
                          >
                            <div className="flex gap-2 justify-between items-center flex-wrap">
                              <div className="flex items-center gap-3">
                                <div className="min-w-9">
                                  <Image
                                    src={wl.adapter.icon}
                                    alt={wl.adapter.name}
                                    height={36}
                                    width={36}
                                  />
                                </div>
                                {wl.adapter.name}
                              </div>
                              {wl.readyState === WalletReadyState.Installed ? (
                                wl.adapter.connected ? (
                                  <span className="text-green-500">
                                    Connected
                                  </span>
                                ) : (
                                  <span className="text-orange-500">
                                    Installed
                                  </span>
                                )
                              ) : (
                                <span className="text-red-500">
                                  Not Installed
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}

export default memo(WalletNotConnect);
