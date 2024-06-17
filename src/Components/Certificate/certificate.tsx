'use client';
import Image from 'next/image';
import Button from '../Button';
import html2pdf from 'html2pdf.js';
import React, { useRef } from 'react';

const Certificate = () => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const downloadPdf = () => {
    const element = certificateRef.current;
    if (element) {
      const opt = {
        margin: 1,
        html2canvas: { scale: 2 },
        filename: 'certificate.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div>
      <div className="flex w-full items-center justify-end">
        <Button
          title={'Download PDF'}
          handleClick={downloadPdf}
          btnClass="w-max !my-3 !p-3 !h-auto"
          titleClass="flex justify-center text-base font-medium text-white"
        />
      </div>

      <div className="h-full w-full bg-[url('/certificate/certificate_bg.svg')]" />

      <div
        ref={certificateRef}
        style={{
          minHeight: '100vh',
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0) 48.95%, #013BB7 76.96%, #07E2FA 100%)',
        }}
        className="relative p-px"
      >
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="mx-auto max-w-screen-lg rounded-lg p-8">
            <div className="mb-4 text-center">
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
            </div>
            <div className="mb-4 flex justify-center">
              <Image
                width={200}
                height={195}
                alt="certificate"
                className="mx-auto mb-4 w-32"
                src={'/certificate/certificate_logo.svg'}
              />
              {/* <div className="rounded-full bg-blue-500 px-4 py-2 text-white">
                <p className="text-lg font-bold">2024 Certification</p>
              </div> */}
            </div>
            <div className="mb-6 text-center">
              <p className="text-xl font-bold text-meta-blue-4">
                PROUDLY PRESENTED TO
              </p>
              <h2 className="text-2xl font-bold text-meta-blue-1">
                Lynn Tanner
              </h2>
              <div className="mx-auto mt-2 max-w-96 border-[1px] border-meta-blue-4" />
            </div>
            <div className="mb-6 text-center">
              <p className="text-xl leading-6 tracking-tight text-meta-purple-1">
                We take great pleasure in presenting you with this certificate,
                acknowledging your outstanding achievement in successfully
                completing the HumanResources recruitment assessment.
              </p>
            </div>
            <div className="mb-6 text-center">
              <p className="text-xl leading-6 tracking-tight text-meta-purple-1">
                Grade Achieved:{' '}
                <span className="font-bold text-meta-blue-1">92.58%</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <div className="mb-2 flex items-center">
                  <p className="mr-1 text-base font-medium text-black">
                    Date of issue:
                  </p>
                  <p className="mt-[2px] text-base font-semibold text-meta-blue-1">
                    March 7, 2024
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="mr-1 text-base font-medium text-black">
                    Date of Expiration:
                  </p>
                  <p className="mt-[2px] text-base font-semibold text-meta-blue-1">
                    March 7, 2025
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
    </div>
  );
};

export default Certificate;
