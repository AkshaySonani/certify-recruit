'use client';
import Image from 'next/image';
import Button from '../Button';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE, TEXT } from '@/service/Helper';
import { usePathname } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);
  const pathname = usePathname();
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
    <header className="bg-white py-[25px]">
      <nav className="mx-auto h-full  px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between">
          <div className="flex justify-center">
            <Image
              width={200}
              height={56}
              alt="MainLogo"
              src={'/MainLogo.svg'}
              className="w-44 sm:w-52"
            />
          </div>

          <div className="flex items-center lg:order-2">
            <div className="hidden md:block">
              <Button
                title={TEXT?.LOG_IN}
                type="button"
                handleClick={() => {
                  console.log('hello');
                  router.push(ROUTE?.LOGIN);
                }}
                titleClass="!text-base !text-white"
                btnClass="!w-32 !rounded-lg !bg-meta-blue-1 !py-2 !mb-0"
              />
            </div>
            <p
              onClick={() => setNavbar(!navbar)}
              className="block cursor-pointer md:hidden"
            >
              {navbar ? (
                <Image
                  width={20}
                  height={20}
                  alt="close"
                  className="w-6"
                  src={'/home/close.svg'}
                />
              ) : (
                <Image
                  width={20}
                  alt="menu"
                  height={20}
                  className="w-6"
                  src={'/home/menu.svg'}
                />
              )}
            </p>
          </div>
          <div className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto">
            <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
              {NAV_ARR?.map((ele) => {
                return (
                  <p
                    onClick={() => router.push(ele?.route)}
                    className={`bg-primary-700 lg:text-primary-700 block cursor-pointer rounded py-2 pl-3 pr-4 text-base font-medium  hover:text-meta-blue-1 lg:bg-transparent lg:p-0 ${pathname === ele?.route ? 'text-meta-blue-1' : 'text-meta-gray-1'}`}
                    aria-current="page"
                  >
                    {ele?.title}
                  </p>
                );
              })}
            </ul>
          </div>
        </div>
        {navbar ? (
          <div className="flex w-full flex-col items-center justify-center bg-gray-100 md:hidden">
            {NAV_ARR?.map((list, idx) => {
              return (
                <div
                  key={list?.id}
                  //   initial={{ scale: 0, opacity: 0 }}
                  //   animate={{ scale: 1, opacity: 1 }}
                  //   transition={{
                  //     type: 'spring',
                  //     stiffness: 260,
                  //     damping: 20,
                  //     delay: 0.1 + idx / 10,
                  //   }}
                  //   aria-current="page"
                  className="text-body-sm text-meta-grey-2 group relative z-[1] m-2 inline-flex cursor-pointer hover:text-white"
                >
                  <p
                    className={`bg-primary-700 lg:text-primary-700 block cursor-pointer rounded py-1 pl-3 pr-4 text-base font-medium  hover:text-meta-blue-1 lg:bg-transparent lg:p-0 ${pathname === list?.route ? 'text-meta-blue-1' : 'text-meta-gray-1'}`}
                    aria-current="page"
                  >
                    {list?.title}
                  </p>
                </div>
              );
            })}
            <div className="block md:hidden">
              <Button
                title={TEXT?.LOG_IN}
                titleClass="!text-base !text-white"
                handleClick={() => router.push(ROUTE?.LOGIN)}
                btnClass="!w-32 !rounded-lg !bg-meta-blue-1 !py-2 !mb-0"
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </nav>
    </header>
  );
};

export default Header;
