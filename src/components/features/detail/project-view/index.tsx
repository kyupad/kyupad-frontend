import React, { useContext } from 'react';
import Tabs from '@/components/common/tabs/tabs-custom';
import { Item, ModalItems } from '@/components/features/detail/item';
import ProjectDescreption from '@/components/features/detail/project-view/project-descreption';
import Timeline from '@/components/features/detail/project-view/timeline';
import TokenSale from '@/components/features/detail/project-view/token-sale';
import { DetailContext, DetailContextProps } from '@/contexts/detai-context';
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
    <>
      <div className="max-w-8xl mx-auto p-4">
        <ModalItems className=" bg-[#FDEDC8] py-4  px-6 rounded-lg border-2 border-[#25252C]">
          <div className="flex justify-between ">
            <Item
              title={'Total Raise'}
              value={currencyFormatter.format(totalRaised)}
            />
            <Item
              title={'Token Offered'}
              value={tokenOffered.toLocaleString('en-US') + ' STAR'}
            />
          </div>
          <div className="flex justify-between ">
            <Item title={'Price'} value={`1 STAR = ${priceTransfer} USDT`} />
            <Item title={'Ticket size'} value={ticketSize + ' USDT'} />
          </div>
          <div className="flex justify-between  border-t border-gray-400">
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
      </div>
      <Tabs className="py-5 mt-5" gap={30} data={tabitem} />
    </>
  );
};

export default ProjectView;
