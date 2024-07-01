'use client';
import React from 'react';
import Footer from '@/Components/home/footer';
import Header from '@/Components/home/header';
import PageTitle from '@/Components/home/pageTitle';

const Page = () => {
  return (
    <div className="dm-sans ">
      <div className="h-full w-full">
        <PageTitle content="Privacy Policy" />
      </div>

      <div className="mx-auto h-full px-4 pb-[50px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <p className="mb-10 text-lg font-normal text-meta-light-blue-3">
          This Privacy Policy describes how CLUSTER CERTIFY RECRUIT PRIVATE
          LIMITED collects, uses, and protects your personal information when
          you visit and use the website{' '}
          <a href={process.env.NEXT_PUBLIC_BASE_URL} target="_blank">
            www.certifyrecruit.io
          </a>
          . By accessing and using the Site, you agree to the terms of this
          Privacy Policy. If you do not agree to these terms, please do not use
          the Site.
        </p>

        <div className="mt-[80px]">
          <h2 className="mb-5 text-2xl font-bold text-meta-purple-1">
            Information We Collect
          </h2>

          <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
            <li className="mb-5">
              <span className="pr-1 font-bold text-meta-purple-1">
                Personal Information:
              </span>
              We may collect personal information, such as your name, email
              address, phone number, and other contact details when you register
              for an account, make payments, or contact us.
            </li>
            <li className="mb-5">
              <span className="pr-1 font-bold text-meta-purple-1">
                Usage Information:
              </span>
              We may collect personal information, such as your name, email
              address, phone number, and other contact details when you register
              for an account, make payments, or contact us.
            </li>
          </ul>
        </div>
        <div className="mt-[50px]">
          <h2 className="mb-5 text-2xl font-bold text-meta-purple-1">
            How We Use Your Information
          </h2>

          <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
            <span className="pr-1 font-bold text-meta-purple-1">
              We use your personal information to:
            </span>
            <li>Process payments and provide the services you request.</li>
            <li>Send you important information, updates, and newsletters.</li>
            <span className="pr-1 font-bold text-meta-purple-1">
              We may use usage information for:
            </span>
            <li>Improving the Site's performance and functionality.</li>
            <li>
              Analyzing user behavior and trends to enhance user experience.
            </li>
          </ul>
        </div>
        <div className="mt-[50px]">
          <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
            Sharing of Information
          </h2>

          <p className="text-lg font-normal text-meta-light-blue-3">
            We do not sell, trade, or transfer your personal information to
            third parties. However, we may share your information with trusted
            service providers, partners, and affiliates who assist us in
            operating the Site, conducting our business, or serving you. We will
            ensure that they maintain the confidentiality of your information.
          </p>
        </div>

        <div className="mt-[50px]">
          <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
            Cookies and Tracking Technologies
          </h2>

          <p className="text-lg font-normal text-meta-light-blue-3">
            We may use cookies and similar tracking technologies to enhance your
            user experience. You can set your browser to refuse all cookies or
            to indicate when a cookie is being sent. However, if you do not
            accept cookies, you may not be able to use some portions of the
            Site.
          </p>
        </div>
        <div className="mt-[50px]">
          <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
            Security
          </h2>

          <p className="text-lg font-normal text-meta-light-blue-3">
            We take reasonable measures to protect your personal information
            from unauthorized access, disclosure, alteration, or destruction.
            However, please be aware that no method of transmission over the
            internet, or method of electronic storage, is entirely secure.
          </p>
        </div>
        <div className="mt-[50px]">
          <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
            Links to Other Websites
          </h2>

          <p className="text-lg font-normal text-meta-light-blue-3">
            The Site may contain links to external websites that are not
            operated by us. We have no control over the content and practices of
            these websites and cannot be responsible for their privacy policies.
          </p>
        </div>
        <div className="mt-[50px]">
          <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
            Changes to the Privacy Policy
          </h2>

          <p className="text-lg font-normal text-meta-light-blue-3">
            The Company reserves the right to modify this Privacy Policy at any
            time. We will notify you of any changes by posting the updated
            Privacy Policy on the Site. It is your responsibility to review this
            policy regularly.
          </p>
        </div>
        <div className="mt-[50px]">
          <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
            ionContact Informat
          </h2>

          <p className="text-lg font-normal text-meta-light-blue-3">
            If you have questions or concerns about this Privacy Policy, please
            contact us at:
          </p>
          <h2 className="mt-[50px] text-2xl font-bold text-meta-purple-1">
            CLUSTER CERTIFY RECRUIT PRIVATE LIMITED
          </h2>
          <p className="mb-4 text-lg font-normal text-meta-light-blue-3">
            201, Platinum Hub, near Central Bank, Near Tulsidham Char Rasta,
            Manjit Nagar, GIDC Industrial Area, Manjalpur, Vadodara, Gujarat
            390011
          </p>
          <div>
            <div className="flex items-center">
              <p>Email : </p>
              <a
                title="Our email"
                aria-label="Our email"
                href="mailto:info@certifyrecruit.com"
                className="ml-1 transition-colors duration-300 hover:text-meta-blue-1"
              >
                info@certifyrecruit.com
              </a>
            </div>
            <div className="flex items-center">
              <p>Phone : </p>
              <a
                href="tel:+91 9157350298"
                aria-label="Our phone"
                title="Our phone"
                className="ml-1 transition-colors duration-300 hover:text-meta-blue-1"
              >
                +91 9157350298
              </a>
            </div>
          </div>
          <p className="mb-5">
            By using this Site, you acknowledge that you have read, understood,
            and agreed to these Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
