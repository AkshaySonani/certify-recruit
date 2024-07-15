import Image from 'next/image';
import Button from '../Button';
import Link from 'next/link';
import { useFormik } from 'formik';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import AppContext from '@/context/AppProvider';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { TEXT, updateProfileCount } from '@/service/Helper';
import React, { useContext, useEffect, useState } from 'react';

const UploadResumeTab = ({
  session,
  userDetails,
  setActivePage,
  activePage,
  getUserDataApiCall,
}: any) => {
  const context = useContext(AppContext);
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'application/pdf': [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(acceptedFiles);
      setFileName(acceptedFiles[0]?.name?.split('.')[0]);
      // UploadFileOnBucket(acceptedFiles[0]);
    },
  });

  useEffect(() => {
    getUserDataApiCall();
  }, []);

  const UploadFileOnBucket = async (file: any) => {
    setLoading(true);
    const NewFormData = new FormData();
    NewFormData.append('file', file[0]);
    API.post(API_CONSTANT?.UPLOAD_FILE, NewFormData)
      .then((res) => {
        if (res?.data?.success) {
          formik?.setFieldValue('resume', [
            ...formik?.values?.resume,
            {
              file_name: fileName,
              file_url: res?.data?.fileName,
              file_id: Date.now() + 1000 * 50,
            },
          ]);

          const obj = {
            file_name: fileName,
            file_url: res?.data?.fileName,
            file_id: Date.now() + 1000 * 50,
          };

          API.post(API_CONSTANT?.PROFILE, {
            resume: obj,
          })
            .then((res) => {
              if (res?.data?.status === 200) {
                handleNextClick('resume');
                setLoading(false);
                setFileName('');
                if (
                  profileCompletionCount?.employee === 100 ||
                  session?.user?.profile_count === 100
                ) {
                  setOpenSuccessModal(true);
                }
                setActivePage(activePage + 1);
                toast?.success(res?.data?.message);
              }
            })
            .catch((error) => {
              setLoading(false);
              toast.error(
                error?.response?.data?.message || 'Internal server error',
              );
            });
        } else {
          setLoading(false);
          toast.error(
            res?.data?.error?.message ||
              res?.data?.error?.name ||
              'Your resume are not upload please try again',
          );
          setFileName('');
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const {
    profileCompletionCount,
    setProfileCompletionCount,
    completedSections,
    setCompletedSections,
    openSuccessModal,
    setOpenSuccessModal,
  } = context;

  const handleNextClick = (section: any) => {
    updateProfileCount(
      session?.user?.role,
      section,
      setProfileCompletionCount,
      completedSections,
      setCompletedSections,
    );
  };

  const handleSubmit = async (values: any, actions: any) => {
    if (fileName && files?.length !== 0) {
      UploadFileOnBucket(files);
    } else {
      if (userDetails?.resume?.length === 0) {
        toast.error('Upload Your Resume');
      } else {
        setActivePage(activePage + 1);
      }

      // API.post(API_CONSTANT?.PROFILE, {
      //   resume: userDetails?.resume,
      // })
      //   .then((res) => {
      //     if (res?.data?.status === 200) {
      //       getUserDataApiCall();
      //       session?.user?.profile_count !== 100 &&
      //         session?.user?.profile_count < 100 &&
      //         handleNextClick('resume');
      //       setFileName('');
      //       // context?.setUserProfileCount(res?.data?.data?.profile_count);
      //       // actions.setSubmitting(false);
      //       setActivePage(activePage + 1);
      //       toast?.success(res?.data?.message);
      //     }
      //   })
      //   .catch((error) => {
      //     toast.error(
      //       error?.response?.data?.message || 'Internal server error',
      //     );
      //   });
    }
  };

  const formik: any = useFormik({
    initialValues: {
      resume: userDetails?.resume ?? [],
    },
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const removeFile = (fileToRemove: any) => {
    let obj: any = {
      resumeId: fileToRemove?._id,
    };
    API.post(API_CONSTANT?.DELETE_RESUME, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          toast?.success(res?.data?.message);
          getUserDataApiCall();
        }
      })
      .catch((error) => {
        toast?.error(error);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="pl-9">
        <div className="mt-5 flex w-full gap-3">
          <div className="w-full">
            <label className="text-base font-medium text-meta-purple-1">
              Resume Headline
            </label>
            <p className="mb-3 pt-1 text-sm font-medium text-meta-light-blue-3">
              It is the first thing recruiters notice in your profile. Write
              concisely what makes you unique and right person for the job you
              are looking for.
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <input
              type="text"
              value={fileName}
              autoFocus={true}
              name="website_url"
              placeholder="Enter file name"
              onChange={(e) => setFileName(e?.target?.value)}
              className="w-full rounded-lg border border-meta-light-blue-1 p-3  focus:border-meta-light-blue-1 focus:outline-none"
            />
          </div>
          <div className="mt-3 flex w-full cursor-pointer items-center justify-center rounded-lg border-[2px] border-dashed border-meta-light-blue-1 p-8">
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
                  <span className="text-meta-blue-1">choose file</span> to
                  upload
                </p>
                <p className="font-medium text-meta-light-blue-3">
                  Supported format : PDF
                </p>
              </div>
            </section>
          </div>

          {formik?.values?.resume?.length !== 0 &&
            formik?.values?.resume &&
            formik?.values?.resume?.map((ele: any) => {
              return (
                <div
                  key={ele?.file_id}
                  className="mt-5 flex cursor-pointer items-center justify-between rounded-md bg-meta-gray-2 p-4"
                >
                  <Link href={ele?.file_url} target="_blank">
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
                  </Link>
                  <Image
                    width={22}
                    height={22}
                    alt="remove"
                    src={'CloseIcon.svg'}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(ele);
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>

      <div className="mt-8 flex w-full justify-end">
        <Button
          isLoading={loading}
          disabled={loading}
          title={TEXT?.NEXT}
          titleClass="!text-base !text-white"
          btnClass="!w-36 !rounded-lg !bg-meta-blue-1 !py-2"
        />
      </div>

      {/* <div className="mt-8 flex w-full justify-end">
        <button
          type="submit"
          className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white"
        >
          {TEXT?.SAVE}
        </button>
      </div> */}
      <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
    </form>
  );
};

export default UploadResumeTab;
