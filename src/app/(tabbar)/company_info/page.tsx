'use client';
import Image from 'next/image';
import Select from '@/Components/Select';
import Checkbox from '@/Components/Checkbox';
import React, { useState, Fragment } from 'react';
import { Dialog, Menu, Popover, Switch, Transition } from '@headlessui/react';
import { TEXT } from '@/service/Helper';

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const SelectOption = [
    { label: 'HR', value: 'hr' },
    { label: 'Bench sales', value: 'Bench sales' },
    { label: 'Domestic Recruitment', value: 'Domestic Recruitment' },
    { label: 'US Recruitment', value: 'US Recruitment' },
    { label: 'UK Recruitment', value: 'UK Recruitment' },
  ];
  const tableData = [
    {
      name: 'Kate Tanner',
      Email: 'katetanner123@gmail.com',
      Experience: '6+ years',
      Department: 'UI/UX Designer',
      Score: '70%',
      status: 'Send',
    },
    {
      name: 'Kate Tanner',
      Email: 'katetanner123@gmail.com',
      Experience: '6+ years',
      Department: 'UI/UX Designer',
      Score: '70%',
      status: 'Send',
    },
    {
      name: 'Kate Tanner',
      Email: 'katetanner123@gmail.com',
      Experience: '6+ years',
      Department: 'UI/UX Designer',
      Score: '70%',
      status: 'Send',
    },
    {
      name: 'Kate Tanner',
      Email: 'katetanner123@gmail.com',
      Experience: '6+ years',
      Department: 'UI/UX Designer',
      Score: '70%',
      status: 'Send',
    },
    {
      name: 'Kate Tanner',
      Email: 'katetanner123@gmail.com',
      Experience: '6+ years',
      Department: 'UI/UX Designer',
      Score: '70%',
      status: 'Send',
    },
    {
      name: 'Kate Tanner',
      Email: 'katetanner123@gmail.com',
      Experience: '6+ years',
      Department: 'UI/UX Designer',
      Score: '70%',
      status: 'Send',
    },
    {
      name: 'Kate Tanner',
      Email: 'katetanner123@gmail.com',
      Experience: '6+ years',
      Department: 'UI/UX Designer',
      Score: '70%',
      status: 'Send',
    },
    {
      name: 'Kate Tanner',
      Email: 'katetanner123@gmail.com',
      Experience: '6+ years',
      Department: 'UI/UX Designer',
      Score: '70%',
      status: 'Send',
    },
  ];

  return (
    <div>
      <div className="text-2xl font-semibold text-meta-purple-1">
        {TEXT?.COMPANY_INFO}
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
              placeholder="Job title"
              className="border-stroke focus:border-primary active:border-primary h-12 w-full rounded-lg border-2 bg-transparent px-12 py-3 text-black outline-none transition"
            />

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

              <div className="mt-4 flex w-full items-center justify-between">
                <div>
                  <Checkbox
                    label={'Set as default'}
                    className={'text-base font-medium text-meta-light-blue-3'}
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
        <div className="flex w-1/3 items-center lg:w-2/4">
          <div className="rounded-lg bg-meta-light-blue-2 p-2">
            <Image
              alt="date"
              width={19}
              height={19}
              src={'/dashboard/search.svg'}
            />
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="min-w-50 ml-5 h-12 w-full  max-w-64 rounded-xl border border-meta-light-blue-2 bg-meta-blue-1"
        >
          <span className="flex justify-center text-sm font-medium text-white">
            {TEXT?.ADD_EMPLOYEE}
          </span>
        </button>
      </div>

      <div>
        <table className="min-w-[700px] overflow-x-auto overflow-y-auto text-left text-sm xl:w-full">
          <thead className="border-b border-meta-light-blue-1 shadow-inner">
            <tr>
              <th className="w-1/4 px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.NAME}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.DEPARTMENT}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.EXPERIENCE}
                </div>
              </th>

              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.EMAIL}
                </div>
              </th>
              <th className="w-1/12 px-6">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.SCORE}
                </div>
              </th>
              <th className="w-1/12 px-6" />
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
                        {item.Department}
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
                      <div className="text-base font-medium">{item.Email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium text-green-500">
                        {item.Score}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium">{item.status}</div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className=" " onClose={() => setIsOpen(false)}>
            <Transition.Child
              as={Fragment}
              leaveTo="opacity-0"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leave="ease-in duration-200"
              enter="ease-out duration-300"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center  text-center">
                <Transition.Child
                  as={Fragment}
                  leave="ease-in duration-200"
                  leaveTo="opacity-0 scale-95"
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leaveFrom="opacity-100 scale-100"
                >
                  <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className=" relative flex items-center justify-center border-b-2 border-meta-light-blue-1 p-6 text-xl font-semibold leading-6 text-meta-purple-1"
                    >
                      {TEXT?.ADD_EMPLOYEE}
                    </Dialog.Title>
                    <div
                      onClick={() => setIsOpen(false)}
                      className="absolute right-1 top-2 cursor-pointer p-2"
                    >
                      <Image
                        alt="date"
                        width={19}
                        height={15}
                        src={'CloseIcon.svg'}
                      />
                    </div>
                    <div className="w-full p-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Name"
                          className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                        />
                      </div>

                      <div className="mt-3 w-full">
                        <Menu
                          as="div"
                          className="relative z-[1] inline-block w-full text-left"
                        >
                          <Menu.Button className="mt-1 inline-flex w-full items-center justify-between rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3">
                            {TEXT?.DEPARTMENT}
                            <div>
                              <Image
                                alt="Icon"
                                width={14}
                                height={14}
                                src={'/dashboard/SelectDown.svg'}
                              />
                            </div>
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
                            <Menu.Items className="absolute right-0 mt-2 w-full divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                              <div className="px-1 py-1">
                                {SelectOption?.map((list) => {
                                  return (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div className="flex w-full items-center justify-between">
                                          <button
                                            className={`${
                                              active ? '' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                          >
                                            {list?.label}
                                          </button>
                                          <div>
                                            <Checkbox
                                              value={list?.value}
                                              checked={active ? true : false}
                                              className="text-base font-medium text-meta-light-blue-3"
                                            />
                                          </div>
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
                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder="Experience"
                          className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          placeholder="Email"
                          className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                        />
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="mt-3 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-blue-1"
                      >
                        <span className="flex justify-center text-sm font-medium text-white">
                          {TEXT?.ADD_EMPLOYEE}
                        </span>
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default Page;
