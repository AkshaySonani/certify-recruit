'use client';
import Image from 'next/image';
import { Fragment, Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Transition, Dialog } from '@headlessui/react';
import { TEXT, USER_ROLE } from '@/service/Helper';
import { useSession } from 'next-auth/react';
import CompanyProfile from '@/Components/profile/CompanyProfile';
import IndividualProfile from '@/Components/profile/IndividualProfile';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { toast } from 'react-toastify';
import Loader from '@/Components/Loader';

const MyProfile = () => {
  const router = useRouter();
  const session = useSession() as any;
  const [isOpen, setIsOpen] = useState(false);
  const [degreeList, setDegreeList] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }
  useEffect(() => {
    getDegreeList();
    getCollegeList();
    getLanguageList();

    getProfileDetails();
  }, []);

  const getDegreeList = () => {
    API.get(API_CONSTANT?.DEGREE)
      .then((res) => {
        setDegreeList(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
        toast.error(error?.response?.data?.error);
      });
  };

  const getCollegeList = () => {
    API.get(API_CONSTANT?.COLLEGE)
      .then((res) => {
        setCollegeList(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
        toast.error(error?.response?.data?.error);
      });
  };

  const getLanguageList = () => {
    API.get(API_CONSTANT?.LANGUAGE)
      .then((res) => {
        setLanguageList(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
        toast.error(error?.response?.data?.error);
      });
  };

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res) => {
        console.log('res---->Profile', res);
        setUserDetails(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
        toast.error(error?.response?.data?.error);
      });
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="m-auto w-4/5 max-w-[1200px]">
        <div className="flex items-center justify-between">
          <div
            className="flex cursor-pointer"
            onClick={() => router?.push('/dashboard')}
          >
            <Image src={'/BackArrow.svg'} alt="date" width={20} height={20} />
            <p className="text-5 pl-2 font-semibold text-meta-purple-1">
              {TEXT?.DASHBOARD}
            </p>
          </div>
          <div>
            <button className="w-32 rounded-lg bg-hiring-btn-gradient py-3 text-sm font-semibold text-white">
              {TEXT?.Hiring}
            </button>
          </div>
        </div>
        <div className="mt-4 w-full rounded-2xl bg-meta-light-blue-2 p-10">
          <div className="flex w-full items-center gap-8">
            <Image
              width={109}
              height={135}
              alt="MainLogo"
              src={'/ProfileLogo.svg'}
            />
            <div className="flex w-full gap-8">
              <div className="w-11/12">
                <p className="text-xl font-semibold text-meta-purple-1">
                  {TEXT?.WEBNOVA_INFOTECH}
                </p>
                <p className="text-sm font-medium text-meta-light-blue-3">
                  {TEXT?.COMPANY_TYPE}
                </p>

                <div className="border-b-default-1 my-3 w-full border-meta-light-blue-1" />
                <div className="flex w-1/2 justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <Image
                      width={16}
                      height={16}
                      alt="MainLogo"
                      src={'/location.svg'}
                    />
                    <p className="text-xs text-meta-light-blue-3">
                      {TEXT?.NEW_YOUR_USA}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      width={16}
                      height={16}
                      alt="MainLogo"
                      src={'/call.svg'}
                    />
                    <p className="text-xs text-meta-light-blue-3">
                      516-742-4006
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Image
                    width={16}
                    height={16}
                    alt="MainLogo"
                    src={'/mail.svg'}
                  />
                  <p className="text-xs text-meta-light-blue-3">516-742-4006</p>
                </div>
              </div>
              <div
                onClick={() => setIsOpen(true)}
                className="text-base font-medium text-meta-blue-1"
              >
                {TEXT?.EDIT}
              </div>

              <div>
                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog as="div" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                      as={Fragment}
                      leaveTo="opacity-0"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leaveFrom="opacity-100"
                      leave="ease-in duration-200"
                      enter="ease-out duration-300"
                    >
                      <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center text-center">
                        <Transition.Child
                          as={Fragment}
                          leave="ease-in duration-200"
                          leaveTo="opacity-0 scale-95"
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leaveFrom="opacity-100 scale-100"
                        >
                          <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className=" border-b-default-1 relative flex items-start border-meta-light-blue-1 p-8 text-xl font-semibold leading-6 text-meta-purple-1"
                            >
                              {TEXT?.BASIC_DETAIL}
                            </Dialog.Title>

                            <div className="w-full p-8 pt-0">
                              <div className="flex items-center justify-between">
                                <div className="mr-3 w-1/2">
                                  <label>{TEXT?.FULL_NAME}</label>
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                                  />
                                </div>
                                <div className="w-1/2">
                                  <label>{TEXT?.EMAIL}</label>
                                  <input
                                    type="text"
                                    placeholder="Email"
                                    className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                                  />
                                </div>
                              </div>
                              <div className="mt-3 w-full">
                                <Menu
                                  as="div"
                                  className="relative z-[1] inline-block w-full text-left"
                                >
                                  <Menu.Button className="mt-1 inline-flex w-full items-center justify-between rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3">
                                    {TEXT?.ROLE}
                                    <div>
                                      <Image
                                        alt="Icon"
                                        width={14}
                                        height={14}
                                        src={'/dashboard/SelectDown.svg'}
                                      />
                                    </div>
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
                                    <Menu.Items className="absolute right-0 mt-2 w-full divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                      <div className="px-1 py-1">test</div>
                                    </Menu.Items>
                                  </Transition>
                                </Menu>
                              </div>
                              <button
                                onClick={() => setIsOpen(false)}
                                className="mt-4 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-blue-1"
                              >
                                <span className="flex justify-center text-sm font-medium text-white">
                                  {TEXT?.ADD_USER}
                                </span>
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
          <CompanyProfile userDetails={userDetails} session={session?.data} />
        ) : (
          <IndividualProfile
            userDetails={userDetails}
            languageList={languageList}
            collegeList={collegeList}
            degreeList={degreeList}
            session={session?.data}
          />
        )}
      </div>
    </Suspense>
  );
};
export default MyProfile;
