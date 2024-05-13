'use client';
import Image from 'next/image';
import Select from '@/Components/Select';
import { useRouter } from 'next/navigation';
import Checkbox from '@/Components/Checkbox';
import { useSession } from 'next-auth/react';
import AppContext from '@/context/AppProvider';
import React, { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ROUTE, TEXT, USER_ROLE } from '@/service/Helper';
import CompleteProfile from '@/Components/dashboard/completeProfile';

const menu = [
  { title: 'Candidates Hired' },
  { title: 'Active Jobs' },
  { title: 'Total Jobs' },
  { title: 'Active Jobs' },
];

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

const Page = (data: any) => {
  const router = useRouter();
  const session = useSession();
  const context = useContext(AppContext);

  const navigateHandler = (title: string) => {
    if (title === 'Active Jobs') {
      router.push(ROUTE?.ACTIVE_JOB);
    } else if (title === 'Candidates Hired') {
      router.push(ROUTE?.HIRED);
    }
  };

  const percentage =
    context?.userProfileCount?.basic_details +
    context?.userProfileCount?.company_details +
    context?.userProfileCount?.kyc_details;

  return (
    <div>
      <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
        {TEXT?.DASHBOARD}
      </div>
      <div>
        {percentage === 100 && (
          <div className="rounded-3xl bg-[url('/dashboard/sertificateBG.svg')] bg-cover bg-no-repeat p-4">
            <div>
              <div className="text-xl font-medium text-white">
                {TEXT?.CONGRATULATIONS_YOUR_CERTIFICATION_IS_COMPLETE}
              </div>
            </div>
            <div className="flex justify-end">
              <div className="mb-2.5 text-sm font-medium text-white underline underline-offset-2">
                {TEXT?.VIEW_CERTIFICATE}
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-white">
                    {TEXT?.CERTIFICATION_VALIDATION_IS_YEAR_ONLY}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-sm font-medium text-white">
                    {TEXT?.SHARE}
                  </div>
                  <div className="mr-4">
                    <Image
                      width={30}
                      height={30}
                      alt="linkedin"
                      src={'/dashboard/linkedin.svg'}
                    />
                  </div>
                  <div className="mr-4">
                    <Image
                      width={30}
                      height={30}
                      alt="twitter"
                      src={'/dashboard/twitter.svg'}
                    />
                  </div>
                  <div>
                    <button className="h-10 w-48 rounded-lg bg-meta-blue-2 text-white">
                      {TEXT?.DOWNLOAD}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {session?.data?.user?.role === USER_ROLE?.EMPLOYEE && (
          <div className="mt-4 flex gap-4">
            {menu.map((item) => {
              return (
                <div
                  className="relative w-1/4 cursor-pointer rounded-2xl border border-meta-light-blue-1 p-5"
                  onClick={() => navigateHandler(item.title)}
                >
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-meta-light-blue-1">
                    <Image
                      alt="Icon"
                      width={19}
                      height={19}
                      src={'/sidebarIcon/jobPosting.svg'}
                    />
                  </div>
                  <p className="text-2xl font-bold text-meta-purple-1">50</p>
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
        )}
        {percentage === 100 && (
          <div className="mt-8 text-xl font-semibold text-meta-purple-1">
            {TEXT?.RECENTLY_JOB_POST}
          </div>
        )}

        {percentage !== 100 && <CompleteProfile />}

        {percentage === 100 &&
          Array.from({ length: 3 }).map((_, index) => {
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
                    </div>
                  </div>
                  <div className="mt-8 flex gap-4">
                    {jobs.map((item) => {
                      return (
                        <div className=" w-1/4 rounded-2xl bg-white p-5">
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
