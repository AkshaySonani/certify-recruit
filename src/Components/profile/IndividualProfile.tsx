import { useState } from 'react';
import SummaryTab from './SummeryTab';
import KeySkillTab from './KeySkillTab';
import EducationTab from './EducationTab';
import CareerInfoTab from './CareerInfoTab';
import UploadResumeTab from './UploadResumeTab';
import 'react-datepicker/dist/react-datepicker.css';
import PersonalDetailsTab from './PersonalDetailsTab';

const page = [
  { id: 1, page: 'Profile Summary' },
  { id: 2, page: 'Resume' },
  { id: 3, page: 'Key skill' },
  { id: 4, page: 'Education' },
  { id: 5, page: 'Personal Detail' },
  { id: 6, page: 'Career info' },
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
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}
        {activePage === page[1]?.id && (
          <UploadResumeTab
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}
        {activePage === page[2]?.id && (
          <KeySkillTab
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}

        {activePage === page[3]?.id && (
          <EducationTab
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
            languageList={languageList}
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            getUserDataApiCall={getUserDataApiCall}
          />
        )}
        {activePage === page[5]?.id && (
          <CareerInfoTab
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
