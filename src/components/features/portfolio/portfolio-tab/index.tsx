'use client';

import React, { memo } from 'react';
import Tabs from '@/components/common/tabs/tabs-custom';
import { PortfolioProps } from '@/mocks/portfolio-data';

import InvestmentsTab from './investments-tab';
import PaticipantsTab from './paticipaints-tab';

const PortfolioTabs = ({ props }: { props: PortfolioProps }) => {
  const tabitem = [
    {
      key: '1',
      label: 'My-investments',
      children: <InvestmentsTab data={props.investments} />,
    },
    {
      key: '2',
      label: 'My-paticipants',
      children: <PaticipantsTab data={props.paticipants} />,
    },
  ];
  return <Tabs gap={30} data={tabitem} />;
};

export default memo(PortfolioTabs);
