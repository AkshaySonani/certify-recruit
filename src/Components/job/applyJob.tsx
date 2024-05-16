import { API_CONSTANT } from '@/constant/ApiConstant';
import API from '@/service/ApiService';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
const ApplyJob = ({ jobId }: any) => {
  const [OpenUploadModal, setOpenUploadModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [userDetails, setUserDetails] = useState<any>({});
  const [select, setSelect] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/pdf': [],
    },

    onDrop: (acceptedFiles: any) => {
      if (fileName == '') {
        toast?.error('Please add file name');
      } else {
        setFiles([...files, acceptedFiles[0]]);
      }
    },
  });
  console.log('files', files);

  const getUserCVList = () => {
    console.log('hello');

    API.get(API_CONSTANT?.PROFILE)
      .then((res: any) => {
        setUserDetails(res?.data?.data);
        setFiles(res?.data?.data?.resume);
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.error);
      });
  };
  useEffect(() => {
    getUserCVList();
  }, []);

  return (
    <div>
      <div className="mt-5 flex flex-col">
        <div
          className="mt-7 flex w-full cursor-pointer items-center justify-center rounded-lg border-[2px] border-dashed border-meta-light-blue-1 p-8"
          onClick={() => setOpenUploadModal(true)}
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
      <Transition appear show={OpenUploadModal} as={Fragment}>
        <Dialog as="div" onClose={() => setOpenUploadModal(false)}>
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
                  <div className="mt-5 flex flex-col">
                    <div>
                      <input
                        type="text"
                        value={fileName}
                        autoFocus={true}
                        name="website_url"
                        placeholder="Enter file name"
                        onChange={(e) => setFileName(e?.target?.value)}
                        className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3  focus:border-meta-light-blue-1 focus:outline-none"
                      />
                    </div>
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
                      {files.length !== 0 &&
                        files &&
                        files?.map((ele: any) => {
                          return (
                            <div
                              onClick={
                                () => {
                                  if (select) {
                                    setSelect('');
                                  } else {
                                    setSelect(ele);
                                  }
                                }
                                // window.open(ele?.file_url, '_blank')
                              }
                              key={ele?.file_id}
                              className={`${select?._id === ele?._id ? 'border-2 border-meta-blue-1' : ''} mt-5 flex cursor-pointer items-center justify-between rounded-md bg-meta-gray-2 p-4`}
                            >
                              <div className="flex items-center">
                                <Image
                                  alt="file"
                                  width={22}
                                  height={22}
                                  src={'/sidebarIcon/jobPosting.svg'}
                                />
                                <p className="test-meta-light-blue-3 ml-3 text-sm font-medium">
                                  {ele?.file_name}
                                </p>
                              </div>
                              {select?._id === ele?._id ? (
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
                      <button className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white">
                        APPLY
                      </button>
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
export default ApplyJob;
