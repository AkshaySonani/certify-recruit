'use client';
import Image from 'next/image';
import { TEXT } from '@/service/Helper';
import Select from '@/Components/Select';
import Button from '@/Components/Button';
import Checkbox from '@/Components/Checkbox';
import React, { useState, Fragment } from 'react';
import { Dialog, Menu, Popover, Switch, Transition } from '@headlessui/react';

const Page = () => {
  const SelectOption = [
    { label: 'Admin', value: 'admin' },
    { label: 'Role1', value: 'Role1' },
    { label: 'Employee', value: 'employee' },
  ];

  const tableData = [
    {
      id: 1,
      name: 'Kate Tanner',
      Email: 'UI/UX Designer',
      Role: '6+ years',
      Status: 'Available',
    },
    {
      id: 2,
      name: 'April Curtis',
      Email: 'UI/UX Designer',
      Role: '5.5+ years',
      Status: 'Hired',
    },
    {
      id: 3,
      name: 'Sledge Hammer',
      Email: 'UI/UX Designer',
      Role: '5.5+ years',
      Status: 'Available',
    },
    {
      id: 4,
      name: 'B.A. Baracus',
      Email: 'UI/UX Designer',
      Role: '5+ years',
      Status: 'Available',
    },
    {
      id: 5,
      name: 'Mike Torello',
      Email: 'UI/UX Designer',
      Role: '4+ years',
      Status: 'Available',
    },
    {
      id: 6,
      name: 'Dori Doreau',
      Email: 'UI/UX Designer',
      Role: '4+ years',
      Status: 'Hired',
    },
    {
      id: 7,
      name: 'Murdock',
      Email: 'UI/UX Designer',
      Role: '6+ years',
      Status: 'Available',
    },
    {
      id: 8,
      name: 'Lynn Tanner',
      Email: 'UI/UX Designer',
      Role: '5+ years',
      Status: 'Hired',
    },
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [rowStates, setRowStates] = useState({});
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const toggleRow = (id) => {
    setRowStates((prevRowStates) => ({
      ...prevRowStates,
      [id]: !prevRowStates[id],
    }));
  };

  return (
    <div>
      <div className="text-2xl font-semibold text-meta-purple-1">Users</div>
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
              value={searchText}
              placeholder="Job title"
              onChange={(event) => setSearchText(event?.target?.value)}
              className="border-stroke active:border-primary h-12 w-full rounded-lg border-2 bg-transparent px-12 py-3 text-black outline-none transition focus:border-meta-light-blue-1"
            />

            <Popover.Panel className="absolute z-10 mt-2 w-full rounded-xl border border-meta-light-blue-1 bg-white p-4 shadow-xl">
              <div className="w-full">
                <label className="text-base font-medium text-meta-purple-1">
                  {TEXT?.JOB_TITLE}
                </label>
                <input
                  type="text"
                  placeholder="Job title search here..."
                  className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:outline-meta-light-blue-1"
                />
              </div>
              <div className="mt-4 w-full">
                <label className="text-base font-medium text-meta-purple-1">
                  {TEXT?.LOCATION}
                </label>
                <input
                  type="text"
                  placeholder="Type location here..."
                  className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:outline-meta-light-blue-1"
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
        <div className="flex w-1/3 cursor-pointer items-center lg:w-2/4">
          <div className="rounded-lg bg-meta-light-blue-2 p-3">
            <Image
              alt="date"
              width={20}
              height={20}
              src={'/dashboard/search.svg'}
            />
          </div>
        </div>
        <Button
          title={TEXT?.ADD_USER}
          handleClick={() => setIsOpen(true)}
          titleClass="flex justify-center text-sm font-medium text-white"
          btnClass="!mb-0 min-w-52 max-w-40 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-blue-1"
        />
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
                  {TEXT?.EMAIL}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.ROLE}
                </div>
              </th>

              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.STATUS}
                </div>
              </th>
              <th className="w-1/12 px-6" />
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => {
              const isEnabled = rowStates[item?.id] || false;
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
                        {item.Email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium text-meta-purple-1">
                        {item.Role}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div
                        className={`text-base font-medium ${
                          item.Status === 'Hired'
                            ? 'text-meta-red-1'
                            : 'text-meta-green-1'
                        }`}
                      >
                        {item.Status}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex justify-end">
                      <Switch
                        checked={isEnabled}
                        onChange={() => toggleRow(item.id)}
                        className={`${
                          isEnabled ? 'bg-meta-light-blue-1' : 'bg-gray-100'
                        } relative inline-flex h-6 w-[60px] items-center rounded-full`}
                      >
                        <span className="sr-only">Enable notifications</span>
                        <span
                          className={`${
                            isEnabled ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-blue-600 transition`}
                        />
                      </Switch>
                      <Image
                        alt="Icon"
                        width={21}
                        height={21}
                        className="mx-4 cursor-pointer"
                        src={'/dashboard/EditIcon.svg'}
                      />
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
          <Dialog as="div" onClose={() => setIsOpen(false)}>
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
              <div className="flex min-h-full items-center justify-center text-center">
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
                      className="border-b-default-1 relative flex items-center justify-center border-meta-light-blue-1 p-6 pb-0 text-xl font-semibold leading-6 text-meta-purple-1"
                    >
                      {TEXT?.ADD_USER}
                    </Dialog.Title>
                    <div
                      onClick={() => setIsOpen(false)}
                      className="absolute right-1 top-2 cursor-pointer p-2 pr-3"
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
                          value={name}
                          placeholder="Name"
                          onChange={(event: any) =>
                            setName(event?.target?.value)
                          }
                          className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:outline-meta-light-blue-1"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          type="text"
                          value={email}
                          placeholder="Email"
                          onChange={(event: any) =>
                            setEmail(event?.target?.value)
                          }
                          className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:outline-meta-light-blue-1"
                        />
                      </div>
                      <div className="mt-3 w-full">
                        <Menu
                          as="div"
                          className="relative z-[1] inline-block w-full text-left"
                        >
                          <Menu.Button className="mt-1 inline-flex w-full items-center justify-between rounded-lg border border-meta-light-blue-1 p-3 focus:outline-meta-light-blue-1">
                            {selectedRole?.label
                              ? selectedRole?.label
                              : 'Select role'}
                            <div className="flex w-max items-center justify-end">
                              <Image
                                alt="Icon"
                                width={18}
                                height={18}
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
                                {SelectOption?.map((list: any) => {
                                  return (
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div
                                          onClick={() => setSelectedRole(list)}
                                          className="flex w-full items-center justify-between"
                                        >
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
                      <Button
                        title={TEXT?.ADD_USER}
                        handleClick={() => setIsOpen(false)}
                        titleClass="flex justify-center text-sm font-medium text-white"
                        btnClass="!mb-0 mt-4 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-blue-1"
                      />
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
