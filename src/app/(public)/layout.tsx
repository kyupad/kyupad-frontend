/* eslint-disable import/no-unused-modules */
import '@styles/globals.css';

import Image from 'next/image';
import yellowCloud from 'public/images/footer/yellow-cloud.png';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main className="overflow-hidden min-h-screen relative pb-[100px] md:pb-[200px] lg:pb-[300px] mt-8 md:mt-0 pt-3">
          {children}
          <Image
            src={yellowCloud}
            className="absolute bottom-0 left-0"
            alt="yellow cloud"
          />
        </main>
      </body>
    </html>
  );
}
