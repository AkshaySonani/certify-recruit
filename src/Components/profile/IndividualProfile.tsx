import { useState } from 'react';
import SummaryTab from './SummeryTab';
import KeySkillTab from './KeySkillTab';
import EducationTab from './EducationTab';
import CareerInfoTab from './CareerInfoTab';
import UploadResumeTab from './UploadResumeTab';
import 'react-datepicker/dist/react-datepicker.css';
import PersonalDetailsTab from './PersonalDetailsTab';
import BankDetailsTab from './BankDetailsTab';

const page = [
  { id: 1, page: 'Profile Summary' },
  { id: 2, page: 'Resume' },
  { id: 3, page: 'Key skill' },
  { id: 4, page: 'Education' },
  { id: 5, page: 'Personal Detail' },
  { id: 6, page: 'Career info' },
  { id: 7, page: 'Bank Details' },
];

const IndividualProfile = ({
  languageList,
  collegeList,
  degreeList,
  citiesData,
  userDetails,
  session,
  getUserDataApiCall,
}: any) => {
  // const [activePage, setActivePage] = useState(4);
  const [activePage, setActivePage] = useState(1);
  return (
    <div className="mt-5">
      <div className="flex w-[80%] justify-around">
        {page?.map((list: any, i) => {
          return (
            <div
              onClick={() => setActivePage(list?.id)}
              className={`cursor-pointer text-sm font-medium ${
                activePage === list?.id
                  ? 'text-meta-blue-1'
                  : 'text-meta-light-blue-3'
              }`}
            >
              {list?.page}
            </div>
          );
        })}
      </div>
      <div className="my-3 w-full border border-meta-light-blue-1" />

      <div>
        {activePage === page[0]?.id && (
          <SummaryTab
            session={session}
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}
        {activePage === page[1]?.id && (
          <UploadResumeTab
            session={session}
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}
        {activePage === page[2]?.id && (
          <KeySkillTab
            session={session}
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}

        {activePage === page[3]?.id && (
          <EducationTab
            session={session}
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            degreeList={degreeList}
            collegeList={collegeList}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}
        {activePage === page[4]?.id && (
          <PersonalDetailsTab
            session={session}
            languageList={languageList}
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}
        {activePage === page[5]?.id && (
          <CareerInfoTab
            session={session}
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}
        {activePage === page[6]?.id && (
          <BankDetailsTab
            session={session}
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}
      </div>
    </div>
  );
};
export default IndividualProfile;
