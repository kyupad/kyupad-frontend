'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import { doGetSuccessProjects } from '@/adapters/projects';

import Pool from './pool';
import UpcomingLoading from './upcoming-loading';

function SuccessLaunch() {
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
      const successProjectResponse = await doGetSuccessProjects(
        {
          limit: 3,
          page: page,
        },
        controller.signal,
      );

      if (successProjectResponse?.data?.projects) {
        setData(successProjectResponse.data.projects);
      }

      if (successProjectResponse?.data?.pagination?.total) {
        setTotal(successProjectResponse.data.pagination.total);
      }
    };

    const debounceFunction = setTimeout(() => {
      try {
        fetchData().finally(() => {
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
          title="Success-fur Launches"
          mode="success"
          direction="column"
          data={data}
        />
      )}
    </>
  );
}

export default memo(SuccessLaunch);
