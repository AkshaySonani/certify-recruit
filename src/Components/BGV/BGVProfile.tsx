'use client';
import Image from 'next/image';
import Button from '../Button';
import BGVFullReport from './BGVFullReport';
import { useState } from 'react';

const BGVProfile = () => {
  const [seeFullReport, setSeeFullReport] = useState(false);
  return seeFullReport ? (
    <BGVFullReport />
  ) : (
    <div className="mt-5 ">
      <div className="flex items-center justify-between border-b py-10">
        <div>
          <div className="flex items-center gap-4">
            <div className="mt-2">
              <Image
                width={31}
                height={31}
                alt="Preview"
                src={'/BGV/ChartIcon.svg'}
              />
            </div>
            <p className="text-2xl font-medium text-meta-purple-1">
              Company Name
            </p>
          </div>
          <div className="flex pl-14 text-base text-meta-light-blue-3">
            <p>Aug 2023 - May2024</p>
            <p>10th months</p>
          </div>
          <div className="  flex pl-14 text-base text-meta-light-blue-3">
            On site
          </div>
        </div>
        <div>
          <Button title={'Pending'} btnClass={'!w-auto !px-4 !mb-0'} />
        </div>
      </div>
      <div className="flex items-center justify-between border-b py-10">
        <div>
          <div className="flex items-center gap-4">
            <div className="mt-2">
              <Image
                width={31}
                height={31}
                alt="Preview"
                src={'/BGV/ChartIcon.svg'}
              />
            </div>
            <p className="text-2xl font-medium text-meta-purple-1">
              Company Name
            </p>
          </div>
          <div className="flex pl-14 text-base text-meta-light-blue-3">
            <p>Aug 2023 - May2024</p>
            <p>10th months</p>
          </div>
          <div className="  flex pl-14 text-base text-meta-light-blue-3">
            On site
          </div>
        </div>
        <div>
          <Button title={'Verified'} btnClass={'!w-auto !px-4 !mb-0'} />
        </div>
      </div>

      <div className="my-10 flex h-full w-full items-end justify-end">
        <Button
          title={'See full report'}
          btnClass={'!w-auto !px-8 !mb-0'}
          titleClass="!text-lg"
          handleClick={() => setSeeFullReport(true)}
        />
      </div>
    </div>
  );
};
export default BGVProfile;
