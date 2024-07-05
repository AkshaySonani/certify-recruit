'use client';
import Sidebar from './Sidebar';
import API from '@/service/ApiService';
import { ROUTE } from '@/service/Helper';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';
import AppContext from '@/context/AppProvider';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const context = useContext(AppContext);

  const isFullScreenRoute = (path: any) =>
    [
      ROUTE?.MYPROFILE,
      ROUTE?.MAIN,
      ROUTE?.CHOOSE_CATEGORY,
      ROUTE?.EXAM,
      ROUTE?.QUIZ,
    ].some((e) => path.includes(e));

  return (
    <>
      {!isFullScreenRoute(pathname) ? (
        <div className="relative flex w-full ">
          <Sidebar />
          <main className="w-full overflow-x-auto p-10">{children}</main>
        </div>
      ) : (
        <main className="h-screen w-full overflow-x-auto p-10">{children}</main>
      )}
    </>
  );
}
