'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '../Button';

const FinishExamDialog = ({
  isOpen,
  loading,
  setIsOpen,
  allAnswer,
  handleFinishExam,
  handleBackToExam,
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all">
                {allAnswer ? (
                  <div>
                    <div className=" w-full">
                      <p className="text-center text-xl font-extrabold text-meta-red-2 ">
                        Not Answered
                      </p>
                      <p className="my-5 px-10 text-center text-base font-medium text-meta-purple-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                    <div className="mt-5 flex  w-full  items-center justify-between gap-4">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => handleFinishExam()}
                        className=" h-[37px] w-1/2  rounded-lg border border-meta-light-blue-1 text-base font-medium text-meta-light-blue-3 "
                      >
                        Finish
                      </button>
                      <Button
                        title={'Back to test'}
                        btnClass="!h-[37px] !mb-0 !w-1/2"
                        handleClick={() => handleBackToExam()}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className=" w-full">
                      <p className="text-center text-xl font-extrabold text-meta-blue-1 ">
                        Are your sure?
                      </p>
                      <p className="my-5 px-10 text-center text-base font-medium text-meta-purple-1">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </div>
                    <div className="mt-5 flex  w-full  items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => handleBackToExam()}
                        className=" h-[37px] w-1/2  rounded-lg border border-meta-light-blue-1 text-base font-medium text-meta-light-blue-3 "
                      >
                        Cancel
                      </button>
                      <Button
                        title={'Finish'}
                        disabled={loading}
                        btnClass="!h-[37px] !mb-0 !w-1/2"
                        handleClick={() => handleFinishExam()}
                      />
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default FinishExamDialog;
