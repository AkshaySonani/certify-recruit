import Link from 'next/link';
import Image from 'next/image';
import Pricing from '@/svg/Pricing';
import Spinner from '../icons/Spinner';
import AppContext from '@/context/AppProvider';
import { Menu, Transition } from '@headlessui/react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ROUTE, SIDE_BAR_DATA, TEXT, USER_ROLE } from '@/service/Helper';

const Sidebar = () => {
  const router = useRouter();
  const session: any = useSession();
  const pathname = usePathname();
  const context = useContext(AppContext);

  const [open, setOpen] = useState(true);
  const [percentage, setPercentage] = useState(0);

  const activeTabCss = (path: string) =>
    pathname.split('/')[1] === path
      ? 'bg-meta-blue-2 text-white dark:bg-meta-4'
      : percentage <= 99
        ? 'text-meta-gray-1'
        : '';

  useEffect(() => {
    // if (
    //   Object?.keys(context?.userProfileCount)?.length !== 0 &&
    //   context?.userProfileCount !== undefined
    // ) {
    //   handlePercentage();
    // }
    handlePercentage();
  }, [context?.userProfileCount]);

  const handlePercentage = () => {
    if (context?.userProfileCount && context?.userProfileCount !== undefined) {
      if (session?.data?.user?.role === USER_ROLE?.EMPLOYEE) {
        setPercentage(
          context?.userProfileCount?.basic_details +
            context?.userProfileCount?.company_details +
            context?.userProfileCount?.kyc_details,
        );
      } else {
        setPercentage(
          context?.userProfileCount?.career_details +
            context?.userProfileCount?.education_details +
            context?.userProfileCount?.personal_details +
            context?.userProfileCount?.resume_details +
            context?.userProfileCount?.skill_details +
            context?.userProfileCount?.bank_details +
            context?.userProfileCount?.summary_details,
        );
      }
    }
  };

  return (
    <aside
      className={`${
        open ? 'w-[100px] lg:w-72 lg:min-w-72' : 'w-72 min-w-72'
      } dark:bg-boxdark sticky top-0 z-[9999] flex h-screen flex-col justify-between overflow-y-auto border-r border-meta-light-blue-1 bg-white duration-300 ease-linear`}
    >
      <div>
        <div
          className={`${open ? 'justify-center px-5' : 'justify-start px-8'} py-5.5 lg:py-6.5 my-10 flex w-full items-center gap-2 lg:w-max`}
        >
          <Link href="/" className={`hidden lg:block`}>
            <Image
              priority
              alt="Logo"
              width={199}
              height={33}
              src={'/MainLogo.svg'}
            />
          </Link>

          <button
            aria-controls="sidebar"
            onClick={() => setOpen(!open)}
            className={`block lg:hidden`}
          >
            <Image
              priority
              alt="Logo"
              width={40}
              height={40}
              src={'/sidebarIcon/hamburger.svg'}
            />
          </button>
        </div>
        {session?.data?.user?.role !== undefined ? (
          <nav className="no-scrollbar flex flex-col overflow-y-auto px-3 duration-300 ease-linear sm:px-4 lg:px-5">
            <ul className="mb-6 flex flex-col gap-1.5">
              {SIDE_BAR_DATA[session?.data?.user?.role]?.map((e: any) => (
                <li key={e.title}>
                  <button
                    type="button"
                    onClick={() => {
                      percentage >= 100 && router.push('/' + e.path);
                    }}
                    className={
                      activeTabCss(e.path) +
                      `${open ? ' justify-center lg:justify-normal' : 'justify-start'} hover:bg-graydark dark:hover:bg-meta-4 group relative flex w-full items-center gap-2.5 rounded-lg py-2.5 font-medium duration-300 ease-in-out sm:px-4`
                    }
                  >
                    <e.icon
                      width={20}
                      height={20}
                      color={
                        pathname.split('/')[1] === e?.path
                          ? 'white'
                          : percentage <= 99
                            ? '#B9B9B9'
                            : '#49556F'
                      }
                    />
                    <p className={`${open ? 'hidden lg:block' : 'block'}`}>
                      {e.title}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Spinner
              width="32px"
              height="32px"
              color="#3751F2"
              className="spinner"
            />
          </div>
        )}
      </div>
      <div className="relative inline-block text-left">
        <Menu as="div">
          <Menu.Button className="inline-flex w-full justify-center lg:justify-normal">
            <div className="mb-5 flex lg:px-6">
              <div className="flex items-center">
                <div className={`${open ? 'px-0' : ''} px-2 sm:px-4`}>
                  <Image
                    alt="Icon"
                    width={39}
                    height={39}
                    src={'/sidebarIcon/profile.svg'}
                    className="rounded-xl border border-meta-blue-1 p-0.5"
                  />
                </div>
                <div className={`${open ? 'hidden lg:block' : 'block'}`}>
                  <div>Dori Doreau</div>
                </div>
              </div>
            </div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -top-2 right-0 w-full origin-top-right -translate-y-full transform divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none lg:w-60">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push(ROUTE?.MYPROFILE)}
                      className={`${
                        active ? 'bg-meta-blue-1 text-white' : 'text-gray-900'
                      } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm font-medium lg:justify-normal`}
                    >
                      <Image
                        width={30}
                        height={30}
                        alt="EditUser"
                        src={'/sidebarIcon/EditUser.svg'}
                        className="block transition ease-in-out group-hover:invert lg:hidden"
                      />

                      <p className="hidden lg:block">{TEXT?.EDIT_PROFILE}</p>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-meta-blue-1 text-white' : 'text-gray-900'
                      } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm font-medium lg:justify-normal`}
                    >
                      <Image
                        width={30}
                        height={30}
                        alt="ResetPassword"
                        src={'/sidebarIcon/ResetPassword.svg'}
                        className="block transition ease-in-out group-hover:invert lg:hidden"
                      />
                      <p className="hidden lg:block">{TEXT?.RESET_PASSWORD}</p>
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        localStorage.removeItem('userRole');
                        signOut({
                          callbackUrl: process.env.NEXTAUTH_URL,
                        });

                        router.replace(ROUTE?.LOGIN);
                      }}
                      className={`${
                        active ? 'bg-meta-blue-1 text-white' : 'text-gray-900'
                      } group flex w-full items-center justify-center rounded-md px-2 py-2 text-sm font-medium lg:justify-normal`}
                    >
                      <Image
                        width={30}
                        height={30}
                        alt="logout"
                        src={'/sidebarIcon/Logout.svg'}
                        className="block transition ease-in-out group-hover:invert lg:hidden"
                      />
                      <p className="hidden lg:block">{TEXT?.LOG_OUT}</p>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="px-4">
          <button
            onClick={() => percentage >= 100 && router.push(ROUTE?.PRICING)}
            type="button"
            className={`${percentage >= 100 ? 'bg-hiring-btn-gradient text-white' : 'bg-meta-gray-1 text-black'} mb-4 flex w-full items-center justify-center rounded-lg p-3 font-medium lg:justify-normal`}
          >
            <div className="lg:mr-2">
              <Pricing
                width={20}
                height={20}
                color={percentage >= 100 ? 'white' : 'black'}
              />
            </div>
            <p className="hidden pl-2 lg:block">{TEXT?.PRICING}</p>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
