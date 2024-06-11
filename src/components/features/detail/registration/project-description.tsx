import React, { memo } from 'react';

function ProjectDescription({ data }: { data?: string }) {
  return (
    <article className="flex flex-col gap-4 font-medium">
      <section
        className="ql-content"
        dangerouslySetInnerHTML={{
          __html: data || '',
        }}
      />
    </article>
  );
}

export default memo(ProjectDescription);
