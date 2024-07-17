'use client';
import Image from 'next/image';
import Button from '../Button';
import { useState } from 'react';
import AddBGVExperience from './AddBGVExperience';

const IndividualBGV = () => {
  const [addExperience, setAddExperience] = useState(false);
  return (
    <div>
      <div className="mb-4 text-2xl font-semibold text-meta-purple-1">BGV</div>
      <div className="h-32 w-full rounded-2xl bg-meta-purple-1 px-6 pt-9">
        <div className=" flex items-center gap-3">
          <p className="text-lg font-medium text-white">Lynn Tanner</p>
          <Image
            alt="search"
            width={13}
            height={13}
            src={'/BGV/Subtract.svg'}
          />
        </div>
        <p className="pt-3 text-sm font-medium text-white">
          *Certification validation is 1 year only
        </p>
      </div>

      {!addExperience ? (
        <>
          <div className="mt-8">
            <p className="mt-5 text-xl font-bold text-meta-purple-1">
              What is the process for BGV and how is it done?{' '}
            </p>
            <div className="pt-3">
              <p className="text-lg font-medium text-meta-light-blue-3">
                The background verification process encompasses checking the
                credibility of the candidate's past employment details, their
                educational qualifications, if there are any ongoing or past
                court cases against the candidate - with the idea of hiring the
                right candidate for the job.
              </p>
              <p className="pt-5 text-lg font-medium text-meta-light-blue-3">
                With the changing work environment and new data protection laws,
                companies cannot afford even a minor glitch in the resume. One
                wrong candidate is hired, and the company's market reputation
                earned over the years goes for a toss. A few easy steps of
                background verification can bring about a profitable change in
                companies.
              </p>
              <p className="pt-5 text-lg font-medium text-meta-light-blue-3">
                Similarly in case of candidates, it is important to check
                whether the companies they are applying for are genuine and
                passing the BGV check or not.
              </p>
              <p className="pt-5 text-lg font-medium text-meta-light-blue-3">
                At CertifyRecruit, we power your background screening process
                with real-time verification capabilities. Our combination of
                digital, database, and human-assisted checks yields accurate
                screening results 10X faster.
              </p>
            </div>
          </div>
          <div className="m-auto mt-10 w-[70%] rounded-3xl bg-meta-gray-4 px-16 py-6">
            <p className="text-center text-lg font-medium text-meta-purple-1">
              Get our premium plan to have your BGV cleared and gain access to
              background-verified companies. You will also appear at the top
              when companies search for candidates.
            </p>
            <div className="mt-4 flex w-full justify-center">
              <Button
                title={'Appear on Top'}
                btnClass="!w-auto px-7 !mb-0"
                handleClick={() => setAddExperience(true)}
              />
            </div>
          </div>
        </>
      ) : (
        <AddBGVExperience />
      )}
    </div>
  );
};
export default IndividualBGV;
