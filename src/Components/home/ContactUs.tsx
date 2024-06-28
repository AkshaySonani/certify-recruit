'use client';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <div className="mx-auto my-[150px] h-full px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8 ">
      <div data-aos="fade-right" data-aos-easing="ease-in-sine">
        <p className="text-lg font-semibold text-meta-light-blue-3">
          CONTACT US
        </p>
        <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
          Our friendly team is all ears
        </p>
      </div>
      <div className="mt-[80px] flex justify-between">
        <div>
          <p className="max-w-[525px] text-lg font-medium text-meta-light-blue-3">
            Feel free to send us a message or give us a call, and we'll get back
            to you as soon as we can. Helping you succeed is what matters most
            to us, and we're here to provide you with the best recruitment
            assessment solutions.
          </p>

          <div className="mt-[60px]">
            <div className="flex items-center">
              <Image
                alt="date"
                width={50}
                height={50}
                src={'/landing/call.png'}
              />
              <p className="pl-[16px] text-lg font-medium text-meta-purple-1">
                +91 9157350298
              </p>
            </div>
            <div className="mt-[40px] flex items-center">
              <Image
                alt="date"
                width={50}
                height={50}
                src={'/landing/email.png'}
              />
              <p className="pl-[16px] text-lg font-medium text-meta-purple-1">
                Info@Certifyrecruit.Com
              </p>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 items-end justify-end rounded-[30px] bg-meta-gray-2 lg:flex">
          <div>
            <Image
              alt="date"
              width={250}
              height={190}
              src={'/landing/contactbanner.png'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
