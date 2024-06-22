'use client';
import Image from 'next/image';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { TEXT } from '@/service/Helper';
import Button from '@/Components/Button';
import Spinner from '@/app/icons/Spinner';
import { useSession } from 'next-auth/react';
import { API_CONSTANT } from '@/constant/ApiConstant';
import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Menu, Popover, Switch, Transition } from '@headlessui/react';

const Page = () => {
  const session = useSession<any>();

  const SelectOption = [
    { label: 'User', value: 'User' },
    { label: 'Super Admin', value: 'Super Admin' },
    { label: 'Contain Creator', value: 'Contain Creator' },
  ];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [userList, setUserLists] = useState<any>({});
  const [rowStates, setRowStates] = useState<any>({});
  const [userDetails, setUserDetails] = useState<any>({});
  const [selectedRole, setSelectedRole] = useState<any>('');

  useEffect(() => {
    // Initialize the rowStates based on the initial data
    const initialRowStates = userDetails?.users?.reduce(
      (acc: any, user: any) => {
        acc[user.id] = user.stauts; // Initialize with the current status
        return acc;
      },
      {},
    );
    setRowStates(initialRowStates || {});
  }, [userDetails]);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res: any) => {
        setUserLists(res?.data?.data?.users);
        setUserDetails(res?.data?.data);
      })
      .catch((error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            'Internal server error',
        );
      });
  };

  const addNewUser = () => {
    setLoading(true);
    const obj = {
      name: name,
      email: email,
      stauts: 'Active',
      role: selectedRole?.value,
    };

    API.post(API_CONSTANT.PROFILE, { users: [obj] })
      .then((res) => {
        setLoading(false);
        toast?.success(res?.data?.message);
        getProfileDetails();
        setIsOpen(false);

        setTimeout(() => {
          setEmail('');
          setName('');
          setSelectedRole('');
        }, 100);
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            'Internal server error',
        );
      });
  };

  const sendBadgeLink = (item: any) => {
    API.post(API_CONSTANT?.SEND_BADGE_LINK, { email: item?.email })
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
            'Something went wrong, please try again',
        );
      });
  };

  const toggleRow = async (id: any, item: any) => {
    const currentStatus = rowStates[id];
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';

    const obj = {
      userId: item?._id,
      newStatus: item.stauts === 'Active' ? 'Inactive' : 'Active',
    };

    API.post(API_CONSTANT.UPDATE_COM_USER_STATUS, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          getProfileDetails();
          toast?.success(res?.data?.message);
          setRowStates((prevRowStates: any) => ({
            ...prevRowStates,
            [id]: newStatus,
          }));
        }
      })
      .catch((err: any) => {
        toast.error(
          err?.response?.data?.message ||
            err?.message ||
            'Internal server error',
        );
      });
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
    if (e.target.value === '') {
      setSearchText('');
      setUserLists(userDetails?.users);
    } else {
      const filteredUsers = userList?.filter((user: any) => {
        return (
          user.name.toLowerCase().includes(searchText?.toLowerCase()) ||
          user.role.toLowerCase().includes(searchText?.toLowerCase())
        );
      });
      setUserLists(filteredUsers);
    }
  };

  return (
    <div>
      {!session?.data || !userDetails ? (
        <div className="flex h-full items-center justify-center">
          <Spinner
            width="32px"
            height="32px"
            color="#3751F2"
            className="spinner"
          />
        </div>
      ) : (
        <div>
          <div className="text-2xl font-semibold text-meta-purple-1">
            {TEXT?.BADGE_OF_HONOUR}
          </div>
          <div className="mb-10 mt-5 flex items-center justify-between gap-6">
            <div className="w-2/4">
              <input
                type="text"
                value={searchText}
                placeholder="Job title"
                onChange={(event) => handleSearch(event)}
                className="border-stroke active:border-primary h-12 w-full rounded-lg border-2 bg-transparent px-4 py-3 text-black outline-none transition focus:border-meta-light-blue-1"
              />
              {/* <Popover className="relative">
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
                  onChange={(event) => handleSearch(event)}
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
              </Popover> */}
            </div>
            {/* <div className="flex w-1/3 cursor-pointer items-center lg:w-2/4">
              <div className="rounded-lg bg-meta-light-blue-2 p-3">
                <Image
                  alt="date"
                  width={20}
                  height={20}
                  src={'/dashboard/search.svg'}
                />
              </div>
            </div> */}
            <Button
              title={TEXT?.ADD_AN_EMPLOYEE}
              handleClick={() => setIsOpen(true)}
              titleClass="flex justify-center text-sm font-medium text-white"
              btnClass="!mb-0 min-w-52 max-w-40 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-blue-1"
            />
          </div>

          <div>
            {!userDetails?.users ? (
              <div>
                <div className="flex h-full items-center justify-center">
                  <Spinner
                    width="32px"
                    height="32px"
                    color="#3751F2"
                    className="spinner"
                  />
                </div>
              </div>
            ) : (
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
                  {userList?.map((item: any) => {
                    const isEnabled = item.stauts === 'Active';
                    return (
                      <tr key={item?._id}>
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
                              {item.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          <div>
                            <div className="text-base font-medium text-meta-purple-1">
                              {item.role}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                          <div>
                            <div
                              className={`text-base font-medium ${
                                item.stauts === 'Inactive'
                                  ? 'text-meta-red-1'
                                  : 'text-meta-green-1'
                              }`}
                            >
                              {item.stauts}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          <div className="flex justify-end">
                            <Switch
                              checked={isEnabled}
                              onChange={() => toggleRow(item?._id, item)}
                              className={`${
                                isEnabled
                                  ? 'bg-meta-light-blue-1'
                                  : 'bg-meta-gray-5'
                              } relative inline-flex h-6 w-[45px] items-center rounded-full`}
                            >
                              <span className="sr-only">
                                Enable notifications
                              </span>
                              <span
                                className={`${
                                  isEnabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-blue-600 transition`}
                              />
                            </Switch>

                            <p
                              onClick={() => isEnabled && sendBadgeLink(item)}
                              className={`${isEnabled ? 'cursor-pointer text-meta-blue-1' : 'cursor-not-allowed'} ml-4 text-base font-normal`}
                            >
                              {TEXT?.SEND}
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <div>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                onClose={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    setEmail('');
                    setName('');
                    setSelectedRole('');
                  }, 100);
                }}
              >
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
                          {TEXT?.ADD_AN_EMPLOYEE}
                        </Dialog.Title>
                        <div
                          onClick={() => {
                            setIsOpen(false);
                            setTimeout(() => {
                              setEmail('');
                              setName('');
                              setSelectedRole('');
                            }, 100);
                          }}
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
                              className="mt-1 w-full rounded-lg border border-meta-light-blue-1 p-3 focus:outline-meta-light-blue-1"
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
                              className="mt-1 w-full rounded-lg border border-meta-light-blue-1 p-3 focus:outline-meta-light-blue-1"
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
                                              onClick={() =>
                                                setSelectedRole(list)
                                              }
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
                                                <input
                                                  type="checkbox"
                                                  value={list?.value}
                                                  checked={
                                                    selectedRole?.value ===
                                                    list?.label
                                                      ? true
                                                      : false
                                                  }
                                                  className="custom-checkbox text-base font-medium text-meta-light-blue-3"
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
                            disabled={loading}
                            isLoading={loading}
                            title={TEXT?.ADD_AN_EMPLOYEE}
                            handleClick={() => addNewUser()}
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
      )}
    </div>
  );
};

export default Page;
