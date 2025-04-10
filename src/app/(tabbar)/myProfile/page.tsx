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
import { Icons } from '@/svg';
import { useDropzone } from 'react-dropzone';
import Loading from '@/Components/Loading';
import Button from '@/Components/Button';

const MyProfile = () => {
  const router = useRouter();
  const session = useSession() as any;
  const context = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [degreeList, setDegreeList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [currentPlan, setCurrentPlan] = useState<any>([]);
  const [userDetails, setUserDetails] = useState<any>({});
  const [allowNextScreen, setAllowNextScreen] = useState(false);

  const { profileCompletionCount } = context;

  const profileCompletionPer =
    session?.data?.user?.role === USER_ROLE?.EMPLOYEE
      ? profileCompletionCount?.employee || session?.data?.user?.profile_count
      : profileCompletionCount?.individual ||
        session?.data?.user?.profile_count;

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: (acceptedFiles: any) => {
      UploadFileOnBucket(acceptedFiles);
      // setFiles(acceptedFiles);
      // setFileName(acceptedFiles[0]?.name?.split('.')[0]);
      // UploadFileOnBucket(acceptedFiles[0]);
    },
  });

  const UploadFileOnBucket = async (file: any) => {
    setLoading(true);
    const NewFormData = new FormData();
    NewFormData.append('file', file[0]);
    NewFormData.append('location', 'user_image');
    API.post(API_CONSTANT?.UPLOAD_FILE, NewFormData)
      .then((res) => {
        if (res?.data?.success) {
          API.post(API_CONSTANT?.PROFILE, {
            logo: res?.data?.fileName,
          })
            .then((res) => {
              setLoading(false);
              if (res?.data?.status === 200) {
                setUserDetails({ ...userDetails, logo: res?.data?.data?.logo });
                toast?.success(res?.data?.message);
              }
            })
            .catch((error) => {
              setLoading(false);
              toast.error(
                error?.response?.data?.message || 'Internal server error',
              );
            });
        } else {
          setLoading(false);
          toast.error(
            res?.data?.error?.message ||
              res?.data?.error?.name ||
              'Your Profile photo not upload please try again',
          );
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  useEffect(() => {
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
        if (res?.status === 200) {
          // router.push(ROUTE?.DASHBOARD);
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  useEffect(() => {
    if (userDetails) {
      getPlanList();
    }
  }, [userDetails]);

  useEffect(() => {
    getPlanList();
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

  const getPlanList = () => {
    API.get(API_CONSTANT?.PRICING)
      .then((res) => {
        setCurrentPlan(
          res?.data?.data?.filter(
            (x: any) =>
              x?._id === userDetails?.user_ref_id?.subscription?.plan_id,
          ),
        );
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  };

  return (
    <Suspense>
      <Loading loading={loading} />
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
                  <div className="group relative h-24 w-24">
                    <Image
                      width={73}
                      height={73}
                      alt="userProfile"
                      src={
                        userDetails?.logo !== ''
                          ? userDetails?.logo
                          : '/profile/placeholder.jpg'
                      }
                      className="absolute right-[6px] top-[6px] h-[84px] w-[84px] rounded-full object-cover p-0.5"
                    />

                    <CircularProgressbar
                      className="h-max w-max"
                      value={profileCompletionPer}
                      styles={buildStyles({
                        pathColor: '#34A853',
                        strokeLinecap: 'butt',
                        trailColor: '#d6d6d6',
                        pathTransitionDuration: 0.5,
                      })}
                    />
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} multiple={false} />
                      <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Icons.EditPicture />
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-center">
                    <p className="mt-1 text-base font-normal text-meta-green-1">
                      {profileCompletionPer}%
                    </p>
                  </div>
                </div>
                <div className="flex w-full gap-8">
                  <div className="w-11/12">
                    <p className="text-xl font-semibold capitalize text-meta-purple-1">
                      {(session?.data?.user?.role !== USER_ROLE?.EMPLOYEE
                        ? userDetails?.user_name
                        : userDetails?.company_name) || '-'}
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
                          {session?.data?.user?.role === USER_ROLE?.EMPLOYEE
                            ? userDetails?.city?.name
                              ? userDetails?.city?.name
                              : '-'
                            : userDetails?.current_location
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
                          {userDetails?.contact_number || '-'}
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

          {/* Show active plan data on the pricing page */}
          {!allowNextScreen && profileCompletionPer === 100 && (
            <div>
              {currentPlan?.length !== 0 &&
              (userDetails?.user_ref_id?.subscription ||
                userDetails?.user_ref_id?.subscription?.plan_id) ? (
                <div className="mt-4 rounded-2xl bg-meta-light-blue-2 p-10">
                  <h2 className="mb-3 text-2xl font-bold text-gray-800">
                    Active plan - {currentPlan?.[0]?.plan_name}
                  </h2>

                  <p className="mb-2 text-gray-600">
                    <strong>Type:</strong> {currentPlan?.[0]?.plan_type}
                  </p>
                  <p className="mb-4 text-gray-600">
                    <strong>Status:</strong>{' '}
                    {currentPlan?.[0]?.is_Active ? 'Active' : 'Inactive'}
                  </p>

                  <div className="mb-4 text-gray-600">
                    <p>
                      <strong>You can post:</strong>{' '}
                      {currentPlan?.[0]?.max_posts} Jobs
                    </p>
                    <p>
                      <strong>You can search:</strong> Upto{' '}
                      {currentPlan?.[0]?.max_searches} Applicants
                    </p>
                    <p>
                      <strong>Badge of Honour:</strong> Not included
                    </p>
                    <p>
                      <strong>You can search:</strong> Upto{' '}
                      {currentPlan?.[0]?.max_BGV_searches} BGV
                    </p>
                    <p>
                      <strong>You can have:</strong> Upto{' '}
                      {currentPlan?.[0]?.max_applicant} Applicants allowed
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center justify-center rounded-2xl bg-meta-light-blue-2 p-10">
                  <h2 className="text-xl font-semibold text-meta-purple-1">
                    You Don't have any active plan
                  </h2>
                  <p
                    onClick={() =>
                      (!userDetails?.user_ref_id?.subscription ||
                        !userDetails?.user_ref_id?.subscription?.plan_id) &&
                      router.push(ROUTE?.PRICING)
                    }
                    className={`${
                      !userDetails?.user_ref_id?.subscription ||
                      !userDetails?.user_ref_id?.subscription?.plan_id
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    } mt-2 text-sm font-medium text-meta-blue-2 md:text-base`}
                  >
                    {TEXT?.GO_TO_PRICING}
                    <span className="ml-2 text-sm font-bold md:text-base">
                      &#8594;
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}

          {!allowNextScreen && (
            <div className="mt-8 flex w-full justify-end">
              <Button
                type="button"
                title={TEXT?.EDIT_PROFILE}
                titleClass="!text-base !text-white"
                handleClick={() => setAllowNextScreen(true)}
                btnClass={`${
                  userDetails?.user_ref_id?.subscription ||
                  userDetails?.user_ref_id?.subscription?.plan_id
                    ? '!cursor-pointer'
                    : '!cursor-not-allowed'
                } !w-36 !rounded-lg !bg-meta-blue-1 !py-2`}
              />
            </div>
          )}

          {session?.data?.user?.role === USER_ROLE?.EMPLOYEE
            ? allowNextScreen === true && (
                <CompanyProfile
                  session={session?.data}
                  userDetails={userDetails}
                  getUserDataApiCall={() => getProfileDetails()}
                  percentage={
                    session?.data?.user?.profile_count <
                    profileCompletionCount?.employee
                      ? profileCompletionCount?.employee
                      : session?.data?.user?.profile_count
                  }
                  isEdit={isEdit}
                />
              )
            : allowNextScreen === true && (
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
