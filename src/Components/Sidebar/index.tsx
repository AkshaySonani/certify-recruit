"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 border-r border-[#DCE7FF] flex justify-between h-screen w-72 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div>
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-center my-10 gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              width={199}
              height={33}
              src={"/MainLogo.svg"}
              alt="Logo"
              priority
            />
          </Link>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="px-4 lg:px-6">
            {/* <!-- Menu Group --> */}
            <div>


              <ul className="mb-6 flex flex-col gap-1.5">


                {/* <!-- Menu Item Dashboard --> */}
                <li>
                  <Link
                    href="/dashboard"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/" || pathname.includes("dashboard")) && "bg-button/primary text-white dark:bg-meta-4"}`}
                  >
                    <Image src={"/sidebarIcon/dashboard.svg"} alt="dashboardIcon" width={20} height={20} />
                    Dashboard
                  </Link>
                </li>
                {/* <!-- Menu Item Dashboard --> */}

                {/* <!-- Menu Item Job Posting --> */}
                <li>
                  <Link
                    href="/job_posting"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("job_posting") &&
                      "bg-button/primary dark:bg-meta-4"
                      }`}
                  >
                    <Image src={"/sidebarIcon/jobPosting.svg"} alt="dashboardIcon" width={20} height={20} />
                    Job Posting
                  </Link>
                </li>
                {/* <!-- Menu Item Job Posting --> */}

                {/* <!-- Menu Item Job --> */}
                <li>
                  <Link
                    href="/job"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname.includes("job") && !pathname.includes("posting")) && "bg-button/primary dark:bg-meta-4"
                      }`}
                  >
                    <Image src={"/sidebarIcon/jobPosting.svg"} alt="dashboardIcon" width={20} height={20} />
                    Job
                  </Link>
                </li>
                {/* <!-- Menu Item Job --> */}

                {/* <!-- Menu Item Pricing --> */}
                <li>
                  <Link
                    href="/pricing"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("pricing") && "bg-button/primary dark:bg-meta-4"
                      }`}
                  >
                    <Image src={"/sidebarIcon/pricing.svg"} alt="dashboardIcon" width={20} height={20} />
                    Pricing
                  </Link>
                </li>
                {/* <!-- Menu Item Pricing --> */}

                {/* <!-- Menu Item Search CVs --> */}
                <li>
                  <Link
                    href="/search_CVs"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("search_CVs") &&
                      "bg-button/primary dark:bg-meta-4"
                      }`}
                  >
                    <Image src={"/sidebarIcon/jobPosting.svg"} alt="dashboardIcon" width={20} height={20} />
                    Search CVs
                  </Link>
                </li>
                {/* <!-- Menu Item Search CVs --> */}
                {/* <!-- Menu Item Users --> */}
                <li>
                  <Link
                    href="/users"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("users") &&
                      "bg-button/primary dark:bg-meta-4"
                      }`}
                  >
                    <Image src={"/sidebarIcon/jobPosting.svg"} alt="dashboardIcon" width={20} height={20} />
                    Users
                  </Link>
                </li>
                {/* <!-- Menu Item Users --> */}
                {/* <!-- Menu Item Company info --> */}
                <li>
                  <Link
                    href="/company_info"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("company_info") &&
                      "bg-button/primary dark:bg-meta-4"
                      }`}
                  >
                    <Image src={"/sidebarIcon/jobPosting.svg"} alt="dashboardIcon" width={20} height={20} />
                    Company info
                  </Link>
                </li>
                {/* <!-- Menu Item Company info --> */}
                {/* <!-- Menu Item Earn Badge --> */}
                <li>
                  <Link
                    href="/earn_badge"
                    className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes("earn_badge") &&
                      "bg-button/primary dark:bg-meta-4"
                      }`}
                  >
                    <Image src={"/sidebarIcon/jobPosting.svg"} alt="dashboardIcon" width={20} height={20} />
                    Earn Badge
                  </Link>
                </li>
                {/* <!-- Menu Item Earn Badge --> */}
              </ul>
            </div>


          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>

      </div>

      <div>profile</div>
    </aside>
  );
};

export default Sidebar;
