import { Metadata } from 'next';
import { env } from 'env.mjs';

const META_DATA_DEFAULT: Metadata = {
  applicationName: 'Kyupad',
  authors: {
    name: 'Kyu Gang',
    url: 'https://twitter.com/Kyupad_xyz',
  },
  creator: 'Kyu Team',
  description:
    'Whisker Winning Launchpad built on Solana endeavors to seek Midas-touch Alpha for Degens',
  keywords: ['kyupad', 'solana', 'community', 'launchpad'],
  title: {
    template: '%s | Kyupad',
    default: 'Kyupad',
  },
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    title: 'Kyupad | The Whisker-Winning',
    description:
      'Whisker Winning Launchpad built on Solana endeavors to seek Midas-touch Alpha for Degens',
    url: env.NEXT_PUBLIC_BASE_URL,
    type: 'website',
    siteName: 'Kyupad',
    locale: 'en_US',
    images: [
      {
        url: `${env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/public/og.png'`,
        width: 1200,
        height: 630,
        alt: 'Kyupad',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyupad | The Whisker-Winning',
    description:
      'Whisker Winning Launchpad built on Solana endeavors to seek Midas-touch Alpha for Degens',
    creator: '@Kyupad_xyz',
    images: [`${env.NEXT_PUBLIC_AWS_S3_BUCKET_URL}/public/og.png`],
  },
};

export { META_DATA_DEFAULT };
