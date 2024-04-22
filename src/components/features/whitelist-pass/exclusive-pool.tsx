'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  doGenerateMetadata,
  doGetMintingPool,
} from '@/adapters/whitelist-pass';
import { IDL, KyupadSmartContract } from '@/anchor/kyupad_smart_contract';
import PrimaryButton from '@/components/common/button/primary';
import CalendarCountdown from '@/components/common/coutdown/calendar';
import { Progress } from '@/components/common/progress/progress';
import { cn } from '@/utils/helpers';
import { Program } from '@coral-xyz/anchor';
import {
  getMetadataArgsSerializer,
  MetadataArgsArgs,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
  TokenProgramVersion,
  TokenStandard,
} from '@metaplex-foundation/mpl-bubblegum';
import { publicKey as publicKeyFn } from '@metaplex-foundation/umi';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction } from '@solana/web3.js';
import dayjs from 'dayjs';
import { env } from 'env.mjs';
import dropdown from 'public/images/whitelist/drop-down.svg';
import { toast } from 'sonner';
import { decrypt } from '@utils/helpers';

const programId = new PublicKey(env.NEXT_PUBLIC_NFT_PROGRAM_ID);
const tokenMetaDataProgramId = new PublicKey(
  env.NEXT_PUBLIC_NFT_METADATA_PROGRAM_ID,
);

function ExclusivePool() {
  const [open, setOpen] = useState<boolean>(false);
  const { publicKey, wallet } = useWallet();

  const [activePool, setActivePool] = useState<any[]>([]);
  const [currentPool, setCurrentPool] = useState<any>({});
  const [currentPoolId, setCurrentPoolId] = useState<string>();
  const [collectionMint, setCollectionMint] = useState<PublicKey>();
  const [merkleTree, SetMerkleTree] = useState<PublicKey>(
    new PublicKey('CSEC2YAhq6Fapke6uRDKePskRcafEbWvLnod6me6jBvU'),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { connection } = useConnection();

  const program = new Program<KyupadSmartContract>(IDL, programId, {
    connection,
  });

  const handleSetOpen = useCallback((value: boolean) => {
    setOpen(!value);
  }, []);

  const handleChangePoolId = useCallback((poolId: string) => {
    setCurrentPoolId(poolId);
  }, []);

  const handleSetIsLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await doGetMintingPool({
        wallet: publicKey?.toBase58() || '',
        pool_id: currentPoolId,
      });

      if (data?.data?.community_round?.active_pools) {
        setActivePool([
          ...(data?.data?.community_round?.active_pools || []),
          {
            pool_name: 'More Communities announced soon.',
          },
        ]);
      }

      if (data?.data?.community_round?.current_pool) {
        setCurrentPool(data?.data?.community_round?.current_pool);
      }

      if (data?.data?.collection_address) {
        setCollectionMint(new PublicKey(data?.data?.collection_address));
      }

      if (data?.data?.community_round?.current_pool?.pool_id) {
        setCurrentPoolId(data?.data?.community_round?.current_pool?.pool_id);
      }

      if (data?.data?.merkle_tree) {
        SetMerkleTree(new PublicKey(data?.data?.merkle_tree));
      }
    };

    fetchData();
  }, [currentPoolId, publicKey]);

  const handleMint = async () => {
    if (!publicKey) {
      toast.warning('Please connect to wallet first!', {
        position: 'top-right',
        closeButton: true,
      });
      return;
    }

    if (!collectionMint) {
      console.error('Collection mint not found');
      return;
    }

    if (!currentPoolId) {
      console.error('Current pool id not found');
      return;
    }

    if (!merkleTree) {
      console.error('Tree address not found');
      return;
    }

    if (!currentPool?.pool_name) {
      console.error('Pool name not found');
      return;
    }

    if (!currentPool?.pool_symbol) {
      console.error('Pool symbol not found');
      return;
    }

    handleSetIsLoading(true);

    try {
      const merkleProof = currentPool?.merkle_proof;
      const merkleProofDecoded = decrypt(
        merkleProof,
        env.NEXT_PUBLIC_CRYPTO_ENCRYPT_TOKEN,
        true,
      );

      const merkleProofDecodedParsed = JSON.parse(merkleProofDecoded).map(
        (info: any) => {
          return {
            ...info,
            data: Buffer.from(info.data, 'hex'),
          };
        },
      );

      const merkleProofDecodedParsedArray = merkleProofDecodedParsed.map(
        (item: any) => Array.from(item.data),
      );

      // Mint a compressed NFT

      const [poolsPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from('pools'), collectionMint.toBuffer()],
        program.programId,
      );

      const [collectionAuthority] = PublicKey.findProgramAddressSync(
        [Buffer.from('update_authority')],
        program.programId,
      );

      const [collectionMetadata] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          tokenMetaDataProgramId.toBuffer(),
          collectionMint.toBuffer(),
        ],
        tokenMetaDataProgramId,
      );

      const [collectionMasterEditionAccount] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata', 'utf8'),
          tokenMetaDataProgramId.toBuffer(),
          collectionMint.toBuffer(),
          Buffer.from('edition', 'utf8'),
        ],
        tokenMetaDataProgramId,
      );

      const nftArgs: MetadataArgsArgs = {
        name: currentPool.pool_name,
        symbol: currentPool.pool_symbol,
        creators: [],
        uri: '',
        editionNonce: 253,
        tokenProgramVersion: TokenProgramVersion.Original,
        tokenStandard: TokenStandard.NonFungible,
        uses: null,
        primarySaleHappened: false,
        sellerFeeBasisPoints: 0,
        isMutable: false,
        collection: {
          verified: false,
          key: publicKeyFn(collectionMint.toString()),
        },
      };

      const cnftMetadata = await doGenerateMetadata({
        name: nftArgs.name,
        symbol: nftArgs.symbol as string,
        seller_fee_basis_points: nftArgs.sellerFeeBasisPoints,
        id: currentPoolId,
      });

      nftArgs.uri = cnftMetadata.data.url;

      const serializer = getMetadataArgsSerializer();
      const data = serializer.serialize(nftArgs);
      const merkleTreeAccount = new PublicKey(merkleTree);
      const MPL_BUBBLEGUM_PROGRAM_ID = new PublicKey(
        env.NEXT_PUBLIC_MPL_BUBBLEGUM_PROGRAM_ID,
      );
      const [treeAuthority] = PublicKey.findProgramAddressSync(
        [merkleTreeAccount.toBuffer()],
        MPL_BUBBLEGUM_PROGRAM_ID,
      );

      const [bgumSigner] = PublicKey.findProgramAddressSync(
        [Buffer.from('collection_cpi', 'utf8')],
        MPL_BUBBLEGUM_PROGRAM_ID,
      );

      const [poolMinted] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('pool_minted'),
          poolsPDA.toBuffer(),
          Buffer.from(currentPoolId),
        ],
        program.programId,
      );

      const [mintCounter] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('mint_counter'),
          Buffer.from(currentPoolId),
          publicKey.toBuffer(),
          poolsPDA.toBuffer(),
        ],
        program.programId,
      );
      const pools_config_data: any[] = (
        await program.account.pools.fetch(poolsPDA)
      ).poolsConfig;
      const remainingAccounts = [
        {
          pubkey: mintCounter,
          isWritable: true,
          isSigner: false,
        },
      ];

      pools_config_data.forEach((pool_config) => {
        if (pool_config.id === currentPoolId) {
          if (pool_config.exclusionPools) {
            pool_config.exclusionPools.forEach((pool_id_exl: string) => {
              const [poolMintedPDA] = PublicKey.findProgramAddressSync(
                [
                  Buffer.from('mint_counter'),
                  Buffer.from(pool_id_exl),
                  publicKey.toBuffer(),
                  poolsPDA.toBuffer(),
                ],
                program.programId,
              );
              remainingAccounts.push({
                pubkey: poolMintedPDA,
                isWritable: false,
                isSigner: false,
              });
            });
          }
        }
      });

      const mintCnftInstruction = await program.methods
        .mintCnft(
          merkleProofDecodedParsedArray,
          currentPoolId,
          Buffer.from(data) as Buffer,
        )
        .accounts({
          minter: publicKey,
          pools: poolsPDA,
          poolMinted: poolMinted,
          merkleTree: merkleTreeAccount,
          treeAuthority,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          logWrapper: SPL_NOOP_PROGRAM_ID,
          collectionAuthority: collectionAuthority,
          collectionAuthorityRecordPda: MPL_BUBBLEGUM_PROGRAM_ID,
          collectionMint: collectionMint,
          collectionMetadata: collectionMetadata,
          editionAccount: collectionMasterEditionAccount,
          bubblegumSigner: bgumSigner,
          tokenMetadataProgram: tokenMetaDataProgramId,
        })
        .remainingAccounts(remainingAccounts)
        .instruction();

      const tx = new Transaction().add(mintCnftInstruction);
      tx.feePayer = publicKey;
      tx.recentBlockhash = (
        await connection.getLatestBlockhash('finalized')
      ).blockhash;

      const sig = await (wallet?.adapter as any)?.signTransaction(tx);
      const signature = await connection.sendRawTransaction(sig.serialize(), {
        skipPreflight: process.env.NODE_ENV === 'development',
      });

      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        signature,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });

      toast.success('Minted successfully. Please check the wallet!', {
        position: 'top-right',
        closeButton: true,
      });
    } catch (error) {
      console.error(error, 'error');
    } finally {
      handleSetIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-5 justify-between w-full flex-wrap">
        <h2 className="font-heading text-3xl sm:text-4xl xl:text-5xl">
          Round 1: Exclusive Pools
        </h2>
        <button
          onClick={() => handleSetOpen(open)}
          className="rounded-[8px] py-3 px-10 border-2 text-2xl font-bold bg-kyu-color-2 border-kyu-color-11 flex items-center gap-5"
        >
          <span>How to be eligible</span>
          <Image
            src={dropdown}
            alt="dropdown"
            className={cn('transition-transform', open ? 'rotate-180' : '')}
          />
        </button>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all',
          open ? 'max-h-screen' : 'max-h-0',
        )}
      >
        <div
          className={cn(
            'py-5 px-10 border-2 rounded-[8px] bg-kyu-color-16 border-kyu-color-10 text-xl text-justify',
          )}
        >
          <ul className="list-disc pl-7">
            <li>
              To be eligible for the NFT Minting, you need to be a part of one
              of our partnered communities.A list of whitelisted addresses
              eligible for minting will be released prior to the mint date.
            </li>
            <li>
              Each wallet is permitted to mint a maximum of two NFTs, regardless
              of eligibility for additional minting rounds or membership in more
              than two partnered communities.
            </li>
            <li>
              Details on upcoming partnered communities will be announced
              through our official channels soon.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-3">
        {activePool?.map((pool, index) => {
          if (!pool?.pool_id) {
            return (
              <span
                className="py-3 px-4 rounded-[8px] text-xl font-bold"
                key={index}
              >
                {pool?.pool_name}
              </span>
            );
          }

          return (
            <button
              onClick={() => {
                handleChangePoolId(pool?.pool_id);
                // changeOptimisticCurrentPool(pool?.pool_id);
              }}
              className={cn(
                'py-3 px-4 rounded-[8px] text-xl font-bold',
                currentPool?.pool_id === pool?.pool_id
                  ? 'bg-kyu-color-16 border-kyu-color-11 border-2'
                  : 'text-[#8E8FA2]',
              )}
              key={pool?.pool_id}
            >
              {pool?.pool_name}
            </button>
          );
        })}
      </div>

      {currentPoolId && (
        <div className="flex p-10 bg-kyu-color-16 rounded-[16px] justify-center gap-10 items-center">
          <div className="w-1/2 h-[263px] relative rounded-[24px] overflow-hidden border-2 border-kyu-color-4">
            <Image
              src={currentPool?.pool_image || ''}
              alt={currentPool?.pool_image || ''}
              fill
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
          </div>
          <div className="w-1/2 flex flex-col gap-5">
            <span className="text-xl font-bold">Round 1 time left:</span>
            <div className="-mt-4">
              <CalendarCountdown
                time={dayjs.utc(currentPool?.end_time).valueOf()}
                fullWidth
              />
            </div>

            <div className="relative mt-6">
              <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
                {currentPool?.minted_total || 0}
              </span>
              <Progress value={0} />
              <span className="absolute right-0 -top-8">
                <span className="text-kyu-color-14 font-medium">Total</span>{' '}
                <span className="font-bold text-kyu-color-11">
                  {currentPool?.pool_supply || 0}
                </span>
              </span>
            </div>

            <PrimaryButton
              loading={isLoading}
              disabled={!currentPool?.is_active}
              onClick={handleMint}
            >
              {currentPool?.is_active ? 'Free Mint' : 'Not eligible'}
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ExclusivePool);
