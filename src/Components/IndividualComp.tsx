'use client';
import Image from 'next/image';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import { TEXT } from '@/service/Helper';
import { useRouter } from 'next/navigation';
import SignupForm from '@/Components/SignupForm';
import { API_CONSTANT } from '@/constant/ApiConstant';

const IndividualComp = () => {
  const router = useRouter();

  const [showForms, setShowForms] = useState(false);
  const [currentRole, setCurrentRole] = useState('');

  const [individualArr, setIndividualArr] = useState([]);

  useEffect(() => {
    API.get(API_CONSTANT.CATEGORY)
      .then(({ data }) =>
        setIndividualArr(Array.from(new Set(data?.data.map((e) => e.field)))),
      )
      .catch((e) => console.log('🚀 ~ API.get ~ e:', e));
  }, []);

  const handleNextPageNavigation = () => {
    if (currentRole) {
      setShowForms(true);
    } else {
      toast.error('Please select role.');
    }
  };

  return (
    <div>
      {showForms ? (
        <SignupForm />
      ) : (
        <div className="container mx-auto h-screen max-w-6xl">
          <div className="flex justify-center py-20">
            <Image
              src={'/MainLogo.svg'}
              alt="MainLogo"
              width={334}
              height={56}
            />
          </div>

          <div className="w-full bg-[url('/_Compound.svg')]">
            <div className="relative m-auto w-[80%] rounded-3xl border border-meta-light-blue-2 bg-white p-6 pb-14 shadow-[0px_2px_10px_0px_#00000006]">
              <div className="flex w-full justify-center gap-1">
                <Image
                  alt="icon"
                  width={22}
                  height={22}
                  src={'/Individual.svg'}
                />
                <p className="text-lg font-semibold text-meta-blue-1">
                  {TEXT?.INDIVIDUAL}
                </p>
              </div>
              {/* <div className="absolute top-10" onClick={() => router?.back()}>
                <Image
                  width={22}
                  height={22}
                  alt="LeftArrow"
                  src={"/LeftArrow.svg"}
                />
              </div> */}

              <div className="m-1 mt-8 flex  w-full flex-wrap gap-5">
                {individualArr?.map((list) => {
                  return (
                    <label className="flex w-[48%] items-center justify-between rounded-xl border border-meta-light-blue-1 px-3 py-3">
                      <div className="flex gap-3 ">
                        <Image
                          alt="icon"
                          width={16}
                          height={20}
                          src={'/Individual.svg'}
                        />
                        <p className="cursor-pointer text-sm font-medium text-meta-light-blue-3">
                          {list}
                        </p>
                      </div>
                      <input
                        id={list}
                        type="radio"
                        value={list}
                        name="inline-radio-group"
                        onChange={() => {
                          setCurrentRole(list);
                          localStorage.setItem('userRole', list);
                        }}
                        className="h-5 w-5 border-meta-light-blue-1 bg-meta-blue-1 text-meta-blue-1"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            onClick={() => handleNextPageNavigation()}
            className="m-auto mt-5 flex w-[80%] cursor-pointer items-center justify-end gap-4"
          >
            <p className="text-lg font-medium text-meta-blue-1">{TEXT?.NEXT}</p>
            <Image
              width={22}
              height={22}
              alt="LeftArrow"
              src={'/RightArrow.svg'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualComp;
