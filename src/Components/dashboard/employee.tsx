'use client';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { JOB_STATUS } from '@/constant/Enum';
import API from '@/service/ApiService';
import { ROUTE, TEXT } from '@/service/Helper';
import { Menu, Transition } from '@headlessui/react';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
const actionMenuItems = ['Edit', 'Delete', 'View JobDetails'];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
const EmployeeDashboard = ({
  dashboardData,
  setDashBoardData,
  getDashboardJob,
}: any) => {
  const router = useRouter();

  const updateStatusApi = (val: any, id: any) => {
    const updatedItems = dashboardData.map((item: any) =>
      item?._id === id ? { ...item, status: val } : item,
    );
    setDashBoardData(updatedItems);
    const data = {
      status: val,
      job_id: id,
    };
    API.post(API_CONSTANT.JOB, data)
      .then((res) => {
        toast?.success('Job updated successfully');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };

  const handleAction = (action: any, job: any) => {
    if (action === 'Edit') {
      router.push(`${ROUTE?.JOb_POST}/${job._id}`);
    } else if (action === 'Delete') {
      const obj: any = {
        job_id: job._id,
      };
      API.post(API_CONSTANT.JOB_DELETE, obj)
        .then((res: any) => {
          getDashboardJob();
          toast?.success('Job delete successfully');
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || 'Internal server error',
          );
        });
    } else {
      router.push(`${ROUTE?.JOb_DETAILS}/${job._id}`);
    }
  };

  return (
    <div>
      <div className="mt-8 text-xl font-semibold text-meta-purple-1">
        {TEXT?.RECENTLY_JOB_POST}
      </div>
      {dashboardData?.length !== 0 ? (
        dashboardData?.map((list: any) => {
          return (
            <div className="mt-5">
              <div className="rounded-2xl bg-meta-gray-2 p-5">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-start">
                      <div className="whitespace-pre-wrap break-all text-xl font-semibold text-meta-purple-1">
                        {list?.title}
                      </div>
                      <p className="mx-2 mt-1 whitespace-nowrap text-base font-medium text-meta-light-blue-3">
                        {moment(list?.createdAt).fromNow()}
                      </p>
                    </div>
                    <div className="text-base font-medium text-meta-light-blue-3">
                      {list?.city?.[0]?.name},{' '}
                      {list?.state?.[0]?.name ?? 'Gujarat'},{' '}
                      {list?.country?.[0]?.name ?? ''}
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Menu as="div" className="relative w-44">
                      <Menu.Button className="relative  flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 py-2 pl-5 pr-[11px] outline-none transition">
                        <p className="font-me capitalize text-meta-purple-1">
                          {list?.status}
                        </p>
                        <Image
                          alt="Icon"
                          width={14}
                          height={14}
                          src={'/dashboard/SelectDown.svg'}
                        />
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
                            {JOB_STATUS?.map((el: any) => {
                              return (
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      onClick={() => {
                                        updateStatusApi(el, list?._id);
                                      }}
                                      className={classNames(
                                        active
                                          ? 'bg-meta-blue-1 text-white'
                                          : 'text-gray-900',
                                        'block px-4 py-2 text-[14px] capitalize',
                                      )}
                                    >
                                      <p className="capitalize">{el}</p>
                                    </div>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>

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
                            {actionMenuItems?.map((el, i) => {
                              return (
                                <Menu.Item>
                                  {({ active }) => (
                                    <div
                                      onClick={() => handleAction(el, list)}
                                      className={classNames(
                                        active
                                          ? 'bg-meta-blue-2 text-white'
                                          : 'text-gray-700',
                                        'block px-4 py-2 text-base',
                                      )}
                                    >
                                      {el}
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
                </div>
                <div className="mt-8 flex gap-4">
                  <div
                    onClick={() =>
                      router.push(`${ROUTE?.JOB_APPLICANTS}/${list?._id}`)
                    }
                    className=" w-1/4 cursor-pointer rounded-2xl bg-white p-5"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p className="mb-2 text-xl font-semibold text-meta-blue-1">
                        {
                          list?.applicants?.filter(
                            (value: any) => value.status === 'Applicants',
                          ).length
                        }
                      </p>
                      <p className="text-base font-medium text-meta-light-blue-3">
                        Applicants
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      router.push(`${ROUTE?.JOB_AWAITING}/${list?._id}`)
                    }
                    className=" w-1/4 cursor-pointer rounded-2xl bg-white p-5"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p className="mb-2 text-xl font-semibold text-meta-blue-1">
                        {
                          list?.applicants?.filter(
                            (value: any) => value.status === 'Awaiting',
                          ).length
                        }
                      </p>
                      <p className="text-base font-medium text-meta-light-blue-3">
                        Awaiting
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      router.push(`${ROUTE?.JOB_CONTACTING}/${list?._id}`)
                    }
                    className=" w-1/4 cursor-pointer rounded-2xl bg-white p-5"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p className="mb-2 text-xl font-semibold text-meta-blue-1">
                        {
                          list?.applicants?.filter(
                            (value: any) => value.status === 'Contacting',
                          ).length
                        }
                      </p>
                      <p className="text-base font-medium text-meta-light-blue-3">
                        Contacting
                      </p>
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      router.push(`${ROUTE?.JOB_HIRED}/${list?._id}`)
                    }
                    className=" w-1/4 cursor-pointer rounded-2xl bg-white p-5"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <p className="mb-2 text-xl font-semibold text-meta-blue-1">
                        {
                          list?.applicants?.filter(
                            (value: any) => value.status === 'Hired',
                          ).length
                        }
                      </p>
                      <p className="text-base font-medium text-meta-light-blue-3">
                        Hired
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="mt-5 flex w-full items-center justify-center font-semibold text-meta-purple-1">
          No Jobs available
        </div>
      )}
    </div>
  );
};
export default EmployeeDashboard;
