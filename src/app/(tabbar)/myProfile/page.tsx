'use client';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import { TEXT, USER_ROLE } from '@/service/Helper';
import { useSession } from 'next-auth/react';
import CompanyProfile from '@/Components/profile/CompanyProfile';
import IndividualProfile from '@/Components/profile/IndividualProfile';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const router = useRouter();
  const session = useSession() as any;
  const [degreeList, setDegreeList] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  const citiesData = [
    { _id: '662ccb4a52f81a3100514885', name: 'surat' },
    { _id: '662ccb4a52f81a3100514885', name: 'Ahemedabad' },
    { _id: '662ccb4a52f81a3100514885', name: 'Baroda' },
    { _id: '662ccb4a52f81a3100514885', name: 'Rajkot' },
    { _id: '662ccb4a52f81a3100514885', name: 'Botad' },
    { _id: '662ccb4a52f81a3100514885', name: 'pune' },
  ];
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }
  useEffect(() => {
    getDegreeList();
    getCollegeList();
    getLanguageList();
  }, []);
  const getDegreeList = () => {
    API.get(API_CONSTANT?.DEGREE)
      .then((res) => {
        console.log('res---->degree', res);

        // let skiilArr = res?.data?.data?.map((list: any) => {
        //   return {
        //     _id: list?._id,
        //     label: list?.subcategory,
        //     value: list?.subcategory,
        //   };
        // });
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
        console.log('res----->College', res);

        // let skiilArr = res?.data?.data?.map((list: any) => {
        //   return {
        //     _id: list?._id,
        //     label: list?.subcategory,
        //     value: list?.subcategory,
        //   };
        // });
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
        console.log('res---> language', res);
        setLanguageList(res?.data?.data);
        // let skiilArr = res?.data?.data?.map((list: any) => {
        //   return {
        //     _id: list?._id,
        //     label: list?.subcategory,
        //     value: list?.subcategory,
        //   };
        // });
      })
      .catch((error) => {
        console.log('error', error);
        toast.error(error?.response?.data?.error);
      });
  };

  return (
    <div className="m-auto w-4/5">
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
                  <p className="text-xs text-meta-light-blue-3">516-742-4006</p>
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
            <div className="text-base font-medium text-meta-blue-1">
              {TEXT?.EDIT}
            </div>
          </div>
        </div>
      </div>
      {session?.data?.user?.role !== USER_ROLE?.EMPLOYEE ? (
        <CompanyProfile />
      ) : (
        <IndividualProfile
          languageList={languageList}
          collegeList={collegeList}
          degreeList={degreeList}
        />
      )}
    </div>
  );
};
export default MyProfile;
