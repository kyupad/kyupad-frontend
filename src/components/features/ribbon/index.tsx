'use client';

import React, { memo, useEffect, useState } from 'react';

function Ribbon() {
  const [env, setEnv] = useState('');

  useEffect(() => {
    const hostname = window.location.hostname;
    switch (hostname) {
      case 'localhost':
        setEnv('LOCAL');
        break;
      default:
        if (hostname && hostname !== 'kyupad.xyz') {
          const arr = hostname?.split('.');
          if (arr && arr.length > 0) setEnv(arr[0]?.toUpperCase());
        }
        break;
    }
  }, []);

  return (
    <>
      {env && (
        <div className="fixed left-0 top-0 h-16 w-16">
          <div
            className="absolute transform -rotate-45 bg-kyu-color-4 text-center text-kyu-color-10 font-bold py-1 left-[-50px] top-[20px] w-[170px] font-sans shadow">
            {env}
          </div>
        </div>
      )}
    </>
  );
}

export default memo(Ribbon);
