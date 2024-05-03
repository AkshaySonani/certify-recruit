import Image from "next/image";
import API from "@/service/ApiService";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { API_CONSTANT } from "@/constant/ApiConstant";

const UploadResumeTab = ({ formik }: any) => {
  const [fileName, setFileName] = useState("");

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/pdf": [],
    },

    onDrop: (acceptedFiles: any) => {
      UploadFileOnBucket(acceptedFiles[0]);
    },
  });

  const UploadFileOnBucket = async (file: any) => {
    const NewFormData = new FormData();
    NewFormData.append("file", file);

    API.post(API_CONSTANT?.UPLOAD_FILE, NewFormData)
      .then((res) => {
        if (res?.data?.success) {
          formik?.setFieldValue("resume", [
            ...formik?.values?.resume,
            {
              file_name: fileName,
              file_url: res?.data?.fileName,
              file_id: Date.now() + 1000 * 50,
            },
          ]);
          setFileName("");
        } else {
          toast.error(
            res?.data?.error || "Your resume are not upload please try again"
          );
          setFileName("");
        }
      })
      .catch((error) => {
        toast.error(error || "Something want wrong");
      });
  };

  const removeFile = (fileToRemove: any) => {
    const updatedFiles = formik?.values?.resume?.filter(
      (file: any) => file.file_id !== fileToRemove.file_id
    );
    formik?.setFieldValue("resume", updatedFiles);
  };

  return (
    <div className="pl-9">
      <div className="mt-5 flex w-full gap-3">
        <div className="w-full">
          <label className="text-base font-medium text-meta-purple-1">
            Resume Headline
          </label>
          <p className="mb-3 pt-1 text-sm font-medium text-meta-light-blue-3">
            It is the first thing recruiters notice in your profile. Write
            concisely what makes you unique and right person for the job you are
            looking for.
          </p>
        </div>
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
        <div className="mt-7 flex w-full cursor-pointer items-center justify-center rounded-lg border-[2px] border-dashed border-meta-light-blue-1 p-8">
          <section className="text-center text-lg">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} multiple={false} />
              <Image
                width={32}
                height={32}
                alt="UploadLogo"
                src={"/profile/upload.svg"}
                className="mx-auto"
              />
              <p className="mt-4 font-medium">
                Drag & Drop or{" "}
                <span className="text-meta-blue-1">choose file</span> to upload
              </p>
              <p className="font-medium text-meta-light-blue-3">
                Supported format : PDF
              </p>
            </div>
          </section>
        </div>

        {/* {acceptedFiles?.length !== 0 && acceptedFiles && (
          <div className="mt-4 flex w-full items-end justify-end">
            <Button
              title={TEXT?.UPLOAD}
              titleClass="!text-base"
              handleClick={() => console.log('click')}
              btnClass="!w-36 !rounded-lg !bg-meta-blue-1 !h-10"
            />
          </div>
        )} */}

        {formik?.values?.resume?.length !== 0 &&
          formik?.values?.resume &&
          formik?.values?.resume?.map((ele: any) => {
            return (
              <div
                key={ele?.file_id}
                className="mt-5 flex cursor-pointer items-center justify-between rounded-md bg-meta-gray-2 p-4"
              >
                <div
                  className="flex items-center"
                  onClick={() => window.open(ele?.file_url, "_blank")}
                >
                  <Image
                    alt="file"
                    width={22}
                    height={22}
                    src={"/sidebarIcon/jobPosting.svg"}
                  />
                  <p className="test-meta-light-blue-3 ml-3 text-sm font-medium">
                    {ele?.file_name}
                  </p>
                </div>

                <Image
                  width={22}
                  height={22}
                  alt="remove"
                  src={"CloseIcon.svg"}
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
  );
};

export default UploadResumeTab;
