import Header from '@/components/common/header';
import Ribbon from '@/components/features/ribbon';
import GlobalStoreProvider from '@/contexts/global-store-provider';
import SessionStoreProvider from '@/contexts/session-store-provider';
import WalletConnectProvider from '@/contexts/wallet-connect-provider';
import { META_DATA_DEFAULT } from '@/utils/constants/seo';
import { cn } from '@/utils/helpers';

import '@styles/globals.css';

import dynamic from 'next/dynamic';
import { Nunito } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

const Footer = dynamic(() => import('@/components/common/footer'));

const WebVitals = dynamic(() => import('@/components/features/web-vitals'));

const SonnerToaster = dynamic(() => import('@/components/common/toast/sonner'));

const fontSans = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  preload: true,
  display: 'swap',
});

const metadata = META_DATA_DEFAULT;

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WalletConnectProvider>
      <SessionStoreProvider>
        <GlobalStoreProvider>
          <html lang="en">
            <body
              className={cn(
                'min-h-screen font-sans antialiased scrollbar',
                fontSans.variable,
              )}
            >
              <WebVitals />
              <NextTopLoader color="#f2820e" />
              <Header />
              <main className="overflow-hidden relative">{children}</main>
              <Footer />
              <SonnerToaster />
              <Ribbon />
            </body>
          </html>
        </GlobalStoreProvider>
      </SessionStoreProvider>
    </WalletConnectProvider>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default RootLayout;

// eslint-disable-next-line import/no-unused-modules
export { metadata };
