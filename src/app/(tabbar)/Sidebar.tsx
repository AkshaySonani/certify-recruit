import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ROUTE } from "@/service/Helper";

const sideBarData = [
  {
    path: "dashboard",
    icon: "/sidebarIcon/dashboard.svg",
    title: "Dashboard",
  },
  {
    path: "job_posting",
    icon: "/sidebarIcon/jobPosting.svg",
    title: "Job Posting",
  },
  {
    path: "job",
    icon: "/sidebarIcon/jobPosting.svg",
    title: "Job",
  },
  {
    path: "pricing",
    icon: "/sidebarIcon/pricing.svg",
    title: "Pricing",
  },
  {
    path: "search_CVs",
    icon: "/sidebarIcon/dashboard.svg",
    title: "Search CVs",
  },
  {
    path: "users",
    icon: "/sidebarIcon/dashboard.svg",
    title: "Users",
  },
  {
    path: "company_info",
    icon: "/sidebarIcon/dashboard.svg",
    title: "Company info",
  },
  {
    path: "earn_badge",
    icon: "/sidebarIcon/dashboard.svg",
    title: "Earn Badge",
  },
  {
    path: "learn&earn",
    icon: "/sidebarIcon/dashboard.svg",
    title: "Learn & Earn",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const activeTabCss = (path: string) =>
    pathname.split("/")[1] === path
      ? "bg-meta-blue-2 text-white dark:bg-meta-4"
      : "";

  return (
    <aside
      className="border-r z-[9999] sticky top-0   border-meta-light-blue-1 flex justify-between h-screen overflow-y-auto min-w-72 w-72 flex-col  bg-white duration-300 ease-linear dark:bg-boxdark"
    >
      <div>
        <div className="flex items-center justify-center my-10 gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image
              priority
              alt="Logo"
              width={199}
              height={33}
              src={"/MainLogo.svg"}
            />
          </Link>

          <button aria-controls="sidebar" className="block lg:hidden">
            <svg
              width="20"
              height="18"
              fill="none"
              viewBox="0 0 20 18"
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        <nav className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear px-4 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            {sideBarData.map((e) => (
              <li key={e.title}>
                <Link
                  href={"/" + e.path}
                  className={
                    activeTabCss(e.path) +
                    "group relative flex items-center gap-2.5 rounded-sm px-4 py-2.5 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                  }
                >
                  <Image
                    width={20}
                    height={20}
                    src={e.icon}
                    alt="dashboardIcon"
                  />
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Link href={ROUTE?.MYPROFILE} className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className="mr-4">
            <Image
              alt="Icon"
              width={39}
              height={39}
              src={"/sidebarIcon/profile.svg"}
              className="p-0.5 border border-meta-blue-1 rounded-xl"
            />
          </div>
          <div>
            <div>Dori Doreau</div>
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
