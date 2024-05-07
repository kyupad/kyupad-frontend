import chalk from 'chalk';
import clsx, { ClassValue } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

function isEmpty(obj: Array<any> | object): boolean {
  if (!obj || typeof obj !== 'object') return !obj;

  if (Array.isArray(obj)) {
    return !obj.length;
  }

  return !Object.keys(obj).length;
}

function removeUndefinedAndNull(obj: Object) {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (
      obj[key as keyof Object] !== undefined &&
      obj[key as keyof Object] !== null
    ) {
      result[key as any] = obj[key as keyof Object];
    }
  }

  return result;
}

const logger = ({
  message,
  type,
}: {
  message: string;
  type: 'ERROR' | 'INFO';
}) => {
  switch (type) {
    case 'ERROR':
      console.error(chalk.red(message));
      break;

    default:
      console.info(chalk.blue(message));
      break;
  }
};

const getInfoDevice = () => {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
    ? 'MOBILE'
    : 'DESKTOP';
  const collapsed = device !== 'DESKTOP';

  return {
    device,
    collapsed,
  } as const;
};

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const convertUTCtime = (time: string) => {
  const dt = dayjs(time);
  const formattedDateTime = dt.format('MMM DD, YYYY HH:mm [UTC]');

  return formattedDateTime;
};

const debounceUseEffect = (callback: any, time: number) => {
  let interval: any;
  return () => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback();
    }, time);
  };
};

const debounce = (func: any, wait: number, immediate?: any) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    if (immediate && !timeout) func(...args);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func(...args);
    }, wait);
  };
};

export {
  removeUndefinedAndNull,
  isEmpty,
  logger,
  getInfoDevice,
  cn,
  convertUTCtime,
  debounce,
  debounceUseEffect,
};
