'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import { doGetFurtureProjects } from '@/adapters/projects';

import FurtureLoading from './furture-loading';
import Pool from './pool';

function FurtureLaunch({ revalidatePath }: { revalidatePath?: Function }) {
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
      const furtureProjectResponse = await doGetFurtureProjects(
        {
          limit: 1,
          page: page,
        },
        controller.signal,
      );

      if (furtureProjectResponse?.data?.projects) {
        setData(furtureProjectResponse.data.projects);
      }

      if (furtureProjectResponse?.data?.pagination?.total) {
        setTotal(furtureProjectResponse.data.pagination.total);
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
        <FurtureLoading />
      ) : (
        <Pool
          pagination={{
            handleNext,
            handlePrevious,
            page,
            total,
          }}
          title="Fur-ture Launch"
          mode="active"
          direction="row"
          data={data}
          revalidatePath={revalidatePath}
        />
      )}
    </>
  );
}

export default memo(FurtureLaunch);
