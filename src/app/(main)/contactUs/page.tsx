'use client';
import Image from 'next/image';
const Page = () => {
  return (
    <div>
      <div className="h-auto bg-meta-gray-2">
        <div className="mx-auto h-full px-4 pb-[75px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
          <div className=" w-full">
            <div className="relative flex flex-col items-center justify-center">
              <p className=" text-center text-[30px] font-bold leading-[60px] text-meta-blue-1 ">
                CONTACT US
              </p>
              <p className="w-full max-w-[484px] pt-3 text-center text-[30px] font-bold leading-[60px] text-meta-purple-1 sm:text-[50px]">
                We'd Love to Hear from You
              </p>
              <div className="absolute left-[66px] top-[-72px] hidden lg:block">
                <Image
                  alt="date"
                  width={37}
                  height={37}
                  src={'/landing/ball.png'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-full px-4 pb-[75px]  sm:max-w-xl  md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <div className="flex gap-3">
          <div className="border-1 h-[200px] w-[380px] rounded-[20px] border-meta-light-blue-1 bg-meta-light-blue-5 py-[30px]">
            <div className="flex justify-center">
              <Image
                alt="date"
                width={46}
                height={62}
                src={'/contactUs/location.svg'}
              />
            </div>
            <p className="py-2 text-center text-lg font-medium text-meta-purple-1">
              Address
            </p>
            <p className="px-[55px] text-center text-base font-medium text-meta-light-blue-3">
              413, Tulsi Arcade, Near Sudama Chowk, Digital Valley (Mota
              Varachha), Surat.
            </p>
          </div>
          <div className="border-1 h-[200px] w-[380px] rounded-[20px] border-meta-light-blue-1 bg-meta-light-blue-5 py-[30px]">
            <div className="flex justify-center ">
              <Image
                alt="date"
                width={62}
                height={62}
                src={'/contactUs/call.png'}
              />
            </div>
            <p className="py-2 text-center text-lg font-medium text-meta-purple-1">
              Contact
            </p>
            <p className="px-[55px] text-center text-base font-medium text-meta-light-blue-3">
              +91 9157350298
            </p>
          </div>
          <div className="border-1 h-[200px] w-[380px] rounded-[20px] border-meta-light-blue-1 bg-meta-light-blue-5 py-[30px]">
            <div className="flex justify-center">
              <Image
                alt="date"
                width={56}
                height={48}
                src={'/contactUs/email.svg'}
              />
            </div>
            <p className="py-2 text-center text-lg font-medium text-meta-purple-1">
              Email
            </p>
            <p className="px-[40px] text-center text-base font-medium text-meta-light-blue-3">
              Info@Certifyrecruit.Com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
