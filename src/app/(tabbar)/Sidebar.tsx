import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { ROUTE, SIDE_BAR_DATA } from '@/service/Helper';

const sideBarData = [
  {
    path: 'dashboard',
    icon: '/sidebarIcon/dashboard.svg',
    title: 'Dashboard',
  },
  {
    path: 'job_posting',
    icon: '/sidebarIcon/jobPosting.svg',
    title: 'Job Posting',
  },
  {
    path: 'job',
    icon: '/sidebarIcon/jobPosting.svg',
    title: 'Job',
  },
  {
    path: 'pricing',
    icon: '/sidebarIcon/pricing.svg',
    title: 'Pricing',
  },
  {
    path: 'search_CVs',
    icon: '/sidebarIcon/dashboard.svg',
    title: 'Search CVs',
  },
  {
    path: 'users',
    icon: '/sidebarIcon/dashboard.svg',
    title: 'Users',
  },
  {
    path: 'company_info',
    icon: '/sidebarIcon/dashboard.svg',
    title: 'Company info',
  },
  {
    path: 'earn_badge',
    icon: '/sidebarIcon/dashboard.svg',
    title: 'Earn Badge',
  },
  {
    path: 'learn&earn',
    icon: '/sidebarIcon/dashboard.svg',
    title: 'Learn & Earn',
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const activeTabCss = (path: string) =>
    pathname.split('/')[1] === path
      ? 'bg-meta-blue-2 text-white dark:bg-meta-4'
      : '';

  return (
    <aside className={`${
      open ? "lg:min-w-72 lg:w-72 w-[100px]" : "min-w-72 w-72"
    } border-r z-[9999] sticky top-0 border-meta-light-blue-1 flex justify-between h-screen overflow-y-auto flex-col bg-white duration-300 ease-linear dark:bg-boxdark`}>
      <div>
        <div className={`${ open ? "justify-center px-5":"justify-start px-8"} flex lg:w-max w-full items-center my-10 gap-2 py-5.5 lg:py-6.5`}>
          <Link href="/" className={`lg:block hidden`}>
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

        <nav className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear px-2 sm:px-4 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {SIDE_BAR_DATA.map((e) => (
              <li key={e.title}>
                <Link
                  href={'/' + e.path}
                  className={
                    activeTabCss(e.path) +
                    `${open ? " lg:justify-normal justify-center" : " justify-start"} group relative flex items-center rounded-lg gap-2.5 px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`
                  }
                >
                  <Image
                    width={20}
                    height={20}
                    src={e.icon}
                    alt="dashboardIcon"
                    className={`${
                      pathname.split('/')[1] === e?.path &&
                      'will-change invert transition duration-300 ease-in-out'
                    } h-6 w-6 sm:h-5 sm:w-5`}
                  />
                  <p className={`${open ? 'hidden lg:block' : 'block'}`}>
                    {e.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Link href={ROUTE?.MYPROFILE} className="flex mb-8 lg:px-6">
        <div className="flex items-center">
          <div className={`${open ? 'ml-2 px-0' : ''} ml-2 sm:px-4 px-2`}>
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
      </Link>
    </aside>
  );
};

export default Sidebar;
