import 'server-only';

import { revalidatePath } from 'next/cache';

const revalidateCurrentPath = async (path: string) => {
  'use server';
  revalidatePath(path);
};

export { revalidateCurrentPath };
