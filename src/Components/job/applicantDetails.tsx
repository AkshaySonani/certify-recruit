'use client';
import moment from 'moment';
import Image from 'next/image';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Checkbox from '@/Components/Checkbox';
import { ROUTE, TEXT } from '@/service/Helper';
import DatePicker from 'react-multi-date-picker';
import { APPLICANT_STATUS } from '@/constant/Enum';
import { API_CONSTANT } from '@/constant/ApiConstant';
import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import Link from 'next/link';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function ApplicantDetails({ id, status }: any) {
  const router = useRouter();
  const [data, setData] = useState<any>([]);

  const getJobApi = () => {
    if (id) {
      API.post(API_CONSTANT?.JOB_DETAILS, {
        job_id: id,
      })
        .then((res: any) => {
          setData(res?.data?.data?.applicants);
          // const response = res?.data?.data?.[0]?.applicants?.filter(
          //   (d: any) => {
          //     return d?.status === status;
          //   },
          // );
          // setData(response);
        })
        .catch((error: any) => {
          toast.error(
            error?.response?.data?.message || 'Internal server error',
          );
        });
    }
  };

  useEffect(() => {
    getJobApi();
  }, []);

  const statusUpdateApi = (id: any, status: any) => {
    API.post(API_CONSTANT?.UPDATE_APPLY_JOB, {
      applicant_id: id,
      status: status,
    })
      .then((res: any) => {
        if (res?.data?.status) {
          toast.success(res?.data?.message);
          getJobApi();
        }
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };

  const downLoadResume = async (imageSrc: any) => {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = imageSrc?.split('/').pop() || 'user-cv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div>
        <div className="flex items-center text-2xl font-semibold text-meta-purple-1">
          <div
            className="cursor-pointer"
            onClick={() => router?.push(ROUTE?.JOB)}
          >
            <Image src={'/BackArrow.svg'} alt="date" width={20} height={20} />
          </div>
          <p className="ml-2">{status}</p>
        </div>
        <div className="mb-10 mt-5 flex items-center justify-start gap-6">
          <div className="w-2/5 max-w-[400px]">
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
              <div className="absolute right-3 top-0 py-[14px]">
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
        </div>
      </div>
      <div className="h-screen">
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
            {data?.map((item: any) => {
              let totalYears = 0;
              let totalMonths = 0;
              item?.user_info?.total_experiences?.forEach((experience: any) => {
                totalYears += experience.years;
                totalMonths += experience.month;
              });
              totalYears += Math.floor(totalMonths / 12);
              totalMonths %= 12;
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
                        {item?.user_info?.user_name}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium text-meta-purple-1">
                        {totalYears} Year
                        {totalMonths !== 0 ? `,${totalMonths} month` : ''}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium text-meta-purple-1">
                        {moment(item?.createdAt).format('DD/MM/YY')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center">
                      <Menu as="div" className="relative w-full">
                        <Menu.Button className="relative  flex w-full appearance-none items-center justify-between  py-2   outline-none transition">
                          <p className="text-base font-medium text-meta-purple-1">
                            {item?.status}
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
                          <Menu.Items className="absolute right-0 z-30 max-h-[200px] w-full min-w-36 origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div>
                              {APPLICANT_STATUS?.map((el: any) => {
                                return (
                                  <Menu.Item>
                                    {({ active }) => (
                                      <div
                                        onClick={() =>
                                          statusUpdateApi(item?._id, el)
                                        }
                                        className={classNames(
                                          active
                                            ? 'bg-meta-blue-1 text-white'
                                            : 'text-gray-900',
                                          'block px-4 py-2 text-sm capitalize',
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
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex justify-end">
                      <Link href={item?.user_cv?.[0]?.file_url} target="_blank">
                        <div className="cursor-pointer">
                          <Image
                            alt="Icon"
                            width={21}
                            height={21}
                            className="mx-4"
                            src={'/sidebarIcon/jobPosting.svg'}
                          />
                        </div>
                      </Link>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          downLoadResume(item?.user_cv?.[0]?.file_url)
                        }
                      >
                        <Image
                          alt="Icon"
                          width={21}
                          height={21}
                          className="mx-4"
                          src={'/dashboard/download.svg'}
                        />
                      </div>
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
