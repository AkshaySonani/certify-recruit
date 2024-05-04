import { Fragment, useState } from "react";
import { TEXT } from "@/service/Helper";
import BasicDetails from "./BasicDetailsTab";
import CompanyDetailsTab from "./CompanyDetailsTab";
import KYCDetailsTab from "./KYCDetailsTab";
const TAB = [
  {
    id: 1,
    label: TEXT?.BASIC_DETAIL,
  },
  {
    id: 2,
    label: TEXT?.Company_Detail,
  },
  {
    id: 3,
    label: TEXT?.KYC_Compliance_Detail,
  },
];
const CompanyProfile = ({ userDetails, session }: any) => {
  const [activePage, setActivePage] = useState(TAB[0]?.id);

  return (
    <div className="mt-5">
      <div className="flex w-3/5 justify-around">
        {TAB?.map((list: any) => {
          return (
            <div
              onClick={() => setActivePage(list.id)}
              className={`cursor-pointer text-sm font-medium ${
                activePage === list?.id
                  ? "text-meta-blue-1"
                  : "text-meta-light-blue-3"
              }`}
            >
              {list?.label}
            </div>
          );
        })}
      </div>
      <div className="my-3 w-full border border-meta-light-blue-1" />

      <div>
        {activePage === 1 && (
          <BasicDetails
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
          />
        )}
        {activePage === 2 && (
          <CompanyDetailsTab
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
          />
        )}
        {activePage === 3 && (
          <KYCDetailsTab
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
          />
        )}
      </div>
    </div>
  );
};
export default CompanyProfile;
