'use client';
import React from 'react';

const PageTitle = ({ title, content }: any) => {
  return (
    <div className="w-full">
      {title && (
        <div className="mb-2 flex w-full items-center justify-center text-center sm:mb-5">
          <p className="max-w-2xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            {title}
          </p>
        </div>
      )}
      <div className="flex w-full items-center justify-center text-center">
        <p className="max-w-2xl text-xl font-bold text-meta-purple-1 md:text-3xl lg:text-4xl">
          {content}
        </p>
      </div>
    </div>
  );
};

export default PageTitle;
