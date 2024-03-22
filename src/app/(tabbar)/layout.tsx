"use client";

import Sidebar from "./Sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex relative w-full ">
      <Sidebar />
      <main className="p-10 lg:w-[calc(100%-288px)] overflow-x-auto">{children}</main>
    </div>
  );
}
