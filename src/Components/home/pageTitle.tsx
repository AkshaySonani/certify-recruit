'use client';
import React from 'react';
import Button from '../Button';
import { TEXT } from '@/service/Helper';

const PageTitle = ({ showBtn, title, content }: any) => {
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

      {showBtn && (
        <div className="mt-6 flex w-full flex-wrap items-center justify-center sm:mt-10 sm:flex-nowrap">
          <Button
            title={TEXT?.START_NOW}
            titleClass="!text-base !text-white"
            btnClass="sm:!w-32 !w-[250px] !rounded-lg !bg-meta-blue-1 !py-2 !mb-0"
          />

          <button className="mb-6 mt-2 h-12 min-w-[250px] rounded-lg border border-meta-light-blue-2 bg-meta-gray-3 py-3 text-white transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient sm:mb-0 sm:ml-4 sm:mt-0 sm:min-w-48">
            <span className="flex justify-center text-sm font-medium text-white">
              Schedule a demo
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PageTitle;
