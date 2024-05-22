'use client';
import ApplyJob from '@/Components/job/applyJob';
import { API_CONSTANT } from '@/constant/ApiConstant';
import API from '@/service/ApiService';
import { USER_ROLE } from '@/service/Helper';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const [jobApplyId, setJobApplyId] = useState('');
  const [jobDetails, setJobDetails] = useState<any>({});
  const list = {};
  const session = useSession<any>();
  const _onJobApply = (id: any) => {
    setJobApplyId(id);
  };

  const getJobApi = () => {
    if (params?.id) {
      API.post(API_CONSTANT?.JOB_DETAILS, {
        job_id: params?.id,
      })
        .then((res: any) => {
          setJobDetails(res?.data?.data[0]);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  };

  useEffect(() => {
    getJobApi();
  }, []);

  return (
    <>
      {jobApplyId !== '' ? (
        <ApplyJob jobApplyId={jobApplyId} setJobApplyId={setJobApplyId} />
      ) : (
        <>
          <div className="text-2xl font-semibold text-meta-purple-1">
            Job Details
          </div>
          <div className="my-3 cursor-pointer rounded-xl bg-meta-gray-2 p-3">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-meta-purple-1">
                    {jobDetails?.title}
                  </p>
                  <p className="ml-1 text-lg font-semibold text-meta-purple-1">
                    - Fresher
                  </p>
                  <p className="ml-2  text-sm font-bold text-meta-light-blue-3">
                    {moment(jobDetails?.createdAt).fromNow()}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-bold text-meta-light-blue-3">
                    {jobDetails?.company_name}
                  </p>
                  <p className="mx-1 text-sm font-bold text-meta-light-blue-3">
                    -{' '}
                    {jobDetails?.city?.length !== 0 &&
                      jobDetails?.city?.[0]?.name}
                    ,
                    {(jobDetails?.state?.length !== 0 &&
                      jobDetails?.state?.[0]?.name) ??
                      'Gujarat'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-meta-light-blue-1 bg-white p-3 ">
                  <Image
                    alt="date"
                    width={18}
                    height={18}
                    src={'/job/bookmark.svg'}
                  />
                </button>
                {session?.data?.user?.role === USER_ROLE?.INDIVIDUAL && (
                  <button
                    onClick={() => _onJobApply(jobDetails?._id)}
                    className="flex w-[140px] items-center justify-between rounded-lg border border-meta-light-blue-1 bg-white p-3"
                  >
                    <p className="text-sm font-bold text-meta-purple-1">
                      Apply Now
                    </p>
                    <Image
                      alt="date"
                      width={14}
                      height={14}
                      src={'/job/share.svg'}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Image
                  alt="date"
                  width={15}
                  height={15}
                  src={'/job/moneybag.svg'}
                />
                <p className="text-sm font-bold text-meta-blue-1">
                  {jobDetails?.salary_started ?? 0}/{' '}
                  {jobDetails?.salary_pay === 'MONTHLY' ? 'month' : 'hour'} -{' '}
                  {jobDetails?.salary_upto ?? 0}/
                  {jobDetails?.salary_pay === 'MONTHLY' ? 'month' : 'hour'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="date"
                  width={15}
                  height={15}
                  src={'/job/timepicker.svg'}
                />
                <p className="text-sm font-bold text-meta-blue-1">
                  {jobDetails?.job_types?.length !== 0 &&
                    jobDetails?.job_types?.[0]}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  alt="date"
                  width={15}
                  height={15}
                  src={'/job/datepicker.svg'}
                />
                <p className="text-sm font-bold text-meta-blue-1">
                  {jobDetails?.job_types?.length !== 0 &&
                    jobDetails?.working_schedule?.[0]}
                </p>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-base font-bold text-meta-purple-1">
                About the job
              </p>
            </div>
            <div className="mt-5 flex items-center ">
              <p className="text-base font-bold text-meta-purple-1">
                Experience:
              </p>
              <p className="pl-1 pt-1 text-sm font-medium text-meta-light-blue-3">
                3.00+ years
              </p>
            </div>
            <div className="mt-5 flex items-center ">
              <p className="text-base font-bold text-meta-purple-1">
                Schedule:
              </p>
              <p className="pl-1 pt-1 text-sm font-medium text-meta-light-blue-3">
                {jobDetails?.working_schedule?.[0]}
              </p>
            </div>
            <div className="mt-5 flex items-center ">
              <p className="text-base font-bold text-meta-purple-1">
                Employment Type:
              </p>
              <p className="pl-1 pt-1 text-sm font-medium text-meta-light-blue-3">
                {jobDetails?.job_types?.[0]}
              </p>
            </div>
            <div className="mt-5 flex items-center ">
              <p className="text-base font-bold text-meta-purple-1">
                Location:
              </p>
              <p className="pl-1 pt-1 text-sm font-medium text-meta-light-blue-3">
                {jobDetails?.city?.[0]?.name},
                {jobDetails?.state?.[0]?.name ?? 'Gujarat'}
              </p>
            </div>
            <div className="mt-5 ">
              <p className="text-base font-bold text-meta-purple-1">
                Important Notes:
              </p>
              <div className="mt-5 text-sm text-meta-light-blue-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: jobDetails?.description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
