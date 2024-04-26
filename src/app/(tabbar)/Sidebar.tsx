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

  console.log('open', open);

  return (
    <aside className="dark:bg-boxdark sticky top-0 z-[9999]   flex h-screen w-72 min-w-72 flex-col justify-between overflow-y-auto border-r  border-meta-light-blue-1 bg-white duration-300 ease-linear">
      <div>
        <div className="py-5.5 lg:py-6.5 my-10 flex items-center justify-center gap-2 px-6">
          <Link href="/">
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

        <nav className="no-scrollbar flex flex-col overflow-y-auto px-4 duration-300 ease-linear lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {SIDE_BAR_DATA.map((e) => (
              <li key={e.title}>
                <Link
                  href={'/' + e.path}
                  className={
                    activeTabCss(e.path) +
                    'text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium duration-300 ease-in-out'
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
      <Link href={ROUTE?.MYPROFILE} className="mb-8 flex justify-center">
        <div className="flex items-center">
          <div className={`${open ? 'ml-2 px-0' : ''} ml-2 px-4`}>
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
