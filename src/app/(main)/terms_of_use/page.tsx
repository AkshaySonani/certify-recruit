'use client';
import React from 'react';
import PageTitle from '@/Components/home/pageTitle';

const Page = () => {
  return (
    <div className="dm-sans">
      <div className="h-full w-full">
        <PageTitle content="Terms of Use" />
      </div>

      <div className="mx-auto h-full px-4 pb-[50px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Introduction
        </h2>
        <p className="mb-10 text-lg font-normal text-meta-light-blue-3">
          Welcome to{' '}
          <a href={process.env.NEXT_PUBLIC_BASE_URL} target="_blank">
            www.certifyrecruit.io{' '}
          </a>{' '}
          . These Terms and Conditions (“Terms”) govern your use of the Site and
          the services provided by CLUSTER CERTIFY RECRUIT PRIVATE LIMITED. By
          accessing and using the Site, you agree to comply with and be bound by
          these Terms. If you do not agree to these Terms, please do not use the
          Site.
        </p>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Use of the Site
        </h2>
        <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
          <li className="mb-5">
            <span className="pr-1 font-bold text-meta-purple-1">
              Eligibility:
            </span>
            By using the Site, you represent and warrant that you are at least
            18 years old and have the legal capacity to enter into these Terms.
          </li>
          <li className="mb-5">
            <span className="pr-1 font-bold text-meta-purple-1">
              Account Registration:
            </span>
            To access certain features of the Site, you may need to register for
            an account. You agree to provide accurate and complete information
            during the registration process and to keep your account information
            updated.
          </li>
          <li className="mb-10">
            <span className="pr-1 font-bold text-meta-purple-1">
              Account Security:
            </span>
            You are responsible for maintaining the confidentiality of your
            account login details and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use
            of your account.
          </li>
        </ul>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">Services</h2>
        <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
          <li className="mb-5">
            <span className="pr-1 font-bold text-meta-purple-1">
              Service Offerings:
            </span>
            The Company offers a variety of services, including but not limited
            to recruitment services, certification programs, and consultancy
            services. The specific terms and conditions for each service will be
            provided at the time of purchase or booking.
          </li>
          <li className="mb-5">
            <span className="pr-1 font-bold text-meta-purple-1">Payment:</span>
            All fees for services must be paid in full at the time of booking,
            unless otherwise specified. We accept various forms of payment,
            including credit cards, debit cards, and online payment gateways.
          </li>
          <li className="mb-10">
            <span className="pr-1 font-bold text-meta-purple-1">
              Cancellation and Refunds:
            </span>
            Please refer to our Refund Policy for detailed information on our
            cancellation and refund terms.
          </li>
        </ul>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Privacy Policy
        </h2>
        <p className="mb-10 text-lg font-normal text-meta-light-blue-3">
          Your use of the Site is also governed by our Privacy Policy, which is
          incorporated into these Terms by reference. By using the Site, you
          consent to the collection, use, and sharing of your information as
          described in our Privacy Policy.
        </p>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Intellectual Property
        </h2>
        <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
          <li className="mb-5 ml-9">
            <span className="pr-1 font-bold text-meta-purple-1">
              Ownership:
            </span>
            All content on the Site, including text, graphics, logos, images,
            and software, is the property of the Company or its content
            suppliers and is protected by intellectual property laws.
          </li>
          <li className="mb-5 ml-9">
            <span className="pr-1 font-bold text-meta-purple-1">
              Limited License:
            </span>
            You are granted a limited, non-exclusive, non-transferable license
            to access and use the Site for personal, non-commercial purposes.
            You may not reproduce, distribute, modify, create derivative works
            from, or otherwise exploit any content on the Site without our prior
            written consent.
          </li>
        </ul>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          User Conduct
        </h2>

        <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
          <div className="mb-5 ml-9">
            <ul className="ml-4 list-disc">
              <li>
                {' '}
                <span className="font-bold text-meta-purple-1">
                  Prohibited Activities
                </span>{' '}
                : You agree not to:
              </li>
              <li>Use the Site for any illegal or unauthorized purpose.</li>
              <li>
                Interfere with or disrupt the Site or its servers or networks.
              </li>
              <li>
                Engage in any activity that could damage, disable, or impair the
                Site.
              </li>
              <li>
                Use any automated system or software to extract data from the
                Site for commercial purposes.
              </li>
            </ul>
          </div>
        </ul>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          User Content
        </h2>
        <p className="mb-5">
          If you post or submit any content to the Site, you grant us a
          non-exclusive, royalty-free, perpetual, and worldwide license to use,
          reproduce, modify, adapt, publish, and distribute such content for any
          purpose.
        </p>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Disclaimer of Warranties
        </h2>
        <p className="mb-5">
          The Site and services are provided on an “as-is” and “as-available”
          basis. We make no warranties, express or implied, regarding the Site
          or services, including but not limited to warranties of
          merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Limitation of Liability
        </h2>
        <p className="mb-5">
          To the maximum extent permitted by law, the Company shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses, resulting from:
        </p>
        <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
          <li>Your use or inability to use the Site or services.</li>
          <li>
            Any unauthorized access to or use of our servers and/or any personal
            information stored therein.
          </li>
          <li>
            Any interruption or cessation of transmission to or from the Site.
          </li>
          <li>
            Any bugs, viruses, trojan horses, or the like that may be
            transmitted to or through the Site by any third party.
          </li>
          <li>
            Any errors or omissions in any content or for any loss or damage
            incurred as a result of the use of any content posted, emailed,
            transmitted, or otherwise made available through the Site.
          </li>
        </ul>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Indemnification
        </h2>
        <p className="mb-5">
          You agree to indemnify, defend, and hold harmless the Company, its
          affiliates, officers, directors, employees, and agents from and
          against any and all claims, damages, obligations, losses, liabilities,
          costs, or debt, and expenses (including but not limited to attorney’s
          fees) arising from:
        </p>
        <ul className="mb-4 list-inside list-disc text-lg font-normal text-meta-light-blue-3">
          <li>Your use of and access to the Site.</li>
          <li>Your violation of any term of these Terms.</li>
          <li>
            Your violation of any third-party right, including without
            limitation any intellectual property, privacy, or other proprietary
            rights.
          </li>
          <li>Your violation of any applicable law, rule, or regulation.</li>
        </ul>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Governing Law
        </h2>
        <p className="mb-5">
          These Terms shall be governed by and construed by the laws of India,
          without regard to its conflict of law principles. Any dispute arising
          out of or relating to these Terms or the use of the Site shall be
          resolved exclusively in the courts located in Vadodara, Gujarat,
          India.
        </p>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Changes to the Terms
        </h2>
        <p className="mb-5">
          We reserve the right to modify these Terms at any time. Any changes
          will be effective immediately upon posting the updated Terms on the
          Site. Your continued use of the Site after any such changes
          constitutes your acceptance of the new Terms.
        </p>

        <h2 className="mb-2 text-2xl font-bold text-meta-purple-1">
          Contact Information
        </h2>
        <p className="mb-2">
          If you have any questions or concerns about these Terms, please
          contact us at: CLUSTER CERTIFY RECRUIT PRIVATE LIMITED
        </p>
        <p className="text-base font-medium">
          201, Platinum Hub, near Central Bank, Near Tulsidham Char Rasta,
          Manjit Nagar, GIDC Industrial Area, Manjalpur, Vadodara, Gujarat
          390011
        </p>
        <div className="text-base font-medium">
          <div className="flex items-center">
            <p>Email : </p>
            <a
              title="Our email"
              aria-label="Our email"
              href="mailto:info@certifyrecruit.io"
              className="ml-1 transition-colors duration-300 hover:text-meta-blue-1"
            >
              info@certifyrecruit.io
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
  );
};

export default Page;
