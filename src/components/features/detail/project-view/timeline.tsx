import React, { useContext } from 'react';
import { DetailContext, DetailContextProps } from '@/contexts/detai-context';
import { convertUTCtime } from '@/utils/helpers';

const Timeline = () => {
  const { stepInfo } = useContext<DetailContextProps>(DetailContext);
  return (
    <main className="relative min-h-screen max-w-8xl mx-auto py-5' justify-center bg-slate-50 overflow-hidden">
      <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
        <div className="w-full  pl-[110px] mr-0">
          <div className="-my-6">
            {stepInfo.map((item, index) => (
              <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
                <div className="flex  flex-col sm:flex-row  items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3">
                  <time className="sm:absolute -left-24 top-5 translate-y-0.5 flex flex-col items-start w-fit justify-center font-bold text-2xl rounded-2xl">
                    <p>{item.title}</p>
                    <p>Period</p>
                  </time>
                  <div className="absolute top-3 left-2 z-10 sm:left-0 w-10 h-10  bg-[#25252C] flex justify-center items-center text-2xl text-[#FABF52] border-4 box-content border-slate-50 rounded-2xl sm:ml-[6.5rem] -translate-x-1/2 translate-y-1.5">
                    {index + 1}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 ml-6">
                    {convertUTCtime(item.datetime)}
                  </div>
                </div>
                <div
                  className="text-[#5A5B6F] text-base ml-6"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Timeline;
