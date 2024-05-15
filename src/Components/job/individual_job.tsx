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

const IndividualJob = () => {
  const router = useRouter();
  const [cities, setCities] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const debouncedSearchCity = useDebounce(cityQuery);
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
                className="h-12 w-full rounded-lg border border-meta-light-blue-1  bg-transparent px-12 text-black outline-none transition"
              />

              {/* <Popover.Panel className="absolute z-10 mt-2 w-full rounded-xl border border-meta-light-blue-1 bg-white p-4 shadow-xl">
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
              </Popover.Panel> */}
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
            <button className="rounded-xl border border-meta-light-blue-2 bg-meta-light-blue-2 p-3 ">
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
                <p className="text-sm font-bold text-meta-blue-1">Full-time</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="date"
                  width={15}
                  height={15}
                  src={'/job/datepicker.svg'}
                />
                <p className="text-sm font-bold text-meta-blue-1">Full-time</p>
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
                <p className="text-sm font-bold text-meta-blue-1">Full-time</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="date"
                  width={15}
                  height={15}
                  src={'/job/datepicker.svg'}
                />
                <p className="text-sm font-bold text-meta-blue-1">Full-time</p>
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
                <p className="text-sm font-bold text-meta-blue-1">Full-time</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="date"
                  width={15}
                  height={15}
                  src={'/job/datepicker.svg'}
                />
                <p className="text-sm font-bold text-meta-blue-1">Full-time</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="rounded-xl bg-meta-gray-2 p-2">
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
              <div className="flex gap-2">
                <button className="rounded-lg border border-meta-light-blue-1 bg-white p-3 ">
                  <Image
                    alt="date"
                    width={18}
                    height={18}
                    src={'/job/bookmark.svg'}
                  />
                </button>
                <button className="flex w-[140px] items-center justify-between rounded-lg border border-meta-light-blue-1 bg-white p-3">
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
                <p className="text-sm font-bold text-meta-blue-1">Full-time</p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="date"
                  width={15}
                  height={15}
                  src={'/job/datepicker.svg'}
                />
                <p className="text-sm font-bold text-meta-blue-1">Full-time</p>
              </div>
            </div>
            <div className="mt-5 text-sm text-meta-light-blue-3">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualJob;
