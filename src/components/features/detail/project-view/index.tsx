import React, { useContext } from 'react';
import { Tab, Tabs } from '@/components/common/tabs/tabs';
import { ContexType, detailContext } from '@/components/features/detail';

import { Item, ModalItems } from '../item';
import ProjectDescreption from './project-descreption';
import Timeline from './timeline';
import TokenSale from './token-sale';

const tabitem = [
  {
    key: '1',
    label: 'Project Descreption',
    children: <ProjectDescreption />,
  },
  {
    key: '2',
    label: 'timeline',
    children: <Timeline />,
  },
  {
    key: '3',
    label: 'token',
    children: <TokenSale />,
  },
];

const ProjectView = () => {
  const {
    totalRaised,
    tokenOffered,
    priceTransfer,
    ticketSize,
    paticipants,
    totalAssetsConnected,
  } = useContext<ContexType | any>(detailContext);

  return (
    <div>
      <ModalItems className=" mx-auto bg-[#FDEDC8] py-4 rounded-sm border-2 border-[#25252C]">
        <div className="flex justify-around">
          <Item title={'Total Raise'} value={totalRaised} />
          <Item title={'Token Offered'} value={tokenOffered} />
        </div>
        <div className="flex justify-around">
          <Item title={'Price'} value={`${1} STAR = ${priceTransfer} USDT`} />
          <Item title={'Ticket size'} value={ticketSize + ' USDT'} />
        </div>
        <div className="flex justify-around border-t border-gray-400">
          <Item title={'Total Assets Connected'} value={totalAssetsConnected} />
          <Item title={'Participants'} value={paticipants} />
        </div>
      </ModalItems>
      <Tabs className="py-5 mt-5">
        {tabitem.map((item) => (
          <Tab key={item.key} label={item.label}>
            {item.children}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default ProjectView;
