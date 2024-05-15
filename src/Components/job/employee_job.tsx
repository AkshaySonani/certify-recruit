'use client';
import Image from 'next/image';
import Select from '@/Components/Select';
import { useRouter } from 'next/navigation';
import Checkbox from '@/Components/Checkbox';
import DatePicker from 'react-multi-date-picker';
import React, { Fragment, useState } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { TEXT } from '@/service/Helper';

const jobs = [
  { title: 'Applicants', count: 50 },
  { title: 'Awaiting', count: 10 },
  { title: 'Contacting', count: 20 },
  { title: 'Hired', count: 10 },
];

const SelectOption = [
  { label: 'Select ...', value: '' },
  { label: 'Open', value: 'Open' },
  { label: 'Paused', value: 'Paused' },
  { label: 'Closed', value: 'Closed' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Page = () => {
  const router = useRouter();
  const [dateRange, setDateRange] = useState(['2024-01-01', '2024-12-31']);

  const jobHandler = (title: string) => {
    if (title === 'Applicants') {
      router.push('/job/applicants');
    } else if (title === 'Awaiting') {
      router.push('/job/awaiting');
    } else if (title === 'Contacting') {
      router.push('/job/contacting');
    } else if (title === 'Hired') {
      router.push('/job/hired');
    }
  };

  return (
    <div>
      <div>
        <div className="text-2xl font-semibold text-meta-purple-1">
          {TEXT?.JOBS}
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
            <button className="ml-5 h-12 w-full min-w-36 max-w-64 rounded-xl border border-meta-light-blue-2 bg-meta-blue-1">
              <span className="flex justify-center text-sm font-medium text-white">
                {TEXT?.JOB_POST}
              </span>
            </button>
          </div>
        </div>

        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div className="mt-5">
              <div className="rounded-2xl bg-meta-gray-2 p-5">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="mt-1">
                      <Checkbox />
                    </div>
                    <div className="">
                      <div className="text-xl font-semibold text-meta-purple-1">
                        {TEXT?.USER_INTERFACE_EXPERT}
                        <div className="text-base font-medium text-meta-light-blue-3">
                          {TEXT?.CITY_NAMES}
                        </div>
                      </div>
                    </div>
                    <p className="ml-2 mt-1 text-base font-medium text-meta-light-blue-3">
                      {TEXT?.TWO_WEEKS_AGO}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Select options={SelectOption} />
                    {/* <Image src={"/dashboard/threeDot.svg"} className="ml-10" alt="Icon" width={4} height={20} /> */}

                    {/* ---------------------------- */}
                    <Menu as="div" className="relative ml-10">
                      <div>
                        <Menu.Button className="focus:ring-secondary flex max-w-xs items-center rounded-full bg-white text-base focus:outline-none focus:ring-2 focus:ring-offset-2">
                          <Image
                            width={4}
                            alt="Icon"
                            height={20}
                            src={'/dashboard/threeDot.svg'}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-75"
                        leaveTo="transform opacity-0 scale-95"
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leaveFrom="transform opacity-100 scale-100"
                      >
                        <Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'block px-4 py-2 text-base',
                                  )}
                                >
                                  {TEXT?.EDIT}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'block px-4 py-2 text-base',
                                  )}
                                >
                                  {TEXT?.DELETE}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'block px-4 py-2 text-base',
                                  )}
                                >
                                  {TEXT?.VIEW}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'block px-4 py-2 text-base',
                                  )}
                                >
                                  {TEXT?.JOB_DETAILS}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {/* ---------------------------- */}
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  {jobs.map((item) => {
                    return (
                      <div
                        onClick={() => jobHandler(item.title)}
                        className=" w-1/4 cursor-pointer rounded-2xl bg-white p-5"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <p className="mb-2 text-xl font-semibold text-meta-blue-1">
                            {item.count}
                          </p>
                          <p className="text-base font-medium text-meta-light-blue-3">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
