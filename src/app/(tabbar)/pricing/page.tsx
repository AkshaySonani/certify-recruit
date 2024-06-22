'use client';
import {
  TEXT,
  USER_ROLE,
  EMP_BASIC_PLAN,
  EMP_STANDARD_PLAN,
  EMP_BUSINESS_PLAN,
  INDIVIDUAL_DAILY_PLAN,
  INDIVIDUAL_MONTHLY_PLAN,
  INDIVIDUAL_FORT_NIGHT_PLAN,
} from '@/service/Helper';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import API from '@/service/ApiService';
import React, { useState } from 'react';
import Button from '@/Components/Button';
import Spinner from '@/app/icons/Spinner';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Page = () => {
  const router = useRouter();
  const session: any = useSession();

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
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}api/transaction/${transactionid}`,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}api/transaction/${transactionid}`,
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

  const FIRST_PLAN =
    session?.data?.user?.role === USER_ROLE?.EMPLOYEE
      ? EMP_BASIC_PLAN
      : INDIVIDUAL_DAILY_PLAN;
  const SECOND_PLAN =
    session?.data?.user?.role === USER_ROLE?.EMPLOYEE
      ? EMP_STANDARD_PLAN
      : INDIVIDUAL_FORT_NIGHT_PLAN;
  const THIRD_PLAN =
    session?.data?.user?.role === USER_ROLE?.EMPLOYEE
      ? EMP_BUSINESS_PLAN
      : INDIVIDUAL_MONTHLY_PLAN;

  return session?.data?.user === undefined ? (
    <div className="flex h-full items-center justify-center">
      <Spinner width="32px" height="32px" color="#3751F2" className="spinner" />
    </div>
  ) : (
    <section>
      <div className="text-center">
        <div className="text-3xl font-semibold text-meta-purple-1">
          {TEXT?.CHOOSE_YOUR_PLAN}
        </div>
      </div>

      {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
        <div className="my-14 flex items-center justify-center">
          <div className="mx-3 text-xl font-medium text-meta-purple-1">
            {TEXT?.MONTHLY}
          </div>
          <div className="mx-2">
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? 'bg-meta-light-blue-1' : 'bg-meta-gray-5'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">{TEXT?.ENABLE_NOTIFICATIONS}</span>
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
      ) : (
        <div className="mb-10 mt-3 flex items-center justify-center text-base font-semibold text-meta-blue-2 underline">
          <Link href="#">{TEXT?.ARTICLE_LINK}</Link>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-center gap-6">
        <div className="flex h-[520px] min-w-64 max-w-96 flex-col justify-between rounded-3xl bg-meta-gray-2 px-8 py-10">
          <div>
            <div className="text-center text-base font-medium text-meta-purple-1">
              {session?.data?.user?.role === USER_ROLE?.EMPLOYEE
                ? TEXT?.BASIC_PLAN
                : TEXT?.DAILY}
            </div>

            <div className="my-5 flex items-end justify-center">
              <div className="text-4xl font-medium text-meta-purple-1">
                {session?.data?.user?.role === USER_ROLE?.EMPLOYEE
                  ? '$99'
                  : '₹55'}
              </div>
              {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
                <div className="mb-1 text-xs font-medium text-meta-light-blue-3">
                  {TEXT?.Month}
                </div>
              ) : (
                ''
              )}
            </div>

            {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
              ''
            ) : (
              <div className="my-4 text-center text-lg font-normal text-meta-purple-1">
                {TEXT?.PAY_55_AND_PLAY_ONCE}
              </div>
            )}

            {FIRST_PLAN?.map((ele, index) => (
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
                  {ele?.Title}
                </div>
              </div>
            ))}
          </div>

          <Button
            title={TEXT?.GET_STARTED}
            btnClass="h-12 w-full !mb-0"
            handleClick={() => makePayment(20)}
            titleClass="flex justify-center text-sm font-medium text-white"
          />
        </div>

        <div className="min-w-64 max-w-96 rounded-3xl">
          {/* <div className="bg-meta-purple-1 py-2 text-center text-base font-medium text-white">
            {TEXT?.MOST_POPULAR}
          </div> */}
          <div className="flex h-[520px] flex-col justify-between bg-meta-gray-2 px-8 pb-10 pt-10">
            <div className="mb-4 rounded-t-lg bg-meta-purple-1 py-2 text-center text-base font-medium text-white">
              {TEXT?.MOST_POPULAR}
            </div>
            <div>
              <div className="text-center text-base font-medium text-meta-purple-1">
                {session?.data?.user?.role === USER_ROLE?.EMPLOYEE
                  ? TEXT?.STANDARD_PLAN
                  : TEXT?.FORT_NIGHT}
              </div>

              <div className="my-6 flex items-end justify-center">
                <div className="text-4xl font-medium text-meta-purple-1">
                  {session?.data?.user?.role === USER_ROLE?.EMPLOYEE
                    ? '$249'
                    : '₹750'}
                </div>
                {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
                  <div className="mb-1 text-xs font-medium text-meta-light-blue-3">
                    {TEXT?.Month}
                  </div>
                ) : (
                  ''
                )}
              </div>

              {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
                ''
              ) : (
                <div className="my-4 max-w-64 text-center text-lg font-normal text-meta-purple-1">
                  {TEXT?.PAY_750_AND_PLAY_ONCE}
                </div>
              )}

              {SECOND_PLAN?.map((ele, index) => (
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
                    {ele?.Title}
                  </div>
                </div>
              ))}

              <Button
                title={TEXT?.GET_STARTED}
                btnClass="h-12 w-full !mt-2 !mb-0"
                handleClick={() => makePayment(70)}
                titleClass="flex justify-center text-sm font-medium text-white"
              />
            </div>
          </div>
        </div>

        <div className="flex h-[520px] min-w-64 max-w-96 flex-col justify-between rounded-3xl bg-meta-gray-2 px-8 py-10">
          <div>
            <div className="text-center text-base font-medium text-meta-purple-1">
              {session?.data?.user?.role === USER_ROLE?.EMPLOYEE
                ? TEXT?.BUSINESS_PLAN
                : TEXT?.MONTHLY}
            </div>

            <div className="my-6 flex items-end justify-center">
              <div className="text-4xl font-medium text-meta-purple-1">
                {session?.data?.user?.role === USER_ROLE?.EMPLOYEE
                  ? '$499'
                  : '₹1470'}
              </div>
              {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
                <div className="mb-1 text-xs font-medium text-meta-light-blue-3">
                  {TEXT?.Month}
                </div>
              ) : (
                ''
              )}
            </div>

            {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
              ''
            ) : (
              <div className="my-4 text-center text-lg font-normal text-meta-purple-1">
                {TEXT?.PAY_1470_AND_PLAY_ONCE}
              </div>
            )}

            {THIRD_PLAN?.map((ele, index) => (
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
                  {ele?.Title}
                </div>
              </div>
            ))}
          </div>

          <Button
            title={TEXT?.GET_STARTED}
            btnClass="h-12 w-full !mb-0"
            handleClick={() => makePayment(99)}
            titleClass="flex justify-center text-sm font-medium text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
