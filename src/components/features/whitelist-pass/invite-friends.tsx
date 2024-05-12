'use client';

import React, { memo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { doGeneraRefererLink } from '@/adapters/whitelist-pass';
import PrimaryButton from '@/components/common/button/primary';
import { ShowAlert } from '@/components/common/toast';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/tooltip';
import { useGlobalStore } from '@/contexts/global-store-provider';
import infoIcon from 'public/images/detail/info-icon.svg';
import checkedIcon from 'public/images/my-space/check.svg';
import copyIcon from 'public/images/my-space/copy.svg';
import { useCopyToClipboard } from 'usehooks-ts';

function InviteFriends() {
  // eslint-disable-next-line no-unused-vars
  const [_, copy] = useCopyToClipboard();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [copySuccess, setCopySuccess] = React.useState<boolean>(false);
  const isSolanaConnected = useGlobalStore(
    (state) => state.is_solana_connected,
  );
  const [openTooltip, setOpenTooltip] = React.useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copySuccess) {
      timer = setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [copySuccess]);

  const renderReferIcon = () => {
    if (!isSolanaConnected) {
      return (
        <Image
          src={infoIcon}
          alt="info"
          width={20}
          height={20}
          draggable={false}
        />
      );
    }

    if (copySuccess) {
      return (
        <Image
          src={checkedIcon}
          width={20}
          height={20}
          alt="copy success"
          draggable={false}
        />
      );
    }

    return (
      <Image
        src={copyIcon}
        width={20}
        height={20}
        alt="copy"
        draggable={false}
      />
    );
  };

  const handleRefer = async () => {
    const waitToCall = () =>
      new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      setLoading(true);
      await waitToCall();
      const referLink = await doGeneraRefererLink();

      if (referLink?.data?.ref_url) {
        await copy(referLink.data?.ref_url);
        setCopySuccess(true);
        ShowAlert.success({
          message: 'Refer link copied to clipboard!',
        });
        return;
      }

      ShowAlert.error({
        message: 'Failed to generate refer link. Please try again!',
      });
    } catch (e) {
      ShowAlert.error({
        message: 'Failed to generate refer link. Please try again!',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenTooltip = useCallback((value: boolean) => {
    setOpenTooltip(value);
  }, []);
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip open={openTooltip}>
        <TooltipTrigger asChild>
          <div>
            <PrimaryButton
              onTouchStart={() => {
                if (!isSolanaConnected) {
                  handleOpenTooltip(!openTooltip);
                }
              }}
              onMouseOver={() => {
                if (!isSolanaConnected) {
                  handleOpenTooltip(true);
                }
              }}
              onMouseOut={() => {
                if (!isSolanaConnected) {
                  handleOpenTooltip(false);
                }
              }}
              disabled={!isSolanaConnected}
              loading={loading}
              onClick={handleRefer}
              block
            >
              {loading ? 'Generating...' : `Invite Friends`}&nbsp;
              {renderReferIcon()}
            </PrimaryButton>
          </div>
        </TooltipTrigger>
        {!isSolanaConnected && (
          <TooltipContent className="max-w-[274px] px-5 py-4">
            <p className="text-base font-medium text-justify">
              Please connect wallet to invite friends!
            </p>
            <TooltipArrow fill="#8E8FA2" />
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default memo(InviteFriends);
