import React from 'react';

import { Item, ModalItems } from '../item';

const TokenSale = () => {
  return (
    <div>
      <div className="py-10">
        <h2 className="text-2xl font-bold py-2">Contract metrics & Vesting</h2>
        <ModalItems className="w-full xl:w-3/5">
          <div className="w-full border-b border-b-[#444451]">
            <Item
              valueClassName="text-base font-bold"
              className="w-full"
              title="Token Symbol"
              value="STAR"
            />
            <Item
              valueClassName="text-base font-bold"
              className="w-full"
              title="Contract address"
              value="0x3174Eeb8c8fCa1385d2955878Fd188771Fe2c6Ab"
            />
            <Item
              valueClassName="text-base font-bold"
              className="w-full"
              title="Initial Market Cap"
              value="$657,000"
            />
          </div>

          <div className="w-full">
            <Item
              valueClassName="text-base font-bold"
              className="w-full"
              title="Vesting Type"
              value="Milestone"
            />
            <Item
              valueClassName="text-base font-bold"
              className="w-full"
              title="Vesting Schedule"
              value="15% TGE, 1-Month Cliff, Then Monthly Vesting In 4 Months"
            />
            <Item
              valueClassName="text-base font-bold"
              className="w-full"
              title="Token Distribute time"
              value="07:30 AM UTC, March 7, 2024"
            />
          </div>
        </ModalItems>
      </div>
      <div className="py-2">
        <h2 className="text-2xl font-bold py-2">Restricted</h2>
        <p>
          Afghanistan, Angola, Bahamas, Bosnia and Herzegovina, Botswana,
          Burundi, Cambodia, Cameroon, Canada, Chad, China, Congo
          (Congo-Brazzaville), Cuba, Democratic, Republic of the Congo, Eritrea,
          Ethiopia, Ghana, Guinea, Guinea-Bissau, Haiti, Iran, Iraq, Laos,
          Libya, Madagascar, Mozambique, Nicaragua, North Korea, Pakistan,
          Serbia, Seychelles, Somalia, South Sudan, Sri Lanka, Sudan, Syria,
          Tajikistan, Trinidad and Tobago, Tunisia, Turkmenistan, Uganda, United
          States of America, Uzbekistan, Vanuatu, Venezuela, Yemen, Zimbabwe.
        </p>
      </div>
      <div className="py-2">
        <h2 className="text-2xl font-bold py-2">Terms & Conditions</h2>
        <p>
          Afghanistan, Angola, Bahamas, Bosnia and Herzegovina, Botswana,
          Burundi, Cambodia, Cameroon, Canada, Chad, China, Congo
          (Congo-Brazzaville), Cuba, Democratic, Republic of the Congo, Eritrea,
          Ethiopia, Ghana, Guinea, Guinea-Bissau, Haiti, Iran, Iraq, Laos,
          Libya, Madagascar, Mozambique, Nicaragua, North Korea, Pakistan,
          Serbia, Seychelles, Somalia, South Sudan, Sri Lanka, Sudan, Syria,
          Tajikistan, Trinidad and Tobago, Tunisia, Turkmenistan, Uganda, United
          States of America, Uzbekistan, Vanuatu, Venezuela, Yemen, Zimbabwe.{' '}
        </p>
      </div>
    </div>
  );
};

export default TokenSale;
