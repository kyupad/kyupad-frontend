import React, { memo } from 'react';

function TokenSale() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl font-bold">Contract metrics & Vesting</h3>

      <div className="flex flex-col gap-3 max-w-[732px]">
        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">Token Symbol</span>
          <span className="font-bold text-kyu-color-11">STAR</span>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">Contract address</span>
          <span className="font-bold text-kyu-color-11 break-all">
            0x3174Eeb8c8fCa1385d2955878Fd188771Fe2c6Ab
          </span>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">
            Initial Market Cap
          </span>
          <span className="font-bold text-kyu-color-11">$657,000</span>
        </div>

        <div className="h-[0.25px] w-full bg-[#444451]" />

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">Vesting Type</span>
          <span className="font-bold text-kyu-color-11">Milestone</span>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">Vesting Schedule</span>
          <span className="font-bold text-kyu-color-11 break-all">
            15% TGE, 1-Month Cliff, Then Monthly Vesting In 4 Months
          </span>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">
            Token Distribute time
          </span>
          <span className="font-bold text-kyu-color-11">
            07:30 AM UTC, March 7, 2024
          </span>
        </div>
      </div>

      <h3 className="text-2xl font-bold">Restricted</h3>

      <p>
        Afghanistan, Angola, Bahamas, Bosnia and Herzegovina, Botswana, Burundi,
        Cambodia, Cameroon, Canada, Chad, China, Congo (Congo-Brazzaville),
        Cuba, Democratic, Republic of the Congo, Eritrea, Ethiopia, Ghana,
        Guinea, Guinea-Bissau, Haiti, Iran, Iraq, Laos, Libya, Madagascar,
        Mozambique, Nicaragua, North Korea, Pakistan, Serbia, Seychelles,
        Somalia, South Sudan, Sri Lanka, Sudan, Syria, Tajikistan, Trinidad and
        Tobago, Tunisia, Turkmenistan, Uganda, United States of America,
        Uzbekistan, Vanuatu, Venezuela, Yemen, Zimbabwe.
      </p>

      <h3 className="text-2xl font-bold">Terms & Conditions</h3>

      <p>
        Afghanistan, Angola, Bahamas, Bosnia and Herzegovina, Botswana, Burundi,
        Cambodia, Cameroon, Canada, Chad, China, Congo (Congo-Brazzaville),
        Cuba, Democratic, Republic of the Congo, Eritrea, Ethiopia, Ghana,
        Guinea, Guinea-Bissau, Haiti, Iran, Iraq, Laos, Libya, Madagascar,
        Mozambique, Nicaragua, North Korea, Pakistan, Serbia, Seychelles,
        Somalia, South Sudan, Sri Lanka, Sudan, Syria, Tajikistan, Trinidad and
        Tobago, Tunisia, Turkmenistan, Uganda, United States of America,
        Uzbekistan, Vanuatu, Venezuela, Yemen, Zimbabwe.
      </p>
    </div>
  );
}

export default memo(TokenSale);
