'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE, TEXT } from '@/service/Helper';
import { useSession } from 'next-auth/react';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { toast } from 'react-toastify';

const Page = (data: any) => {
  // const { data: session, update }: any = useSession();
  const router = useRouter();
  const [eye, setEye] = useState(false);

  // console.log('data', data?.searchParams?.token);

  // useEffect(() => {
  //   if (data?.searchParams?.token) {
  //     handleVerifyUser(data?.searchParams?.token);
  //   }
  // }, []);

  // const handleVerifyUser = (values: any) => {
  //   const obj = {
  //     token: values,
  //   };

  //   console.log('obj', obj);

  //   API.post(API_CONSTANT.VERIFY_USER, obj)
  //     .then((res) => {
  //       console.log('res----->', res?.data);
  //       if (res?.data?.status === 200) {
  //         toast.success(res?.data?.message);
  //         router.push(ROUTE?.DASHBOARD);
  //       } else {
  //         toast.error(res?.data?.message);
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.log('err', err);

  //       toast.error(
  //         err?.response?.data?.message ||
  //           'Something want wrong please try again',
  //       );
  //     });
  // };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')]">
          <div className="flex justify-center">
            <div className="min-w-72 max-w-xl rounded-3xl border border-meta-light-blue-2 p-10">
              <div className="my-4 flex h-40 justify-center">
                <Image
                  width={99.32}
                  alt="MainLogo"
                  height={159.52}
                  src={'/login/ClockMan.svg'}
                />
              </div>
              <h3 className="mb-4 text-center text-3xl font-bold text-meta-purple-1">
                {TEXT?.THANK_YOU_FOR_SIGN_UP}
              </h3>
              <p className="mb-4 text-center text-sm font-medium text-meta-light-blue-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>

              {/* <div className='flex justify-center items-center font-medium text-lg text-meta-light-blue-3'>
                                <span className='mr-2 text-meta-blue-2 cursor-pointer' onClick={() => router.push("/login")}>Go to login</span><Image src={"/LeftArrow.svg"} className='rotate-180' alt="LeftArrow" width={17} height={7} />
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
