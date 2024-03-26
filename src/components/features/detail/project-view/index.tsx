import React, { useContext } from 'react';
import {
  DetailContext,
  DetailContextProps,
} from '@/components/common/context/detai-context';
import Tabs from '@/components/common/tabs/tabs-custom';
import { Item, ModalItems } from '@/components/features/detail/item';
import ProjectDescreption from '@/components/features/detail/project-view/project-descreption';
import Timeline from '@/components/features/detail/project-view/timeline';
import TokenSale from '@/components/features/detail/project-view/token-sale';
import { currencyFormatter } from '@/utils/helpers/currency';

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
  } = useContext<DetailContextProps>(DetailContext);

  return (
    <div>
      <ModalItems className=" mx-auto bg-[#FDEDC8] py-4 rounded-sm border-2 border-[#25252C]">
        <div className="flex justify-around">
          <Item
            title={'Total Raise'}
            value={currencyFormatter.format(totalRaised)}
          />
          <Item
            title={'Token Offered'}
            value={tokenOffered.toLocaleString('en-US') + ' STAR'}
          />
        </div>
        <div className="flex justify-around">
          <Item title={'Price'} value={`1 STAR = ${priceTransfer} USDT`} />
          <Item title={'Ticket size'} value={ticketSize + ' USDT'} />
        </div>
        <div className="flex justify-around border-t border-gray-400">
          <Item
            title={'Total Assets Connected'}
            value={currencyFormatter.format(totalAssetsConnected)}
          />
          <Item
            title={'Participants'}
            value={paticipants.toLocaleString('en-US')}
          />
        </div>
      </ModalItems>
      <Tabs className="py-5 mt-5" gap={30} data={tabitem} />
    </div>
  );
};

export default ProjectView;
