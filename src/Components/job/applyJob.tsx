import Spinner from '@/app/icons/Spinner';
import { API_CONSTANT } from '@/constant/ApiConstant';
import API from '@/service/ApiService';
import { TEXT } from '@/service/Helper';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
const ApplyJob = ({ jobApplyId, setJobApplyId }: any) => {
  const [OpenUploadModal, setOpenUploadModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isSpinner, setIsSpinner] = useState<any>({
    apply: false,
    continue: false,
  });
  const [allFiles, setAllFiles] = useState<any>([]);
  const [userDetails, setUserDetails] = useState<any>({});
  const [select, setSelect] = useState<any>('');
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/pdf': [],
    },

    onDrop: (acceptedFiles: any) => {
      const NewFormData = new FormData();
      NewFormData.append('file', acceptedFiles[0]);
      const input = NewFormData.get('file');
      setAllFiles([...allFiles, input]);
    },
  });

  const getUserCVList = (set: any) => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res: any) => {
        setUserDetails(res?.data?.data);
        if (set) {
          var maxDate = res?.data?.data?.resume.reduce(function (
            a: any,
            b: any,
          ) {
            return a?.addedAt > b?.addedAt ? a : b;
          });
          setSelect({ ele: maxDate });
        }
        setAllFiles(res?.data?.data?.resume);
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.error);
      });
  };

  useEffect(() => {
    //@ts-ignore
    getUserCVList();
  }, []);
  const UploadFileOnBucket = async (file: any) => {
    const NewFormData = new FormData();
    NewFormData.append('file', file?.ele);
    API.post(API_CONSTANT?.UPLOAD_FILE, NewFormData)
      .then((res) => {
        if (res?.data?.success) {
          const obj = {
            file_name: file?.ele?.name?.split('.')[0],
            file_url: res?.data?.fileName,
            file_id: Date.now() + 1000 * 50,
          };

          API.post(API_CONSTANT?.PROFILE, {
            resume: obj,
          })
            .then((res) => {
              if (res?.data?.status === 200) {
                getUserCVList('set');
                setIsSpinner({ apply: false });
                setOpenUploadModal(false);
              }
            })
            .catch((error) => {
              setIsSpinner({ apply: false });
              console.log('error', error);
              toast?.error(error);
            });
        } else {
          setIsSpinner({ apply: false });
          toast.error(
            res?.data?.error || 'Your resume are not upload please try again',
          );
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const _onApply = () => {
    if (select === '') {
      toast?.error('Please select at least resume');
    } else {
      setIsSpinner({ apply: true });
      if (select?.ele?._id) {
        setIsSpinner({ apply: false });
        setOpenUploadModal(false);
      } else {
        setIsSpinner({ apply: true });
        UploadFileOnBucket(select);
      }
    }
  };
  const removeFile = (fileToRemove: any) => {
    let obj: any = {
      resumeId: fileToRemove?._id || String(fileToRemove?.file_id),
    };
    API.post(API_CONSTANT?.DELETE_RESUME, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          //@ts-ignore
          getUserCVList();
          toast?.success(res?.data?.message);
          setSelect('');
        }
      })
      .catch((error) => {
        toast?.error(error);
      });
  };
  const _onSubmit = () => {
    if (select === '') {
      toast?.error('Please upload resume');
    } else {
      setIsSpinner({ continue: true });
      const obj = {
        user_id: userDetails?._id,
        job_id: jobApplyId,
        user_cv: [select?.ele],
      };
      API.post(API_CONSTANT?.JOB_APPLY, obj)
        .then((res: any) => {
          if (res?.status === 200) {
            setIsSpinner({ continue: false });
            setSuccessModal(true);
            setSelect('');
          } else {
            setIsSpinner({ continue: false });
            toast.error(res?.message);
          }
        })
        .catch((error) => {
          setIsSpinner({ continue: false });
          console.log('error', error);
          toast?.error(error?.response?.data?.message);
        });
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold text-meta-purple-1">Upload CV</div>
      <div className="mt-5 flex flex-col">
        <div
          className="mt-7 flex w-full cursor-pointer items-center justify-center rounded-lg border-[2px] border-dashed border-meta-light-blue-1 p-8"
          onClick={() => {
            setOpenUploadModal(true);
            setSelect('');
          }}
        >
          <section className="text-center text-lg">
            <Image
              width={32}
              height={32}
              alt="UploadLogo"
              src={'/profile/upload.svg'}
              className="mx-auto"
            />
            <p className="mt-4 font-medium">
              Drag & Drop or{' '}
              <span className="text-meta-blue-1">choose file</span> to upload
            </p>
            <p className="font-medium text-meta-light-blue-3">
              Supported format : PDF
            </p>
          </section>
        </div>
      </div>
      <div>
        {!OpenUploadModal && select && (
          <div
            key={select?.ele?.file_id}
            className="mt-5 flex cursor-pointer items-center justify-between rounded-md bg-meta-gray-2 p-4"
          >
            <Link href={select?.ele?.file_url} target="_blank">
              <div className="flex items-center">
                <Image
                  alt="file"
                  width={22}
                  height={22}
                  src={'/sidebarIcon/jobPosting.svg'}
                />
                <p className="test-meta-light-blue-3 ml-3 text-sm font-medium">
                  {select?.ele?.file_name}
                </p>
              </div>
            </Link>
            <Image
              width={22}
              height={22}
              alt="remove"
              src={'CloseIcon.svg'}
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(select?.ele);
              }}
            />
          </div>
        )}
      </div>
      <div className={`"w-full mt-16  flex justify-between`}>
        <button
          type="button"
          onClick={() => setJobApplyId('')}
          className="mb-8 min-w-full rounded-lg border border-meta-light-blue-1 text-base font-medium text-meta-light-blue-3 sm:mb-8 sm:min-w-48"
        >
          {TEXT?.BACK}
        </button>

        <button
          onClick={() => _onSubmit()}
          className={`mb-8 h-12 min-w-48 rounded-lg border border-meta-light-blue-2 bg-meta-blue-1 py-3 text-meta-light-blue-3 transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient`}
        >
          <div className={`flex justify-center text-sm font-medium text-white`}>
            {isSpinner?.continue ? (
              <div className="mb-3">
                <Spinner
                  width="25px"
                  height="25px"
                  color="white"
                  className="spinner"
                />
              </div>
            ) : (
              <span>Continue</span>
            )}
          </div>
        </button>
      </div>
      <Transition appear show={OpenUploadModal} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => {
            setOpenUploadModal(false);
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
                  <Dialog.Title
                    as="h3"
                    className=" border-b-default-1 relative flex items-center justify-center border-meta-light-blue-1 p-6 text-xl font-semibold leading-6 text-meta-purple-1"
                  >
                    Upload CV
                  </Dialog.Title>
                  <div
                    onClick={() => setOpenUploadModal(false)}
                    className="absolute right-1 top-2 cursor-pointer p-2"
                  >
                    <Image
                      alt="date"
                      width={19}
                      height={15}
                      src={'CloseIcon.svg'}
                    />
                  </div>
                  <div className=" flex flex-col">
                    <div className=" mt-7 flex w-full cursor-pointer items-center justify-center rounded-lg border-[2px] border-dashed border-meta-light-blue-1 p-8">
                      <section className="text-center text-lg">
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} multiple={false} />
                          <Image
                            width={32}
                            height={32}
                            alt="UploadLogo"
                            src={'/profile/upload.svg'}
                            className="mx-auto"
                          />
                          <p className="mt-4 font-medium">
                            Drag & Drop or{' '}
                            <span className="text-meta-blue-1">
                              choose file
                            </span>{' '}
                            to upload
                          </p>
                          <p className="font-medium text-meta-light-blue-3">
                            Supported format : PDF
                          </p>
                        </div>
                      </section>
                    </div>
                    <div className="mt-3 h-36 overflow-auto">
                      {allFiles.length !== 0 &&
                        allFiles &&
                        allFiles?.map((ele: any, i: any) => {
                          return (
                            <div
                              onClick={() => {
                                if (select?.index === i) {
                                  setSelect('');
                                } else {
                                  setSelect({ ele, index: i });
                                }
                              }}
                              key={ele?.file_id}
                              className={`${select?.index === i ? 'border-2 border-meta-blue-1' : ''} mt-5 flex cursor-pointer items-center justify-between rounded-md bg-meta-gray-2 p-4`}
                            >
                              <div className="flex items-center">
                                <Image
                                  alt="file"
                                  width={22}
                                  height={22}
                                  src={'/sidebarIcon/jobPosting.svg'}
                                />
                                <p className="test-meta-light-blue-3 ml-3 text-sm font-medium">
                                  {ele?.file_name || ele?.name}
                                </p>
                              </div>
                              {select?.index === i ? (
                                <div className="text-base font-bold text-meta-blue-1">
                                  UnSelect
                                </div>
                              ) : (
                                <div className="text-base font-bold text-meta-blue-1">
                                  Select
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                    <div className="mt-8 flex w-full justify-end">
                      <button
                        onClick={() => _onApply()}
                        disabled={isSpinner?.apply ? true : false}
                        className={` w-32 rounded-lg border border-meta-light-blue-2 bg-meta-blue-1 py-2 text-meta-light-blue-3 transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient`}
                      >
                        <div
                          className={`flex justify-center text-sm font-medium text-white`}
                        >
                          {isSpinner?.apply ? (
                            <div className="">
                              <Spinner
                                width="25px"
                                height="25px"
                                color="white"
                                className="spinner"
                              />
                            </div>
                          ) : (
                            <span>Continue</span>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={successModal} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => {
            setOpenUploadModal(false), setIsSpinner(false);
            setSuccessModal(false), setJobApplyId('');
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
                  <div className="mt-4 h-[87px]">
                    <Image
                      width={123}
                      height={127}
                      alt="UploadLogo"
                      src={'/job/jobApplySuccess.svg'}
                      className="mx-auto"
                    />
                  </div>
                  <div className="flex w-full flex-col items-center justify-center">
                    <p className="text-center text-lg font-semibold text-meta-purple-1">
                      Job Apply Successfully
                    </p>
                    <p className="mt-5 w-[70%] text-center text-sm text-meta-light-blue-3">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    <p
                      onClick={() => setJobApplyId('')}
                      className="my-5 cursor-pointer text-sm font-medium text-meta-blue-1 underline"
                    >
                      View Apply Job
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
export default ApplyJob;
