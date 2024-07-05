'use client';
import Image from 'next/image';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import Spinner from '@/app/icons/Spinner';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AppContext from '@/context/AppProvider';
import { TEXT, USER_ROLE } from '@/service/Helper';
import { API_CONSTANT } from '@/constant/ApiConstant';
import React, { useContext, useEffect, useState } from 'react';
import EmployeeDashboard from '@/Components/dashboard/employee';
import IndividualDashboard from '@/Components/dashboard/individual';
import CompleteProfile from '@/Components/dashboard/completeProfile';

const Page = () => {
  const router = useRouter();
  const { data: session, update }: any = useSession<any>();
  const context = useContext(AppContext);
  const [isSpinner, setIsSpinner] = useState(false);
  const [dashboardData, setDashBoardData] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [totalJobs, setTotalJobs] = useState({
    activeJob: 0,
    pendingJob: 0,
    hired: 0,
    allJobs: 0,
  });

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
    if (session?.user) {
      setIsSpinner(false);
    } else {
      setIsSpinner(true);
    }
  }, [session?.user]);

  // let percentage = 0;
  // if (session?.user?.role === USER_ROLE?.EMPLOYEE) {
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
  //     context?.userProfileCount?.bank_details +
  //     context?.userProfileCount?.summary_details;
  // }

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res: any) => {
        setUserDetails(res?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };

  console.log('session', session);

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
                  <div className="relative w-1/4 cursor-pointer rounded-2xl border border-meta-light-blue-1 p-5">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-meta-light-blue-1">
                      <Image
                        alt="Icon"
                        width={19}
                        height={19}
                        src={'/sidebarIcon/jobPosting.svg'}
                      />
                    </div>
                    <p className="text-2xl font-bold text-meta-purple-1">
                      {item?.count}
                    </p>
                    <p className="text-base font-medium text-meta-light-blue-3">
                      {item.title}
                    </p>
                    <Image
                      alt="Icon"
                      width={61}
                      height={93}
                      src={'/dashboard/MaskGroup.svg'}
                      className="absolute right-0 top-6"
                    />
                  </div>
                );
              })}
            </div>
          )}
          {session?.user?.profile_count < 100 && !isSpinner ? (
            <CompleteProfile />
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
