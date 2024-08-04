'use client';
import React from 'react';
import Button from './Button';
import { TEXT, USER_ROLE } from '@/service/Helper';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { toast } from 'react-toastify';

function PriceCard({ plan, makePayment, title, userDetails }: any) {
  const session = useSession();
  return (
    <div
      className={
        'flex h-auto min-h-[520px] w-[320px] min-w-64 max-w-96 flex-col justify-between rounded-3xl bg-meta-gray-2 pb-10' +
        (plan?._id === userDetails?.user_ref_id?.subscription?.plan_id
          ? ' border-2 border-meta-blue-2 '
          : '')
      }
    >
      {plan?.is_popular && (
        <div className="rounded-t-3xl bg-meta-purple-1 py-2 text-center text-base font-medium text-white">
          {TEXT?.MOST_POPULAR}
        </div>
      )}
      <div className="px-8">
        <div className="pt-11 text-center text-base font-medium text-meta-purple-1">
          {plan?.plan_name}
        </div>

        <div className="my-6 flex items-end justify-center">
          <div className="text-4xl font-medium text-meta-purple-1">
            ₹{plan?.plan_pricing}
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
            {title}
          </div>
        )}

        {plan?.additional_features?.map((ele: any, index: any) => (
          <div key={index} className="mb-3 flex items-center justify-start">
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
        ))}
      </div>

      <div className="px-8">
        <Button
          title={TEXT?.GET_STARTED}
          btnClass="h-12 w-full !mb-0"
          titleClass="flex justify-center text-sm font-medium text-white"
          handleClick={() => {
            if (userDetails?.user_ref_id?.subscription?.plan_id) {
              toast.error('You already have a subscription');
            } else {
              makePayment(plan?._id);
            }
          }}
        />
      </div>
    </div>
  );
}

export default PriceCard;
