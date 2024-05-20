'use client';
import Image from 'next/image';
import React, { Fragment, useState } from 'react';
import Select from '@/Components/Select';
import Checkbox from '@/Components/Checkbox';
import DatePicker from 'react-multi-date-picker';
import { TEXT } from '@/service/Helper';
import { Menu, Popover, Transition } from '@headlessui/react';
const tableData = [
  {
    name: 'Kate Tanner',
    Designation: 'UI/UX Designer',
    Experience: '6+ years',
    Date: '16/02/2024',
    Status: 'Available',
  },
  {
    name: 'April Curtis',
    Designation: 'UI/UX Designer',
    Experience: '5.5+ years',
    Date: '10/02/2024',
    Status: 'Hired',
  },
  {
    name: 'Sledge Hammer',
    Designation: 'UI/UX Designer',
    Experience: '5.5+ years',
    Date: '16/02/2024',
    Status: 'Available',
  },
  {
    name: 'B.A. Baracus',
    Designation: 'UI/UX Designer',
    Experience: '5+ years',
    Date: '12/02/2024',
    Status: 'Available',
  },
  {
    name: 'Mike Torello',
    Designation: 'UI/UX Designer',
    Experience: '4+ years',
    Date: '06/02/2024',
    Status: 'Available',
  },
  {
    name: 'Dori Doreau',
    Designation: 'UI/UX Designer',
    Experience: '4+ years',
    Date: '16/02/2024',
    Status: 'Hired',
  },
  {
    name: 'Murdock',
    Designation: 'UI/UX Designer',
    Experience: '6+ years',
    Date: '15/02/2024',
    Status: 'Available',
  },
  {
    name: 'Lynn Tanner',
    Designation: 'UI/UX Designer',
    Experience: '5+ years',
    Date: '16/02/2024',
    Status: 'Hired',
  },
];
const ApplicantStatus = [
  { status: 'Awaiting' },
  { status: 'Hired' },
  { status: 'Contacting' },
];
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
function ApplicantDetails({ id }: any) {
  const [dateRange, setDateRange] = useState(['2024-01-01', '2024-12-31']);

  return (
    <div>
      <div>
        <div className="text-2xl font-semibold text-meta-purple-1">
          {TEXT?.APPLICANT}
        </div>
        <div className="mb-10 mt-5 flex items-center justify-center gap-6">
          <div className="w-2/4">
            <Popover className="relative">
              <Popover.Button className="absolute left-3 top-4">
                <Image
                  alt="date"
                  width={19}
                  height={15}
                  src={'/dashboard/filter.svg'}
                />
              </Popover.Button>
              <input
                type="text"
                placeholder="Search..."
                className="focus:border-primary active:border-primary h-12 w-full rounded-lg border border-meta-light-blue-1  bg-transparent px-12 text-black outline-none transition"
              />
              <div className="absolute right-3 top-[9px]">
                <Image
                  alt="date"
                  width={19}
                  height={19}
                  src={'/dashboard/search.svg'}
                />
              </div>
              <Popover.Panel className="absolute z-10 mt-2 w-full rounded-xl border border-meta-light-blue-1 bg-white p-4 shadow-xl">
                <div className="w-full">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.JOB_TITLE}
                  </label>
                  <input
                    type="text"
                    placeholder="Job title search here..."
                    className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="mt-4 w-full">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.LOCATION}
                  </label>
                  <input
                    type="text"
                    placeholder="Type location here..."
                    className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="mt-4 w-full">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.DATE_POSTED}
                  </label>
                  <DatePicker
                    range
                    format="YYYY-MM-DD"
                    minDate={new Date('01-01-2014')}
                    maxDate={new Date('12-31-2024')}
                    placeholder="YYYY-MM-DD - YYYY-MM-DD"
                    containerStyle={{ width: '100%' }}
                    onChange={(dateObjects: any) => {
                      if (dateObjects?.[1]?.toString()) {
                        setDateRange((e) => [
                          dateObjects?.[0]?.toString(),
                          dateObjects?.[1]?.toString(),
                        ]);
                      }
                    }}
                    style={{
                      height: 48,
                      width: '100%',
                      borderRadius: 8,
                      paddingLeft: 20,
                      marginTop: 4,
                    }}
                  />
                </div>
                <div className="mt-4 flex w-full items-center justify-between">
                  <div>
                    <Checkbox
                      label={'Set as default'}
                      className="text-base font-medium text-meta-light-blue-3"
                    />
                  </div>
                  <div>
                    <button className="ml-5 h-12 w-28 rounded-xl border border-meta-light-blue-2 bg-meta-light-blue-1">
                      <span className="flex justify-center text-sm font-medium text-meta-light-blue-3">
                        {TEXT?.DONE}
                      </span>
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
          <div className="flex w-2/4 items-center">
            <div className="relative w-full">
              <DatePicker
                range
                format="YYYY-MM-DD"
                placeholder="Select Dates"
                minDate={new Date('01-01-2014')}
                maxDate={new Date('12-31-2024')}
                containerStyle={{ width: '100%' }}
                onChange={(dateObjects: any) => {
                  if (dateObjects?.[1]?.toString()) {
                    setDateRange((e) => [
                      dateObjects?.[0]?.toString(),
                      dateObjects?.[1]?.toString(),
                    ]);
                  }
                }}
                style={{
                  height: 35,
                  fontSize: 12,
                  width: '100%',
                  borderRadius: 8,
                  borderColor: '#DCE7FF',
                }}
              />
              <div className="absolute right-2 top-2">
                <Image
                  alt="date"
                  width={24}
                  height={24}
                  src={'/dashboard/date.svg'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-meta-light-blue-1 shadow-inner">
            <tr>
              <th className="w-1/4 px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.NAME}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.DESIGNATION}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.EXPERIENCE}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.DATE}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.STATUS}
                </div>
              </th>
              <th className="w-1/12 px-6">
                <span className="flex rounded-lg bg-meta-light-blue-2 p-2 text-base font-medium text-meta-light-blue-3">
                  <div>{TEXT?.DOWNLOADS}</div>
                  <div className="ml-5">{TEXT?.FIVE_INTO_FIVE}</div>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => {
              return (
                <tr>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center">
                      <Image
                        alt="Icon"
                        width={31}
                        height={31}
                        src={'/dashboard/photo.svg'}
                      />
                      <div className="pl-4 text-base font-medium text-meta-purple-1">
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium text-meta-purple-1">
                        {item.Designation}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium text-meta-purple-1">
                        {item.Experience}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium text-meta-purple-1">
                        {item.Date}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center">
                      <Menu as="div" className="relative w-full">
                        <Menu.Button className="relative  flex w-full appearance-none items-center justify-between  py-2   outline-none transition">
                          <p className="font-me capitalize text-meta-purple-1">
                            {item?.Status}
                          </p>
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-75"
                          leaveTo="transform opacity-0 scale-95"
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leaveFrom="transform opacity-100 scale-100"
                        >
                          <Menu.Items className="absolute right-0 z-30 max-h-[200px] w-full origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div>
                              {ApplicantStatus?.map((el: any) => {
                                return (
                                  <Menu.Item>
                                    {({ active }) => (
                                      <div
                                        // onClick={() => setJobStatus(el)}
                                        className={classNames(
                                          active
                                            ? 'bg-meta-blue-1 text-white'
                                            : 'text-gray-900',
                                          'block px-4 py-2 text-sm capitalize',
                                        )}
                                      >
                                        {el?.status}
                                      </div>
                                    )}
                                  </Menu.Item>
                                );
                              })}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex justify-end">
                      <Image
                        alt="Icon"
                        width={21}
                        height={21}
                        className="mx-4"
                        src={'/sidebarIcon/jobPosting.svg'}
                      />
                      <Image
                        alt="Icon"
                        width={21}
                        height={21}
                        className="mx-4"
                        src={'/dashboard/download.svg'}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApplicantDetails;
