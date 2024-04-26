import React, { memo } from 'react';
import { doGetSeasonActive } from '@/actions/whitelist-pass';

import MyTotalNftMintedClient from './client';

async function MyTotalNftMinted() {
  const data = await doGetSeasonActive();
  return (
    <div className="-mt-10">
      <MyTotalNftMintedClient
        mintedTotal={data?.data?.season?.my_minted_total}
      />
    </div>
  );
}

export default memo(MyTotalNftMinted);
