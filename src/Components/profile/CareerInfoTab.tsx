import * as Yup from 'yup';
import Image from 'next/image';
import Button from '../Button';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { useFormik, Field } from 'formik';
import Spinner from '@/app/icons/Spinner';
import AutoComplete from '../Autocomplete';
import useDebounce from '@/hooks/useDebounce';
import { EMP_TYPE_ARR } from '@/constant/Enum';
import AppContext from '@/context/AppProvider';
import 'react-datepicker/dist/react-datepicker.css';
import { Menu, Transition } from '@headlessui/react';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { TEXT, updateProfileCount } from '@/service/Helper';
import { Fragment, useContext, useEffect, useState } from 'react';
import SuccessModal from './SuccessModal';
import { Switch } from '@headlessui/react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
const CareerInfoTab = ({
  session,
  cityData,
  userDetails,
  setActivePage,
  activePage,
  getUserDataApiCall,
}: any) => {
  const context = useContext(AppContext);
  const [active, setActive] = useState(1);
  const [cities, setCities] = useState([]);
  const [cityQuery, setCityQuery] = useState('');
  const [isSpinner, setIsSpinner] = useState(false);
  const debouncedSearchCity = useDebounce(cityQuery);
  const [isFresher, setIsFresher] = useState(true);

  const {
    profileCompletionCount,
    setProfileCompletionCount,
    completedSections,
    setCompletedSections,
    openSuccessModal,
    setOpenSuccessModal,
  } = context;

  const handleNextClick = (section: any) => {
    updateProfileCount(
      session?.user?.role,
      section,
      setProfileCompletionCount,
      completedSections,
      setCompletedSections,
      setOpenSuccessModal,
    );
  };

  const handleSubmit = async (values: any, actions: any) => {
    setIsSpinner(true);
    const obj = {
      ...values,
    };

    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          session?.user?.profile_count !== 100 &&
            session?.user?.profile_count < 100 &&
            handleNextClick('career_info');
          setIsSpinner(false);
          setActivePage(activePage + 1);
          if (
            profileCompletionCount?.individual === 100 ||
            session?.user?.profile_count === 100
          ) {
            setOpenSuccessModal(true);
          }
          getUserDataApiCall();
          context?.setUserProfileCount(res?.data?.data?.profile_count);
          actions.setSubmitting(false);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
        }
      })
      .catch((error) => {
        setIsSpinner(false);
        toast.error(error || 'Something want wrong');
      });
  };

  const validationSchema = Yup.object().shape({
    expected_salary_start_at: Yup.string().required(
      'Expected salary is required',
    ),
    total_experiences:
      isFresher === true
        ? Yup.array()
        : Yup.array().of(
            Yup.object().shape({
              isCurrent: Yup.boolean(),
              companyName: Yup.string().required('Company name is required'),
              company_role: Yup.string().required('Role is required'),
              location: Yup.object().nonNullable('location is required'),
              employmentType: Yup.string().required('Emp type is required'),
              years: Yup.number()
                .required('Years is required')
                .min(0, 'Years cannot be negative')
                .max(50, 'Years cannot be greater than 50'),
              month: Yup.number()
                .required('Month is required')
                .min(0, 'Month cannot be negative')
                .max(11, 'Month cannot be greater than 11'),
              reason_for_leaving: Yup.string().when('isCurrent', {
                is: (v: boolean) => v,
                then: () => Yup.string().optional(),
                otherwise: () =>
                  Yup.string().required('Reason of leaving is required'),
              }),
            }),
          ),
  });

  const searchCityApi = (search: any) => {
    let obj = {
      searchText: search,
    };
    API.post(API_CONSTANT?.CITIES, obj)
      .then((res) => {
        setCities(res?.data?.data);
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  useEffect(() => {
    if (debouncedSearchCity !== '') {
      searchCityApi(debouncedSearchCity);
    }
  }, [debouncedSearchCity]);

  const formik: any = useFormik({
    initialValues: {
      is_fresher: isFresher,
      expected_salary_start_at: userDetails?.expected_salary_start_at ?? '',
      total_experiences:
        userDetails?.total_experiences?.length !== 0
          ? userDetails?.total_experiences
          : [
              {
                isCurrent: false,
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

  useEffect(() => {
    setActive(userDetails.total_experiences?.length > 0 ? 2 : 1);
    setIsFresher(userDetails.total_experiences?.length > 0 ? false : true);
  }, []);

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
    formik.setFieldValue(`total_experiences[${i}].${name}`, el);
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
        isCurrent: false,
        companyName: '',
        company_role: '',
        location: null,
        employmentType: '',
        years: '',
        month: '',
        reason_for_leaving: '',
      },
    ]);
  };
  const handleFormChange = (index: any, event: any) => {
    const { name, value } = event.target;
    formik.setFieldValue(`total_experiences[${index}].${name}`, value);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-5 flex w-full gap-3 pl-9">
        <div className="w-full">
          <label className="text-base font-medium text-meta-purple-1">
            Career profile
          </label>
          <p className="mb-3 pt-1 text-sm font-medium text-meta-light-blue-3">
            Fill in your career details here:
          </p>
          <div className="mt-3 flex w-full items-center justify-center gap-2 lg:mt-0">
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
                Total Years of Experience:
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
                              className="w-full rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
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
                              className="w-full rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
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
                        <div className="mt-2 flex w-full gap-3">
                          <div className="w-1/2">
                            <AutoComplete
                              value={list?.location}
                              filterArr={cities}
                              className="!mt-2 h-[50px] !rounded-2xl"
                              query={cityQuery}
                              disabled={false}
                              setQuery={setCityQuery}
                              name={'location'}
                              placeholder="Search location"
                              handleChange={(e: any) =>
                                handleChangeMenu(index, e, 'location')
                              }
                            />
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
                              <Menu.Button className="relative mt-2 flex min-h-[50px] w-full appearance-none items-center justify-between rounded-2xl border border-meta-light-blue-1 bg-white px-3 py-3 outline-none transition">
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
                                <Menu.Items className="mt- absolute right-0 z-30 w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                                'lo block px-4 py-2 text-[14px] capitalize',
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
                                className="mt-2 w-1/2 rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
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
                                className="mt-2 w-1/2 rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
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
                          <div className="flex items-center justify-between">
                            <label className="text-base font-medium text-meta-purple-1">
                              Job is currently running
                            </label>
                            <Switch
                              checked={list.isCurrent}
                              onChange={(value) =>
                                handleFormChange(index, {
                                  target: { name: 'isCurrent', value },
                                })
                              }
                              className={`${
                                list.isCurrent ? 'bg-blue-600' : 'bg-gray-200'
                              } relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                              <span className="sr-only">
                                Enable notifications
                              </span>
                              <span
                                className={`${
                                  list.isCurrent
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                              />
                            </Switch>
                          </div>
                          {!list.isCurrent && (
                            <>
                              <hr className="my-2" />
                              <label className="text-base font-medium text-meta-purple-1">
                                Reason for leaving
                              </label>
                              <input
                                type="text"
                                onChange={(event) =>
                                  handleFormChange(index, event)
                                }
                                value={list?.reason_for_leaving}
                                name="reason_for_leaving"
                                placeholder="Type here"
                                className="p-3focus:border-meta-light-blue-3 mt-2 w-full rounded-2xl border border-meta-light-blue-1 p-3 focus:outline-meta-light-blue-1"
                              />
                            </>
                          )}
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
                onClick={handleAddMoreEXP}
              >
                <p className="text-center text-base">Add experience</p>
              </div>
            </div>
          )}
          <div>
            <div className="mt-5 w-full">
              <label className="text-base font-medium text-meta-purple-1">
                Expected Salary (per annum)
              </label>
              <input
                value={Number(
                  formik?.values?.expected_salary_start_at.replace(/,/gim, ''),
                )?.toLocaleString()}
                name="expected_salary_start_at"
                onChange={({ target: { value, name } }) =>
                  formik.handleChange({
                    target: { value: value.replace(/\D/g, ''), name },
                  })
                }
                placeholder="Expected salary"
                className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
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
        {isSpinner ? (
          <div className="w-36 rounded-lg bg-meta-blue-1 py-2">
            <Spinner
              width="32px"
              height="32px"
              color="white"
              className="spinner"
            />
          </div>
        ) : (
          <Button
            title={TEXT?.NEXT}
            titleClass="!text-base !text-white"
            btnClass="!w-36 !rounded-lg !bg-meta-blue-1 !py-2"
          />
        )}
      </div>
      {/* <div className="mt-8 flex w-full justify-end">
        <button
          type="submit"
          className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white"
        >
          {TEXT?.SAVE}
        </button>
      </div> */}
      <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
    </form>
  );
};
export default CareerInfoTab;
