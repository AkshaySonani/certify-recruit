'use client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import Button from '@/Components/Button';
import Spinner from '@/app/icons/Spinner';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { TEXT, USER_ROLE } from '@/service/Helper';
import { API_CONSTANT } from '@/constant/ApiConstant';

var FIRST_PLAN: any;
var SECOND_PLAN: any;
var THIRD_PLAN: any;

const Page = () => {
  const router = useRouter();
  const session: any = useSession();

  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [yearlyList, setYearlyList] = useState<any>([]);
  const [monthlyList, setMonthlyList] = useState<any>([]);
  const [subscriptionPlan, setSubscriptionPlan] = useState<any>([]);

  useEffect(() => {
    getSubscriptionPlans();
  }, []);

  const getSubscriptionPlans = () => {
    setLoading(true);
    API.get(API_CONSTANT?.PRICING)
      .then((res) => {
        const year = res?.data?.data?.filter(
          (y: any) => y?.plan_type === 'Yearly',
        );
        const month = res?.data?.data?.filter(
          (m: any) => m?.plan_type === 'Monthly',
        );
        setYearlyList(year);
        setMonthlyList(month);
        setSubscriptionPlan(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.error);
      });
  };

  const makePayment = async (amount: any, planId: string) => {
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

  const ARR_LISTS =
    session?.data?.user?.role === USER_ROLE?.EMPLOYEE
      ? enabled
        ? yearlyList
        : monthlyList
      : subscriptionPlan;

  FIRST_PLAN = ARR_LISTS?.filter(
    (x: any) => x?.plan_name === 'Basic Plan' || x.plan_name === 'Daily',
  );
  SECOND_PLAN = ARR_LISTS?.filter(
    (x: any) => x?.plan_name === 'Standard Plan' || x.plan_name === 'Fortnight',
  );
  THIRD_PLAN = ARR_LISTS?.filter(
    (x: any) => x?.plan_name === 'Business Plan' || x.plan_name === 'Monthly',
  );

  return loading ? (
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
        <div className="flex h-auto min-h-[520px] w-[320px] min-w-64 max-w-96 flex-col justify-between rounded-3xl bg-meta-gray-2 pb-10">
          {FIRST_PLAN?.[0]?.is_popular && (
            <div className="rounded-t-3xl bg-meta-purple-1 py-2 text-center text-base font-medium text-white">
              {TEXT?.MOST_POPULAR}
            </div>
          )}
          <div className="px-8">
            <div className="pt-11 text-center text-base font-medium text-meta-purple-1">
              {FIRST_PLAN?.[0]?.plan_name}
            </div>

            <div className="my-5 flex items-end justify-center">
              <div className="text-4xl font-medium text-meta-purple-1">
                ₹{FIRST_PLAN?.[0]?.plan_pricing}
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

            {FIRST_PLAN?.[0]?.additional_features?.map(
              (ele: any, index: any) => (
                <div
                  key={index}
                  className="mb-3 flex items-center justify-start"
                >
                  <div>
                    <Image
                      alt="Icon"
                      width={20}
                      height={20}
                      className="min-h-5 min-w-5"
                      src={'/pricing/rightTick.svg'}
                    />
                  </div>
                  <div className="pl-4 text-sm font-normal text-meta-purple-1">
                    {ele}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="px-8">
            <Button
              title={TEXT?.GET_STARTED}
              btnClass="h-12 w-full !mb-0"
              handleClick={() =>
                makePayment(FIRST_PLAN?.[0]?.plan_pricing, FIRST_PLAN?.[0]?._id)
              }
              titleClass="flex justify-center text-sm font-medium text-white"
            />
          </div>
        </div>

        <div className="flex h-auto min-h-[520px] w-[320px] min-w-64 max-w-96 flex-col justify-between rounded-3xl bg-meta-gray-2 pb-10">
          {SECOND_PLAN?.[0]?.is_popular && (
            <div className="rounded-t-3xl bg-meta-purple-1 py-2 text-center text-base font-medium text-white">
              {TEXT?.MOST_POPULAR}
            </div>
          )}
          <div className="px-8">
            <div className="pt-11 text-center text-base font-medium text-meta-purple-1">
              {SECOND_PLAN?.[0]?.plan_name}
            </div>

            <div className="my-6 flex items-end justify-center">
              <div className="text-4xl font-medium text-meta-purple-1">
                ₹{SECOND_PLAN?.[0]?.plan_pricing}
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

            {SECOND_PLAN?.[0]?.additional_features?.map(
              (ele: any, index: any) => (
                <div
                  key={index}
                  className="mb-3 flex items-center justify-start"
                >
                  <div>
                    <Image
                      alt="Icon"
                      width={20}
                      height={20}
                      className="min-h-5 min-w-5"
                      src={'/pricing/rightTick.svg'}
                    />
                  </div>
                  <div className="pl-4 text-sm font-normal text-meta-purple-1">
                    {ele}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="px-8">
            <Button
              title={TEXT?.GET_STARTED}
              btnClass="h-12 w-full !mt-2 !mb-0"
              handleClick={() =>
                makePayment(
                  SECOND_PLAN?.[0]?.plan_pricing,
                  SECOND_PLAN?.[0]?._id,
                )
              }
              titleClass="flex justify-center text-sm font-medium text-white"
            />
          </div>
        </div>

        <div className="flex h-auto min-h-[520px] w-[320px] min-w-64 max-w-96 flex-col justify-between rounded-3xl bg-meta-gray-2 pb-10">
          {THIRD_PLAN?.[0]?.is_popular && (
            <div className="rounded-t-3xl bg-meta-purple-1 py-2 text-center text-base font-medium text-white">
              {TEXT?.MOST_POPULAR}
            </div>
          )}
          <div className="px-8">
            <div className="pt-11 text-center text-base font-medium text-meta-purple-1">
              {THIRD_PLAN?.[0]?.plan_name}
            </div>

            <div className="my-6 flex items-end justify-center">
              <div className="text-4xl font-medium text-meta-purple-1">
                ₹{THIRD_PLAN?.[0]?.plan_pricing}
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

            {THIRD_PLAN?.[0]?.additional_features?.map(
              (ele: any, index: any) => (
                <div
                  key={index}
                  className="mb-3 flex items-center justify-start"
                >
                  <div>
                    <Image
                      alt="Icon"
                      width={20}
                      height={20}
                      className="min-h-5 min-w-5"
                      src={'/pricing/rightTick.svg'}
                    />
                  </div>
                  <div className="pl-4 text-sm font-normal text-meta-purple-1">
                    {ele}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="px-8">
            <Button
              title={TEXT?.GET_STARTED}
              btnClass="h-12 w-full !mb-0"
              handleClick={() =>
                makePayment(THIRD_PLAN?.[0]?.plan_pricing, THIRD_PLAN?.[0]?._id)
              }
              titleClass="flex justify-center text-sm font-medium text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
