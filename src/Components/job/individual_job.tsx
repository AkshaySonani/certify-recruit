'use client';
import Image from 'next/image';
import Select from '@/Components/Select';
import { useRouter } from 'next/navigation';
import Checkbox from '@/Components/Checkbox';
import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { TEXT } from '@/service/Helper';
import AutoComplete from '../Autocomplete';
import useDebounce from '@/hooks/useDebounce';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import ApplyJob from './applyJob';

const IndividualJob = () => {
  const [cities, setCities] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [jobSearch, setJobSearch] = useState('');
  const [jobApplyId, setJobApplyId] = useState('');
  const [cityQuery, setCityQuery] = useState('');
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
        setJobList(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getJobApi();
  }, []);

  const _onJobApply = (id: any) => {
    setJobApplyId(id);
  };

  const _applyFilter = () => {
    const obj = {
      city: cityFilter ? cityFilter?._id : null,
      postedDate: null,
      jobTitle: jobSearch,
    };

    API.post(API_CONSTANT?.JOB_SEARCH, obj)
      .then((res: any) => {
        setJobList(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div>
      <div>
        {jobApplyId !== '' ? (
          <ApplyJob jobApplyId={jobApplyId} setJobApplyId={setJobApplyId} />
        ) : (
          <>
            <div className="text-2xl font-semibold text-meta-purple-1">
              {TEXT?.JOBS}
            </div>
            <div className="mb-10 mt-5 flex flex-wrap items-center gap-4">
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
                    onChange={(e) => setJobSearch(e?.target?.value)}
                    value={jobSearch}
                    className="h-12 w-full rounded-lg border border-meta-light-blue-1  bg-transparent px-12 text-black outline-none transition"
                  />
                </Popover>
              </div>
              <div className="flex w-[150px] items-center sm:w-[260px]">
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
              <div>
                <button
                  onClick={() => _applyFilter()}
                  className="rounded-xl border border-meta-light-blue-2 bg-meta-light-blue-2 p-3 "
                >
                  <Image
                    alt="date"
                    width={19}
                    height={19}
                    src={'/dashboard/search.svg'}
                  />
                </button>
              </div>
            </div>

            <div className="mt-5 flex w-full gap-3 overflow-x-scroll">
              <div className="w-96 min-w-96 rounded-xl bg-meta-gray-2 p-2">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-meta-purple-1">
                        Human Resource
                      </p>
                      <p className="ml-1 text-lg font-semibold text-meta-purple-1">
                        - Fresher
                      </p>
                      <p className="ml-2 mt-1 text-sm font-bold text-meta-light-blue-3">
                        30 min ago
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-bold text-meta-light-blue-3">
                        Coding infotech
                      </p>
                      <p className="mx-1 text-sm font-bold text-meta-light-blue-3">
                        - Surat, Gujarat.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/moneybag.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      ₹12k/month - ₹30k/month
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
                      Full-time
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
                      Full-time
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-96 min-w-96 rounded-xl bg-meta-gray-2  p-2">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-meta-purple-1">
                        Human Resource
                      </p>
                      <p className="ml-1 text-lg font-semibold text-meta-purple-1">
                        - Fresher
                      </p>
                      <p className="ml-2 mt-1 text-sm font-bold text-meta-light-blue-3">
                        30 min ago
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-bold text-meta-light-blue-3">
                        Coding infotech
                      </p>
                      <p className="mx-1 text-sm font-bold text-meta-light-blue-3">
                        - Surat, Gujarat.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/moneybag.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      ₹12k/month - ₹30k/month
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
                      Full-time
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
                      Full-time
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-96 min-w-96 rounded-xl bg-meta-gray-2  p-2">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-meta-purple-1">
                        Human Resource
                      </p>
                      <p className="ml-1 text-lg font-semibold text-meta-purple-1">
                        - Fresher
                      </p>
                      <p className="ml-2 mt-1 text-sm font-bold text-meta-light-blue-3">
                        30 min ago
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-bold text-meta-light-blue-3">
                        Coding infotech
                      </p>
                      <p className="mx-1 text-sm font-bold text-meta-light-blue-3">
                        - Surat, Gujarat.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/moneybag.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      ₹12k/month - ₹30k/month
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
                      Full-time
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
                      Full-time
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              {jobList?.length !== 0 ? (
                jobList?.map((list: any) => {
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
                              30 min ago
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
                            onClick={(e) => {
                              e?.stopPropagation();
                              _onJobApply(list?._id);
                            }}
                            className="flex w-[140px] items-center justify-between rounded-lg border border-meta-light-blue-1 bg-white p-3"
                          >
                            <p className="text-sm font-bold text-meta-purple-1">
                              Apply Now
                            </p>
                            <Image
                              alt="date"
                              width={14}
                              height={14}
                              src={'/job/share.svg'}
                            />
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
                            {list?.salary_pay === 'MONTHLY' ? 'month' : 'hour'}{' '}
                            - {list?.salary_upto ?? 0}/
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
          </>
        )}
      </div>
    </div>
  );
};

export default IndividualJob;
