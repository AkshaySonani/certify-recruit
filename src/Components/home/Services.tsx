'use client';
import Image from 'next/image';
import Button from '../Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
const ServiceARR = [
  {
    id: 1,
    title: 'Individual Certification',
    optionText: '',
    content: 'Certification based on your skills.',
  },
  {
    id: 2,
    title: 'Learn & Earn',
    optionText: '( Improve your knowledge & skills )',
    content:
      'As exciting as it sounds, your knowledge and wit can earn you money! If you re better than the rest, you earn the most!',
  },
  {
    id: 3,
    title: 'Apply for a Job',
    optionText: '',
    content: 'Better opportunities might be awaiting you. Apply today!',
  },
  {
    id: 4,
    title: 'Badge of Honour',
    optionText: '( Company certification )',
    content:
      'A badge that can enhance your brand reputation in the corporate industry.',
  },
  {
    id: 5,
    title: 'Individual Certification ',
    optionText: '',
    content:
      'Where knowledge earns you rankings that earn you brownie points. You can negotiate more from your employers when you achieve top rankings by competing with others.',
  },
  {
    id: 6,
    title: 'Employer Resources',
    optionText: '',
    content: 'Discover the ideal candidate for your precise requirements.',
  },
];

const Services = () => {
  const router = useRouter();
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <div className="mt-36">
      <div data-aos="fade-right" data-aos-easing="ease-in-sine">
        <p className="text-lg font-semibold text-meta-light-blue-3">
          Here's What CertifyRecruit can do for you.
        </p>
        <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
          Our Services
        </p>
      </div>
      <div className="mt-12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ServiceARR?.map((list) => {
            return (
              <motion.div whileHover={{ scale: 0.9 }} whileTap={{ scale: 0.9 }}>
                <div className="relative h-[285px] rounded-[12px] bg-meta-gray-2 p-[20px] lg:w-[350px] xl:w-[400px]">
                  <div className="flex flex-col ">
                    <div className="h-[186px]">
                      <Image
                        alt="date"
                        width={40}
                        height={40}
                        src={'/landing/serviceicon.png'}
                      />
                      <div className="mt-[10px]  text-lg font-bold text-meta-blue-1">
                        {list?.title}
                      </div>
                      <div className="text-lg font-bold text-meta-light-blue-3">
                        {list?.optionText}
                      </div>
                      <div className=" max-w-[299px] pt-[10px] text-sm text-meta-light-blue-3 ">
                        {list?.content}
                      </div>
                    </div>
                    <div className="">
                      <Button
                        type={'button'}
                        title={'Contact Us'}
                        handleClick={() => router?.push('/contactUs')}
                        btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1 !mb-0"
                        titleClass="flex justify-center w-[110px] text-base  font-medium text-white"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-2 right-0">
                    <Image
                      alt="date"
                      width={125}
                      height={135}
                      src={'/landing/servicebanner.png'}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Services;
