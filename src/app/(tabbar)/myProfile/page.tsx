'use client';
import Image from 'next/image';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import Loader from '@/Components/Loader';
import Spinner from '@/app/icons/Spinner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AppContext from '@/context/AppProvider';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { ROUTE, TEXT, USER_ROLE } from '@/service/Helper';
import CompanyProfile from '@/Components/profile/CompanyProfile';
import { Suspense, useContext, useEffect, useState } from 'react';
import EditDetailsDialog from '@/Components/profile/EditDetailsDialog';
import IndividualProfile from '@/Components/profile/IndividualProfile';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const MyProfile = () => {
  const router = useRouter();
  const session = useSession() as any;
  const context = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [degreeList, setDegreeList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [userDetails, setUserDetails] = useState<any>({});

  const { profileCompletionCount } = context;

  useEffect(() => {
    console.log('profileCompletionCount', profileCompletionCount);
    if (
      profileCompletionCount?.employee === 100 ||
      profileCompletionCount?.individual === 100
    ) {
      UpdateTokenApi(
        profileCompletionCount?.employee || profileCompletionCount?.individual,
      );
    }
  }, [profileCompletionCount]);

  const UpdateTokenApi = (count: any) => {
    API.post(API_CONSTANT?.UPDATE_TOKEN, { count: count })
      .then((res) => {
        console.log('res----->', res);
        if (res?.status === 200) {
          router.push(ROUTE?.DASHBOARD);
        }
      })
      .catch((error) => {
        console.log('error----->', error);
        toast.error(error || 'Something want wrong');
      });
  };

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
        toast.error(error?.response?.data?.error);
      });
  };

  const getCollegeList = () => {
    API.get(API_CONSTANT?.COLLEGE)
      .then((res) => {
        setCollegeList(res?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  };

  const getLanguageList = () => {
    API.get(API_CONSTANT?.LANGUAGE)
      .then((res) => {
        setLanguageList(res?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  };

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res) => {
        setUserDetails(res?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  };

  // let percentage = 0;
  // if (session?.data?.user?.role === USER_ROLE?.EMPLOYEE) {
  //   percentage =
  //     context?.userProfileCount?.basic_details +
  //     context?.userProfileCount?.company_details +
  //     context?.userProfileCount?.kyc_details;
  // } else {
  //   percentage =
  //     context?.userProfileCount?.career_details +
  //     context?.userProfileCount?.education_details +
  //     context?.userProfileCount?.personal_details +
  //     context?.userProfileCount?.resume_details +
  //     context?.userProfileCount?.skill_details +
  //     context?.userProfileCount?.summary_details +
  //     context?.userProfileCount?.bank_details;
  // }

  console.log('-=-=-=session', session);

  return (
    <Suspense fallback={<Loader />}>
      {userDetails && Object.keys(userDetails)?.length === 0 ? (
        <Spinner
          width="32px"
          height="32px"
          color="#3751F2"
          className="spinner"
        />
      ) : (
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
              {session?.data?.user?.role === USER_ROLE.INDIVIDUAL ? (
                <button className="w-32 rounded-lg bg-hiring-btn-gradient py-3 text-sm font-semibold text-white">
                  Open to
                </button>
              ) : isEdit === true ? (
                <button
                  className="w-32 rounded-lg bg-hiring-btn-gradient py-3 text-sm font-semibold text-white"
                  onClick={() => router?.push(ROUTE?.SEARCH_CVS)}
                >
                  {TEXT?.Hiring}
                </button>
              ) : (
                <button
                  className="text-base font-medium text-meta-blue-1"
                  onClick={() => setIsEdit(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {(session?.data?.user?.role === USER_ROLE.INDIVIDUAL ||
            isEdit ||
            session !== 100) && (
            <div className="mt-4 w-full rounded-2xl bg-meta-light-blue-2 p-10">
              <div className="flex w-full items-center gap-8">
                <div className="flex flex-col justify-center">
                  <div className="relative h-24 w-24">
                    <Image
                      width={73}
                      height={73}
                      alt="avatar"
                      src={'/sidebarIcon/profile.svg'}
                      className="absolute right-[6px] top-[6px] h-[84px] w-[84px] rounded-full p-0.5"
                    />
                    <CircularProgressbar
                      className="h-max w-max"
                      value={
                        session?.data?.user?.role === USER_ROLE?.EMPLOYEE
                          ? profileCompletionCount?.employee ||
                            session?.data?.user?.profile_count
                          : profileCompletionCount?.individual ||
                            session?.data?.user?.profile_count
                      }
                      styles={buildStyles({
                        pathColor: '#34A853',
                        strokeLinecap: 'butt',
                        trailColor: '#d6d6d6',
                        pathTransitionDuration: 0.5,
                      })}
                    />
                  </div>
                  <div className="w-full text-center">
                    <p className="mt-1 text-base font-normal text-meta-green-1">
                      {session?.data?.user?.role === USER_ROLE?.EMPLOYEE
                        ? profileCompletionCount?.employee ||
                          session?.data?.user?.profile_count
                        : profileCompletionCount?.individual ||
                          session?.data?.user?.profile_count}
                      %
                    </p>
                  </div>
                </div>
                <div className="flex w-full gap-8">
                  <div className="w-11/12">
                    <p className="text-xl font-semibold capitalize text-meta-purple-1">
                      {session?.data?.user?.role !== USER_ROLE?.EMPLOYEE
                        ? userDetails?.user_name
                          ? userDetails?.user_name
                          : '-'
                        : userDetails?.company_name
                          ? userDetails?.company_name
                          : '-'}
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
                          src={'/location.svg'}
                        />
                        <p className="text-xs text-meta-light-blue-3">
                          {userDetails?.current_location
                            ? userDetails?.current_location === 'OUT_OF_USA'
                              ? TEXT?.OUT_SIDE_USA
                              : TEXT?.USA
                            : '-'}
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
                          {userDetails?.contact_number
                            ? userDetails?.contact_number
                            : '-'}
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
            </div>
          )}

          {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
            <CompanyProfile
              session={session?.data}
              userDetails={userDetails}
              getUserDataApiCall={() => getProfileDetails()}
              percentage={session?.data?.user?.profile_count}
              isEdit={isEdit}
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
      )}
    </Suspense>
  );
};
export default MyProfile;
