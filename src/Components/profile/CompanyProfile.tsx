import { useState } from 'react';
import { TEXT } from '@/service/Helper';
import KYCDetailsTab from './KYCDetailsTab';
import BasicDetails from './BasicDetailsTab';
import CompanyDetailsTab from './CompanyDetailsTab';
import Image from 'next/image';

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
const CompanyProfile = ({
  userDetails,
  session,
  getUserDataApiCall,
  percentage,
  isEdit,
}: any) => {
  const [activePage, setActivePage] = useState(TAB[0]?.id);

  return (
    <>
      {percentage !== 100 || isEdit === true ? (
        <div className="mt-5">
          <div className="flex w-3/5 justify-around">
            {TAB?.map((list: any) => {
              return (
                <div
                  onClick={() => setActivePage(list.id)}
                  className={`cursor-pointer text-sm font-medium ${
                    activePage === list?.id
                      ? 'text-meta-blue-1'
                      : 'text-meta-light-blue-3'
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
                session={session}
                activePage={activePage}
                userDetails={userDetails}
                setActivePage={setActivePage}
                getUserDataApiCall={getUserDataApiCall}
              />
            )}
            {activePage === 2 && (
              <CompanyDetailsTab
                session={session}
                activePage={activePage}
                userDetails={userDetails}
                setActivePage={setActivePage}
                getUserDataApiCall={getUserDataApiCall}
              />
            )}
            {activePage === 3 && (
              <KYCDetailsTab
                session={session}
                activePage={activePage}
                userDetails={userDetails}
                setActivePage={setActivePage}
                getUserDataApiCall={getUserDataApiCall}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="relative m-auto mt-20 h-auto w-[500px] bg-white py-2 shadow">
          <div className=" flex w-full justify-center">
            <Image
              width={73}
              height={73}
              alt="avatar"
              src={
                userDetails?.logo !== ''
                  ? userDetails?.logo
                  : '/profile/placeholder.jpg'
              }
              className="absolute top-[-26px] h-[84px] w-[84px] rounded-full object-cover  p-0.5"
            />
          </div>
          <div className="mt-20 flex w-full flex-col items-center justify-center">
            <p className="text-xl font-medium text-meta-purple-1">
              {userDetails?.user_name}
            </p>
            <p className="pt-1 text-xl font-medium text-meta-purple-1">
              {userDetails?.company_name}
            </p>
            <div className="mt-1 flex gap-2">
              <Image width={16} height={16} alt="MainLogo" src={'/mail.svg'} />
              <p className="text-sm text-meta-light-blue-3">
                {userDetails?.contact_email}
              </p>
            </div>
            <div className="mt-1 flex gap-3">
              <div className="flex gap-2">
                <Image
                  width={16}
                  height={16}
                  alt="MainLogo"
                  src={'/location.svg'}
                />
                <p className="text-sm text-meta-light-blue-3">
                  {userDetails?.street_address}
                </p>
              </div>
              <div className="flex gap-2">
                <Image
                  width={16}
                  height={16}
                  alt="MainLogo"
                  src={'/location.svg'}
                />
                <p className="text-sm text-meta-light-blue-3">
                  {userDetails?.street_address}
                </p>
              </div>
            </div>
            <div className="mt-1 flex gap-2">
              <Image width={16} height={16} alt="MainLogo" src={'/call.svg'} />
              <p className="text-sm text-meta-light-blue-3">
                {userDetails?.contact_number}
              </p>
            </div>
          </div>
          <div className="mt-5 flex justify-around border-b border-t px-3 py-3">
            {TAB?.map((list: any) => {
              return (
                <div
                  onClick={() => setActivePage(list.id)}
                  className={`cursor-pointer text-sm font-medium ${
                    activePage === list?.id
                      ? 'text-meta-blue-1'
                      : 'text-meta-light-blue-3'
                  }`}
                >
                  {list?.label}
                </div>
              );
            })}
          </div>
          {activePage === 1 && (
            <div className="mt-4 px-5">
              <div>
                <p className="text-base  text-meta-purple-1">UserName</p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.user_name}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-base  text-meta-purple-1">Role</p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.role}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-base  text-meta-purple-1">Email</p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.contact_email}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-base  text-meta-purple-1">Phone Number</p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.contact_number}
                </p>
              </div>
            </div>
          )}
          {activePage === 2 && (
            <div className="mt-4 px-5">
              <div>
                <p className="text-base  text-meta-purple-1">Company Type</p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.company_type}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-base  text-meta-purple-1">Company Name</p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.company_name}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-base  text-meta-purple-1">Website URL</p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.website_url}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-base  text-meta-purple-1">Location</p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.state?.name}
                </p>
              </div>
            </div>
          )}
          {activePage === 3 && (
            <div className="mt-4 px-5">
              <div>
                <p className="text-base  text-meta-purple-1">PAN Number</p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.pan_number}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-base  text-meta-purple-1">
                  Name on PAN Card
                </p>
                <p className="pt-2 text-base font-semibold text-meta-purple-1">
                  {userDetails?.name_on_pan}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default CompanyProfile;
