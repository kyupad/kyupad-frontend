'use client';

import React, { memo, useEffect } from 'react';
import Image from 'next/image';
import { doGeneraRefererLink } from '@/adapters/whitelist-pass';
import PrimaryButton from '@/components/common/button/primary';
import { ShowAlert } from '@/components/common/toast';
import checkedIcon from 'public/images/my-space/check.svg';
import copyIcon from 'public/images/my-space/copy.svg';
import { useCopyToClipboard } from 'usehooks-ts';

function InviteFriends() {
  // eslint-disable-next-line no-unused-vars
  const [_, copy] = useCopyToClipboard();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [copySuccess, setCopySuccess] = React.useState<boolean>(false);

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

  const handleRefer = async () => {
    const waitToCall = () =>
      new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      setLoading(true);
      await waitToCall();
      const referLink = await doGeneraRefererLink();

      if (referLink?.data?.prefer_url) {
        await copy(referLink.data?.prefer_url);
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
  return (
    <PrimaryButton loading={loading} onClick={handleRefer}>
      {loading ? 'Generating...' : `Invite Friends`}&nbsp;
      {copySuccess ? (
        <Image src={checkedIcon} width={20} height={20} alt="copy success" />
      ) : (
        <Image src={copyIcon} width={20} height={20} alt="copy" />
      )}
    </PrimaryButton>
  );
}

export default memo(InviteFriends);
