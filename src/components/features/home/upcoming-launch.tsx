'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import { doGetUpcomingProjects } from '@/adapters/projects';

import Pool from './pool';
import UpcomingLoading from './upcoming-loading';

function UpcomingLaunch({ revalidatePath }: { revalidatePath: Function }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);

  const handleNext = useCallback(() => {
    if (page < total) {
      setPage(page + 1);
    }
  }, [page, total]);

  const handlePrevious = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const upcomingProjectResponse = await doGetUpcomingProjects(
        {
          limit: 3,
          page: page,
        },
        controller.signal,
      );

      if (upcomingProjectResponse?.data?.projects) {
        setData(upcomingProjectResponse.data.projects);
      }

      if (upcomingProjectResponse?.data?.pagination?.total) {
        setTotal(upcomingProjectResponse.data.pagination.total);
      }
    };

    const debounceFunction = setTimeout(() => {
      try {
        setLoading(true);
        fetchData().finally(async () => {
          await new Promise((resolve) => setTimeout(resolve, 200));
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    }, 200);

    return () => {
      controller.abort();
      clearTimeout(debounceFunction);
    };
  }, [page]);

  return (
    <>
      {loading ? (
        <UpcomingLoading />
      ) : (
        <Pool
          pagination={{
            handleNext,
            handlePrevious,
            page,
            total,
          }}
          title="Upcoming Launches"
          mode="upcoming"
          direction="column"
          data={data}
          revalidatePath={revalidatePath}
        />
      )}
    </>
  );
}

export default memo(UpcomingLaunch);
