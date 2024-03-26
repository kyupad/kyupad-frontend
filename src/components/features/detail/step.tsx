import React, { memo, useContext } from 'react';
import {
  DetailContext,
  DetailContextProps,
} from '@/components/common/context/detai-context';
import { cn, convertUTCtime } from '@/utils/helpers';

const Step = () => {
  const { step, registration, stepInfo } =
    useContext<DetailContextProps>(DetailContext);
  // const data = [registration, snapshot, investment, claim];
  return (
    <div className="*:py-2">
      <div
        className={cn(
          'flex p-8 border-2 border-[#31313A] rounded-md w-full ',
          registration.registed &&
            '[&>*:nth-child(2)]:before:absolute [&>*:nth-child(2)>:nth-child(2)>:first-child]:before:bg-[#f2820e] [&>*:nth-child(2)>:nth-child(2)>:first-child]:border-[#f2820e]   [&>*:nth-child(2)]:before:top-[50%] [&>*:nth-child(2)]:before:left-0 [&>*:nth-child(2)]:before:bg-[#f2820e]  [&>*:nth-child(2)]:before:w-2/4 [&>*:nth-child(2)]:before:h-1 [&>*:nth-child(2)]:before:z-10',
        )}
      >
        {stepInfo.map((item, index) => (
          <div
            className={cn(
              'first:w-1/12  last:w-1/12  flex-auto items-center  relative after:absolute after:w-full after:h-1 after:top-[50%] flex flex-col  first:items-start last:items-end after:left-0 after:-z-1 after:bg-[#b6b7c3]',
              registration.registed && 'first:after:bg-[#f2820e]',
            )}
            key={index}
          >
            <h2 className="text-2xl font-bold py-2">{item.step}</h2>
            <div className="absolute top-[44%]">
              <span
                className={cn(
                  'block w-4 h-4 rounded-full z-30 border relative before:absolute before:w-1 before:h-1 before:top-[36%] before:left-[36%] border-[#b6b7c3] bg-white  before:rounded-full',
                  step === item.id && 'before:bg-[#f2820e] border-[#f2820e]',
                  step === item.id &&
                    registration.registed &&
                    'bg-[#f2820e] before:w-[5px] before:h-[10px] z-50 before:border-white before:border-t-0 before:border-r-2 before:top-[15%] before:border-b-2 before:border-l-0 before:rotate-45 before:bg-none before:rounded-none',
                )}
              ></span>
            </div>
            <b className="mt-7">{item.title}</b>
            <span>{convertUTCtime(item.datetime)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
// eslint-disable-next-line import/no-unused-modules
export default memo(Step);
