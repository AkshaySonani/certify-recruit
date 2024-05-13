'use client';
import React, { useState, Fragment, useEffect } from 'react';
import Image from 'next/image';
import { ROUTE, TEXT } from '@/service/Helper';
import { Combobox, Menu, Transition } from '@headlessui/react';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';
import JobPostingForm2 from '@/Components/Job/JobPostingForm2';
import JobPostingForm3 from '@/Components/Job/JobPostingForm3';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import PreviewDialog from '../../../Components/Job/PreviewDialog';
import Spinner from '../../icons/Spinner';
import AutoComplete from '@/Components/Autocomplete';
import useDebounce from '@/hooks/useDebounce';

const WORKPLACE_TYPE = ['ONSITE', 'HYBRID', 'REMOTE'];

const Page = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [stateQuery, setStateQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const debouncedSearchCity = useDebounce(cityQuery);
  const debouncedSearchState = useDebounce(stateQuery);
  const session = useSession() as any;

  function classNames(...classes: any) {
    return classes.filter(Boolean).join('');
  }
  const handleSubmit = async (values: any, actions: any) => {
    if (nextPage === 3) {
      const data = {
        ...values,
        skills: values?.skills.map((el: any) => el?._id),
        working_schedule: values?.working_schedule.map((el: any) => el?.value),
      };
      console.log('data', data);

      API.post(API_CONSTANT.JOB, data)
        .then((res) => {
          toast?.success(
            res?.data?.message || 'Successfully your job is posting',
          );
          actions.setSubmitting(false);
        })
        .catch((error) => {
          actions.setSubmitting(false);
          console.log('error', error);
        });
    } else {
      setNextPage(nextPage + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const validationSchema = [
    Yup.object().shape({
      company_name: Yup.string().required('Company is required.'),
      title: Yup.string().required('Job title is required.'),
      workplace: Yup.array().min(1, `select at least one workplace type`),
      city: Yup.object()
        .shape({
          _id: Yup.string().required('city is required'),
        })
        .nonNullable('City is required'),
      state: Yup.object()
        .shape({
          _id: Yup.string().required('State is required'),
        })
        .nonNullable('State is required'),
      country: Yup.object()
        .shape({
          _id: Yup.string().required('country is required'),
        })
        .nonNullable('country is required'),

      // description:Yup.string().required("description is required.")
    }),
    Yup.object().shape({
      working_schedule: Yup.array().min(
        1,
        `Select at least one working schedule`,
      ),
      job_types: Yup.array().min(1, `Select at least one job type`),
    }),
    Yup.object().shape({
      // city: Yup.array().min(1,"City is required."),
      description: Yup.string().required('Description is required.'),
    }),
  ];
  const currentValidationSchema = validationSchema[nextPage - 1];
  const formik = useFormik({
    initialValues: {
      is_hiring_manager: false,
      title: '',
      company_id: session?.data?.user._id,
      company_name: '',
      description: '',
      workplace: [],
      job_types: [],
      salary_pay: 'HOURLY',
      hourly_rate: null,
      salary_negotiable: false,
      vacancy: 1,
      working_schedule: [],
      area: '',
      status: 'ACTIVE',
      pincode: '',
      street_address: '',
      salary_started: '',
      salary_upto: '',
      city: null,
      state: null,
      country: null,
      skills: [],
      interviewTime: {
        date: null,
        startTime: '',
        endTime: '',
      },
    },
    enableReinitialize: true,
    validationSchema: currentValidationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getCountryApi();
  }, []);

  useEffect(() => {
    if (debouncedSearchCity !== '') {
      searchCityApi(debouncedSearchCity);
    }
  }, [debouncedSearchCity]);

  useEffect(() => {
    if (debouncedSearchState !== '') {
      searchStateApi(debouncedSearchState);
    }
  }, [debouncedSearchState]);

  const searchCityApi = (search: any) => {
    let obj = {
      searchText: search,
    };
    API.post(API_CONSTANT?.CITIES, obj)
      .then((res) => {
        setCities(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const searchStateApi = (search: any) => {
    let obj = {
      searchText: search,
    };
    API.post(API_CONSTANT?.STATES, obj)
      .then((res) => {
        setStates(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const getCountryApi = () => {
    API.get(API_CONSTANT?.COUNTRY)
      .then((res) => {
        setCountries(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handlePrevious = () => {
    setNextPage(nextPage - 1);
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <p className="text-lg font-semibold text-meta-purple-1 sm:text-2xl">
          {TEXT?.JOB_POSTING}
        </p>
        <div
          className="flex cursor-pointer items-center"
          onClick={() => setIsOpen(true)}
        >
          <Image
            width={25}
            height={25}
            alt="Preview"
            src={'/job/Eye_fill.svg'}
          />
          <p className="ml-2 hidden text-lg font-semibold text-meta-blue-1 sm:block sm:text-xl">
            {TEXT?.PREVIEW}
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {nextPage === 1 ? (
          <div>
            <div className="flex w-full flex-wrap items-center justify-between lg:flex-nowrap">
              <div className="w-full text-start lg:mr-5 lg:w-1/2">
                <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
                  {TEXT?.ARE_YOU_HIRING_MANAGER}
                </p>
                <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
                  {TEXT?.THE_HIRED_CANDIDATE_WILL_WORK_IN_REPORTING_CHAIN}
                </p>
              </div>
              <div className="mt-3 flex w-full items-center gap-4 lg:mt-0 lg:w-1/2">
                <label
                  htmlFor="Yes"
                  className="flex w-1/2 items-center gap-2 rounded-lg border border-meta-light-blue-1 p-3 hover:bg-meta-light-blue-2"
                >
                  <input
                    id="Yes"
                    type="radio"
                    radioGroup="Salary"
                    value={'true'}
                    name="is_hiring_manager"
                    onChange={formik.handleChange}
                    className=""
                  />
                  <p>{'Yes'}</p>
                </label>
                <label
                  htmlFor="No"
                  className="flex w-1/2 items-center gap-2 rounded-lg border border-meta-light-blue-1 p-3 hover:bg-meta-light-blue-2"
                >
                  <input
                    id="No"
                    defaultChecked
                    name="is_hiring_manager"
                    type="radio"
                    radioGroup="Salary"
                    onChange={formik.handleChange}
                    className=""
                    value={'false'}
                  />
                  <p>{'No'}</p>
                </label>
              </div>
            </div>
            <div className="my-6 border border-meta-light-blue-1" />

            <div className="flex w-full flex-wrap items-center justify-between lg:flex-nowrap">
              <div className="w-full text-start lg:mr-5 lg:w-1/2">
                <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
                  {TEXT?.COMPANY} <span className="text-red-600">*</span>
                </p>
                <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
                  {TEXT?.YOUR_COMPANY_NAME}
                </p>
              </div>
              <div className="mt-3 flex w-full flex-col items-start lg:mt-0 lg:w-1/2">
                <input
                  type="text"
                  name="company_name"
                  onChange={formik.handleChange}
                  value={formik?.values?.company_name}
                  placeholder="Type here..."
                  className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                />
                {formik.touched.company_name && formik.errors.company_name && (
                  <div className="error">{formik.errors.company_name}</div>
                )}
              </div>
            </div>
            <div className="my-6 border border-meta-light-blue-1" />

            <div className="flex w-full flex-wrap items-center justify-between lg:flex-nowrap">
              <div className="w-full text-start lg:mr-5 lg:w-1/2">
                <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
                  {TEXT?.JOB_TITLE} <span className="text-red-600">*</span>
                </p>
                <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
                  {TEXT?.YOU_CAN_PICK_MULTIPLE_WORK_SCHEDULES}
                </p>
              </div>
              <div className="mt-3 flex w-full flex-col items-start lg:mt-0 lg:w-1/2">
                <input
                  type="text"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik?.values?.title}
                  placeholder="Type here..."
                  className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="error">{formik.errors.title}</div>
                )}
              </div>
            </div>
            <div className="my-6 border border-meta-light-blue-1" />

            <div className="flex w-full flex-wrap items-center justify-between lg:flex-nowrap">
              <div className="w-full text-start lg:mr-5 lg:w-1/2">
                <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
                  {TEXT?.WORKPLACE_TYPE}
                  <span className="text-red-600">*</span>
                </p>
                <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
                  {TEXT?.YOU_CAN_PICK_MULTIPLE_WORK_SCHEDULES}
                </p>
              </div>
              <div className="mt-3 flex w-full flex-col flex-wrap items-start gap-2 md:flex-nowrap lg:mt-0 lg:w-1/2">
                <div className="flex w-full items-center justify-between gap-2">
                  {WORKPLACE_TYPE?.map((list) => {
                    return (
                      <div className="w-1/3 rounded-lg border border-meta-light-blue-1 p-3">
                        <label
                          htmlFor={list}
                          className={`flex cursor-pointer select-none items-center `}
                        >
                          <input
                            type="checkbox"
                            id={list}
                            name={'workplace'}
                            value={list}
                            onChange={formik.handleChange}
                          />
                          <p className="pl-3 capitalize">{list}</p>
                        </label>
                      </div>
                    );
                  })}
                </div>

                {formik.touched.workplace && formik.errors.workplace && (
                  <div className="error">{formik.errors.workplace}</div>
                )}
              </div>
            </div>
            <div className="my-6 border border-meta-light-blue-1" />

            <div className="flex w-full flex-wrap justify-between lg:flex-nowrap">
              <div className="w-full text-start lg:mr-5 lg:w-1/2">
                <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
                  {TEXT?.JOB_POSTING_LOCATION}
                  <span className="text-red-600">*</span>
                </p>
                <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
                  {TEXT?.WHICH_OPTION_BEST_DESCRIBE_THIS_JOBS_LOCATION}
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="relative mt-2 w-full lg:mt-0">
                  <label className="text-base font-medium text-meta-purple-1">
                    Country
                  </label>
                  <Menu as="div" className="relative  w-full">
                    <Menu.Button className="relative z-20  flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 py-[9px] pl-5 pr-[11px] outline-none transition">
                      {formik?.values?.country === null ? (
                        <p className="text-meta-gray-1">Select Country</p>
                      ) : (
                        <p>{formik?.values?.country?.name as any}</p>
                      )}
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
                      <Menu.Items className="mt-  absolute right-0 z-30 max-h-[200px] w-full origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div>
                          {countries?.map((list: any) => {
                            return (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={() => {
                                      formik.setFieldValue('country', list);
                                      formik.setFieldValue('city', null);
                                      formik.setFieldValue('state', null);
                                    }}
                                    className={classNames(
                                      active
                                        ? 'bg-meta-blue-1 text-white'
                                        : 'text-gray-900',
                                      'block px-4 py-2 text-[14px] capitalize hover:text-white',
                                    )}
                                  >
                                    {list?.name}
                                  </div>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                    {formik.touched.country && formik.errors.country && (
                      <div className="error">{formik.errors.country}</div>
                    )}
                  </Menu>
                </div>
                <div className="mt-3 flex w-full gap-3 ">
                  <div className="w-1/2">
                    <label className="text-base font-medium text-meta-purple-1">
                      State
                    </label>
                    <AutoComplete
                      query={stateQuery}
                      disabled={formik.values.country === null ? true : false}
                      name={'state'}
                      setQuery={setStateQuery}
                      className="!py-[11.2px]"
                      placeholder="Search state"
                      value={formik?.values?.state}
                      filterArr={states}
                      handleChange={(e: any) => {
                        formik.setFieldValue('state', e);
                      }}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <div className="error">{formik.errors.state}</div>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label className="text-base font-medium text-meta-purple-1">
                      City
                    </label>
                    <AutoComplete
                      value={formik?.values?.city}
                      disabled={formik.values.country === null ? true : false}
                      filterArr={cities}
                      className="!py-[11.2px]"
                      query={cityQuery}
                      setQuery={setCityQuery}
                      name={'city'}
                      placeholder="Search city"
                      handleChange={(e: any) => formik.setFieldValue('city', e)}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="error">{formik.errors.city}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : nextPage === 2 ? (
          <JobPostingForm2 formik={formik} />
        ) : (
          <JobPostingForm3 formik={formik} skillData={skillData} />
        )}
        <div
          className={`"w-full mt-16  flex ${nextPage === 1 ? 'justify-end' : 'justify-between'}`}
        >
          {nextPage !== 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="mb-8 min-w-full rounded-lg border border-meta-light-blue-1 text-base font-medium text-meta-light-blue-3 sm:mb-8 sm:min-w-48"
            >
              {TEXT?.BACK}
            </button>
          )}

          <button
            disabled={formik?.isSubmitting}
            type={'submit'}
            className={`mb-8 h-12  min-w-48 rounded-lg border border-meta-light-blue-2 bg-meta-blue-1 py-3 text-meta-light-blue-3 transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient`}
          >
            {formik?.isSubmitting ? (
              <Spinner className="spinner" />
            ) : (
              <span
                className={`flex justify-center text-sm font-medium text-white`}
              >
                {nextPage === 3 ? TEXT?.POST : TEXT?.NEXT}
              </span>
            )}
          </button>
        </div>
      </form>

      {isOpen && (
        <PreviewDialog isOpen={isOpen} setIsOpen={setIsOpen} formik={formik} />
      )}
    </div>
  );
};

export default Page;
