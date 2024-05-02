import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { Combobox, Menu, Transition } from '@headlessui/react';
import { TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';
import { toast } from 'react-toastify';
import {
  COMPLETION_DATE,
  GENDER,
  HIGH_EDUCATION,
  PROFICIENCY,
} from '@/constant/Enum';
import MultipleSelectBox from '../MultipleSelectBox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import CareerInfoTab from './CareerInfoTab';
import PersonalDetailsTab from './PersonalDetailsTab';
import EducationTab from './EducationTab';
import KeySkillTab from './KeySkillTab';
import UploadResumeTab from './UploadResumeTab';

const COMPANY_ARR = [
  { id: 1, name: 'Corporate Company' },
  { id: 2, name: 'It Company' },
  { id: 3, name: 'Software Company' },
  { id: 1, name: 'CLient Company' },
];
const city = [
  { _id: '662ccb4a52f81a3100514885', name: 'surat' },
  { _id: '662a8768683fb48bab4be172', name: 'Ahemedabad' },
  { _id: '662a8768683fb48bab4be173', name: 'Baroda' },
  { _id: '662a8768683fb48bab4be174', name: 'Rajkot' },
  { _id: '662a8768683fb48bab4be175', name: 'Botad' },
  { _id: '662a8768683fb48bab4be176', name: 'pune' },
];

const Country = [
  { _id: '662a83d8683fb48bab4bcc70', name: 'India' },
  { _id: '662a83d8683fb48bab4bcc71', name: 'Canada' },
  { _id: '662a83d8683fb48bab4bcc72', name: 'Uk' },
  { _id: '662a83d8683fb48bab4bcc73', name: 'UK' },
  { _id: '662a83d8683fb48bab4bcc74', name: 'USA' },
  { _id: '662a83d8683fb48bab4bcc75', name: 'Germany' },
];

const State = [
  { _id: '662a873b683fb48bab4bcd70', name: 'Gujarat' },
  { _id: '662a873b683fb48bab4bcd71', name: 'Maharashtra' },
  { _id: '662a873b683fb48bab4bcd72', name: 'Bhopal' },
  { _id: '662a873b683fb48bab4bcd73', name: 'Bamyan' },
  { _id: '662a873b683fb48bab4bcd74', name: 'Badakhshan' },
  { _id: '662a873b683fb48bab4bcd75', name: 'La Rioja' },
];

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
}: any) => {
  const [activePage, setActivePage] = useState(1);
  const [skillData, setSkillData] = useState([]);
  const [query, setQuery] = useState('');
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }

  const city = [
    { _id: '662ccb4a52f81a3100514885', name: 'surat' },
    { _id: '662a8768683fb48bab4be172', name: 'Ahemedabad' },
    { _id: '662a8768683fb48bab4be173', name: 'Baroda' },
    { _id: '662a8768683fb48bab4be174', name: 'Rajkot' },
    { _id: '662a8768683fb48bab4be175', name: 'Botad' },
    { _id: '662a8768683fb48bab4be176', name: 'pune' },
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
        console.log('error', error);
        toast.error(error?.response?.data?.error);
      });
  };
  useEffect(() => {
    // getCityDataApi();
    getSkillDataApi();
  }, []);
  const handleSubmit = async (values: any, actions: any) => {
    // if (activePage === 3) {
    //   API.post(API_CONSTANT?.JOB, values)
    //     .then((res) => {
    //       setActivePage(activePage + 1);
    //       toast?.success("Successfully job posting");
    //       actions.setSubmitting(false);
    //     })
    //     .catch((error) => {
    //       console.log("error", error);
    //     });
    // } else {
    setActivePage(activePage + 1);
    actions.setTouched({});
    actions.setSubmitting(false);
    // }
  };

  const validationSchema = [
    Yup.object().shape({
      profile_summary: Yup.string().required('Profile summary is required.'),
    }),
    Yup.object().shape({}),
    Yup.object().shape({
      skills: Yup.array().min(1, `select at least one skill`),
    }),
    Yup.object().shape({
      college_school_name: Yup.string().required(`College name is required.`),
      // degree: Yup.string().required(`Degree is required.`),
      highest_education: Yup.string().required(
        `Please select highest education`,
      ),
      completion_date: Yup.object().shape({
        year: Yup.string().required('Year is required'),
        month: Yup.string().required('Month is required'),
      }),
    }),
    Yup.object().shape({
      gender: Yup.string().required(`Gender is required.`),
      date_of_birth: Yup.string().required(`Date of birth is required.`),
      languages: Yup.array().of(
        Yup.object().shape({
          language: Yup.string().nonNullable('Language is required'),
          proficiency: Yup.string().required('Proficiency is required'),
        }),
      ),
    }),
  ];

  const currentValidationSchema = validationSchema[activePage - 1];
  const formik = useFormik({
    initialValues: {
      resume: '',
      gender: '',
      company_name: '',
      current_location: '',
      expected_salary_upto: '',
      profile_summary: '',
      degree: '',
      date_of_birth: '',
      highest_education: '',
      expected_salary_start_at: '',
      college_school_name: '',
      total_experiences: [
        {
          companyName: '',
          role: '',
          location: null,
          employmentType: '',
          years: '',
          month: '',
          reason_for_leaving: '',
        },
      ],
      skills: [],
      languages: [
        {
          language: null,
          proficiency: '',
        },
      ],
      completion_date: {
        year: '',
        month: '',
      },
      city: null,
      state: null,
      country: null,
    },
    enableReinitialize: true,
    validationSchema: currentValidationSchema,
    onSubmit: handleSubmit,
  });
  let filteredArr = [];
  const searchItems = (arr: any) => {
    filteredArr =
      query === ''
        ? arr
        : arr.filter((list: any) =>
            list.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, '')),
          );
    return filteredArr;
  };
  console.log('formik', formik?.errors);

  // console.log(
  //   "selected month ---->",
  //   COMPLETION_DATE[formik?.values?.completion_date?.month]
  // );

  return (
    <div className="mt-5">
      <div className="flex w-[80%] justify-around">
        {page?.map((list: any, i) => {
          return (
            <div
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
      <form onSubmit={formik.handleSubmit}>
        <div>
          {activePage === page[0]?.id && (
            <>
              <div className="mt-5 flex w-full gap-3 pl-9">
                <div className="w-full">
                  <label className="text-base font-medium text-meta-purple-1">
                    Profile Summary
                  </label>
                  <p className="mb-3 pt-1 text-sm font-medium text-meta-light-blue-3">
                    Your profile summary should mention the highlights of your
                    career and education, what your professional interests are,
                    and what kind of a career you are looking for. Write a
                    meaningful summary of more than 50 characters.
                  </p>
                  <textarea
                    value={formik?.values?.profile_summary}
                    name="profile_summary"
                    onChange={formik.handleChange}
                    placeholder="Summery"
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.profile_summary &&
                    formik.errors.profile_summary && (
                      <div className="error">
                        {formik.errors.profile_summary}
                      </div>
                    )}
                </div>
              </div>
            </>
          )}
          {activePage === page[1]?.id && <UploadResumeTab />}
          {activePage === page[2]?.id && (
            <>
              <KeySkillTab formik={formik} skillData={skillData} />
            </>
          )}

          {activePage === page[3]?.id && (
            <>
              <EducationTab formik={formik} degreeList={degreeList} />
            </>
          )}
          {activePage === page[4]?.id && (
            <>
              <PersonalDetailsTab languageList={languageList} formik={formik} />
            </>
          )}
          {activePage === page[5]?.id && (
            <CareerInfoTab formik={formik} cityData={city} />
          )}
          <div className="mt-8 flex w-full justify-end">
            <button
              type="submit"
              className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white"
            >
              {activePage === 3 ? TEXT?.SAVE : TEXT?.NEXT}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default IndividualProfile;
