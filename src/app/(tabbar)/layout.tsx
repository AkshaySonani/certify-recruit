"use client";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname=usePathname()
  return (
    <div className={`${pathname!=="/myProfile" ? "flex" : ""}  relative w-full`}>
      {pathname!=="/myProfile" &&   <Sidebar />}
      <main className={`${pathname!=="/myProfile" ? "lg:w-[calc(100%-288px)] overflow-x-auto" :"" } p-10 `}>{children}</main>
    </div>
  );
}
