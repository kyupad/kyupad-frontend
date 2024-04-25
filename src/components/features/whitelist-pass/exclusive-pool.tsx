'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  doGenerateMetadata,
  doGetMintingPool,
  doSyncNftbySignature,
} from '@/adapters/whitelist-pass';
import { IDL, KyupadSmartContract } from '@/anchor/kyupad_smart_contract';
import PrimaryButton from '@/components/common/button/primary';
import CalendarCountdown from '@/components/common/coutdown/calendar';
import Skeleton from '@/components/common/loading/skeleton';
import { Progress } from '@/components/common/progress/progress';
import { useSessionStore } from '@/contexts/session-store-provider';
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
import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { env } from 'env.mjs';
import dropdown from 'public/images/whitelist/drop-down.svg';
import moreArrow from 'public/images/whitelist/more-arrow.svg';
import { toast } from 'sonner';
import { decrypt } from '@utils/helpers';

dayjs.extend(utc);

const programId = new PublicKey(env.NEXT_PUBLIC_NFT_PROGRAM_ID);
const tokenMetaDataProgramId = new PublicKey(
  env.NEXT_PUBLIC_NFT_METADATA_PROGRAM_ID,
);

function ExclusivePool() {
  const [open, setOpen] = useState<boolean>(false);
  const { publicKey, signTransaction } = useWallet();

  const [activePool, setActivePool] = useState<any[]>([]);
  const [currentPool, setCurrentPool] = useState<any>({});
  const [currentPoolId, setCurrentPoolId] = useState<string>();
  const [collectionMint, setCollectionMint] = useState<PublicKey>();
  const [merkleTree, SetMerkleTree] = useState<PublicKey>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPool, setLoadingPool] = useState<boolean>(false);
  const { poolsCounter, updatePoolCounter } = useSessionStore((state) => state);

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
    const controller = new AbortController();
    const fetchData = async () => {
      const data = await doGetMintingPool(
        {
          wallet: publicKey?.toBase58() || '',
          pool_id: currentPoolId,
        },
        controller.signal,
      );

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

      if (data?.data?.merkle_tree) {
        SetMerkleTree(new PublicKey(data?.data?.merkle_tree));
      }

      setLoadingPool(false);
    };

    const debounceFunction = setTimeout(() => {
      setLoadingPool(true);
      fetchData();
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(debounceFunction);
      setLoadingPool(false);
    };
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

      nftArgs.uri = cnftMetadata.data?.url;
      nftArgs.name = cnftMetadata.data?.name;
      nftArgs.symbol = cnftMetadata.data?.symbol;

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

      const [mintCounterCollection] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('mint_counter_collection'),
          publicKey.toBuffer(),
          collectionMint.toBuffer(),
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
          destination: currentPool?.destination_wallet,
          mintCounterCollection: mintCounterCollection,
        })
        .remainingAccounts(remainingAccounts)
        .instruction();

      const tx = new Transaction().add(mintCnftInstruction);
      tx.feePayer = publicKey;
      tx.recentBlockhash = (
        await connection.getLatestBlockhash('finalized')
      ).blockhash;

      const sig = await (wallet?.adapter as any)?.signTransaction(tx);
      const signatured = await connection.sendRawTransaction(sig.serialize(), {
        skipPreflight: process.env.NODE_ENV === 'development',
      });

      const latestBlockHash = await connection.getLatestBlockhash('finalized');

      await connection.confirmTransaction({
        signature: signatured,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });

      updatePoolCounter(currentPoolId, (poolsCounter[currentPoolId] || 0) + 1);

      await doSyncNftbySignature({
        id: cnftMetadata?.id,
        pool_id: currentPoolId,
        signature: signatured,
      });

      toast.success(
        <div>
          Minted successfully. Please check the wallet!
          <br />
          <a
            href={`https://explorer.solana.com/tx/${signatured}?cluster=${env.NEXT_PUBLIC_NETWORK}`}
            target="_blank"
            rel="noreferrer noopener"
            className="underline"
          >
            View transaction
          </a>
        </div>,

        {
          position: 'top-right',
          closeButton: true,
        },
      );
    } catch (error) {
      console.error(error, 'error');
    } finally {
      handleSetIsLoading(false);
    }
  };
  const now = dayjs.utc();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-5 justify-between w-full flex-wrap">
        <h2 className="font-heading text-3xl sm:text-4xl xl:text-5xl">
          Community Exclusive Pools
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
              of our partnered communities. A list of whitelisted addresses
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

      <div className="relative">
        <div className="flex gap-3 overflow-x-auto scrollbar pb-4">
          {activePool?.map((pool, index) => {
            if (!pool?.pool_id) {
              return (
                <span
                  className="py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap"
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
                }}
                className={cn(
                  'py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap',
                  (currentPoolId || currentPool?.pool_id) === pool?.pool_id
                    ? 'bg-kyu-color-16 border-kyu-color-11 border-2'
                    : 'text-[#8E8FA2]',
                )}
                key={pool?.pool_id}
              >
                {pool?.pool_name}
              </button>
            );
          })}

          {!activePool ||
            (activePool.length === 0 && (
              <>
                <Skeleton className="w-[200px] h-[52px] py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap" />
                <Skeleton className="w-[200px] h-[52px] py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap" />
                <Skeleton className="w-[200px] h-[52px] py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap" />
                <Skeleton className="w-[200px] h-[52px] py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap" />
                <Skeleton className="w-[200px] h-[52px] py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap" />
                <Skeleton className="w-[200px] h-[52px] py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap" />
              </>
            ))}
        </div>
        <Image src={moreArrow} alt="more" className="absolute right-0 top-0" />
      </div>

      <div className="flex p-10 bg-kyu-color-16 rounded-[16px] justify-center gap-10 items-center flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 h-[263px] relative rounded-[24px] overflow-hidden border-2 border-kyu-color-4">
          {loadingPool || !currentPool?.pool_image ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <Image
              src={currentPool?.pool_image || ''}
              alt={currentPool?.pool_image || ''}
              fill
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
          )}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          {loadingPool ||
          !currentPool?.pool_name ||
          !currentPool?.start_time ? (
            <Skeleton className="h-5 w-1/2" />
          ) : (
            <span className="text-xl font-bold">
              {currentPool?.pool_name || ''}{' '}
              {dayjs.utc(currentPool?.start_time).isBefore(now)
                ? 'time left:'
                : 'starts in:'}
            </span>
          )}
          <div className="-mt-4">
            {loadingPool ||
            !currentPool?.start_time ||
            !currentPool?.end_time ? (
              <Skeleton className="h-[116px]" />
            ) : (
              <CalendarCountdown
                time={dayjs
                  .utc(
                    dayjs.utc(currentPool?.start_time).isBefore(now)
                      ? currentPool?.end_time?.valueOf()
                      : currentPool?.start_time?.valueOf(),
                  )
                  .valueOf()}
                fullWidth
              />
            )}
          </div>

          <div className="relative mt-6">
            {loadingPool || (!currentPoolId && !currentPool?.pool_id) ? (
              <Skeleton className="h-4 w-1/12 absolute left-0 -top-6" />
            ) : (
              <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
                {(currentPool?.minted_total || 0) +
                  (poolsCounter[currentPoolId || currentPool?.pool_id] || 0)}
              </span>
            )}
            {loadingPool || (!currentPoolId && !currentPool?.pool_id) ? (
              <Skeleton className="h-2" />
            ) : (
              <Progress
                value={
                  (currentPool?.minted_total || 0) +
                  (poolsCounter[currentPoolId || currentPool?.pool_id] || 0) >
                  0 && currentPool?.pool_supply > 0
                    ? (((currentPool?.minted_total || 0) +
                        (poolsCounter[currentPoolId || currentPool?.pool_id] ||
                          0)) /
                      currentPool?.pool_supply) *
                    100
                    : 0
                }
              />
            )}
            {loadingPool ||
            (!currentPool?.pool_supply && currentPool?.pool_supply !== 0) ? (
              <Skeleton className="h-4 w-2/12 absolute right-0 -top-6" />
            ) : (
              <span className="absolute right-0 -top-8">
                <span className="text-kyu-color-14 font-medium">Total</span>{' '}
                <span className="font-bold text-kyu-color-11">
                  {currentPool?.pool_supply || 0}
                </span>
              </span>
            )}
          </div>
          {loadingPool || (!currentPoolId && !currentPool?.pool_id) ? (
            <Skeleton className="h-[48px]" />
          ) : (
            <PrimaryButton
              loading={isLoading}
              disabled={
                !currentPool?.is_active ||
                poolsCounter[currentPoolId || currentPool?.pool_id] ||
                !(
                  dayjs.utc(currentPool?.start_time).isBefore(now) &&
                  dayjs.utc(currentPool?.end_time).isAfter(now)
                )
              }
              onClick={handleMint}
            >
              {!poolsCounter[currentPoolId || currentPool?.pool_id] && (
                <>
                  {currentPool?.is_active &&
                  dayjs.utc(currentPool?.start_time).isBefore(now) &&
                  dayjs.utc(currentPool?.end_time).isAfter(now)
                    ? 'Free Mint'
                    : 'Not eligible'}
                </>
              )}

              {poolsCounter[currentPoolId || currentPool?.pool_id] && (
                <>Minted</>
              )}
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ExclusivePool);
