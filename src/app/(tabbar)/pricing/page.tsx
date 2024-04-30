'use client';
import axios from 'axios';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import React, { useState } from 'react';
import { TEXT } from '@/service/Helper';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Page = () => {
  const router = useRouter();
  const session = useSession();

  const [enabled, setEnabled] = useState(false);

  const makePayment = async (amount: any) => {
    const transactionid =
      session?.data?.user?._id + '-' + uuidv4().toString().slice(-6);

    const payload = {
      amount: amount * 100,
      redirectMode: 'POST',
      merchantTransactionId: transactionid,
      paymentInstrument: { type: 'PAY_PAGE' },
      merchantId: process.env.NEXT_PUBLIC_MERCHANT_ID,
      redirectUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/api/status/${transactionid}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/api/status/${transactionid}`,
    };

    const dataBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');

    const fullURL =
      dataBase64 + '/pg/v1/pay' + process.env.NEXT_PUBLIC_SALT_KEY;

    const checksum =
      sha256(fullURL) + '###' + process.env.NEXT_PUBLIC_SALT_INDEX;

    const response = await axios.post(
      'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
      { request: dataBase64 },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        },
      },
    );

    const redirect = response.data.data.instrumentResponse.redirectInfo.url;
    router.replace(redirect);
  };

  return (
    <section>
      <div className="text-center">
        <div className="text-3xl font-semibold text-meta-purple-1">
          {TEXT?.CHOOSE_YOUR_PLAN}
        </div>
        <div className="mt-2 text-base font-medium text-meta-light-blue-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </div>
      </div>
      <div className="my-14 flex items-center justify-center">
        <div className="mx-3 text-xl font-medium text-meta-purple-1">
          {TEXT?.MONTHLY}
        </div>
        <div className="mx-2">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? 'bg-gray-100' : 'bg-green-100'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-blue-600 transition`}
            />
          </Switch>
        </div>
        <div className="mx-2 text-xl font-medium text-meta-light-blue-3">
          {TEXT?.YEARLY}
        </div>
        <div className="text-sm font-medium text-meta-blue-1">20%off</div>
      </div>

      <div className="flex flex-wrap items-end justify-center gap-6">
        <div className="flex h-[520px] min-w-64 max-w-96 flex-col justify-between rounded-3xl bg-meta-gray-2 px-8 py-10">
          <div>
            <div className="text-center text-base font-medium text-meta-purple-1">
              {TEXT?.BASIC_PLAN}
            </div>

            <div className="my-6 flex items-end justify-center">
              <div className="text-4xl font-medium text-meta-purple-1">$20</div>
              <div className="mb-1 text-xs font-medium text-meta-light-blue-3">
                {TEXT?.Month}
              </div>
            </div>

            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="mb-3 flex items-center justify-start">
                <div className="mr-4">
                  <Image
                    alt="Icon"
                    width={20}
                    height={20}
                    src={'/pricing/rightTick.svg'}
                  />
                </div>
                <div className="text-sm font-normal text-meta-purple-1">
                  Lorem Ipsum is simply dummy
                </div>
              </div>
            ))}
          </div>

          <div onClick={() => makePayment(20)}>
            <button className="h-12 w-full rounded-xl bg-meta-blue-2">
              <span className="flex justify-center text-sm font-medium text-white">
                {TEXT?.GET_STARTED}
              </span>
            </button>
          </div>
        </div>

        <div className="min-w-64 max-w-96 rounded-3xl">
          <div className="bg-meta-purple-1 py-2 text-center text-base font-medium text-white">
            {TEXT?.MOST_POPULAR}
          </div>
          <div className="flex h-[520px] flex-col justify-between bg-meta-gray-2 px-8 pb-10 pt-10">
            <div>
              <div className="text-center text-base font-medium text-meta-purple-1">
                {TEXT?.STANDARD_PLAN}
              </div>

              <div className="my-6 flex items-end justify-center">
                <div className="text-4xl font-medium text-meta-purple-1">
                  $70
                </div>
                <div className="mb-1 text-xs font-medium text-meta-light-blue-3">
                  {TEXT?.Month}
                </div>
              </div>

              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="mb-3 flex items-center justify-start"
                >
                  <div className="mr-4">
                    <Image
                      alt="Icon"
                      width={20}
                      height={20}
                      src={'/pricing/rightTick.svg'}
                    />
                  </div>
                  <div className="text-sm font-normal text-meta-purple-1">
                    Lorem Ipsum is simply dummy
                  </div>
                </div>
              ))}
            </div>

            <div onClick={() => makePayment(70)}>
              <button className="h-12 w-full rounded-xl bg-meta-blue-2">
                <span className="flex justify-center text-sm font-medium text-white">
                  {TEXT?.GET_STARTED}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[520px] min-w-64 max-w-96 flex-col justify-between rounded-3xl bg-meta-gray-2 px-8 py-10">
          <div>
            <div className="text-center text-base font-medium text-meta-purple-1">
              {TEXT?.BUSINESS_PLAN}
            </div>

            <div className="my-6 flex items-end justify-center">
              <div className="text-4xl font-medium text-meta-purple-1">$99</div>
              <div className="mb-1 text-xs font-medium text-meta-light-blue-3">
                {TEXT?.Month}
              </div>
            </div>

            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="mb-3 flex items-center justify-start">
                <div className="mr-4">
                  <Image
                    alt="Icon"
                    width={20}
                    height={20}
                    src={'/pricing/rightTick.svg'}
                  />
                </div>
                <div className="text-sm font-normal text-meta-purple-1">
                  Lorem Ipsum is simply dummy
                </div>
              </div>
            ))}
          </div>

          <div onClick={() => makePayment(99)}>
            <button className="h-12 w-full rounded-xl bg-meta-blue-2">
              <span className="flex justify-center text-sm font-medium text-white">
                {TEXT?.GET_STARTED}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
