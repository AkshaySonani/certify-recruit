'use client';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import ApplyJob from '../job/applyJob';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import { TEXT } from '@/service/Helper';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../Button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LinkedinShareButton } from 'next-share';
import { TwitterShareButton } from 'next-share';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { toast } from 'react-toastify';
const IndividualDashboard = ({
  dashboardData,
  setDashBoardData,
  userDetails,
}: any) => {
  const TwitterUrl = 'https://twitter.com/intent/tweet?url=';
  const LinkdinUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=';
  const certificateRef = useRef<HTMLDivElement>(null);
  const [viewCertificate, setViewCertificate] = useState(false);
  const router = useRouter();
  const [jobApplyId, setJobApplyId] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const _onJobApply = (id: any) => {
    const updatedItems = dashboardData.map((item: any) =>
      item?._id === id ? { ...item, applied: true } : item,
    );
    setDashBoardData(updatedItems);
    setJobApplyId(id);
  };

  const downloadPdf = async () => {
    const element = certificateRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('document.pdf');
    }
  };

  const UploadFileOnBucket = async (NewFormData: any, link: any) => {
    API.post(API_CONSTANT?.UPLOAD_FILE, NewFormData)
      .then((res) => {
        setPdfUrl(res?.data?.fileName);
        window.open(`${link}${encodeURIComponent(res?.data?.fileName)}`);
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const getUrl = async (link: any) => {
    setViewCertificate(true);
    if (pdfUrl === '') {
      const element = certificateRef.current;
      if (element) {
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = canvas.height;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const pdfBlob = pdf.output('blob');
        const formData = new FormData();
        formData.append('file', pdfBlob, 'certificate.pdf');
        formData.append('location', 'certificate');
        UploadFileOnBucket(formData, link);
      }
    } else {
      window.open(`${link}${encodeURIComponent(pdfUrl)}`);
    }
  };

  return (
    <div>
      {userDetails?.certificates?.length !== 0 && (
        <div className="rounded-3xl bg-[url('/dashboard/sertificateBG.svg')] bg-cover bg-no-repeat p-4">
          <div>
            <div className="text-xl font-medium text-white">
              {TEXT?.CONGRATULATIONS_YOUR_CERTIFICATION_IS_COMPLETE}
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className="mb-2.5 cursor-pointer text-sm font-medium text-white underline underline-offset-2"
              onClick={() => setViewCertificate(true)}
            >
              {TEXT?.VIEW_CERTIFICATE}
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="text-sm font-medium text-white">
                  {TEXT?.CERTIFICATION_VALIDATION_IS_YEAR_ONLY}
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 text-sm font-medium text-white">
                  {TEXT?.SHARE}
                </div>
                <div
                  className="mr-4 cursor-pointer"
                  onClick={() => setViewCertificate(true)}
                >
                  <Image
                    width={30}
                    height={30}
                    alt="linkedin"
                    src={'/dashboard/linkedin.svg'}
                  />
                </div>

                <div
                  className="mr-4 cursor-pointer"
                  onClick={() => setViewCertificate(true)}
                >
                  <Image
                    width={30}
                    height={30}
                    alt="twitter"
                    src={'/dashboard/twitter.svg'}
                  />
                </div>

                <div>
                  <button
                    className="h-10 w-48 rounded-lg bg-meta-blue-2 text-white"
                    onClick={() => downloadPdf()}
                  >
                    {TEXT?.DOWNLOAD}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {jobApplyId !== '' ? (
        <ApplyJob jobApplyId={jobApplyId} setJobApplyId={setJobApplyId} />
      ) : dashboardData?.length !== 0 ? (
        dashboardData?.map((list: any) => {
          return (
            <div
              className="my-3 cursor-pointer rounded-xl bg-meta-gray-2 p-2"
              onClick={() => router.push(`/job/details/${list._id}`)}
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-start">
                    <p className="whitespace-pre-wrap break-all text-lg font-semibold text-meta-purple-1">
                      {list?.title}
                    </p>
                    <p className="mx-2 mt-1 whitespace-nowrap text-sm font-bold text-meta-light-blue-3">
                      {moment(list?.createdAt).fromNow()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-bold text-meta-light-blue-3">
                      {list?.company_name}
                    </p>
                    <p className="mx-1 text-sm font-bold text-meta-light-blue-3">
                      - {list?.city[0]?.name},
                      {list?.state[0]?.name ?? 'Gujarat'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* <button className="h-max w-max min-w-11 rounded-lg border border-meta-light-blue-1 bg-white p-3">
                    <Image
                      alt="date"
                      width={18}
                      height={18}
                      src={'/job/bookmark.svg'}
                    />
                  </button> */}
                  <button
                    disabled={list?.applied}
                    onClick={(e) => {
                      e?.stopPropagation();
                      _onJobApply(list?._id);
                    }}
                    className={
                      'flex h-max w-max items-center justify-center rounded-lg border border-meta-light-blue-1 bg-white p-3 px-[10px] ' +
                      (list?.applied && 'bg-green-300')
                    }
                  >
                    <p className="text-sm font-bold text-meta-purple-1">
                      {list?.applied ? 'Applied' : 'Apply Now'}
                    </p>
                    {!list?.applied && (
                      <div className="pl-[10px]">
                        <Image
                          alt="date"
                          width={14}
                          height={14}
                          src={'/job/share.svg'}
                        />
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Image
                    alt="date"
                    width={15}
                    height={15}
                    src={'/job/moneybag.svg'}
                  />
                  <p className="text-sm font-bold text-meta-blue-1">
                    {list?.salary_started ?? 0}/{' '}
                    {list?.salary_pay === 'MONTHLY' ? 'month' : 'hour'} -{' '}
                    {list?.salary_upto ?? 0}/
                    {list?.salary_pay === 'MONTHLY' ? 'month' : 'hour'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    alt="date"
                    width={15}
                    height={15}
                    src={'/job/timepicker.svg'}
                  />
                  <p className="text-sm font-bold text-meta-blue-1">
                    {list?.job_types[0]}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    alt="date"
                    width={15}
                    height={15}
                    src={'/job/datepicker.svg'}
                  />
                  <p className="text-sm font-bold text-meta-blue-1">
                    {list?.working_schedule[0]}
                  </p>
                </div>
              </div>
              <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-meta-light-blue-3">
                {list?.description?.replace(/<\/?[^>]+>/gim, '')}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex w-full items-center justify-center font-semibold text-meta-purple-1">
          No Jobs available
        </div>
      )}

      <Transition appear show={viewCertificate} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 "
          onClose={() => setViewCertificate(false)}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[1320px] transform overflow-hidden rounded-2xl bg-white p-10  text-left align-middle shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all">
                  <div
                    ref={certificateRef}
                    style={
                      {
                        // minHeight: '100vh',
                        // background:
                        //   'linear-gradient(180deg, rgba(255, 255, 255, 0) 48.95%, #013BB7 76.96%, #07E2FA 100%)',
                      }
                    }
                    className="relative bg-[url('/certificate.png')] bg-center bg-no-repeat p-px "
                  >
                    <div className="flex  items-center justify-center ">
                      <div className="mx-auto mt-[450px] max-w-screen-lg rounded-lg">
                        {/* <div className=" text-center">
                          <div className="flex justify-center">
                            <Image
                              width={334}
                              height={56}
                              alt="MainLogo"
                              src={'/MainLogo.svg'}
                              className="mx-auto mb-4 w-60"
                            />
                          </div>
                          <h1 className="text-2xl font-bold text-meta-blue-3">
                            CERTIFICATE
                          </h1>
                          <p className="text-base font-bold text-black">
                            OF HR RECRUITMENT ASSESSMENT
                          </p>
                        </div> */}
                        <div className="mb-4 flex justify-center">
                          {/* <Image
                            width={200}
                            height={195}
                            alt="certificate"
                            className="mx-auto mb-4 w-32"
                            src={'/certificate/certificate_logo.svg'}
                          /> */}
                          {/* <div className="rounded-full bg-blue-500 px-4 py-2 text-white">
                <p className="text-lg font-bold">2024 Certification</p>
              </div> */}
                        </div>
                        <div className="mb-6 px-8 text-center">
                          {/* <p className="text-xl font-bold text-meta-blue-4">
                            PROUDLY PRESENTED TO
                          </p> */}
                          <h2 className="text-2xl font-bold text-meta-blue-1">
                            {userDetails?.user_name}
                          </h2>
                          <div className="mx-auto mt-2 max-w-96 border-[1px] border-meta-blue-4" />
                        </div>
                        <div className="mb-6 px-8 text-center">
                          <p className="text-xl leading-6 tracking-tight text-meta-purple-1">
                            We take great pleasure in presenting you with this
                            certificate, acknowledging your outstanding
                            achievement in successfully completing the
                            HumanResources recruitment assessment.
                          </p>
                        </div>
                        <div className="mb-6 px-8 text-center">
                          <p className="text-xl leading-6 tracking-tight text-meta-purple-1">
                            Grade Achieved:{' '}
                            <span className="font-bold text-meta-blue-1">
                              {(
                                (userDetails?.certificates?.[0]?.result / 12) *
                                100
                              ).toFixed(0)}
                              %
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center justify-between p-8">
                          <div className="text-sm text-gray-600">
                            <div className="mb-2 flex items-center">
                              <p className="mr-1 text-base font-medium text-black">
                                Date of issue:
                              </p>
                              <p className="mt-[2px] text-base font-semibold text-meta-blue-1">
                                {moment(
                                  userDetails?.certificates?.[0]?.join_time,
                                ).format('MMM DD, YYYY')}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <p className="mr-1 text-base font-medium text-black">
                                Date of Expiration:
                              </p>
                              <p className="mt-[2px] text-base font-semibold text-meta-blue-1">
                                {moment(
                                  userDetails?.certificates?.[0]?.join_time,
                                )
                                  .add(1, 'year')
                                  .format('MMM DD, YYYY')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="text-center text-base font-semibold text-meta-blue-1">
                              <Image
                                width={120}
                                height={109}
                                alt="MainLogo"
                                className="mx-auto mb-4 w-28"
                                src={'/certificate/signature.png'}
                              />
                              <div className="mx-auto my-1 max-w-52 border-[1px] border-meta-blue-4" />
                              <p>Founder & CEO</p>
                              <p>CLUSTER CERTIFY RECRUIT PRIVATE LIMITED</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-4 flex w-full items-center justify-center">
                    <div className="ml-24 flex w-1/2 items-center justify-end">
                      <Button
                        type={'button'}
                        title={'Download PDF'}
                        handleClick={downloadPdf}
                        btnClass="w-max !p-3 !h-auto !mb-0"
                        titleClass="flex justify-center text-base font-medium text-white "
                      />
                    </div>
                    <div className="flex w-1/2 items-center justify-end">
                      <LinkedinShareButton
                        url={pdfUrl} // URL to share (adjust as needed)
                        title="Check out my certificate!" // Title of the LinkedIn post
                        beforeOnClick={() => getUrl(LinkdinUrl)}
                      >
                        <div className="mr-4 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-meta-blue-1 ">
                          <Image
                            width={30}
                            height={30}
                            alt="linkedin"
                            className="m-auto"
                            src={'/dashboard/linkedin.svg'}
                          />
                        </div>
                      </LinkedinShareButton>
                      <TwitterShareButton
                        url={pdfUrl}
                        // URL to share (adjust as needed)
                        title="Check out my certificate!"
                        beforeOnClick={() => getUrl(TwitterUrl)}
                        // Title of the LinkedIn post
                      >
                        <div className="mr-4 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-meta-blue-1 ">
                          <Image
                            width={30}
                            height={30}
                            alt="twitter"
                            src={'/dashboard/twitter.svg'}
                          />
                        </div>
                      </TwitterShareButton>
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
export default IndividualDashboard;
