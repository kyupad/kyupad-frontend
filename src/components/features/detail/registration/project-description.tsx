import React, { memo } from 'react';

function ProjectDescription({ data }: { data?: string }) {
  return (
    <div
      className="flex flex-col gap-4 font-medium"
      dangerouslySetInnerHTML={{
        __html: data || '',
      }}
    />
  );
}

export default memo(ProjectDescription);
