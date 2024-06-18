'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AppContext from '@/context/AppProvider';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ROUTE, TEXT, USER_ROLE } from '@/service/Helper';
import CompleteProfile from '@/Components/dashboard/completeProfile';
import Spinner from '@/app/icons/Spinner';
import { API_CONSTANT } from '@/constant/ApiConstant';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import moment from 'moment';
import { JOB_STATUS } from '@/constant/Enum';
import ApplyJob from '@/Components/job/applyJob';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
const actionMenuItems = ['Edit', 'Delete', 'View JobDetails'];
const Page = (data: any) => {
  const router = useRouter();
  const session = useSession();
  const context = useContext(AppContext);
  const [isSpinner, setIsSpinner] = useState(false);
  const [dashboardData, setDashBoardData] = useState([]);
  const [jobApplyId, setJobApplyId] = useState('');
  useEffect(() => {
    getDashboardJob();
  }, []);
  const _onJobApply = (id: any) => {
    const updatedItems = dashboardData.map((item: any) =>
      item?._id === id ? { ...item, applied: true } : item,
    );
    setDashBoardData(updatedItems);
    setJobApplyId(id);
  };
  const getDashboardJob = () => {
    API.get(API_CONSTANT?.DASHBOARD_JOB)
      .then((res) => {
        console.log('res', res?.data?.data);
        setDashBoardData(res?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
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

  useEffect(() => {
    if (session?.data?.user) {
      setIsSpinner(false);
    } else {
      setIsSpinner(true);
    }
  }, [session?.data?.user]);

  let percentage = 0;
  if (session?.data?.user?.role === USER_ROLE?.EMPLOYEE) {
    percentage =
      context?.userProfileCount?.basic_details +
      context?.userProfileCount?.company_details +
      context?.userProfileCount?.kyc_details;
  } else {
    percentage =
      context?.userProfileCount?.career_details +
      context?.userProfileCount?.education_details +
      context?.userProfileCount?.personal_details +
      context?.userProfileCount?.resume_details +
      context?.userProfileCount?.skill_details +
      context?.userProfileCount?.summary_details;
  }
  const certificate = [];
  return (
    <div>
      <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
        {TEXT?.DASHBOARD}
      </div>
      {jobApplyId !== '' ? (
        <ApplyJob jobApplyId={jobApplyId} setJobApplyId={setJobApplyId} />
      ) : isSpinner ? (
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
          {percentage >= 100 && certificate?.length !== 0 && (
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

          {percentage >= 100 && (
            <div className="mt-8 text-xl font-semibold text-meta-purple-1">
              {TEXT?.RECENTLY_JOB_POST}
            </div>
          )}

          {percentage < 100 && !isSpinner ? (
            <CompleteProfile />
          ) : session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
            dashboardData?.length !== 0 ? (
              dashboardData?.map((list: any) => {
                return (
                  <div className="mt-5">
                    <div className="rounded-2xl bg-meta-gray-2 p-5">
                      <div className="flex justify-between">
                        <div>
                          <div className="flex">
                            <div className="text-xl font-semibold text-meta-purple-1">
                              {list?.title}
                            </div>
                            <p className="ml-2 mt-1 text-base font-medium text-meta-light-blue-3">
                              {moment(list?.createdAt).fromNow()}
                            </p>
                          </div>
                          <div className="text-base font-medium text-meta-light-blue-3">
                            {list?.city?.[0]?.name},{' '}
                            {list?.state?.[0]?.name ?? 'Gujarat'},{' '}
                            {list?.country?.[0]?.name ?? ''}
                          </div>
                        </div>

                        <div className="flex items-center">
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
                                            onClick={() =>
                                              handleAction(el, list)
                                            }
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
            )
          ) : dashboardData?.length !== 0 ? (
            dashboardData?.map((list: any) => {
              return (
                <div
                  className="my-3 cursor-pointer rounded-xl bg-meta-gray-2 p-2"
                  onClick={() => router.push(`/job/details/${list._id}`)}
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <p className="text-lg font-semibold text-meta-purple-1">
                          {list?.title}
                        </p>
                        <p className="ml-1 text-lg font-semibold text-meta-purple-1">
                          - Fresher
                        </p>
                        <p className="ml-2 mt-1 text-sm font-bold text-meta-light-blue-3">
                          {moment(list?.createdAt).fromNow()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-bold text-meta-light-blue-3">
                          {list?.company_name}
                        </p>
                        <p className="mx-1 text-sm font-bold text-meta-light-blue-3">
                          - {list?.city[0]?.name},
                          {list?.state[0]?.name ?? 'Gujarat'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-meta-light-blue-1 bg-white p-3 ">
                        <Image
                          alt="date"
                          width={18}
                          height={18}
                          src={'/job/bookmark.svg'}
                        />
                      </button>
                      <button
                        disabled={list?.applied}
                        onClick={(e) => {
                          e?.stopPropagation();
                          _onJobApply(list?._id);
                        }}
                        className="flex items-center justify-center rounded-lg border border-meta-light-blue-1 bg-white p-3 px-[10px]"
                      >
                        <p className="text-sm font-bold text-meta-purple-1">
                          {list?.applied ? 'Applied' : 'Apply Now'}
                        </p>
                        {!list?.applied && (
                          <div className="pl-[10px]">
                            <Image
                              alt="date"
                              width={14}
                              height={14}
                              src={'/job/share.svg'}
                            />
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Image
                        alt="date"
                        width={15}
                        height={15}
                        src={'/job/moneybag.svg'}
                      />
                      <p className="text-sm font-bold text-meta-blue-1">
                        {list?.salary_started ?? 0}/{' '}
                        {list?.salary_pay === 'MONTHLY' ? 'month' : 'hour'} -{' '}
                        {list?.salary_upto ?? 0}/
                        {list?.salary_pay === 'MONTHLY' ? 'month' : 'hour'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        alt="date"
                        width={15}
                        height={15}
                        src={'/job/timepicker.svg'}
                      />
                      <p className="text-sm font-bold text-meta-blue-1">
                        {list?.job_types[0]}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image
                        alt="date"
                        width={15}
                        height={15}
                        src={'/job/datepicker.svg'}
                      />
                      <p className="text-sm font-bold text-meta-blue-1">
                        {list?.working_schedule[0]}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 text-sm text-meta-light-blue-3">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: list?.description,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex w-full items-center justify-center font-semibold text-meta-purple-1">
              No Jobs available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
