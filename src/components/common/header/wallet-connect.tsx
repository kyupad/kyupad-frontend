'use client';

import React, { memo, useCallback, useState } from 'react';
import { useGlobalStore } from '@/contexts/global-store-provider';
import {
  ACCESS_TOKEN_COOKIE_CONFIG,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_STORAGE_KEY,
} from '@/utils/constants';
import { EWalletName } from '@/utils/enums/solana';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import { SolanaSignInInput } from '@solana/wallet-standard-features';
import bs58 from 'bs58';
import { getCookie } from 'cookies-next';

import { ShowAlert } from '../toast';
import WalletConnected from './wallet-connected';
import WalletNotConnect from './wallet-not-connect';

interface IWalletConnectProps {
  doGetSignInData: Function;
  doVerifySignInWithSolana: Function;
  setCookie: Function;
  revalidatePath: Function;
  block?: boolean;
}

function WalletConnect({
  doGetSignInData,
  doVerifySignInWithSolana,
  setCookie,
  revalidatePath,
  block,
}: IWalletConnectProps) {
  const { connecting, disconnecting } = useWallet();
  const accessToken = getCookie(ACCESS_TOKEN_STORAGE_KEY);

  const [loading, setLoading] = useState<boolean>(false);

  const handleLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  const { is_solana_connected: isSolanaConnected, changeSolanaConnection } =
    useGlobalStore((state) => state);

  const signInWithSolana = useCallback(
    async (adapter: Adapter) => {
      if (!('signIn' in adapter)) return true;
      setLoading(true);

      const input: { data: SolanaSignInInput } = await doGetSignInData();

      if (!input?.data) {
        ShowAlert.error({ message: (input as any)?.message });
        return false;
      }

      let output: any = {};
      let outputParse: any = {};
      const w = window as any;

      switch (adapter.name) {
        case EWalletName.Phantom:
          output = await window?.solana?.signIn({ ...input?.data });
          outputParse = {
            account: {
              publicKey: bs58.encode(
                new Uint8Array(output?.address?.toBuffer()),
              ),
              address: output?.address?.toBase58(),
            },
            signature: bs58.encode(output.signature),
            signedMessage: bs58.encode(output.signedMessage),
          };
          break;
        case EWalletName.Backpack:
          output = await w?.xnft?.solana?.signIn({ ...input?.data });
          outputParse = {
            account: {
              publicKey: bs58.encode(output?.account?.publicKey),
              address: output?.account?.address,
            },
            signature: bs58.encode(output.signature),
            signedMessage: bs58.encode(output.signedMessage),
          };
          break;
        default:
      }

      const resultVerify = await doVerifySignInWithSolana(
        input?.data,
        outputParse,
      );

      if (!resultVerify?.data && resultVerify?.message) {
        ShowAlert.error({ message: resultVerify.message });
        return false;
      }

      const { access_token, refresh_token } = resultVerify.data;

      await Promise.all([
        setCookie(
          ACCESS_TOKEN_STORAGE_KEY,
          access_token,
          ACCESS_TOKEN_COOKIE_CONFIG,
        ),
        setCookie(
          REFRESH_TOKEN_STORAGE_KEY,
          refresh_token,
          REFRESH_TOKEN_COOKIE_CONFIG,
        ),
      ]);

      changeSolanaConnection(true);
      window.location.reload();
    },
    [doGetSignInData, doVerifySignInWithSolana, setCookie],
  );

  return (
    <>
      {accessToken && isSolanaConnected ? (
        <WalletConnected revalidatePath={revalidatePath} />
      ) : (
        <WalletNotConnect
          loading={loading || connecting || disconnecting}
          setLoading={handleLoading}
          signin={signInWithSolana}
          block={block}
        />
      )}
    </>
  );
}

export default memo(WalletConnect);
