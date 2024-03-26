import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import WebVitals from '@/components/features/web-vitals';
import { META_DATA_DEFAULT } from '@/utils/constants/seo';
import { cn } from '@/utils/helpers';

import '@styles/globals.css';

import dynamic from 'next/dynamic';
import { Nunito } from 'next/font/google';

const NextTopLoader = dynamic(() => require('nextjs-toploader')) as any;
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
    <html lang="en">
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <WebVitals />
        <NextTopLoader color="#f2820e" />
        <Header />
        <main className="overflow-hidden relative">{children}</main>
        <Footer />
        <SonnerToaster />
      </body>
    </html>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default RootLayout;

// eslint-disable-next-line import/no-unused-modules
export { metadata };
