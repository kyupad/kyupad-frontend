'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import errorToast from 'public/images/common/error-toast.svg';
import spin from 'public/images/common/spin.svg';
import successToast from 'public/images/common/sussess-toast.svg';
import warningToast from 'public/images/common/warning-toast.svg';
import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const SonnerToaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={'light'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-kyu-color-11 group-[.toaster]:shadow-lg min-w-[250px] lg:min-w-[384px] p-[40px] rounded-[16px] border-2',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          icon: 'w-[60px] h-[60px] mx-auto',
          closeButton:
            'right-[10px] top-[20px] absolute left-[unset] bg-[black] hover:!bg-[black] toast-close-btn',
        },
        unstyled: true,
      }}
      {...props}
      position="top-right"
      closeButton
      icons={{
        success: <Image src={successToast} alt="success" />,
        loading: <Image src={spin} alt="loading" />,
        error: <Image src={errorToast} alt="error" />,
      }}
    />
  );
};

interface IShowAlert {
  title?: string;
  message?: string | ReactNode;
}

const ShowAlert = {
  error: (props?: IShowAlert) => {
    return toast.error(
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 flex-col items-center">
          <div>
            <Image src={errorToast} alt="error" draggable={false} />
          </div>
          <h2 className="text-2xl font-bold text-[#F44646]">
            {props?.title || 'Error'}
          </h2>
        </div>

        {props?.message && <div className="h-[1px] bg-black" />}

        {props?.message && (
          <div className="text-center font-medium">{props.message}</div>
        )}
      </div>,
    );
  },

  success: (props?: IShowAlert) => {
    return toast.success(
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 flex-col items-center">
          <div>
            <Image src={successToast} alt="success" draggable={false} />
          </div>
          <h2 className="text-2xl font-bold text-[#18CF6A]">
            {props?.title || 'Successful'}
          </h2>
        </div>

        {props?.message && <div className="h-[1px] bg-black" />}

        {props?.message && (
          <div className="text-center font-medium">{props.message}</div>
        )}
      </div>,
    );
  },

  warning: (props?: IShowAlert) => {
    return toast.error(
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 flex-col items-center">
          <div>
            <Image src={warningToast} alt="warning" draggable={false} />
          </div>
          <h2 className="text-2xl font-bold text-[#F8A627]">
            {props?.title || 'Warning'}
          </h2>
        </div>

        {props?.message && <div className="h-[1px] bg-black" />}

        {props?.message && (
          <div className="text-center font-medium">{props.message}</div>
        )}
      </div>,
    );
  },
};

export { ShowAlert };

export default SonnerToaster;
