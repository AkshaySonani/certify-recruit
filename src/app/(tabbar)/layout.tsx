'use client';
import { ROUTE } from '@/service/Helper';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isFullScreenRoute = (path: any) =>
    [ROUTE?.MYPROFILE, ROUTE?.QUIZMCQS, ROUTE?.MAIN].some((e) =>
      path.includes(e),
    );
  return (
    <>
      {!isFullScreenRoute(pathname) ? (
        <div className="relative flex w-full ">
          <Sidebar />
          <main className="w-full overflow-x-auto p-10 ">{children}</main>
        </div>
      ) : (
        <main className="w-full overflow-x-auto p-10">{children}</main>
      )}
    </>
  );
}
