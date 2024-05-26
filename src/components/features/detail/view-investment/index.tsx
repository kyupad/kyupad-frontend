import React, { memo, useCallback, useEffect, useState } from 'react';
import ImageNext from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { doInvestingSuccess, doViewRegistration } from '@/adapters/projects';
import { KyupadIdo } from '@/anchor/kyupad_ido';
import PrimaryButton from '@/components/common/button/primary';
import SimpleCountdown from '@/components/common/coutdown/simple';
import Skeleton from '@/components/common/loading/skeleton';
import { ShowAlert } from '@/components/common/toast';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';
import { useSessionStore } from '@/contexts/session-store-provider';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  THROW_EXCEPTION,
  WEB_ROUTES,
} from '@/utils/constants';
import { decrypt } from '@/utils/helpers';
import { AnchorProvider, IdlTypes, Program } from '@coral-xyz/anchor';
import {
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import {
  AccountMeta,
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
import IDL from 'src/anchor/kyupad_ido.json';

import Back from '../back';
import InvestMorePopup from './invest-more-popup';
import lossTicketDecor from '/public/images/detail/loss-ticket-decor.svg';
import lossTicket from '/public/images/detail/loss-ticket.png';
import wonTicketDecor from '/public/images/detail/won-ticket-decor.svg';
import wonTicket from '/public/images/detail/won-ticket.png';

type InvestArgs = IdlTypes<KyupadIdo>['investArgs'];

dayjs.extend(utc);

interface IViewSnapshotProps {
  data: any;
}

function ViewInvestment({ data }: IViewSnapshotProps) {
  const { publicKey, wallet } = useWallet();
  const [investmentInfo, setInvestmentInfo] = useState<{
    total_owner_winning_tickets?: number;
    tickets_used?: number;
    total_winner?: number;
    ticket_size?: number;
    currency?: string;
    currency_address?: string;
    token_offered?: number;
    destination_wallet?: string;
    merkle_proof?: string;
    is_active?: boolean;
    is_invested?: boolean;
  }>({});
  const [projectInfo, setProjectInfo] = useState<{
    _id: string;
    investment_start_at?: string;
    investment_end_at?: string;
  } | null>(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const [isInVesting, setIsInVesting] = useState<boolean>(false);
  const [visibleMoreInvest, setVisibleMoreInvest] = useState<boolean>(false);
  const investedTickets = useSessionStore((state) => state.investedTickets);
  const updateInvestedTickets = useSessionStore(
    (state) => state.updateInvestedTickets,
  );
  const investedTicketsKey =
    projectInfo?._id && publicKey?.toBase58()
      ? `${projectInfo._id}_${publicKey?.toBase58()}`
      : '';

  useEffect(() => {
    if (
      investedTicketsKey &&
      (investmentInfo?.tickets_used || 0) >
        (investedTickets[investedTicketsKey] || 0)
    ) {
      updateInvestedTickets(
        investedTicketsKey,
        investmentInfo?.tickets_used || 0,
      );
    }
  }, [investedTickets, investedTicketsKey, investmentInfo?.tickets_used]);

  const isSolanaConnected = useGlobalStore(
    (state) => state.is_solana_connected,
  );
  const changeViewMode = useProjectDetailStore((state) => state.changeViewMode);
  useEffect(() => {
    if (!isSolanaConnected) {
      changeViewMode(null);
    }
  }, [isSolanaConnected]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      if (publicKey && slug) {
        const data = await doViewRegistration(
          {
            wallet: publicKey?.toBase58(),
            slug: slug as string,
          },
          controller.signal,
        );

        if (data?.data?.investment_info) {
          setInvestmentInfo(data.data.investment_info);
        }

        if (data?.data?.project_info) {
          setProjectInfo(data.data.project_info);
        }
      }
    };

    fetchData()
      .catch((e) => {
        console.error(e);
      })
      .finally(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [publicKey, slug]);

  const handleSetIsInvesting = useCallback((value: boolean) => {
    setIsInVesting(value);
  }, []);

  const now = dayjs.utc();
  const isNotWinner = (investmentInfo?.total_owner_winning_tickets || 0) <= 0;
  const isEnded = dayjs.utc(data?.timeline?.investment_end_at).isBefore(now);

  const handleVisibleMoreInvest = useCallback((value: boolean) => {
    setVisibleMoreInvest(value);
  }, []);

  const handleInvest = async (_: any, numberTicket?: number) => {
    if (!publicKey || !wallet || !anchorWallet || !connection) {
      ShowAlert.warning({ message: 'Please connect to wallet first!' });
      return;
    }

    if (!investmentInfo?.destination_wallet) {
      console.error({ message: 'No destination wallet found!' });
      return;
    }

    if (!investmentInfo?.merkle_proof) {
      console.error({ message: 'No merkle root found!' });
      return;
    }

    if (!projectInfo?._id) {
      console.error({ message: 'No project id found!' });
      return;
    }

    if (!investmentInfo?.currency) {
      console.error({ message: 'No currency found!' });
      return;
    }

    if (!investmentInfo?.total_owner_winning_tickets) {
      console.error({ message: 'No total owner winning tickets found!' });
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

    handleSetIsInvesting(true);

    try {
      let vaultAddress = new PublicKey(investmentInfo?.destination_wallet);
      const merkleProof = investmentInfo?.merkle_proof;

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

      const projectId = projectInfo?._id;
      const currency = investmentInfo.currency;
      const totalWinningTicket = investmentInfo.total_owner_winning_tickets;

      if (currency?.toLowerCase() !== 'sol') {
        if (!investmentInfo.currency_address) {
          console.error({ message: 'No currency address found!' });
          return;
        }
        const tokenAddress = new PublicKey(investmentInfo.currency_address);
        vaultAddress = getAssociatedTokenAddressSync(
          tokenAddress,
          vaultAddress,
        );
      }
      const investArgs: InvestArgs = {
        projectId: projectId,
        ticketAmount: numberTicket ? Math.floor(Number(numberTicket)) : 1,
        maxTicketAmount: totalWinningTicket,
        merkleProof: merkleProofDecodedParsedArray,
      };

      const provider = new AnchorProvider(connection, anchorWallet);
      const program = new Program<KyupadIdo>(IDL as KyupadIdo, provider);

      let investIns = await program.methods
        .invest(investArgs)
        .accounts({
          investor: publicKey,
          vaultAddress: vaultAddress,
        })
        .instruction();
      if (
        currency?.toLowerCase() !== 'sol' &&
        investmentInfo.currency_address
      ) {
        const source = getAssociatedTokenAddressSync(
          new PublicKey(investmentInfo.currency_address),
          publicKey,
        );
        const remainingAccountsInvest: AccountMeta[] = [
          {
            pubkey: TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: new PublicKey(investmentInfo.currency_address),
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: source,
            isSigner: false,
            isWritable: true,
          },
        ];
        investIns = await program.methods
          .invest(investArgs)
          .accounts({
            investor: publicKey,
            vaultAddress: vaultAddress,
          })
          .remainingAccounts(remainingAccountsInvest)
          .instruction();
      }
      const blockhash =
        await connection.getLatestBlockhashAndContext('confirmed');

      const setComputeUnitPriceIx = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 100000, // FIXME: set to 100000
      });

      const messageV0 = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash.value.blockhash,
        instructions: [setComputeUnitPriceIx, investIns],
      }).compileToV0Message();

      const transactionV0 = new VersionedTransaction(messageV0);

      const signature = await (wallet?.adapter as any)?.signTransaction(
        transactionV0,
      );
      const signatureEncode = base58.encode(signature?.signatures?.[0]);

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

        await connection.simulateTransaction(transactionV0, {
          replaceRecentBlockhash: true,
          commitment: 'confirmed',
        });

        await connection?.sendRawTransaction(signature.serialize(), {
          skipPreflight: process.env.NODE_ENV === 'development',
          maxRetries: 0,
          preflightCommitment: 'confirmed',
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
      }

      try {
        await doInvestingSuccess({
          project__id: projectId,
          total: numberTicket ? Math.floor(Number(numberTicket)) : 1,
          signature: signatureEncode,
        });
      } catch {
        //
      }

      updateInvestedTickets(
        investedTicketsKey,
        (investedTickets[investedTicketsKey] || 0) +
          (numberTicket ? Math.floor(Number(numberTicket)) : 1),
      );

      ShowAlert.success({
        message: (
          <div className="text-xl">
            Invest successfully!
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
    } catch (e) {
      if (env.NEXT_PUBLIC_DEBUG === 'TRUE') console.error(e);
      const error = e as Error;

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
      handleSetIsInvesting(false);
      handleVisibleMoreInvest(false);
    }
  };

  const renderInvestTitle = useCallback(() => {
    if (loading) {
      return <Skeleton className="h-9" />;
    }

    if (isNotWinner) {
      return (
        <h2 className="text-4xl font-bold text-kyu-color-13">Keep trying!</h2>
      );
    }

    if (isEnded) {
      return (
        <h2 className="text-4xl font-bold text-kyu-color-13">
          Ops! The Investment has Ended, See you in the next time!
        </h2>
      );
    }

    return (
      <h2 className="text-4xl font-bold text-kyu-color-17">
        Congrats! You’ve won a ticket in the IDO!
      </h2>
    );
  }, [isEnded, isNotWinner, loading]);

  const renderInvestDescription = useCallback(() => {
    if (loading) {
      return <Skeleton className="h-6" />;
    }

    if (isNotWinner) {
      return (
        <div className="text-2xl font-bold">
          We are rooting for you in your future endeavors as there are many
          exciting projects awaiting you.
        </div>
      );
    }

    if (isEnded) {
      return (
        <div className="text-2xl">
          To ensure it&apos;s sold out, we have 3x the number of winners, so the
          investment phase will happen in the &apos;First come first
          served&apos; (FCFS) method.
        </div>
      );
    }

    return (
      <div className="text-2xl">
        You are one of the winners, lock in your place by being the first to
        invest.
      </div>
    );
  }, [isEnded, isNotWinner, loading]);

  const renderInvestButton = useCallback(() => {
    if (loading) {
      return <Skeleton className="h-12 w-[30%]" />;
    }

    if (isNotWinner) {
      return (
        <Link href={WEB_ROUTES.HOME}>
          <PrimaryButton block={false} className="min-w-[200px]">
            Explorer other IDO
          </PrimaryButton>
        </Link>
      );
    }

    if (isEnded) {
      return (
        <PrimaryButton block={false} disabled className="min-w-[200px]">
          Investment Ended
        </PrimaryButton>
      );
    }

    if (
      investmentInfo?.is_invested ||
      (investedTickets[investedTicketsKey] || 0) >=
        (investmentInfo?.total_owner_winning_tickets || 0)
    ) {
      return (
        <PrimaryButton block={false} disabled className="min-w-[200px]">
          Invested
        </PrimaryButton>
      );
    }

    if ((investmentInfo?.total_owner_winning_tickets || 0) > 1) {
      return (
        <InvestMorePopup
          setVisible={handleVisibleMoreInvest}
          visible={visibleMoreInvest}
          amount={investmentInfo?.total_owner_winning_tickets}
          handleInvest={handleInvest}
          loading={isInVesting}
        >
          <PrimaryButton
            disabled={isInVesting || !investmentInfo?.is_active}
            loading={isInVesting}
            block={false}
            className="min-w-[200px]"
            onClick={() => handleVisibleMoreInvest(true)}
          >
            Invest More
          </PrimaryButton>
        </InvestMorePopup>
      );
    }

    return (
      <PrimaryButton
        disabled={isInVesting || !investmentInfo?.is_active}
        loading={isInVesting}
        onClick={(_: any, numberTicket?: number) => handleInvest(numberTicket)}
        block={false}
        className="min-w-[200px]"
      >
        Invest
      </PrimaryButton>
    );
  }, [
    investedTickets,
    investedTicketsKey,
    investmentInfo?.is_active,
    investmentInfo?.is_invested,
    investmentInfo?.total_owner_winning_tickets,
    isEnded,
    isInVesting,
    isNotWinner,
    loading,
    visibleMoreInvest,
  ]);

  return (
    <>
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-[60px] flex gap-4 pb-[210px] items-center justify-center flex-col lg:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <Back />
          <div className="flex gap-5 items-center">
            <div className="min-w-[100px] min-h-[100px] sm:min-h-[150px] sm:min-w-[150px] xl:min-w-[200px] rounded-full xl:min-h-[200px] border-2 border-kyu-color-4 relative overflow-hidden">
              <ImageNext
                className="absolute"
                src={data?.logo}
                alt="project logo"
                draggable={false}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-4xl xl:text-5xl font-bold xl:leading-[60px] line-clamp-2">
                {data?.name || ''}
              </h1>
              <p className="text-xl sm:text-3xl xl:text-4xl font-bold xl:leading-[48px] line-clamp-1">
                {data?.token_info?.symbol
                  ? `$${data?.token_info?.symbol.toUpperCase()}`
                  : ''}
              </p>
            </div>
          </div>

          {renderInvestTitle()}

          {renderInvestDescription()}

          {!isNotWinner && (
            <div className="p-4 lg:p-10 bg-kyu-color-12 border-2 border-kyu-color-10 rounded-[16px] flex gap-4 flex-col lg:max-w-[704px]">
              <div className="flex gap-4 justify-between items-center">
                <span className="text-xl">Number of winning tickets</span>
                <span className="text-2xl font-bold text-kyu-color-13">
                  {investmentInfo?.total_owner_winning_tickets
                    ? investmentInfo?.total_owner_winning_tickets < 10
                      ? `0${investmentInfo?.total_owner_winning_tickets}`
                      : investmentInfo?.total_owner_winning_tickets
                    : 0}
                </span>
              </div>
              <div className="flex gap-4 justify-between items-center">
                <span className="text-xl">Number of invested tickets</span>
                <span className="text-2xl font-bold text-kyu-color-5">
                  {investedTickets[investedTicketsKey] || 0
                    ? investedTickets[investedTicketsKey] < 10
                      ? `0${investedTickets[investedTicketsKey]}`
                      : investedTickets[investedTicketsKey]
                    : 0}
                </span>
              </div>

              <div className="flex gap-4 justify-between items-center">
                <span className="text-xl">Ticket size</span>
                <span className="text-2xl font-bold text-kyu-color-13">
                  {investmentInfo?.ticket_size || 0}{' '}
                  {investmentInfo?.currency?.toUpperCase() || ''}
                </span>
              </div>

              <div className="h-[2px] bg-kyu-color-10" />

              <div className="flex gap-4 justify-between items-center">
                <span className="text-xl">Total Winners</span>
                <span className="text-2xl font-bold">
                  {investmentInfo?.total_winner?.toLocaleString('en-US') || 0}
                </span>
              </div>

              <div className="flex gap-4 justify-between items-center">
                <span className="text-xl">Total ticket</span>
                <span className="text-2xl font-bold">
                  {investmentInfo?.token_offered?.toLocaleString('en-US') || 0}
                </span>
              </div>
            </div>
          )}

          {!isNotWinner && (
            <div className="flex gap-4 md:gap-8 items-center flex-wrap">
              <div className="text-2xl font-bold">Investment Ends in</div>
              {dayjs.utc(data?.timeline?.investment_end_at).isAfter(now) ? (
                <SimpleCountdown
                  className="!text-xl md:!text-2xl"
                  time={dayjs.utc(data?.timeline?.investment_end_at).valueOf()}
                />
              ) : (
                <span className="font-bold text-2xl text-kyu-color-18">
                  Ended
                </span>
              )}
            </div>
          )}

          <div>{renderInvestButton()}</div>
        </div>
        <div className="w-full flex justify-center">
          {loading ? (
            <Skeleton className="h-[600px] w-full" />
          ) : !isNotWinner ? (
            <ImageNext
              src={wonTicket}
              alt="cat"
              draggable={false}
              className="w-full max-w-[600px]"
            />
          ) : (
            <ImageNext
              src={lossTicket}
              alt="cat"
              draggable={false}
              className="w-full max-w-[600px]"
            />
          )}
        </div>
      </div>

      {isEnded ? (
        <ImageNext
          src={lossTicketDecor}
          alt="decorator"
          className="mx-auto w-full absolute bottom-0 -z-[1]"
          draggable={false}
        />
      ) : (
        <ImageNext
          src={wonTicketDecor}
          alt="decorator"
          className="mx-auto w-full absolute bottom-0 -z-[1]"
          draggable={false}
        />
      )}
    </>
  );
}

export default memo(ViewInvestment);
