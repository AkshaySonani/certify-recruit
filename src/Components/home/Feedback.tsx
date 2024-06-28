'use client';
import Image from 'next/image';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const FEEDBACK_ARR = [
  {
    id: 1,
    user: 'Deepak Sharma',
    profile: '/home/feedBack/deepak.png',
    review: 'Appreciate the certification feature. Thanks a ton!',
  },
  {
    id: 2,
    user: 'Kavya V',
    profile: '/home/feedBack/deepak.png',
    review:
      'CertifyRecruit has simplified my recruiting. I can easily find excellent candidates from the leaderboard.',
  },
  {
    id: 3,
    user: 'Bhumi Gupta',
    profile: '/home/feedBack/deepak.png',
    review:
      'I am a regular user of Learn & Earn. Staying in the top 50 has helped me negotiate during my increment, and I am the happiest :) ',
  },
  {
    id: 4,
    user: 'Emmanuel ',
    profile: '/home/feedBack/deepak.png',
    review: 'Certification is adding good value to my CV. Thank you. ',
  },
  {
    id: 5,
    user: 'Kaveri Mehra',
    profile: '/home/feedBack/deepak.png',
    review:
      'Thanks for making us eligible for the Badge of Honour. I can proudly say my organization has the best team!',
  },
  {
    id: 6,
    user: 'Dhaval Mehta',
    profile: '/home/feedBack/deepak.png',
    review:
      'Felt amazing after getting all right answers and staying on top of leader board for 3 weeks. I enjoy coming here and improving my skills everyday. ',
  },
];
const Feedback = () => {
  return (
    <div className="mt-[100px]">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {FEEDBACK_ARR?.map((list) => {
          return (
            <div className="flex  flex-col border-meta-light-blue-2 px-[26px] py-[26px] lg:h-[300px] lg:w-[360px]">
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
                  {list?.review}
                </p>
              </div>
              <div className="mt-14 flex items-center gap-3 justify-self-end">
                <div>
                  <Image
                    alt="user"
                    width={50}
                    height={50}
                    src={'/sidebarIcon/profile.svg'}
                  />
                </div>
                <p className="text-[20px] font-medium text-meta-blue-1">
                  {list?.user}
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
