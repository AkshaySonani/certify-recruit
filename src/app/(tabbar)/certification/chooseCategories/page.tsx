'use client';
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
  const [categories, setCategories] = usePersistState([], 'Exam:category');
  const [examStatus] = usePersistState(EXAM_STATUS?.STOPPED, 'Exam:Status');
  const [skillData, setSkillData] = useState([]);
  const [skillQuery, setSkillQuery] = useState('');
  const [JoinConfirmModal, setJoinConfirmModal] = useState(false);
  const [allCategory, setAllCategory] = useState<any>([]);
  const [joinNow, setJoinNow] = useState(true);
  const debouncedSearchSkill = useDebounce(skillQuery);
  const [loading, setLoading] = useState(false);
  const [selectMainCategory, setSelectMainCategory] = useState('');

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
    if (categories?.length === 0) {
      toast.error('Select at least one category');
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
            Choose categories
          </p>
          <p className="m-auto mt-2 w-[80%] text-center text-lg font-medium text-meta-light-blue-3">
            Choose categories according to your expertise. You can select a
            maximum of up to 3 categories.
          </p>
          {selectMainCategory === '' ? (
            <div className="border-meta-light-blue m-auto mt-11 rounded-[26px] border bg-meta-light-blue-5 p-12 sm:w-[70%]">
              <div className="mt-5 flex w-full flex-wrap   justify-center gap-5 text-start ">
                {[
                  'US Recruitment',
                  'US Recruitment',
                  'US Recruitment',
                  'US Recruitment',
                ]?.map((ele: any, i: any) => {
                  return (
                    <div
                      onClick={() => setCategories([...categories, ele])}
                      className={`${categories?.includes(ele) ? 'border border-meta-blue-1' : ''} flex w-[46%] items-center gap-2 rounded-xl  bg-meta-light-blue-1 px-3 py-5`}
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
                  <div className="w-48 rounded-xl bg-meta-light-blue-2 py-1 text-center text-xl text-meta-light-blue-3">
                    0-3
                  </div>
                  <div className="w-48 rounded-xl bg-meta-light-blue-2 py-1 text-center text-xl text-meta-light-blue-3">
                    0-3
                  </div>
                  <div className="w-48 rounded-xl bg-meta-light-blue-2 py-1 text-center text-xl text-meta-light-blue-3">
                    0-3
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-5 flex w-full flex-col items-center justify-center  lg:w-1/2">
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
              </div>
              <div className="mt-5 flex w-full flex-wrap items-start justify-center gap-4 text-start sm:flex-nowrap">
                {allCategory?.map((ele: any, i: any) => {
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
                      <div className="text-meta-blue-1">{ele?.label}</div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      {selectMainCategory === '' ? (
        <div className={`"w-full mt-20  flex  items-end justify-end`}>
          <button
            onClick={() => setSelectMainCategory('nrw')}
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
        <div className={`"w-full mt-20  flex  items-end justify-between`}>
          <button
            type="button"
            onClick={() => router?.back()}
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
                    <div className="mt-5 w-full rounded-lg border border-meta-light-blue-1 p-3">
                      <label
                        htmlFor={'joinLater'}
                        className={`flex cursor-pointer select-none items-center justify-between `}
                      >
                        <p className="pl-3 capitalize">Join Latter</p>
                        <input
                          type="checkbox"
                          id={'joinLater'}
                          value={String(joinNow)}
                          checked={joinNow ? false : true}
                          onChange={() => setJoinNow(false)}
                        />
                      </label>
                    </div>
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
