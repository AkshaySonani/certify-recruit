'use client';
import Spinner from '@/app/icons/Spinner';
import Button from '@/Components/Button';
import MultipleSelectBox from '@/Components/MultipleSelectBox';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { EXAM_STATUS } from '@/constant/Enum';
import useDebounce from '@/hooks/useDebounce';
import usePersistState from '@/hooks/usePersistState';
import API from '@/service/ApiService';
import { ROUTE, TEXT } from '@/service/Helper';
import { Dialog, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { components } from 'react-select';
import { toast } from 'react-toastify';

export default function Page() {
  const router = useRouter();
  const session: any = useSession();
  const [joinNow, setJoinNow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [skillQuery, setSkillQuery] = useState('');
  const debouncedSearchSkill = useDebounce(skillQuery);
  const [userDetails, setUserDetails] = useState<any>({});
  const [allCategory, setAllCategory] = useState<any>([]);
  const [selectedExperince, setSelectedExperince] = useState('');
  const [allowSubcategory, setAllowSubCategory] = useState(false);
  const [JoinConfirmModal, setJoinConfirmModal] = useState(false);
  const [selectMainCategory, setSelectMainCategory] = useState('');
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = usePersistState([], 'Exam:category');
  const [examStatus] = usePersistState(EXAM_STATUS?.STOPPED, 'Exam:Status');

  const MultiboxStyle = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? 1 : 1,
      boxShadow: state.isFocused ? 0 : 0,
      paddingRight: '2px',
      paddingTop: '0px',
      paddingBottom: '0px',
      '&:hover': {
        border: state.isFocused ? 0 : 0,
      },
    }),
  };

  useEffect(() => {
    const experience = userDetails?.total_experiences?.reduce(
      (acc: any, exp: any) => {
        acc.years += exp?.years;
        acc.months += exp?.months;
        return acc;
      },
      { years: 0, months: 0 },
    );

    const totalMonths = experience?.years * 12 + experience?.months;

    if (totalMonths >= 0 && totalMonths <= 3) {
      setSelectedExperince('0-3');
    } else if (totalMonths >= 4 && totalMonths <= 8) {
      setSelectedExperince('4-8');
    } else if (totalMonths >= 9) {
      setSelectedExperince('9-12+');
    } else {
      setSelectedExperince('0-3');
    }
  }, [userDetails]);

  useEffect(() => {
    getProfileDetails();
    userDetails.role && getCategorys();
  }, [userDetails]);

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res: any) => {
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

  const getCategorys = () => {
    API.get(API_CONSTANT?.GET_SUBCATEGORYS, { field: userDetails?.role })
      .then(({ data }) =>
        setCategory(Array.from(new Set(data?.data?.map((e) => e.category)))),
      )
      .catch((error: any) => {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            'Internal server error',
        );
      });
  };

  const getSubCategorys = () => {
    setLoading(true);
    API.post(API_CONSTANT?.GET_SUBCATEGORYS, { category: selectMainCategory })
      .then((res: any) => {
        setAllCategory(res?.data?.data);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            'Internal server error',
        );
      });
  };

  useEffect(() => {
    if (examStatus === EXAM_STATUS?.STARTED) {
      router?.replace(ROUTE?.EXAM);
    }
  }, []);

  const searchSkillApi = (search: any) => {
    let obj = {
      searchText: search,
    };
    API.post(API_CONSTANT?.CATEGORY, obj)
      .then((res) => {
        let skiilArr = res?.data?.data?.map((list: any) => {
          return {
            _id: list?._id,
            label: list?.subcategory,
            value: list?.subcategory,
          };
        });
        setSkillData(skiilArr);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };

  const onSearchSkill = (search: any) => {
    setSkillQuery(search);
  };

  useEffect(() => {
    if (debouncedSearchSkill !== '') {
      searchSkillApi(debouncedSearchSkill);
    }
  }, [debouncedSearchSkill]);

  const Placeholder = (props: any) => {
    return <components.Placeholder {...props} />;
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <Image alt="Plus" width={20} height={19} src={'/job/Plus.svg'} />
      </components.DropdownIndicator>
    );
  };

  const onContinue = () => {
    if (categories.length < 6) {
      toast.error('You must select at least 6 categories');
    } else {
      setJoinConfirmModal(true);
    }
  };

  const confirmMeeting = () => {
    setLoading(true);
    if (joinNow === true) {
      router?.push('/exam');
      setLoading(false);
    } else {
      let obj = {
        email: session?.data?.user?.email,
        categoryIds: categories,
      };
      API.post(API_CONSTANT?.SEND_EXAM_LINK, obj)
        .then((res) => {
          setJoinConfirmModal(false);
          toast.success(res?.data?.message);
          router?.push(ROUTE?.DASHBOARD);
          setLoading(false);
          setCategories([]);
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message || 'Internal server error',
          );
        });
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-center text-[40px] font-semibold text-meta-blue-1">
            Choose Your Preferred Category
          </p>
          <p className="m-auto mt-2 w-[80%] text-center text-lg font-medium text-meta-light-blue-3">
            Your Assessment will be done based on your preferred Category
          </p>
          {!allowSubcategory ? (
            <div className="border-meta-light-blue m-auto mt-11 rounded-[26px] border bg-meta-light-blue-5 p-12 sm:w-[70%]">
              <div className="mt-5 flex w-full flex-wrap   justify-center gap-5 text-start ">
                {category?.map((ele: any, i: any) => {
                  return (
                    <div
                      key={ele}
                      onClick={() => {
                        setCategories([]);
                        setSelectMainCategory(ele);
                      }}
                      className={`${selectMainCategory?.includes(ele) ? 'border-meta-blue-1' : 'border-meta-light-blue-1'} flex w-[46%] cursor-pointer items-center gap-2 rounded-xl border bg-meta-light-blue-1 px-3 py-5`}
                    >
                      <Image
                        alt="icon"
                        width={16}
                        height={20}
                        src={'/Individual.svg'}
                      />
                      <div className="text-meta-blue-1">{ele}</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-9">
                <p className="text-center text-2xl font-normal text-meta-blue-1">
                  Years of Experiance
                </p>

                <div className="mt-4 flex justify-center gap-3">
                  {['0-3', '4-8', '9-12+']?.map((ele) => {
                    return (
                      <div
                        className={`${selectedExperince?.includes(ele) ? 'border-meta-blue-1' : 'border-meta-light-blue-2'} w-48 cursor-pointer rounded-xl border bg-meta-light-blue-2 py-1 text-center text-xl text-meta-light-blue-3`}
                      >
                        {ele}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* <div className="mt-5 flex w-full flex-col items-center justify-center  lg:w-1/2">
                <div className="border-1 mt-5 flex w-full flex-wrap items-start rounded-xl border border-meta-light-blue-1 py-2 lg:mt-0">
                  <MultipleSelectBox
                    name="skills"
                    isMulti={true}
                    options={skillData}
                    style={MultiboxStyle}
                    placeholder="Search Categories"
                    value={allCategory}
                    onKeyDown={(e: any) => onSearchSkill(e)}
                    className="w-full !border-meta-light-blue-1"
                    handleChange={(option: any) => setAllCategory(option)}
                    components={{ Placeholder, DropdownIndicator }}
                  />
                </div>
              </div> */}
              {/* <div className="mt-5 flex w-full flex-wrap items-start justify-center gap-4 text-start sm:flex-nowrap">
                {allCategory?.map((ele: any, i: any) => {
                  console.log('ele', ele);

                  return (
                    <div
                      onClick={() => setCategories([...categories, ele])}
                      className={`${categories?.includes(ele) ? 'border border-meta-blue-1' : ''} flex w-1/4 items-center gap-2 rounded-xl  bg-meta-light-blue-1 px-3 py-5`}
                    >
                      <Image
                        alt="icon"
                        width={16}
                        height={20}
                        src={'/Individual.svg'}
                      />
                      <div className="text-meta-blue-1">{ele?.subcategory}</div>
                    </div>
                  );
                })}
              </div> */}
              <div className="mt-5 flex w-full flex-wrap items-start justify-center gap-4 text-start">
                {allCategory?.length === 0 && loading ? (
                  <div className="flex h-full items-center justify-center">
                    <Spinner
                      width="32px"
                      height="32px"
                      color="#3751F2"
                      className="spinner"
                    />
                  </div>
                ) : allCategory?.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    No Data Availbale
                  </div>
                ) : (
                  <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {allCategory?.map((ele: any, i: any) => {
                      const isAlreadySelected: any = categories.some(
                        (category: any) => category._id === ele._id,
                      );

                      return (
                        <div
                          key={i}
                          onClick={() => {
                            if (isAlreadySelected) {
                              setCategories(
                                categories.filter(
                                  (category: any) => category._id !== ele._id,
                                ),
                              );
                            } else if (categories.length < 6) {
                              setCategories([...categories, ele]);
                            }
                          }}
                          className={`${categories?.includes(ele) ? 'border-meta-blue-1' : 'border-meta-light-blue-1'} flex cursor-pointer items-center gap-2 rounded-xl border bg-meta-light-blue-1 px-3 py-5`}
                        >
                          <Image
                            alt="icon"
                            width={16}
                            height={20}
                            src={'/Individual.svg'}
                          />
                          <div className="text-meta-blue-1">
                            {ele?.subcategory}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {!allowSubcategory ? (
        <div className={`mt-20 flex  w-full  items-end justify-end`}>
          <button
            onClick={() => {
              if (selectMainCategory === '') {
                toast.error('Select Category');
              } else {
                getSubCategorys();
                setAllowSubCategory(true);
              }
            }}
            className={`mb-8 h-12  min-w-48 rounded-lg border border-meta-light-blue-2 bg-meta-blue-1 py-3 text-meta-light-blue-3 transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient`}
          >
            <span
              className={`flex justify-center text-sm font-medium text-white`}
            >
              Continue
            </span>
          </button>
        </div>
      ) : (
        <div className={`mt-20 flex  w-full  items-end justify-between`}>
          <button
            type="button"
            onClick={() => {
              setAllowSubCategory(false);

              // router?.back()
            }}
            className="mb-8 h-12 min-w-full rounded-lg border-2 border-meta-light-blue-1 text-base font-medium text-meta-light-blue-3 sm:mb-8 sm:min-w-48"
          >
            {TEXT?.BACK}
          </button>

          <button
            onClick={() => onContinue()}
            className={`mb-8 h-12  min-w-48 rounded-lg border border-meta-light-blue-2 bg-meta-blue-1 py-3 text-meta-light-blue-3 transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient`}
          >
            <span
              className={`flex justify-center text-sm font-medium text-white`}
            >
              Continue
            </span>
          </button>
        </div>
      )}
      <Transition appear show={JoinConfirmModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10  "
          onClose={() => setJoinConfirmModal(false)}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all">
                  <div>
                    <div className="w-full rounded-lg border border-meta-light-blue-1 p-3">
                      <label
                        htmlFor={'JoinNow'}
                        className={`flex cursor-pointer select-none items-center justify-between `}
                      >
                        <p className="pl-3 capitalize">Join Now</p>
                        <input
                          type="checkbox"
                          id={'JoinNow'}
                          value={String(joinNow)}
                          checked={joinNow ? true : false}
                          onChange={() => setJoinNow(true)}
                        />
                      </label>
                    </div>
                    {/* <div className="mt-5 w-full rounded-lg border border-meta-light-blue-1 p-3">
                      <label
                        htmlFor={'joinLater'}
                        className={`flex cursor-pointer select-none items-center justify-between `}
                      >
                        <p className="pl-3 capitalize">Join Later</p>
                        <input
                          type="checkbox"
                          id={'joinLater'}
                          value={String(joinNow)}
                          checked={joinNow ? false : true}
                          onChange={() => setJoinNow(false)}
                        />
                      </label>
                    </div> */}
                    <div className="mt-5 flex h-full items-center">
                      <Button
                        title={TEXT?.DONE}
                        isLoading={loading}
                        btnClass="h-[37px] mb-0"
                        handleClick={() => confirmMeeting()}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
