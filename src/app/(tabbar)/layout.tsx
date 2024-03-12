"use client";

import Sidebar from "./Sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-10 w-full">{children}</main>
    </div>
  );
}
