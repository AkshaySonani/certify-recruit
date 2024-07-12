'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '../Button';
import Image from 'next/image';

const AlertUserInfoDialog = ({
  isOpen,
  setIsOpen,
  focusCount,
  handleFinishExam,
}: any) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10  "
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all">
                <div className="mt-4 h-[100px]">
                  <Image
                    width={123}
                    height={127}
                    alt="UploadLogo"
                    src={
                      focusCount == 0
                        ? '/exam/infoimage.png'
                        : '/exam/warning.png'
                    }
                    className="mx-auto"
                  />
                </div>
                <div className="flex w-full flex-col items-center justify-center">
                  {focusCount === 0 ? (
                    <p className="mt-10 w-[90%] text-left text-base text-meta-light-blue-3">
                      Please stay focused during the exam. Switching away from
                      the exam window{' '}
                      <span className="text-meta-blue-2">3</span> times will
                      automatically end the session without any answers
                      submitted.
                    </p>
                  ) : (
                    <p className="mt-10 w-[90%] text-left text-base text-meta-light-blue-3">
                      Focus has been lost from the exam window
                      <span className="ml-1 text-meta-blue-2">
                        {focusCount === 1 ? 'once' : 'Twice'}
                      </span>
                    </p>
                  )}
                  {focusCount === 0 ? (
                    <p className="mt-2 text-center text-lg font-semibold text-meta-purple-1">
                      Good luck!
                    </p>
                  ) : (
                    <p className="mt-10 w-[90%] text-left text-base text-meta-light-blue-3">
                      If you switch focus away from the exam window three times,
                      your exam session will end without allowing further
                      attempts."
                    </p>
                  )}

                  <Button
                    title={'OK'}
                    handleClick={() => {
                      setIsOpen(false);
                    }}
                    titleClass="!text-base"
                    btnClass="!w-auto !px-[35px] mt-[10px]"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default AlertUserInfoDialog;
