"use client";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { TEXT, USER_ROLE } from "@/service/Helper";
import { useSession } from "next-auth/react";
import CompanyProfile from "@/Components/profile/CompanyProfile";
import IndividualProfile from "@/Components/profile/IndividualProfile";
import API from "@/service/ApiService";
import { API_CONSTANT } from "@/constant/ApiConstant";
import { toast } from "react-toastify";

const MyProfile = () => {
  const router = useRouter();
  const session = useSession() as any;
  const [degreeList, setDegreeList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  useEffect(() => {
    // getDegreeList();
    // getCollegeList();
    // getLanguageList();
  }, []);
  const getDegreeList = () => {
    API.get(API_CONSTANT?.DEGREE)
      .then((res) => {
        console.log("res---->degree", res);

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
        console.log("error", error);
        toast.error(error?.response?.data?.error);
      });
  };

  const getCollegeList = () => {
    API.get(API_CONSTANT?.COLLEGE)
      .then((res) => {
        console.log("res----->College", res);

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
        console.log("error", error);
        toast.error(error?.response?.data?.error);
      });
  };

  const getLanguageList = () => {
    API.get(API_CONSTANT?.LANGUAGE)
      .then((res) => {
        console.log("res---> language", res);
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
        console.log("error", error);
        toast.error(error?.response?.data?.error);
      });
  };

  return (
    <div className="m-auto w-4/5">
      <div className="flex items-center justify-between">
        <div
          className="flex cursor-pointer"
          onClick={() => router?.push("/dashboard")}
        >
          <Image src={"/BackArrow.svg"} alt="date" width={20} height={20} />
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
            src={"/ProfileLogo.svg"}
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
                    src={"/location.svg"}
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
                    src={"/call.svg"}
                  />
                  <p className="text-xs text-meta-light-blue-3">516-742-4006</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Image
                  width={16}
                  height={16}
                  alt="MainLogo"
                  src={"/mail.svg"}
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
      {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
        <CompanyProfile />
      ) : (
        <IndividualProfile
          languageList={languageList}
          collegeList={collegeList}
          degreeList={degreeList}
        />
      )}

      {/* <div className="mt-5">
        <div className="flex w-3/5 justify-around">
          <div
            onClick={() => setActive(0)}
            className={`cursor-pointer text-sm font-medium ${
              active === 0 ? 'text-meta-blue-1' : 'text-meta-light-blue-3'
            }`}
          >
            {TEXT?.BASIC_DETAIL}
          </div>
          <div
            onClick={() => setActive(1)}
            className={`cursor-pointer text-sm font-medium ${
              active === 1 ? 'text-meta-blue-1' : 'text-meta-light-blue-3'
            }`}
          >
            {TEXT?.Company_Detail}
          </div>
          <div
            className={`cursor-pointer text-sm font-medium ${
              active === 2 ? 'text-meta-blue-1' : 'text-meta-light-blue-3'
            } `}
            onClick={() => setActive(2)}
          >
            {TEXT?.KYC_Compliance_Detail}
          </div>
        </div>
        <div className="my-3 w-full border border-meta-light-blue-1" />

        <div>
          {active === 0 && (
            <>
              <div className="mt-5 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.USERNAME}
                  </label>
                  <input
                    type="text"
                    placeholder="Lynn Tanner"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.EMAIL}
                  </label>
                  <input
                    type="text"
                    placeholder="Tannerlynntanner2001@gmail.com"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
              </div>
              <div className="mt-3 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.ROLE}
                  </label>
                  <input
                    type="text"
                    placeholder="Lynn Tanner"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.PHONE_NUMBER}
                  </label>
                  <input
                    type="text"
                    placeholder="Tannerlynntanner2001@gmail.com"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
              </div>
            </>
          )}
          {active === 1 && (
            <>
              <div className="mt-5 flex w-full gap-3 pl-9">
                <Menu as="div" className="relative w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.COMPANY_TYPE}
                  </label>
                  <Menu.Button className="border-stroke relative z-20 mt-2 flex w-full appearance-none items-center justify-between rounded-lg border px-5 py-3 outline-none transition">
                    <p>{company}</p>
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
                    <Menu.Items className="absolute right-0 z-30 mt-2 w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div>
                        {COMPANY_ARR?.map((list) => {
                          return (
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={() => setCompany(list?.name)}
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'block px-4 py-2 text-base',
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
                </Menu>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.COMPANY_NAME}
                  </label>
                  <input
                    type="text"
                    placeholder="Webnova Infotech"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
              </div>
              <div className="mt-3 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.WEBSITE_URL}
                  </label>
                  <input
                    type="text"
                    placeholder="https://webnovainfotech.in/"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.OWNER}
                  </label>
                  <input
                    type="text"
                    placeholder="Utsav Savaliya"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
              </div>
              <div className="mt-3 w-full pl-9">
                <label className="text-base font-medium text-meta-purple-1">
                  {TEXT?.COMPANY_MAILING_ADDRESS}
                </label>
                <input
                  type="text"
                  placeholder="Street address"
                  className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                />
              </div>
              <div className="mt-3 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="https://webnovainfotech.in/"
                    className="w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Utsav Savaliya"
                    className="w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
              </div>
              <div className="mt-3 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
              </div>
            </>
          )}
          {active === 2 && (
            <>
              <div className="mt-5 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.PAN_NUMBER}
                  </label>
                  <input
                    type="text"
                    placeholder="NSLPQS2154"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.NAME_ON_PAN_CARD}
                  </label>
                  <input
                    type="text"
                    placeholder="Webnova Infotech"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
              </div>
            </>
          )}
          <div className="mt-8 flex w-full justify-end">
            <button className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white">
              {TEXT?.SAVE}
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default MyProfile;
