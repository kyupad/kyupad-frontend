import React, { memo } from 'react';
import { doGetSeasonActive } from '@/actions/whitelist-pass';

async function MyTotalNftMinted() {
  const data = await doGetSeasonActive();
  return (
    <div className="-mt-10">
      <>
        <span className="font-medium text-kyu-color-14">
          {!data?.data?.season?.my_minted_total &&
          data?.data?.season?.my_minted_total !== 0
            ? null
            : ' Total Whitelist Pass NFT minted: '}
        </span>
        <span className="font-bold">
          {!data?.data?.season?.my_minted_total &&
          data?.data?.season?.my_minted_total !== 0
            ? null
            : data?.data?.season?.my_minted_total}
        </span>
      </>
    </div>
  );
}

export default memo(MyTotalNftMinted);
