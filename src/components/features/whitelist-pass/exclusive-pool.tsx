/* eslint-disable no-console */
'use client';

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  doGenerateMetadata,
  doGetMintingPool,
  doSyncNftbySignature,
} from '@/adapters/whitelist-pass';
import { IDL, KyupadSmartContract } from '@/anchor/kyupad_smart_contract';
import PrimaryButton from '@/components/common/button/primary';
import CalendarCountdown from '@/components/common/coutdown/calendar';
import WalletConnect from '@/components/common/header/wallet-connect';
import Skeleton from '@/components/common/loading/skeleton';
import { ShowAlert } from '@/components/common/toast';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/tooltip';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { useSessionStore } from '@/contexts/session-store-provider';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  THROW_EXCEPTION,
  WEB_ROUTES,
} from '@/utils/constants';
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
import * as Sentry from '@sentry/nextjs';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  ComputeBudgetProgram,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import base58 from 'bs58';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { env } from 'env.mjs';
import jsonwebtoken from 'jsonwebtoken';
import infoIcon from 'public/images/detail/info-icon.svg';
import dropdown from 'public/images/whitelist/drop-down.svg';
import moreArrow from 'public/images/whitelist/more-arrow.svg';
import { decrypt } from '@utils/helpers';

import MintedSuccess from './minted-success';
import UserPoolMinted from './user-pool-minted';

dayjs.extend(utc);

const programId = new PublicKey(env.NEXT_PUBLIC_NFT_PROGRAM_ID);
const tokenMetaDataProgramId = new PublicKey(
  env.NEXT_PUBLIC_NFT_METADATA_PROGRAM_ID,
);

function ExclusivePool({
  revalidatePath,
  doGetSignInData,
  doVerifySignInWithSolana,
  setCookie,
}: {
  revalidatePath: Function;
  doGetSignInData: Function;
  doVerifySignInWithSolana: Function;
  setCookie: Function;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { publicKey, wallet } = useWallet();

  const searchParams = useSearchParams();
  const [activePool, setActivePool] = useState<any[]>([]);
  const [currentPool, setCurrentPool] = useState<any>({});
  const [currentPoolId, setCurrentPoolId] = useState<string>(
    searchParams.get('id') || '',
  );
  const [collectionMint, setCollectionMint] = useState<PublicKey>();
  const [merkleTree, SetMerkleTree] = useState<PublicKey>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingPool, setLoadingPool] = useState<boolean>(true);
  const [sellerFeeBasisPoints, setSellerFeeBasisPoints] = useState<number>();
  const [creators, setCreators] = useState<any[]>([]);
  const [priorityFees, setPriorityFees] = useState<number>();
  const [seasonId, setSeasonId] = useState<string>();
  const [visibleMintedSuccess, setVisibleMintedSuccess] =
    useState<boolean>(false);

  const activePoolWrapper = useRef<HTMLDivElement>(null);
  const moreArrowRef = useRef<HTMLImageElement>(null);
  const router = useRouter();
  const refCode = searchParams.get('ref_code');
  const [isOpenMintTooltip, setOpenMintTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (refCode) {
      Sentry.captureMessage(
        JSON.stringify({
          refCode,
          user: 'anonymous',
        }),
        {
          user: {
            id: 'anonymous',
          },
          tags: {
            ref_code: refCode,
          },
        },
      );
    }
  }, [refCode]);

  const {
    poolsCounter,
    updatePoolCounter,
    updateUserSeasonMinted,
    user_season_minted,
    seasonMinted,
    updateSeasonMinted,
  } = useSessionStore((state) => state);

  const [lookupTableAddress, setLookupTableAddress] = useState<PublicKey>();
  const poolId = currentPoolId || currentPool?.pool_id;
  const poolCounterKey = `${poolId}_${publicKey?.toBase58()}`;

  const { connection } = useConnection();

  const program = new Program<KyupadSmartContract>(IDL, programId, {
    connection,
  });

  const handleSetOpen = useCallback((value: boolean) => {
    setOpen(!value);
  }, []);

  const handleChangePoolId = useCallback(
    (poolId: string) => {
      setCurrentPoolId(poolId);
      router.push(
        `${WEB_ROUTES.WHITELIST_PASS}?id=${poolId}${refCode ? `&ref_code=${refCode}` : ''}`,
        {
          scroll: false,
        },
      );
    },
    [refCode, router],
  );

  const handleSetIsLoading = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  const handleSetVisibleMintedSuccess = useCallback((value: boolean) => {
    setVisibleMintedSuccess(value);
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

      if (
        (!data?.data && data?.statusCode && currentPoolId) ||
        (currentPoolId &&
          data?.statusCode &&
          !data?.data?.community_round?.current_pool?.pool_id)
      ) {
        setCurrentPoolId('');
        router.replace(
          `${WEB_ROUTES.WHITELIST_PASS}${refCode ? `?ref_code=${refCode}` : ''}`,
          { scroll: false },
        );
        return;
      }

      if (data?.data?.community_round?.active_pools) {
        setActivePool([
          ...(data?.data?.community_round?.active_pools || []),
          {
            pool_name: 'Coming Soon',
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

      if (data?.data?.lookup_table_address) {
        setLookupTableAddress(new PublicKey(data?.data?.lookup_table_address));
      }

      if (data?.data?.seller_fee_basis_points) {
        setSellerFeeBasisPoints(data?.data?.seller_fee_basis_points);
      }

      if (data?.data?.creators) {
        setCreators(data?.data?.creators);
      }

      if (data?.data?.priority_fees) {
        setPriorityFees(data?.data?.priority_fees);
      }

      if (data?.data?.season_id) {
        setSeasonId(data?.data?.season_id);
      }
    };

    const debounceFunction = setTimeout(() => {
      try {
        fetchData().finally(() => {
          setLoadingPool(false);
        });
      } catch (error) {
        console.error(error);
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(debounceFunction);
    };
  }, [currentPoolId, publicKey, router, searchParams]);

  useEffect(() => {
    const checkActivePoolWidth = () => {
      const activePoolWrapperWidth =
        activePoolWrapper.current?.clientWidth || 0;
      const activePoolItems = document.querySelectorAll('.active-pool-item');
      const activePoolItemsWidth = Array.from(activePoolItems).reduce(
        (acc, item) => acc + (item as HTMLElement).clientWidth,
        0,
      );

      if (activePoolItemsWidth + 80 > activePoolWrapperWidth) {
        moreArrowRef.current?.classList.remove('hidden');
      } else {
        moreArrowRef.current?.classList.add('hidden');
      }
    };

    const id = setTimeout(() => {
      checkActivePoolWidth();
      clearTimeout(id);
    }, 3000);

    window.addEventListener('resize', checkActivePoolWidth);

    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', checkActivePoolWidth);
    };
  }, []);

  const handleMint = async () => {
    if (!publicKey) {
      ShowAlert.warning({ message: 'Please connect to wallet first!' });
      return;
    }

    const token = getCookie(ACCESS_TOKEN_STORAGE_KEY);

    const sub = token ? jsonwebtoken.decode(token)?.sub : '';

    if (sub !== publicKey?.toBase58()) {
      ShowAlert.warning({
        message: (
          <div>
            <div>Wrong wallet connected.</div>
            <div>Please change to wallet: {sub as string}</div>
          </div>
        ),
      });
      return;
    }

    if (!collectionMint) {
      console.error('Collection mint not found');
      return;
    }

    if (!poolId) {
      console.error('Current pool id not found');
      return;
    }

    if (!merkleTree) {
      console.error('Tree address not found');
      return;
    }

    if (!lookupTableAddress) {
      console.error('Lookup table address not found');
      return;
    }

    if (!sellerFeeBasisPoints) {
      console.error('Seller fee basis points not found');
      return;
    }

    if (!creators) {
      console.error('Creators not found');
      return;
    }

    if (!priorityFees) {
      console.error('Priority fees not found');
      return;
    }

    if (!seasonId) {
      console.error('Season id not found');
      return;
    }

    handleSetIsLoading(true);

    let tried = 0;
    let minted = false;
    let mint_error = '';
    let mint_message = '';
    let mint_transaction = '';
    const mint_wallet = wallet?.adapter?.name || '';
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
        creators: creators,
        uri: '',
        editionNonce: 253,
        tokenProgramVersion: TokenProgramVersion.Original,
        tokenStandard: TokenStandard.NonFungible,
        uses: null,
        primarySaleHappened: false,
        sellerFeeBasisPoints: sellerFeeBasisPoints,
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
        id: poolId,
        ...(refCode ? { ref_code: refCode } : {}),
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
        [Buffer.from('pool_minted'), poolsPDA.toBuffer(), Buffer.from(poolId)],
        program.programId,
      );

      const [mintCounter] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('mint_counter'),
          Buffer.from(poolId),
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

      const lookupTableAccount = (
        await connection.getAddressLookupTable(lookupTableAddress)
      ).value;

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
          poolId,
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

      const setComputeUnitPriceIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: Number(priorityFees),
      });

      const messageV0 = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: (await connection.getLatestBlockhash('confirmed'))
          .blockhash,
        instructions: [setComputeUnitPriceIx, mintCnftInstruction],
      }).compileToV0Message([lookupTableAccount!]);

      const transactionV0 = new VersionedTransaction(messageV0);
      const signature = await (wallet?.adapter as any)?.signTransaction(
        transactionV0,
      );
      const signatureEncode = base58.encode(signature?.signatures?.[0]);
      mint_transaction = signatureEncode;

      const blockhash =
        await connection.getLatestBlockhashAndContext('confirmed');
      const blockHeight = await connection.getBlockHeight({
        commitment: 'confirmed',
        minContextSlot: blockhash.context.slot,
      });

      const transactionTTL = blockHeight + 151;
      const waitToConfirm = () =>
        new Promise((resolve) => setTimeout(resolve, 5000));
      const waitToRetry = () =>
        new Promise((resolve) => setTimeout(resolve, 2000));

      const numTry = 30;

      for (let i = 0; i < numTry; i++) {
        // check transaction TTL
        const blockHeight = await connection.getBlockHeight('confirmed');
        if (blockHeight >= transactionTTL) {
          throw new Error('ONCHAIN_TIMEOUT');
        }

        await connection?.sendRawTransaction(signature.serialize(), {
          skipPreflight: !!env.NEXT_PUBLIC_DEBUG,
          maxRetries: 0,
        });

        await waitToConfirm();

        const sigStatus = await connection.getSignatureStatus(signatureEncode);

        if (sigStatus.value?.err) {
          throw new Error('UNKNOWN_TRANSACTION');
        }

        if (sigStatus.value?.confirmationStatus === 'confirmed') {
          break;
        }

        await waitToRetry();
        tried++;
      }

      minted = true;

      await doSyncNftbySignature({
        id: cnftMetadata?.data?.id,
        pool_id: poolId,
        signature: signatureEncode,
      });

      updatePoolCounter(
        poolCounterKey,
        (poolsCounter[poolCounterKey] || 0) + 1,
      );

      updateUserSeasonMinted((user_season_minted || 0) + 1);
      updateSeasonMinted(seasonId, (seasonMinted[seasonId] || 0) + 1);

      ShowAlert.success({
        message: (
          <div className="text-xl">
            Minted successfully. Please check the wallet!
            <br />
            <a
              href={`https://explorer.solana.com/tx/${signatureEncode}?cluster=${env.NEXT_PUBLIC_NETWORK}`}
              target="_blank"
              rel="noreferrer noopener"
              className="underline"
            >
              View transaction
            </a>
          </div>
        ),
      });

      handleSetVisibleMintedSuccess(true);
    } catch (error: any) {
      mint_error = error?.stack;
      mint_message = error?.message;

      const msg =
        THROW_EXCEPTION[error?.message as keyof typeof THROW_EXCEPTION];

      if (msg) {
        ShowAlert.error({ message: msg });
        return;
      }

      if (error?.message !== THROW_EXCEPTION.USER_REJECTED_THE_REQUEST) {
        ShowAlert.error({ message: THROW_EXCEPTION.UNKNOWN_TRANSACTION });
      }
    } finally {
      if (mint_error) {
        Sentry.captureException(
          {
            tried,
            minted,
            mint_error,
            mint_message,
            id: publicKey?.toBase58() || '',
            mint_transaction,
            mint_wallet,
            ref_code: refCode,
            pool_id: currentPoolId,
            pool_name: currentPool?.pool_name,
          },
          {
            user: {
              id: publicKey?.toBase58() || '',
            },
            tags: {
              mint_error: true,
              mint_error_with_ref_code: !!refCode,
              ref_code: refCode,
              mint_with_ref_code: !!refCode,
              pool_id: currentPoolId,
            },
          },
        );
      } else {
        Sentry.captureMessage(
          JSON.stringify({
            tried,
            minted,
            mint_error,
            mint_message,
            id: publicKey?.toBase58() || '',
            mint_transaction,
            mint_wallet,
            pool_id: currentPoolId,
            pool_name: currentPool?.pool_name,
          }),
          {
            user: {
              id: publicKey?.toBase58() || '',
            },
            tags: {
              mint_success: true,
              mint_success_with_ref_code: !!refCode,
              ref_code: refCode,
              mint_with_ref_code: !!refCode,
              pool_id: currentPoolId,
            },
          },
        );
      }
      handleSetIsLoading(false);
    }
  };

  const now = dayjs.utc();
  const isEventEnded = dayjs.utc(currentPool?.end_time).isBefore(now);

  const isSolanaConnected = useGlobalStore(
    (state) => state.is_solana_connected,
  );

  const renderButtonMint = useCallback(() => {
    if (isEventEnded) {
      return <PrimaryButton disabled>Event ended!</PrimaryButton>;
    }

    if (
      (poolsCounter[poolCounterKey] &&
        poolsCounter[poolCounterKey] >= currentPool?.total_mint_per_wallet) ||
      currentPool?.is_minted
    ) {
      return <PrimaryButton disabled>Minted</PrimaryButton>;
    }

    if (!currentPool?.is_active) {
      return <PrimaryButton disabled>Not eligible</PrimaryButton>;
    }

    if (
      poolsCounter[poolId] >= currentPool?.pool_supply ||
      currentPool?.minted_total >= currentPool?.pool_supply
    ) {
      return <PrimaryButton disabled>Sold Out</PrimaryButton>;
    }

    const isNotStart = dayjs.utc(currentPool?.start_time).isAfter(now);

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip open={isOpenMintTooltip}>
          <TooltipTrigger asChild>
            <div>
              <PrimaryButton
                loading={isLoading}
                disabled={isNotStart}
                onClick={handleMint}
                block
                onTouchStart={() => {
                  if (isNotStart) {
                    setOpenMintTooltip(!isOpenMintTooltip);
                  }
                }}
                onMouseOver={() => {
                  if (isNotStart) {
                    setOpenMintTooltip(true);
                  }
                }}
                onMouseOut={() => {
                  if (isNotStart) {
                    setOpenMintTooltip(false);
                  }
                }}
              >
                Mint &nbsp;{' '}
                {isNotStart && (
                  <Image src={infoIcon} alt="info" draggable={false} />
                )}
              </PrimaryButton>
            </div>
          </TooltipTrigger>
          {isNotStart && (
            <TooltipContent className="max-w-[274px] px-5 py-4">
              <p className="text-base font-medium text-justify">
                Please wait until mint time!
              </p>
              <TooltipArrow fill="#8E8FA2" />
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  }, [
    currentPool?.is_active,
    currentPool?.is_minted,
    currentPool?.minted_total,
    currentPool?.pool_supply,
    currentPool?.start_time,
    currentPool?.total_mint_per_wallet,
    isEventEnded,
    isLoading,
    isOpenMintTooltip,
    now,
    poolCounterKey,
    poolId,
    poolsCounter,
  ]);

  return (
    <>
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-5 justify-between w-full flex-wrap">
          <h2 className="font-heading text-3xl sm:text-4xl xl:text-5xl">
            Mint Pools
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
                {'To be eligible for the NFT Minting, you need to become'}{' '}
                <b>a member of our partnered communities on Solana</b> {'or'}{' '}
                <b>join our events on X & Discord to be KyuPad contributors</b>.
              </li>
              <li>
                {" Details on partnered communities & each round's"}{' '}
                <b>eligibility mechanism</b> {'will be publicly '}
                <b>announced before mint date</b>.
              </li>
              <li>
                {'Each wallet can mint'} <b>up to 2 NFTs</b>,{' '}
                {
                  'regardless of eligibility for additional minting rounds or membership in more than 2 partnered communities.'
                }
              </li>
            </ul>
          </div>
        </div>

        <div className="relative" ref={activePoolWrapper}>
          <div className="flex gap-3 overflow-x-auto scrollbar pb-4 pr-4">
            {activePool?.map((pool, index) => {
              if (!pool?.pool_id) {
                return (
                  <span
                    className="py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap last:text-gray-400 active-pool-item"
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
                    'py-3 px-4 rounded-[8px] text-xl font-bold text-nowrap active-pool-item',
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
          <Image
            src={moreArrow}
            alt="more"
            className="absolute right-0 top-0 hidden"
            ref={moreArrowRef}
          />
        </div>

        <div
          className="p-10 bg-kyu-color-16 rounded-[16px] flex flex-col gap-10"
          id="mint-pool"
        >
          <div className="flex justify-center gap-10 items-center flex-col lg:flex-row">
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
                    ? 'ends in:'
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
                    revalidatePath={revalidatePath}
                  />
                )}
              </div>

              <div className="relative mt-6">
                <UserPoolMinted
                  currentPoolId={currentPool?.pool_id}
                  poolId={poolId}
                  currentUserPoolMintedTotal={
                    currentPool?.user_pool_minted_total
                  }
                  loading={loadingPool || !poolId || !currentPool?.pool_id}
                  currentMintedTotal={currentPool?.minted_total}
                  currentPoolSupply={currentPool?.pool_supply}
                  seasonId={seasonId}
                />
                {loadingPool ||
                (!currentPool?.pool_supply &&
                  currentPool?.pool_supply !== 0) ? (
                  <Skeleton className="h-4 w-2/12 absolute right-0 -top-6" />
                ) : (
                  <span className="absolute right-0 -top-8">
                    <span className="text-kyu-color-14 font-medium">
                      Total:
                    </span>{' '}
                    <span className="font-bold text-kyu-color-11">
                      {currentPool?.pool_supply || 0}
                    </span>
                  </span>
                )}
              </div>
              {loadingPool || !poolId || !currentPool?.pool_id ? (
                <Skeleton className="h-[48px]" />
              ) : isSolanaConnected || isEventEnded ? (
                renderButtonMint()
              ) : (
                <WalletConnect
                  doGetSignInData={doGetSignInData}
                  doVerifySignInWithSolana={doVerifySignInWithSolana}
                  setCookie={setCookie}
                  revalidatePath={revalidatePath}
                  block
                />
              )}
            </div>
          </div>

          {currentPool?.pool_name === 'KyuPad - MonkeDAO Mint Round' && (
            <div className="w-full">
              <p className="font-bold text-xl mb-4">Eligibility: </p>
              <ol className="list-disc pl-8 flex flex-col gap-2 text-xl">
                <li>
                  This round is only for SMB Gen 2 & Gen 3 Holders. We
                  snapshotted the wallet list on May 12, 2024 12:00:00 UTC.
                </li>
                <li>
                  If you bought an SMB after that, kindly contact our team via X
                  so that we can add your wallet to the whitelist.
                </li>
              </ol>
            </div>
          )}

          {currentPool?.pool_name === 'KyuPad - MonkeDAO Mint Round' && (
            <div className="w-full">
              <p className="font-bold text-xl mb-4">Prize for Monkes: </p>
              <ol className="list-disc pl-8 flex flex-col gap-2 text-xl">
                <li>
                  <b>1 SMB Gen 3 for 1 lucky winner</b> that holds both{' '}
                  <b>an SMB and our NFT Pass</b>.
                </li>
                <li>
                  Top referrer: <b>Top 1 - $300, Top 2 - $200, Top 3 - $100</b>.
                  Leaderboard will be updated daily on our X, until this pool is
                  sold out.
                </li>
              </ol>
            </div>
          )}

          <div className="w-full">
            <p className="font-bold text-xl mb-4">Note: </p>
            <ol className="list-disc pl-8 flex flex-col gap-2 text-xl">
              <li>
                Minimum balance: <b>0.015 SOL</b>.
              </li>
              <li>
                <b>Phantom wallet</b> is highly recommended for optimal minting
                experience.
              </li>
              <li>
                Due to <b>Solana network congestion</b> & multiple users
                accessing the website at the same time, the minting experience
                <b> might be a bit slower than expected</b>.
              </li>
              {currentPool?.pool_name !== 'KyuPad - MonkeDAO Mint Round' && (
                <li>Participants can retry as many times as you want.</li>
              )}
            </ol>
            <p className="font-bold mt-5 text-xl">Happy minting!</p>
          </div>
        </div>
      </div>
      <MintedSuccess
        visible={visibleMintedSuccess}
        setVisible={handleSetVisibleMintedSuccess}
      />
    </>
  );
}

export default memo(ExclusivePool);
