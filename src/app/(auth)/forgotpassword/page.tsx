'use client';
import Image from 'next/image';
import { useFormik } from 'formik';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { TEXT } from '@/service/Helper';
import Button from '@/Components/Button';
import { useRouter } from 'next/navigation';
import { API_CONSTANT } from '@/constant/ApiConstant';

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [sendMail, setSendMail] = useState(false);

  const handleForgotPassword = () => {
    const obj = {
      email: email,
    };

    API.post(API_CONSTANT.FORGOT_PASSWORD, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message ||
            'Something went wrong, please try again',
        );
      });
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')] ">
          <div className="flex justify-center">
            <div className="mb-20 w-10/12 min-w-72 max-w-md rounded-3xl border border-meta-light-blue-2 bg-white px-5 py-10 sm:px-10">
              <h3 className="mb-4 text-center text-3xl font-bold text-meta-purple-1">
                {TEXT?.FORGOT_PASSWORD}
              </h3>
              <p className="mb-10 text-center text-sm font-medium text-meta-light-blue-3">
                {TEXT?.PLEASE_SELECT_OPTION_TO_RECEIVE_PASSWORD_RESET_LINK}
              </p>

              {sendMail && (
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter email..."
                  onChange={(e) => setEmail(e?.target?.value)}
                  className="my-3 w-full rounded-lg border border-meta-light-blue-1 p-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
                />
              )}

              <div className="mb-8 flex h-28 w-full items-center justify-between rounded-xl border border-meta-blue-1 bg-white px-4 sm:h-20">
                <div className="my-3 flex max-w-80 items-center">
                  <div className="mr-3">
                    <Image
                      src={'/login/email.svg'}
                      className="max-w-10"
                      alt="mail"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-meta-blue-1">
                      {TEXT?.RESET_VIA_EMAIL}
                    </p>
                    <p className="text-xs font-normal">
                      {TEXT?.YOU_WILL_BE_PROVIDE_A_UNIQUE}
                    </p>
                  </div>
                </div>

                <div className="m-4">
                  <input
                    type="checkbox"
                    value={sendMail}
                    className="custom-checkbox"
                    onChange={(e) => {
                      if (e.target.checked === false) {
                        setEmail('');
                      }
                      setSendMail(e.target.checked);
                    }}
                  />
                </div>
              </div>

              <Button
                title={TEXT?.SEND}
                handleClick={() => handleForgotPassword()}
                disabled={email?.length !== 0 ? false : true}
                btnClass={`${email?.length === 0 && '!bg-gray-300 hover:!bg-none'}`}
              />

              {/* <button className="mb-8 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-blue-2">
                <span
                  onClick={() => handleSubmit()}
                  className="flex justify-center text-sm font-medium text-white"
                >
                  {TEXT?.SEND}
                </span>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
