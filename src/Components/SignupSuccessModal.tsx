'use client';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { ROUTE } from '@/service/Helper';

const SignupSuccessModal = ({ isOpen, setIsOpen }: any) => {
  const router = useRouter();
  useEffect(() => {
    if (isOpen === true) {
      setTimeout(() => {
        router.push(ROUTE?.SIGN_UP_SUCCESS);
      }, 2000);
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        onClose={() => {
          setIsOpen(false);
          router.push(ROUTE?.SIGN_UP_SUCCESS);
        }}
      >
        <Transition.Child
          as={Fragment}
          leaveTo="opacity-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leave="ease-in duration-200"
          enter="ease-out duration-300"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              leave="ease-in duration-200"
              leaveTo="opacity-0 scale-95"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100"
            >
              <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                <div className="mt-6 ">
                  <Image
                    width={142}
                    height={142}
                    alt="UploadLogo"
                    src={'/profile/Successmark.png'}
                    className="mx-auto cursor-pointer"
                  />
                </div>
                <div className="my-[30px] flex w-full flex-col items-center justify-center">
                  <p className="text-center text-3xl  font-semibold text-black">
                    successful
                  </p>
                  <p className=" mt-[14px] px-20 text-center text-xl  font-semibold text-meta-gray-1">
                    Your account has been created successfully.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignupSuccessModal;
