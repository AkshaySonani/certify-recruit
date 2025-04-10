'use client';
import Image from 'next/image';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import Spinner from '@/app/icons/Spinner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AppContext from '@/context/AppProvider';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { ROUTE, TEXT, USER_ROLE } from '@/service/Helper';
import EmployeeDashboard from '@/Components/dashboard/employee';
import IndividualDashboard from '@/Components/dashboard/individual';
import CompleteProfile from '@/Components/dashboard/completeProfile';
import React, { useContext, useEffect, useRef, useState } from 'react';

const Page = (data: any) => {
  const router = useRouter();
  const { data: session, update }: any = useSession<any>();
  const context = useContext(AppContext);
  const { profileCompletionCount } = context;
  const [isSpinner, setIsSpinner] = useState(false);
  const [dashboardData, setDashBoardData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [currentProfileCount, setCurrentProfileCount] = useState(0);
  const [totalJobs, setTotalJobs] = useState({
    activeJob: 0,
    pendingJob: 0,
    hired: 0,
    allJobs: 0,
  });

  const hasVerifiedUser = useRef(false);

  useEffect(() => {
    if (data !== undefined) {
      if (data?.searchParams?.token && !hasVerifiedUser.current) {
        handleVerifyUser(data?.searchParams?.token);
        hasVerifiedUser.current = true;
      }
    }
  }, [data?.searchParams?.token]);

  const handleVerifyUser = (values: any) => {
    const obj = {
      token: values,
    };

    API.post(API_CONSTANT.VERIFY_USER, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message);
          router.push(ROUTE?.DASHBOARD);
        } else {
          if (res?.data?.status === 409) {
            router.push(ROUTE?.DASHBOARD);
          }
          toast.error(res?.data?.message);
        }
      })
      .catch((err: any) => {
        toast.error(
          err?.response?.data?.message ||
            'Something want wrong please try again',
        );
      });
  };

  useEffect(() => {
    getDashboardJob();
    getProfileDetails();
  }, []);

  const getDashboardJob = () => {
    API.get(API_CONSTANT?.DASHBOARD_JOB)
      .then((res) => {
        setDashBoardData(res?.data?.data);
        setTotalJobs({
          activeJob: res?.data?.activeJobs,
          pendingJob: res?.data?.pendingJobs,
          hired: res?.data?.hiredCandidates,
          allJobs: res?.data?.totalJobs,
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  };
  const menu = [
    { title: 'Candidates Hired', count: totalJobs?.hired },
    { title: 'Active Jobs', count: totalJobs?.activeJob },
    { title: 'Total Jobs', count: totalJobs?.allJobs },
    { title: 'Pending Jobs', count: totalJobs?.pendingJob },
  ];

  useEffect(() => {
    if (session !== undefined) {
      setIsSpinner(true);
    } else {
      if (session?.user) {
        setIsSpinner(false);
      } else {
        setIsSpinner(true);
      }
    }
  }, []);

  const getProfileDetails = () => {
    setIsSpinner(true);
    API.get(API_CONSTANT?.PROFILE)
      .then((res: any) => {
        setIsSpinner(false);
        if (
          res?.data?.extraData?.profile_count !== null &&
          res?.data?.extraData?.profile_count !== undefined &&
          res?.data?.extraData?.profile_count >= 100
        ) {
          setCurrentProfileCount(res?.data?.extraData?.profile_count);
        }
        setUserDetails(res?.data?.data);
      })
      .catch((error) => {
        setIsSpinner(false);
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };

  const handleNavigate = (val: any) => {
    if (val?.title === 'Candidates Hired') {
      router.push(ROUTE?.CANDIDATES_HIRED);
    } else if (val?.title === 'Active Jobs') {
      router.push(ROUTE?.JOB_ACTIVE);
      console.log('navigate to Active Jobs');
    } else if (val?.title === 'Total Jobs') {
      router.push(ROUTE?.JOB);
    } else {
      router.push(ROUTE?.ACTIVE_JOBS);
    }
  };

  return (
    <div>
      <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
        {TEXT?.DASHBOARD}
      </div>

      {isSpinner ? (
        <div className="flex h-full items-center justify-center">
          <Spinner
            width="32px"
            height="32px"
            color="#3751F2"
            className="spinner"
          />
        </div>
      ) : (
        <div>
          {session?.user?.role === USER_ROLE?.EMPLOYEE && (
            <div className="mt-4 flex gap-4">
              {menu?.map((item: any) => {
                return (
                  <div
                    onClick={() => handleNavigate(item)}
                    className="relative w-1/4 cursor-pointer rounded-2xl border border-meta-light-blue-1 p-5"
                  >
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-meta-light-blue-1">
                      <Image
                        alt="Icon"
                        width={19}
                        height={19}
                        src={'/sidebarIcon/jobPosting.svg'}
                      />
                    </div>
                    <p className="text-2xl font-bold text-meta-purple-1">
                      {item?.count ?? 0}
                    </p>
                    <p className="text-base font-medium text-meta-light-blue-3">
                      {item.title}
                    </p>
                    <Image
                      alt="Icon"
                      width={61}
                      height={93}
                      src={'/dashboard/MaskGroup.svg'}
                      className="absolute right-0 top-2 hidden xl:block"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {profileCompletionCount?.employee < 100 ||
          profileCompletionCount?.individual < 100 ||
          ((session?.user?.profile_count || currentProfileCount) < 100 &&
            !isSpinner) ? (
            <CompleteProfile
              userDetails={userDetails}
              currentProfileCount={currentProfileCount}
            />
          ) : session?.user?.role === USER_ROLE?.EMPLOYEE ? (
            <EmployeeDashboard
              dashboardData={dashboardData}
              setDashBoardData={setDashBoardData}
              getDashboardJob={getDashboardJob}
            />
          ) : (
            <IndividualDashboard
              dashboardData={dashboardData}
              setDashBoardData={setDashBoardData}
              userDetails={userDetails}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
