'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import { useGlobalStore } from '@/contexts/global-store-provider';
import {
  ACCESS_TOKEN_COOKIE_CONFIG,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_STORAGE_KEY,
  THROW_EXCEPTION,
} from '@/utils/constants';
import { ENETWORK_ID } from '@/utils/enums/common';
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes';
import { Adapter } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
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
  const {
    connecting,
    disconnecting,
    signMessage,
    select,
    connect,
    publicKey,
    autoConnect,
    connected,
  } = useWallet();
  const [isClickLogin, setIsClickLogin] = useState<boolean>(false);

  useEffect(() => {
    if (autoConnect && !connected) {
      connect();
    }
  }, [autoConnect, connect, connected]);

  const accessToken = getCookie(ACCESS_TOKEN_STORAGE_KEY);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (connected && isClickLogin) {
      setLoading(true);
      const autoSignin = async () => {
        try {
          const signinData = await doGetSignInData({
            publicKey: publicKey?.toBase58(),
          });
          if (!signinData?.data) {
            console.error(signinData?.message);
            ShowAlert.error({ message: THROW_EXCEPTION.UNKNOWN_TRANSACTION });
            return false;
          }
          const encodedMessage = new TextEncoder().encode(
            signinData.data?.message,
          );
          if (!signMessage) return true;
          const signature = await signMessage(encodedMessage);
          const resultVerify = await doVerifySignInWithSolana({
            message: signinData.data?.message,
            signature: bs58.encode(signature),
            publicKey: publicKey?.toBase58(),
            network: ENETWORK_ID.solana,
          });
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
        } catch (e) {
          console.error(e);
        } finally {
          setIsClickLogin(false);
          setLoading(false);
        }
      };

      autoSignin();
    }
  }, [connected, publicKey, signMessage, isClickLogin]);

  const handleLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

  const { is_solana_connected: isSolanaConnected, changeSolanaConnection } =
    useGlobalStore((state) => state);

  const signInWithSolana = useCallback(
    async (adapter: Adapter) => {
      setLoading(true);
      select(adapter.name);
      setIsClickLogin(true);
    },
    [select],
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
