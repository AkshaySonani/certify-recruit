'use client';
import Image from 'next/image';
import Button from '../Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/service/Helper';
import { API_CONSTANT } from '@/constant/ApiConstant';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';

const BGVProfile = () => {
  const router = useRouter();
  const [bgvData, setBgvData] = useState([]);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res: any) => {
        setBgvData(res?.data?.data?.bgv);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  };

  console.log('bgvData', bgvData);

  return (
    <div className="mt-5 ">
      {bgvData?.map((list: any) => {
        return (
          <div className="flex items-center justify-between border-b py-10">
            <div>
              <div className="flex items-center gap-4">
                <div className="mt-2">
                  <Image
                    width={31}
                    height={31}
                    alt="Preview"
                    src={'/BGV/ChartIcon.svg'}
                  />
                </div>
                <p className="text-2xl font-medium text-meta-purple-1">
                  {list?.company_name}
                </p>
              </div>
              <div className="flex pl-14 text-base text-meta-light-blue-3">
                <p>Aug 2023 - May2024</p>
                <p className="pl-3">10th months</p>
              </div>
              <div className="  flex pl-14 text-base text-meta-light-blue-3">
                {list?.location_type}
              </div>
            </div>
            <div>
              <Button
                title={list?.status}
                btnClass={'!w-auto !px-4 !mb-0'}
                type={'button'}
              />
            </div>
          </div>
        );
      })}

      <div className="my-10 flex h-full w-full items-end justify-end">
        <Button
          title={'See full report'}
          btnClass={'!w-auto !px-8 !mb-0'}
          titleClass="!text-lg"
          handleClick={() => router?.push(ROUTE?.BGV_FULL_REPORT)}
        />
      </div>
    </div>
  );
};
export default BGVProfile;
