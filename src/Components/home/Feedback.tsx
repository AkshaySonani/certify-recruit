'use client';

import Image from 'next/image';

const FEEDBACK_ARR = [
  {
    id: 1,
    user: 'Deepak Sharma',
    profile: '/home/feedBack/deepak.png',
    review: 'Appreciate the certification feature. Thanks a ton!',
  },
  {
    id: 2,
    user: 'Deepak Sharma',
    profile: '/home/feedBack/deepak.png',
    review: 'Appreciate the certification feature. Thanks a ton!',
  },
  {
    id: 3,
    user: 'Deepak Sharma',
    profile: '/home/feedBack/deepak.png',
    review: 'Appreciate the certification feature. Thanks a ton!',
  },
  {
    id: 4,
    user: 'Deepak Sharma',
    profile: '/home/feedBack/deepak.png',
    review: 'Appreciate the certification feature. Thanks a ton!',
  },
  {
    id: 5,
    user: 'Deepak Sharma',
    profile: '/home/feedBack/deepak.png',
    review: 'Appreciate the certification feature. Thanks a ton!',
  },
  {
    id: 6,
    user: 'Deepak Sharma',
    profile: '/home/feedBack/deepak.png',
    review: 'Appreciate the certification feature. Thanks a ton!',
  },
];
const Feedback = () => {
  return (
    <div className="mt-[100px]">
      <div className="grid grid-cols-2 lg:grid-cols-3">
        {FEEDBACK_ARR?.map((list) => {
          return (
            <div className="w-[360px] border-meta-light-blue-2 px-[26px] py-[26px]">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4]?.map((item: any) => {
                  return (
                    <Image
                      alt="date"
                      width={16}
                      height={16}
                      src={'/home/fillStar.svg'}
                    />
                  );
                })}
                <Image
                  alt="date"
                  width={16}
                  height={16}
                  src={'/home/halfFillstar.svg'}
                />
                <p className="text-[12px] font-medium text-meta-light-blue-3">
                  4.5 of 5
                </p>
              </div>
              <div className="mt-8">
                <p className="text-[16px] font-medium text-meta-blue-3">
                  Appreciate the certification feature. Thanks a ton!
                </p>
              </div>
              <div className="mt-14 flex items-center gap-3">
                <div className="">
                  <Image
                    alt="date"
                    width={50}
                    height={50}
                    src={'/home/feedBack/deepak.png'}
                  />
                </div>
                <p className="text-[20px] font-medium text-meta-blue-1">
                  Deepak Sharma
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Feedback;
