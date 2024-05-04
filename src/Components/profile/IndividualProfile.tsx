import { Fragment, useEffect, useState } from "react";
import { TEXT } from "@/service/Helper";
import API from "@/service/ApiService";
import { API_CONSTANT } from "@/constant/ApiConstant";
import * as Yup from "yup";
import { useFormik, Field } from "formik";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import CareerInfoTab from "./CareerInfoTab";
import PersonalDetailsTab from "./PersonalDetailsTab";
import EducationTab from "./EducationTab";
import KeySkillTab from "./KeySkillTab";
import UploadResumeTab from "./UploadResumeTab";
import SummaryTab from "./SummeryTab";

const page = [
  { id: 1, page: "Profile Summary" },
  { id: 2, page: "Resume" },
  { id: 3, page: "Key skill" },
  { id: 4, page: "Education" },
  { id: 5, page: "Personal Detail" },
  { id: 6, page: "Career info" },
];

const IndividualProfile = ({
  languageList,
  collegeList,
  degreeList,
  citiesData,
  userDetails,
  session,
}: any) => {
  // const [activePage, setActivePage] = useState(4);
  const [activePage, setActivePage] = useState(1);
  const [skillData, setSkillData] = useState([]);

  const city = [
    { _id: "662ccb4a52f81a3100514885", name: "surat" },
    { _id: "662a8768683fb48bab4be172", name: "Ahemedabad" },
    { _id: "662a8768683fb48bab4be173", name: "Baroda" },
    { _id: "662a8768683fb48bab4be174", name: "Rajkot" },
    { _id: "662a8768683fb48bab4be175", name: "Botad" },
    { _id: "662a8768683fb48bab4be176", name: "pune" },
  ];

  const getSkillDataApi = () => {
    API.get(API_CONSTANT?.CATEGORY)
      .then((res) => {
        let skiilArr = res?.data?.data?.map((list: any) => {
          return {
            _id: list?._id,
            label: list?.subcategory,
            value: list?.subcategory,
          };
        });
        setSkillData(skiilArr);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response?.data?.error);
      });
  };
  useEffect(() => {
    // getCityDataApi();
    getSkillDataApi();
  }, []);

  return (
    <div className="mt-5">
      <div className="flex w-[80%] justify-around">
        {page?.map((list: any, i) => {
          return (
            <div
              onClick={() => setActivePage(list?.id)}
              className={`cursor-pointer text-sm font-medium ${
                activePage === list?.id
                  ? "text-meta-blue-1"
                  : "text-meta-light-blue-3"
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
          />
        )}
        {activePage === page[1]?.id && (
          <UploadResumeTab
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
          />
        )}
        {activePage === page[2]?.id && (
          <>
            <KeySkillTab
              skillData={skillData}
              setActivePage={setActivePage}
              userDetails={userDetails}
              activePage={activePage}
            />
          </>
        )}

        {activePage === page[3]?.id && (
          <>
            <EducationTab
              setActivePage={setActivePage}
              userDetails={userDetails}
              activePage={activePage}
              degreeList={degreeList}
              collegeList={collegeList}
            />
          </>
        )}
        {activePage === page[4]?.id && (
          <>
            <PersonalDetailsTab
              languageList={languageList}
              setActivePage={setActivePage}
              userDetails={userDetails}
              activePage={activePage}
            />
          </>
        )}
        {activePage === page[5]?.id && (
          <CareerInfoTab
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
            cityData={city}
          />
        )}
      </div>
    </div>
  );
};
export default IndividualProfile;
