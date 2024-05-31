'use client';
import { TEXT } from '@/service/Helper';
import Image from 'next/image';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

const BGVFullReport = () => {
  return (
    <div>
      <div className="mt-4 w-full rounded-2xl bg-meta-light-blue-2 p-10">
        <div className="flex w-full items-center gap-8">
          <div className="relative h-24 w-24">
            <Image
              width={73}
              height={73}
              alt="avatar"
              src={'/sidebarIcon/profile.svg'}
              className="absolute right-[6px] top-[5px] rounded-full p-0.5"
            />
            <CircularProgressbar
              value={25}
              styles={buildStyles({
                pathColor: '#34A853',
                strokeLinecap: 'butt',
                trailColor: '#d6d6d6',
                pathTransitionDuration: 0.5,
              })}
            />
          </div>
          <div className="flex w-full gap-8">
            <div className="w-11/12">
              <div className="flex gap-3">
                <p className="text-2xl font-bold capitalize text-meta-purple-1">
                  Tiya
                </p>
                <Image
                  alt="search"
                  width={13}
                  height={13}
                  src={'/BGV/SubtractBlue.svg'}
                />
              </div>

              <p className="text-sm font-medium capitalize text-meta-light-blue-3">
                sd
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
                    {TEXT?.OUT_SIDE_USA}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    width={16}
                    height={16}
                    alt="MainLogo"
                    src={'/call.svg'}
                  />
                  <p className="text-xs text-meta-light-blue-3">23344-4565</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Image
                  width={16}
                  height={16}
                  alt="MainLogo"
                  src={'/mail.svg'}
                />
                <p className="text-xs text-meta-light-blue-3">Tiya@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-base font-bold text-meta-purple-1">Summery</p>
          <p className="mt-2 text-sm font-medium text-meta-light-blue-3">
            Tell recruiters what you know or what you are known for e.g. Direct
            Marketing, Oracle, Java etc. We will send you job recommendations
            based on these skills. each skill is separated by a comma.
          </p>
        </div>
        <div className="mt-8">
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
          <div className="  mt-1 w-full pl-14">
            <p className="text-base text-meta-light-blue-3">onsite</p>
            <textarea
              placeholder="Description"
              rows={3}
              className="bg-meta-gray-5 mt-2 w-full rounded-sm px-4 py-3 focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
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
          <div className="  mt-1 w-full pl-14">
            <p className="text-base text-meta-light-blue-3">onsite</p>
            <textarea
              placeholder="Description"
              rows={3}
              className="bg-meta-gray-5 mt-2 w-full rounded-sm px-4 py-3 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default BGVFullReport;
