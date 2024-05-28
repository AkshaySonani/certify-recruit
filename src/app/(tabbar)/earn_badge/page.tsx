'use client';
import React from 'react';
import Image from 'next/image';
import 'react-orgchart/index.css';
import OrgChart from 'react-orgchart';
import { TEXT } from '@/service/Helper';

const Page = () => {
  const menu = [
    { title: 'Employee', value: '50' },
    { title: 'Industry', value: '10' },
    { title: 'Company Revenue ', value: '$ 30' },
    { title: 'Company founded', value: '$ 10M' },
  ];

  const orgChartData = {
    id: '1',
    name: 'B.A. Baracus',
    title: 'CEO',
    location: 'UK-London',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    children: [
      {
        id: '2',
        name: 'B.A. Baracus',
        title: 'CEO',
        location: 'UK-London',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        id: '3',
        name: 'B.A. Baracus',
        title: 'CEO',
        location: 'UK-London',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        id: '4',
        name: 'B.A. Baracus',
        title: 'CEO',
        location: 'UK-London',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
      {
        id: '5',
        name: 'B.A. Baracus',
        title: 'CEO',
        location: 'UK-London',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    ],
  };

  const MyNodeComponent = ({ node }) => {
    return (
      <div className="m-auto flex w-max items-center gap-2 rounded-2xl border border-meta-light-blue-1 p-5">
        <Image alt="Icon" width={50} height={50} src={'/dashboard/photo.svg'} />
        <div className="pr-3">
          <p className="text-base font-medium text-meta-purple-1">
            {node?.name}
          </p>
          <p className="text-xs font-medium text-meta-light-blue-3">
            {node?.post}
          </p>
          <p className="text-xs font-medium text-meta-light-blue-3">
            {node?.location}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
          {TEXT?.COMPANY_INFO}
        </div>

        <div className="mt-4 flex w-full flex-wrap gap-4 lg:flex-nowrap">
          {menu.map((item) => {
            return (
              <div className="relative w-1/4 cursor-pointer rounded-2xl border border-meta-light-blue-1 p-5">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-meta-light-blue-1">
                  <Image
                    alt="Icon"
                    width={19}
                    height={19}
                    src={'/sidebarIcon/jobPosting.svg'}
                  />
                </div>
                <p className="text-2xl font-bold text-meta-purple-1">
                  {item?.value}
                </p>
                <p className="text-base font-medium text-meta-light-blue-3">
                  {item.title}
                </p>
                <Image
                  alt="Icon"
                  width={61}
                  height={93}
                  src={'/dashboard/MaskGroup.svg'}
                  className="absolute right-0 top-6"
                />
              </div>
            );
          })}
        </div>
        <div className="mt-5" id="inTechOrgChart">
          <OrgChart tree={orgChartData} NodeComponent={MyNodeComponent} />
        </div>
      </div>
    </div>
  );
};

export default Page;
