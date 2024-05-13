"use client";
import Image from "next/image";
import API from "@/service/ApiService";
import { toast } from "react-toastify";
import Loader from "@/Components/Loader";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ROUTE, TEXT, USER_ROLE } from "@/service/Helper";
import { API_CONSTANT } from "@/constant/ApiConstant";
import { Fragment, Suspense, useEffect, useState } from "react";
import CompanyProfile from "@/Components/profile/CompanyProfile";
import EditDetailsDialog from "@/Components/profile/EditDetailsDialog";
import IndividualProfile from "@/Components/profile/IndividualProfile";

const MyProfile = () => {
  const router = useRouter();
  const session = useSession() as any;
  const [isOpen, setIsOpen] = useState(false);
  const [degreeList, setDegreeList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [userDetails, setUserDetails] = useState<any>({});
  const [languageList, setLanguageList] = useState([]);

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
        console.log("error", error);
        toast.error(error?.response?.data?.error);
      });
  };

  const getCollegeList = () => {
    API.get(API_CONSTANT?.COLLEGE)
      .then((res) => {
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
        setLanguageList(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response?.data?.error);
      });
  };

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res) => {
        console.log("res---->Profile", res);
        setUserDetails(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response?.data?.error);
      });
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="m-auto w-4/5 max-w-[1200px]">
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
            <button
              className="w-32 rounded-lg bg-hiring-btn-gradient py-3 text-sm font-semibold text-white"
              onClick={() => router?.push(ROUTE?.SEARCH_CVS)}
            >
              {TEXT?.Hiring}
            </button>
          </div>
        </div>
        {/* <div className="mt-4 w-full rounded-2xl bg-meta-light-blue-2 p-10">
          <div className="flex w-full items-center gap-8">
            <Image
              width={109}
              height={135}
              alt="MainLogo"
              src={"/ProfileLogo.svg"}
            />
            <div className="flex w-full gap-8">
              <div className="w-11/12">
                <p className="text-xl font-semibold capitalize text-meta-purple-1">
                  {session?.data?.user?.role !== USER_ROLE?.EMPLOYEE
                    ? userDetails?.user_name
                      ? userDetails?.user_name
                      : "-"
                    : userDetails?.company_name
                      ? userDetails?.company_name
                      : "-"}
                </p>
                <p className="text-sm font-medium capitalize text-meta-light-blue-3">
                  {session?.data?.user?.role === USER_ROLE?.EMPLOYEE &&
                    userDetails?.company_type}
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
                      {userDetails?.current_location
                        ? userDetails?.current_location === "OUT_OF_USA"
                          ? TEXT?.OUT_SIDE_USA
                          : TEXT?.USA
                        : "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      width={16}
                      height={16}
                      alt="MainLogo"
                      src={"/call.svg"}
                    />
                    <p className="text-xs text-meta-light-blue-3">
                      {userDetails?.contact_number
                        ? userDetails?.contact_number
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Image
                    width={16}
                    height={16}
                    alt="MainLogo"
                    src={"/mail.svg"}
                  />
                  <p className="text-xs text-meta-light-blue-3">
                    {session?.data?.user?.email}
                  </p>
                </div>
              </div>
              {session?.data?.user?.role !== USER_ROLE?.EMPLOYEE && (
                <div
                  onClick={() => setIsOpen(true)}
                  className="cursor-pointer text-base font-medium text-meta-blue-1"
                >
                  {TEXT?.EDIT}
                </div>
              )}
              <div>
                {isOpen && (
                  <EditDetailsDialog
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    session={session?.data}
                    userDetails={userDetails}
                    getUserDataApiCall={() => getProfileDetails()}
                  />
                )}
              </div>
            </div>
          </div>
        </div> */}

        {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
          <CompanyProfile
            session={session?.data}
            userDetails={userDetails}
            getUserDataApiCall={() => getProfileDetails()}
          />
        ) : (
          <IndividualProfile
            degreeList={degreeList}
            session={session?.data}
            userDetails={userDetails}
            collegeList={collegeList}
            languageList={languageList}
            getUserDataApiCall={() => getProfileDetails()}
          />
        )}
      </div>
    </Suspense>
  );
};
export default MyProfile;
