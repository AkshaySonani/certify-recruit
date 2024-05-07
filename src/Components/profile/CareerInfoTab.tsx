import * as Yup from 'yup';
import Image from 'next/image';
import Button from '../Button';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { TEXT } from '@/service/Helper';
import { useFormik, Field } from 'formik';
import { EMP_TYPE_ARR } from '@/constant/Enum';
import 'react-datepicker/dist/react-datepicker.css';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { API_CONSTANT } from '@/constant/ApiConstant';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
const CareerInfoTab = ({
  cityData,
  userDetails,
  setActivePage,
  activePage,
  getUserDataApiCall,
}: any) => {
  const [isFresher, setIsFresher] = useState(userDetails?.is_fresher);
  const [active, setActive] = useState(userDetails?.is_fresher ? 1 : 2);

  const handleSubmit = async (values: any, actions: any) => {
    const obj = {
      ...values,
    };

    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          setActivePage(1);
          getUserDataApiCall();
          actions.setSubmitting(false);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  // const validationSchema = Yup.object().shape({
  //   total_experiences:
  //     isFresher === true
  //       ? Yup.array()
  //       : Yup.array().of(
  //           Yup.object().shape({
  //             month: Yup.string()
  //               .optional()
  //               .matches(
  //                 /(^0?[1-9]$)|(^1[0-2]$)$/,
  //                 'Invalid Month,insert must between 1 to 12',
  //               ),
  //             reason_for_leaving: Yup.string(),
  //           }),
  //         ),
  // });

  const validationSchema = Yup.object().shape({
    total_experiences: Yup.array().of(
      Yup.object().shape({
        years: Yup.number()
          .required('Years is required')
          .min(0, 'Years cannot be negative')
          .max(50, 'Years cannot be greater than 50'),
        month: Yup.number()
          .required('Month is required')
          .min(0, 'Month cannot be negative')
          .max(11, 'Month cannot be greater than 11'),
      }),
    ),
  });

  const formik: any = useFormik({
    initialValues: {
      is_fresher: isFresher ? isFresher : userDetails?.is_fresher,
      expected_salary_start_at: userDetails?.expected_salary_start_at ?? '',
      total_experiences:
        userDetails?.total_experiences?.length !== 0
          ? userDetails?.total_experiences
          : [
              {
                years: 0,
                month: 0,
                location: null,
                companyName: '',
                company_role: '',
                employmentType: '',
                reason_for_leaving: '',
              },
            ],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const EXPERIENCE_TYPE = [
    {
      id: 1,
      label: "I'm Fresher",
      content: 'I am Student (I have no work experience)',
      is_fresher: true,
    },
    {
      id: 2,
      label: "I'm experienced",
      content: 'I have work experience (excluding internships)',
      is_fresher: false,
    },
  ];

  const handleChangeMenu = (i: any, el: any, name: any) => {
    let arr = [...formik?.values?.total_experiences];
    arr[i][name] = el;
    formik?.setFieldValue('total_experiences', arr);
  };

  const handleRemove = (list: any) => {
    const arr = formik?.values?.total_experiences.filter((el: any) => {
      return el !== list;
    });
    formik?.setFieldValue('total_experiences', arr);
  };

  const handleAddMoreEXP = () => {
    formik?.setFieldValue('total_experiences', [
      ...formik?.values?.total_experiences,
      {
        companyName: '',
        role: '',
        location: null,
        employmentType: '',
        years: '',
        month: '',
        reason_for_leaving: '',
      },
      ,
    ]);
  };

  const handleFormChange = (index: any, event: any) => {
    let data = [...formik?.values?.total_experiences];
    data[index][event.target.name] = event.target.value;
    formik.handleChange(event);
    formik?.setFieldValue('total_experiences', data);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-5 flex w-full gap-3 pl-9">
        <div className="w-full">
          <label className="text-base font-medium text-meta-purple-1">
            Career profile
          </label>
          <p className="mb-3 pt-1 text-sm font-medium text-meta-light-blue-3">
            Tell recruiters what you know or what you are known for e.g. Direct
            Marketing, Oracle, Java etc. We will send you job recommendations
            based on these skills. each skill is separated by a comma.
          </p>
          <div className="mt-3 flex w-full  items-center justify-center gap-2 lg:mt-0">
            {EXPERIENCE_TYPE?.map((list) => {
              return (
                <div
                  className={`flex h-20 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 text-center lg:w-1/2 ${active === list?.id ? 'border-meta-blue-1' : 'border-meta-light-blue-1 '}`}
                  onClick={() => {
                    setActive(list?.id);
                    setIsFresher(list?.is_fresher);
                    formik?.setFieldValue('is_fresher', list?.is_fresher);
                  }}
                >
                  <p className="font-bold text-black">{list?.label}</p>
                  <p>{list?.content} </p>
                </div>
              );
            })}
          </div>

          {active !== 1 && (
            <div className="mt-5 w-full">
              <label className="text-base font-medium text-meta-purple-1">
                Total years of experience
              </label>
              {formik?.values?.total_experiences?.map(
                (list: any, index: any) => {
                  return (
                    <>
                      <div className="relative my-2 w-full rounded-3xl bg-meta-gray-2 p-5">
                        <div className=" flex w-full gap-3">
                          <div className="w-1/2">
                            <input
                              type="text"
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                              value={list?.companyName}
                              name="companyName"
                              placeholder="Company name"
                              className=" w-full rounded-2xl border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                            />
                            {formik?.touched?.total_experiences?.[index]
                              ?.companyName &&
                              formik.errors.total_experiences?.[index]
                                ?.companyName && (
                                <div className="error">
                                  {
                                    formik?.errors?.total_experiences?.[index]
                                      ?.companyName
                                  }
                                </div>
                              )}
                          </div>
                          <div className="w-1/2">
                            <input
                              type="text"
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                              value={list?.company_role}
                              name="company_role"
                              placeholder="Company role"
                              className="w-full rounded-2xl border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                            />
                            {formik?.touched?.total_experiences?.[index]
                              ?.company_role &&
                              formik.errors.total_experiences?.[index]
                                ?.company_role && (
                                <div className="error">
                                  {
                                    formik?.errors?.total_experiences?.[index]
                                      ?.company_role
                                  }
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="mt-1 flex w-full gap-3">
                          <div className="w-1/2">
                            <Menu as="div" className="relative">
                              <Menu.Button className="relative mt-2 flex min-h-[50px] w-full appearance-none items-center justify-between rounded-2xl border border-meta-light-blue-1 bg-white py-3 pl-5 pr-[11px] outline-none transition">
                                <p>
                                  {list?.location === null
                                    ? 'Select location'
                                    : list?.location?.name}
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
                                <Menu.Items className="mt- absolute right-0 z-30 w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div>
                                    {cityData?.map((el: any) => {
                                      return (
                                        <Menu.Item>
                                          {({ active }) => (
                                            <div
                                              onClick={() =>
                                                handleChangeMenu(
                                                  index,
                                                  el,
                                                  'location',
                                                )
                                              }
                                              className={classNames(
                                                active
                                                  ? 'bg-meta-blue-1 text-white'
                                                  : 'text-gray-900',
                                                'block px-4 py-2 text-[14px] capitalize',
                                              )}
                                            >
                                              {el?.name}
                                            </div>
                                          )}
                                        </Menu.Item>
                                      );
                                    })}
                                  </div>
                                </Menu.Items>
                              </Transition>
                            </Menu>
                            {formik?.touched?.total_experiences?.[index]
                              ?.location &&
                              formik.errors.total_experiences?.[index]
                                ?.location && (
                                <div className="error">
                                  {
                                    formik?.errors?.total_experiences?.[index]
                                      ?.location
                                  }
                                </div>
                              )}
                          </div>
                          <div className="w-1/2">
                            <Menu as="div" className="relative">
                              <Menu.Button className="relative mt-2 flex min-h-[50px] w-full appearance-none items-center justify-between rounded-2xl border border-meta-light-blue-1 bg-white py-3 pl-5 pr-[11px] outline-none transition">
                                <p>
                                  {list?.employmentType === ''
                                    ? 'Select your employment type'
                                    : list?.employmentType}
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
                                <Menu.Items className="mt- absolute right-0 z-30 w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div>
                                    {EMP_TYPE_ARR?.map((el: any) => {
                                      return (
                                        <Menu.Item>
                                          {({ active }) => (
                                            <div
                                              onClick={() =>
                                                handleChangeMenu(
                                                  index,
                                                  el,
                                                  'employmentType',
                                                )
                                              }
                                              className={classNames(
                                                active
                                                  ? 'bg-meta-blue-1 text-white'
                                                  : 'text-gray-900',
                                                'block px-4 py-2 text-[14px] capitalize',
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
                            {formik?.touched?.total_experiences?.[index]
                              ?.employmentType &&
                              formik.errors.total_experiences?.[index]
                                ?.employmentType && (
                                <div className="error">
                                  {
                                    formik?.errors?.total_experiences?.[index]
                                      ?.employmentType
                                  }
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="mt-1 flex w-1/2 gap-1">
                          <div className="w-1/2">
                            <div className="flex  items-center gap-1">
                              <input
                                type="number"
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                                value={list?.years}
                                name="years"
                                className="mt-2 w-1/2 rounded-2xl border border-meta-light-blue-1 py-3 pl-2 focus:border-meta-light-blue-3"
                              />
                              <div className="w-1/2 pt-1 text-base font-medium text-meta-purple-1">
                                Years
                              </div>
                            </div>
                            {formik?.touched?.total_experiences?.[index]
                              ?.years &&
                              formik.errors.total_experiences?.[index]
                                ?.years && (
                                <div className="error">
                                  {
                                    formik?.errors?.total_experiences?.[index]
                                      ?.years
                                  }
                                </div>
                              )}
                          </div>
                          <div className="w-1/2">
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                                value={list?.month}
                                name="month"
                                className="mt-2 w-1/2 rounded-2xl border border-meta-light-blue-1 py-3  pl-2 focus:border-meta-light-blue-3"
                              />
                              <div className="w-1/2  pt-1 text-base font-medium text-meta-purple-1">
                                Month
                              </div>
                            </div>
                            {formik?.touched?.total_experiences?.[index]
                              ?.month &&
                              formik.errors.total_experiences?.[index]
                                ?.month && (
                                <div className="error">
                                  {
                                    formik?.errors?.total_experiences?.[index]
                                      ?.month
                                  }
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="mt-[10px] w-full">
                          <label className="text-base font-medium text-meta-purple-1">
                            Reason for leaving
                          </label>
                          <input
                            type="text"
                            onChange={(event) => handleFormChange(index, event)}
                            value={list?.reason_for_leaving}
                            name="reason_for_leaving"
                            placeholder="Type here"
                            className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                          />
                          {formik?.touched?.total_experiences?.[index]
                            ?.reason_for_leaving &&
                            formik.errors.total_experiences?.[index]
                              ?.reason_for_leaving && (
                              <div className="error">
                                {
                                  formik?.errors?.total_experiences?.[index]
                                    ?.reason_for_leaving
                                }
                              </div>
                            )}
                        </div>
                        {index !== 0 && (
                          <div
                            className="absolute right-[-6px] top-[-6px] cursor-pointer lg:bottom-4"
                            onClick={() => handleRemove(list)}
                          >
                            <Image
                              width={20}
                              height={20}
                              alt="Google-icon"
                              src={'/CloseIcon.svg'}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  );
                },
              )}
              <div
                className="my-2 w-full cursor-pointer rounded-2xl border-[2px] border-dashed border-x-meta-light-blue-1 p-3"
                onClick={() => handleAddMoreEXP()}
              >
                <p className="text-center text-base">Add experience</p>
              </div>
            </div>
          )}
          <div>
            <div className="mt-5 w-full">
              <label className="text-base font-medium text-meta-purple-1">
                Expected Salary
              </label>
              <input
                value={formik?.values?.expected_salary_start_at}
                name="expected_salary_start_at"
                onChange={formik.handleChange}
                type="number"
                placeholder="Expected salary"
                className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
              />
              {formik.touched.expected_salary_start_at &&
                formik.errors.expected_salary_start_at && (
                  <div className="error">
                    {formik.errors.expected_salary_start_at}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex w-full justify-end">
        <Button
          title={TEXT?.SAVE}
          titleClass="!text-base !text-white"
          btnClass="!w-36 !rounded-lg !bg-meta-blue-1 !py-2"
        />
      </div>
      {/* <div className="mt-8 flex w-full justify-end">
        <button
          type="submit"
          className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white"
        >
          {TEXT?.SAVE}
        </button>
      </div> */}
    </form>
  );
};
export default CareerInfoTab;
