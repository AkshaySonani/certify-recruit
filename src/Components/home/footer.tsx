'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const NAV_ARR = [
    {
      id: 1,
      title: 'Home',
      route: '/',
    },
    {
      id: 2,
      title: 'About Us',
      route: '/aboutUs',
    },
    {
      id: 3,
      title: 'Expert talk',
      route: '/expert_talk',
    },
    {
      id: 4,
      title: 'Features',
      route: '/features',
    },
    {
      id: 4,
      title: 'Contact Us',
      route: '/contactUs',
    },
  ];

  return (
    <div className="mx-auto h-full px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
      <div className="row-gap-6 mb-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Image
            width={200}
            height={56}
            alt="MainLogo"
            src={'/MainLogo.svg'}
            className="w-44 sm:w-52"
          />
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm font-medium text-meta-light-blue-3">
              CertifyRecruit is an online platform for assessing recruitment
              skills. It offers tools to evaluate sourcing, interviewing, and
              decision-making. Users gain insights into strengths and areas to
              improve. Employers can certify candidates and employees in
              recruitment tasks, determining role suitability decisions.
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <Image
              width={20}
              height={20}
              alt="close"
              src={'/home/fb.svg'}
              className="mr-2 w-7 cursor-pointer"
            />
            <Image
              width={20}
              height={20}
              alt="close"
              src={'/home/linkdin.svg'}
              className="mr-2 w-7 cursor-pointer"
            />
            <Image
              width={20}
              height={20}
              alt="close"
              src={'/home/insta.svg'}
              className="mr-2 w-7 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-meta-blue-1">
            Quick Links
          </p>
          <div className="flex flex-col items-start">
            {NAV_ARR?.map((ele) => {
              return (
                <Link
                  href={ele?.route}
                  className="my-1 mr-1 cursor-pointer text-sm font-medium text-meta-light-blue-3 hover:text-meta-blue-1"
                >
                  {ele?.title}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-meta-blue-1">
            Contact Us
          </p>
          <div className="flex items-center">
            <Image
              width={20}
              height={20}
              alt="close"
              className="mr-2 w-7"
              src={'/home/phone.svg'}
            />
            <a
              href="tel:+91 9157350298"
              aria-label="Our phone"
              title="Our phone"
              className="text-sm font-medium text-meta-light-blue-3 transition-colors duration-300 hover:text-meta-blue-1"
            >
              +91 9157350298
            </a>
          </div>
          <div className="flex items-center">
            <Image
              width={20}
              height={20}
              alt="close"
              className="mr-2 w-7"
              src={'/home/mail.svg'}
            />
            <a
              href="mailto:Info@Certifyrecruit.Com"
              aria-label="Our email"
              title="Our email"
              className="text-sm font-medium text-meta-light-blue-3 transition-colors duration-300 hover:text-meta-blue-1"
            >
              Info@Certifyrecruit.Com
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between border-t pb-10 pt-5 lg:flex-row">
        <p className="text-sm text-gray-600">
          © 2024 · Certifyrecruit Private Limited
        </p>
        <ul className="mb-3 flex flex-col space-y-2 sm:flex-row sm:space-x-5 sm:space-y-0 lg:mb-0">
          <li>
            <a
              href="/refund_policy"
              className="hover:text-deep-purple-accent-400 text-sm text-gray-600 transition-colors duration-300"
            >
              Refund Policy
            </a>
          </li>
          <li>
            <a
              href="/privacy_policy"
              className="hover:text-deep-purple-accent-400 text-sm text-gray-600 transition-colors duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/terms_of_use"
              className="hover:text-deep-purple-accent-400 text-sm text-gray-600 transition-colors duration-300"
            >
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
