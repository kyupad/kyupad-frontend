import { revalidateCurrentPath } from '@/actions/common';
import Header from '@/components/common/header';
import Ribbon from '@/components/features/ribbon';
import GlobalStoreProvider from '@/contexts/global-store-provider';
import SessionStoreProvider from '@/contexts/session-store-provider';
import WalletConnectProvider from '@/contexts/wallet-connect-provider';
import { cn } from '@/utils/helpers';

import '@styles/globals.css';

import dynamic from 'next/dynamic';
import { Nunito } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

const SonnerToaster = dynamic(() => import('@/components/common/toast/sonner'));

const fontSans = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  preload: true,
  display: 'swap',
});

const ErrorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletConnectProvider>
      <SessionStoreProvider>
        <GlobalStoreProvider revalidatePath={revalidateCurrentPath}>
          <html lang="en">
            <body
              className={cn(
                'h-screen overflow-hidden font-sans antialiased scrollbar',
                fontSans.variable,
              )}
            >
              <Header />
              <NextTopLoader color="#f2820e" />
              <main className="relative mt-[40px] md:py-5 md:mt-[80px]">
                {children}
              </main>
              <SonnerToaster position="top-right" closeButton />
              <Ribbon />
            </body>
          </html>
        </GlobalStoreProvider>
      </SessionStoreProvider>
    </WalletConnectProvider>
  );
};
// eslint-disable-next-line import/no-unused-modules
export default ErrorLayout;
