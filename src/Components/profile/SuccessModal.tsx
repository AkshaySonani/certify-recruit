import { ROUTE } from '@/service/Helper';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

const SuccessModal = ({ open, setOpen }: any) => {
  const router = useRouter();
  return (
    <div>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => {
            setOpen(true);
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

          <div className="fixed inset-0  z-[999] overflow-y-auto">
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
                  <div className="flex justify-end">
                    <Image
                      width={24}
                      height={24}
                      alt="UploadLogo"
                      src={'/profile/close.svg'}
                      className="cursor-pointer"
                      onClick={() => {
                        setOpen(false);
                        router?.push(ROUTE?.DASHBOARD);
                      }}
                    />
                  </div>
                  <div className="mt-4 ">
                    <Image
                      width={123}
                      height={127}
                      alt="UploadLogo"
                      src={'/profile/profileSuccess.svg'}
                      className="mx-auto cursor-pointer"
                      onClick={() => router?.push(ROUTE?.DASHBOARD)}
                    />
                  </div>
                  <div className="my-[32px] flex w-full flex-col items-center justify-center">
                    <p className="text-center text-xl  font-semibold text-meta-purple-1">
                      Profile completed successfully
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default SuccessModal;
