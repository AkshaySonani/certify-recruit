'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Checkbox from '@/Components/Checkbox';
import DatePicker from 'react-multi-date-picker';
import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { ROUTE, TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import useDebounce from '@/hooks/useDebounce';
import AutoComplete from '../Autocomplete';
import { JOB_STATUS } from '@/constant/Enum';
import { toast } from 'react-toastify';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
const actionMenuItems = ['Edit', 'Delete', 'View JobDetails'];
const EmployeeJob = () => {
  const [cities, setCities] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [jobSearch, setJobSearch] = useState('');
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [cityQuery, setCityQuery] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const debouncedSearchCity = useDebounce(cityQuery);
  const router = useRouter();
  const searchCityApi = (search: any) => {
    let obj = {
      searchText: search,
    };
    API.post(API_CONSTANT?.CITIES, obj)
      .then((res: any) => {
        setCities(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    if (debouncedSearchCity !== '') {
      searchCityApi(debouncedSearchCity);
    }
  }, [debouncedSearchCity]);

  const getJobApi = () => {
    API.get(API_CONSTANT?.JOB)
      .then((res: any) => {
        console.log('job', res?.data?.data);
        setJobList(res?.data?.data);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getJobApi();
  }, []);

  const _applyFilter = () => {
    const obj = {
      city: cityFilter ? cityFilter?._id : null,
      startDate: date?.startDate ? date?.startDate : null,
      endDate: date?.endDate ? date?.endDate : null,
      jobTitle: jobSearch,
    };
    console.log('obj', obj);

    API.post(API_CONSTANT?.JOB_SEARCH, obj)
      .then((res: any) => {
        setJobList(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const clearFilter = () => {
    setCityFilter('');
    setJobSearch('');
    setDate({
      startDate: null,
      endDate: null,
    });
    getJobApi();
  };

  const handleAction = (action: any, job: any) => {
    if (action === 'Edit') {
      router.push(`${ROUTE?.JOb_POST}/${job._id}`);
    } else if (action === 'Delete') {
      const obj: any = {
        job_id: job._id,
      };
      API.delete(API_CONSTANT.JOB, obj)
        .then((res: any) => {
          toast?.success('Job delete successfully');
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      router.push(`${ROUTE?.JOb_DETAILS}/${job?._id}`);
    }
  };
  const updateStatusApi = (val: any, id: any) => {
    const data = {
      status: val,
      job_id: id,
    };
    API.post(API_CONSTANT.JOB, data)
      .then((res) => {
        toast?.success('Job updated successfully');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div>
      <div>
        <div className="text-2xl font-semibold text-meta-purple-1">
          {TEXT?.JOBS}
        </div>
        <div className="mb-10 mt-5 flex items-center justify-between gap-6">
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
                value={jobSearch}
                onChange={(e) => setJobSearch(e?.target?.value)}
                placeholder="Job title search here..."
                className="focus:border-primary active:border-primary h-12 w-full rounded-lg border border-meta-light-blue-1  bg-transparent px-12 text-black outline-none transition"
              />
              <div className="absolute right-3 top-[15px]">
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
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e?.target?.value)}
                    placeholder="Job title search here..."
                    className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="mt-4 w-full">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.LOCATION}
                  </label>
                  <div className="relative w-full">
                    <AutoComplete
                      value={cityFilter}
                      filterArr={cities}
                      className="py-[1px]"
                      query={cityQuery}
                      setQuery={setCityQuery}
                      name={'city'}
                      placeholder="Search city"
                      handleChange={(e: any) => setCityFilter(e)}
                    />
                  </div>
                </div>
                <div className="mt-4 w-full ">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.DATE_POSTED}
                  </label>
                  <div className="flex items-center">
                    <DatePicker
                      format="YYYY-MM-DD"
                      containerStyle={{ width: '100%' }}
                      onOpenPickNewDate={false}
                      value={date?.startDate}
                      onChange={(dt: any) => {
                        setDate({
                          ...date,
                          startDate: dt?.format('YYYY-MM-DD'),
                        });
                      }}
                      placeholder="Select Start date"
                      style={{
                        height: 48,
                        width: '100%',
                        borderColor: '#DCE7FF',
                        borderRadius: 8,
                        paddingLeft: 10,
                        marginTop: 4,
                      }}
                    />
                    <label className="mx-2">To</label>
                    <DatePicker
                      format="YYYY-MM-DD"
                      containerStyle={{ width: '100%' }}
                      onOpenPickNewDate={false}
                      value={date?.endDate}
                      onChange={(dt: any) => {
                        setDate({
                          ...date,
                          endDate: dt?.format('YYYY-MM-DD'),
                        });
                      }}
                      placeholder="Select Start date"
                      style={{
                        height: 48,
                        width: '100%',
                        borderColor: '#DCE7FF',
                        borderRadius: 8,
                        paddingLeft: 10,
                        marginTop: 4,
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex w-full items-center justify-between">
                  <div>
                    <Checkbox
                      label={'Set as default'}
                      className="text-base font-medium text-meta-light-blue-3"
                    />
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => clearFilter()}
                      className="ml-5 h-12 w-28 rounded-xl border border-meta-light-blue-2 bg-meta-light-blue-1"
                    >
                      <span className="flex justify-center text-sm font-medium text-meta-light-blue-3">
                        Clear
                      </span>
                    </button>

                    <div>
                      <button
                        onClick={() => _applyFilter()}
                        className="ml-5 h-12 w-28 rounded-xl border border-meta-light-blue-2 bg-meta-light-blue-1"
                      >
                        <span className="flex justify-center text-sm font-medium text-meta-light-blue-3">
                          {TEXT?.DONE}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
          <div className="flex items-center">
            <DatePicker
              format="YYYY-MM-DD"
              containerStyle={{ width: '100%' }}
              onOpenPickNewDate={false}
              value={date?.startDate}
              onChange={(dt: any) => {
                setDate({
                  ...date,
                  startDate: dt?.format('YYYY-MM-DD'),
                });
              }}
              placeholder="Select Start date"
              style={{
                height: 48,
                width: '100%',
                borderColor: '#DCE7FF',
                borderRadius: 8,
                paddingLeft: 10,
                marginTop: 4,
              }}
            />
            <label className="mx-2">To</label>
            <DatePicker
              format="YYYY-MM-DD"
              containerStyle={{ width: '100%' }}
              onOpenPickNewDate={false}
              value={date?.endDate}
              onChange={(dt: any) => {
                setDate({
                  ...date,
                  endDate: dt?.format('YYYY-MM-DD'),
                });
              }}
              placeholder="Select Start date"
              style={{
                height: 48,
                width: '100%',
                borderColor: '#DCE7FF',
                borderRadius: 8,
                paddingLeft: 10,
                marginTop: 4,
              }}
            />
          </div>
          <div className="flex  items-center">
            <button className="ml-5 h-12 w-full min-w-36 max-w-64 rounded-xl border border-meta-light-blue-2 bg-meta-blue-1">
              <span className="flex justify-center text-sm font-medium text-white">
                {TEXT?.JOB_POST}
              </span>
            </button>
          </div>
        </div>

        {jobList?.length !== 0 ? (
          jobList?.map((list: any, index) => {
            return (
              <div className="mt-5">
                <div className="rounded-2xl bg-meta-gray-2 p-5">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="">
                        <div className="text-xl font-semibold text-meta-purple-1">
                          {list?.title}
                          <div className="text-base font-medium text-meta-light-blue-3">
                            {list?.city?.[0]?.name},
                            {list?.state?.[0]?.name ?? 'Gujarat'},
                            {list?.country?.[0]?.name ?? ''}
                          </div>
                        </div>
                      </div>
                      <p className="ml-2 mt-1 text-base font-medium text-meta-light-blue-3">
                        {TEXT?.TWO_WEEKS_AGO}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Menu as="div" className="relative w-44">
                        <Menu.Button className="relative  flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 py-2 pl-5 pr-[11px] outline-none transition">
                          <p className="font-me capitalize text-meta-purple-1">
                            {jobStatus ? jobStatus : list?.status}
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
                                          setJobStatus(el);
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
                          {list?.applicants?.length}
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
                          0
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
                          0
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
                          0
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
          <div className="mt-5 flex h-screen w-full items-center justify-center font-semibold text-meta-purple-1">
            No Jobs available
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeJob;
