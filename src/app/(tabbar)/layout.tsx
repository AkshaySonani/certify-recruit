'use client';
import Sidebar from './Sidebar';
import API from '@/service/ApiService';
import { ROUTE } from '@/service/Helper';
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';
import AppContext from '@/context/AppProvider';
import { API_CONSTANT } from '@/constant/ApiConstant';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const context = useContext(AppContext);

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res: any) => {
        context?.setUserProfileCount(res?.data?.data.profile_count);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const isFullScreenRoute = (path: any) =>
    [ROUTE?.MYPROFILE, ROUTE?.QUIZMCQS, ROUTE?.MAIN].some((e) =>
      path.includes(e),
    );

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
