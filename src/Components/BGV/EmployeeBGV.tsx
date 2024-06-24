import Spinner from '@/app/icons/Spinner';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { BGV_STATUS } from '@/constant/Enum';
import API from '@/service/ApiService';
import { Dialog, Transition } from '@headlessui/react';
import { setDefaultAutoSelectFamily } from 'net';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';

const EmployeeBGV = () => {
  const status = 'verified';
  const [email, setEmail] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [userNotExist, setUserNotExist] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [bgvUser, setBgvUser] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    if (email == '') {
      toast.error('Please enter emailAddress');
    } else {
      const obj = {
        email: email,
      };
      API.post(API_CONSTANT?.SEARCH_BGV, obj)
        .then((res) => {
          setLoading(false);
          if (res?.data?.status === 404) {
            setUserNotExist(true);
          } else {
            setEmail('');
            setBgvUser(res?.data?.data);
            const hasPendingStatus = res?.data?.data?.bgv.some(
              (element: any) => element.status === BGV_STATUS?.PENDING,
            );
            if (hasPendingStatus) {
              setUserStatus(BGV_STATUS?.REJECTED);
            } else {
              setUserStatus(BGV_STATUS?.VERIFIED);
            }
            setUserStatus(res?.data?.data);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error(
            error?.response?.data?.message || 'Internal server error',
          );
        });
    }
  };

  const sendUserLink = () => {
    const obj = {
      email: email,
    };
    API.post(API_CONSTANT?.SEND_INVITATION, obj)
      .then((res) => {
        if (res?.data) {
          setSentSuccess(true);
          setEmail('');
          setUserNotExist(false);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };
  return (
    <div>
      <div className="mb-4 text-2xl font-semibold text-meta-purple-1">BGV</div>

      <div>
        <p className="mt-5 text-xl font-bold text-meta-purple-1">
          What is the process for BGV and how is it done?{' '}
        </p>
        <div className="pt-3">
          <p className="text-lg font-medium text-meta-light-blue-3">
            The background verification process encompasses checking the
            credibility of the candidate's past employment details, their
            educational qualifications, if there are any ongoing or past court
            cases against the candidate - with the idea of hiring the right
            candidate for the job.
          </p>
          <p className="pt-5 text-lg font-medium text-meta-light-blue-3">
            With the changing work environment and new data protection laws,
            companies cannot afford even a minor glitch in the resume. One wrong
            candidate is hired, and your market reputation earned over the years
            goes for a toss. A few easy steps of background verification can
            bring about a profitable change in your company.
          </p>
        </div>

        <div className="mt-10">
          <div
            className={`m-auto  flex w-[60%]  justify-between   rounded-full ${userNotExist ? 'bg-meta-red-2' : 'bg-meta-blue-1'}  p-2`}
          >
            <input
              type="email"
              value={email}
              onChange={(e: any) => {
                setEmail(e?.target?.value);
              }}
              placeholder="Search user"
              className={` rounded-full  px-4 py-2 text-white outline-none ${userNotExist ? 'bg-meta-red-2' : 'bg-meta-blue-1'}`}
            />
            <button
              onClick={() => handleSearch()}
              className="flex items-center rounded-full bg-white px-4  text-meta-blue-1"
            >
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <Spinner
                    width="15px"
                    height="15px"
                    color="#3751F2"
                    className="spinner"
                  />
                </div>
              ) : (
                <>
                  {' '}
                  <Image
                    alt="search"
                    width={11}
                    height={11}
                    src={'/dashboard/search.svg'}
                  />
                  <p className="pl-2 text-sm font-medium">Search</p>
                </>
              )}
            </button>
          </div>
        </div>
        {userNotExist && (
          <div className="flex w-full justify-center">
            <div className="mt-[60px] flex h-[250px] w-[500px] flex-col items-center rounded-[20px]  bg-meta-gray-6">
              <Image
                alt="search"
                width={150}
                height={150}
                src={'/BGV/notExist.png'}
              />
              <div>
                <p className="text-center text-sm text-black">{email}</p>
                <p className="text-center text-base font-semibold text-meta-red-1">
                  User does not exist
                </p>
                <p className="pt-5 text-center text-sm font-bold">
                  Please inform your employee to register on{' '}
                  <span className="text-meta-blue-1">CertifyRecruit.io</span>
                </p>
                <p
                  onClick={() => sendUserLink()}
                  className="cursor-pointer pt-5 text-center font-bold text-meta-blue-1 underline"
                >
                  Click here to send an invite
                </p>
              </div>
            </div>
          </div>
        )}
        {userStatus !== '' && !userNotExist && (
          <>
            {userStatus === BGV_STATUS?.VERIFIED ? (
              <div className="mt-8 flex w-full justify-center">
                <div className="h-auto w-[219px] rounded-3xl bg-white  shadow-md ">
                  <div className="relative flex h-[111px] justify-center rounded-t-3xl bg-meta-blue-1    pt-2">
                    <div className="flex w-full justify-end">
                      <div className="mr-2 flex h-[23px] w-fit items-center rounded-lg bg-white px-2  text-[10px]">
                        <p className="rounded-md font-bold text-meta-blue-1 ">
                          Download Report
                        </p>
                        <Image
                          alt="Icon"
                          width={11}
                          height={11}
                          className="ml-1"
                          src={'/dashboard/download.svg'}
                        />
                      </div>
                    </div>
                    <div className="absolute top-20  h-[109px] w-[109px] rounded-full bg-[#D9D9D9]">
                      <div className="absolute flex justify-center">
                        <Image
                          alt="search"
                          width={115}
                          height={115}
                          src={'/BGV/pofileCircle.png'}
                        />
                      </div>
                      <div className="absolute flex justify-center">
                        <Image
                          alt="search"
                          width={114}
                          height={114}
                          src={'/BGV/verified.png'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-[211px] rounded-b-3xl bg-meta-light-blue-2">
                    <div className="flex flex-col items-center justify-center pt-32">
                      <p className="text-[23px] font-bold text-meta-blue-1">
                        {bgvUser?.name}
                      </p>
                      <p className="text-[16px] text-meta-blue-1">
                        {'designation'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 flex w-full justify-center">
                <div className="h-auto w-[219px] rounded-3xl bg-white  shadow-md ">
                  <div className="relative flex h-[111px] justify-center rounded-t-3xl bg-meta-blue-1    pt-2">
                    <div className="flex w-full justify-end">
                      <div className="mr-2  h-[23px] w-fit rounded-lg bg-white px-5 py-1">
                        <p className="rounded-md font-bold text-meta-blue-1 ">
                          Verify
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-20  h-[109px] w-[109px] rounded-full bg-[#D9D9D9]">
                      <div className="absolute flex justify-center">
                        <Image
                          alt="search"
                          width={115}
                          height={115}
                          src={'/BGV/pofileCircle.png'}
                        />
                      </div>
                      <div className="absolute flex justify-center">
                        <Image
                          alt="search"
                          width={114}
                          height={114}
                          src={'/BGV/unVerified.png'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="h-[211px] rounded-b-3xl bg-meta-light-blue-2">
                    <div className="flex flex-col items-center justify-center pt-32">
                      <p className="text-[23px] font-bold text-meta-blue-1">
                        {bgvUser?.name}
                      </p>
                      <p className="text-[16px] text-meta-blue-1">
                        {'designation'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Transition appear show={sentSuccess} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => {
            setSentSuccess(false);
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
                <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div>
                    <div
                      className="flex cursor-pointer justify-end px-3 py-3"
                      onClick={() => setSentSuccess(false)}
                    >
                      <Image
                        width={19}
                        height={19}
                        alt="Preview"
                        className="ml-3"
                        src={'/home/close.svg'}
                      />
                    </div>
                    <div className="flex justify-center ">
                      <Image
                        width={102}
                        height={102}
                        alt="Preview"
                        className="ml-3"
                        src={'/BGV/emailSent.png'}
                      />
                    </div>
                    <div className="flex justify-center py-4">
                      <p className="text-xl font-semibold text-meta-purple-1">
                        Email sent Successfully
                      </p>
                    </div>
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
export default EmployeeBGV;
