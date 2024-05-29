import React from 'react';

const PageTitle = ({ title, content }: any) => {
  return (
    <div className="mt-14 w-full">
      {title && <p>{title}</p>}
      <div className="flex w-full items-center justify-center text-center">
        <p className="max-w-2xl text-xl font-bold text-meta-purple-1 md:text-3xl lg:text-4xl">
          {content}
        </p>
      </div>
    </div>
  );
};

export default PageTitle;
