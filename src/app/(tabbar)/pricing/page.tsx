'use client';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import sha256 from 'crypto-js/sha256';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import Spinner from '@/app/icons/Spinner';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { TEXT, USER_ROLE } from '@/service/Helper';
import { API_CONSTANT } from '@/constant/ApiConstant';
import PriceCard from '@/Components/PriceCard';

var FIRST_PLAN: any;
var SECOND_PLAN: any;
var THIRD_PLAN: any;

const Page = () => {
  const router = useRouter();
  const session: any = useSession();

  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [yearlyList, setYearlyList] = useState<any>([]);
  const [monthlyList, setMonthlyList] = useState<any>([]);
  const [subscriptionPlan, setSubscriptionPlan] = useState<any>([]);

  useEffect(() => {
    getSubscriptionPlans();
    getProfileDetails();
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

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res) => setUserDetails(res?.data?.data))
      .catch((error) => toast.error(error?.response?.data?.error));
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
          {/* <Link href="#">{TEXT?.ARTICLE_LINK}</Link> */}
        </div>
      )}

      <div className="flex flex-wrap items-end justify-center gap-6">
        <PriceCard
          makePayment={makePayment}
          userDetails={userDetails}
          plan={FIRST_PLAN?.[0] || {}}
          title={TEXT?.PAY_55_AND_PLAY_ONCE}
        />
        <PriceCard
          makePayment={makePayment}
          userDetails={userDetails}
          plan={SECOND_PLAN?.[0] || {}}
          title={TEXT?.PAY_750_AND_PLAY_ONCE}
        />
        <PriceCard
          makePayment={makePayment}
          userDetails={userDetails}
          plan={THIRD_PLAN?.[0] || {}}
          title={TEXT?.PAY_1470_AND_PLAY_ONCE}
        />
      </div>
    </section>
  );
};

export default Page;
