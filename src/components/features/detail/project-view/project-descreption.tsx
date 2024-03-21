import React from 'react';
import Image from 'next/image';

const ProjectDescreption = () => {
  return (
    <div className="*:py-1 py-10">
      <h2 className="font-bold text-2xl py-2">What is Star Heroes?</h2>
      <p className="text-[#5A5B6F] font-medium">
        Star Heroes is a reputable and reliable launchpad platform on the Sui
        network that integrates DeFi features to expedite the development of
        innovative ideas, actualize projects, and foster widespread adoption of
        web3 technology.
      </p>
      <p className="text-[#5A5B6F] font-medium">
        Star Heroes facilitates multiple fundraising phases, encompassing seed,
        private, and public (IDO) stages. The platform accommodates both
        ERC-20-like and NFT tokens for fundraising, providing an array of
        configuration alternatives. SeaPad is the pioneer launchpad to
        incorporate a DAO committee mechanism for evaluating and delivering
        long-term support to projects. Furthermore, it is among the select few
        projects invited by the Sui Foundation to showcase at the
        SuiBuilderHouse event and actively contribute to the growth of the Sui
        Ecosystem.
      </p>
      <Image
        src="/images/detail/image_Heroes.svg"
        alt="image"
        width={1000}
        height={750}
        className="w-full h-auto my-2"
      />
      <h2 className="font-bold text-2xl py-2"> The problems solving</h2>
      <p className="text-[#5A5B6F] font-medium">
        Numerous inventive ideas often fail to materialize due to a lack of
        funding and community support. Traditional fundraising methods may not
        be suitable for rapidly growing projects or ecosystems, particularly for
        innovative industries in their early stages. SeaPad assists startups in
        raising funds in a decentralized manner, both efficiently and promptly.
        Additionally, the platform supports projects with a long-term vision by
        engaging and converting users into customers. Star Heroes eliminates
        fundraising obstacles, allowing Web2 and Web3 users to access the
        platform seamlessly, as they are accustomed to doing.
      </p>
    </div>
  );
};

export default ProjectDescreption;
