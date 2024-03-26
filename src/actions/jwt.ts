import 'server-only';

import { cookies } from 'next/headers';

const setCookie = async (name: string, value: string, options: any) => {
  'use server';
  cookies().set(name, value, options);
};

export { setCookie };
