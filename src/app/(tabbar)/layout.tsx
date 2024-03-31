"use client";
import { ROUTE } from "@/service/Helper";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname=usePathname()
  return (
    <div className={`${pathname!==ROUTE?.MYPROFILE ? "flex" : ""}  relative w-full`}>
      {pathname!==ROUTE?.MYPROFILE &&   <Sidebar />}
      <main className={`${pathname!==ROUTE?.MYPROFILE ? "lg:w-[calc(100%-288px)] overflow-x-auto" :"" } p-10 `}>{children}</main>
    </div>
  );
}
