import Image from "next/image";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Combobox, Menu, Transition } from "@headlessui/react";
import { TEXT } from "@/service/Helper";
import API from "@/service/ApiService";
import { API_CONSTANT } from "@/constant/ApiConstant";
import * as Yup from "yup";
import { useFormik, Field } from "formik";
import AutoComplete from "../Autocomplete";
import { toast } from "react-toastify";
import { GENDER } from "@/constant/Enum";
const COMPANY_ARR = [
  { id: 1, name: "Corporate Company" },
  { id: 2, name: "It Company" },
  { id: 3, name: "Software Company" },
  { id: 1, name: "CLient Company" },
];
const city = [
  { _id: "662ccb4a52f81a3100514885", name: "surat" },
  { _id: "662a8768683fb48bab4be172", name: "Ahemedabad" },
  { _id: "662a8768683fb48bab4be173", name: "Baroda" },
  { _id: "662a8768683fb48bab4be174", name: "Rajkot" },
  { _id: "662a8768683fb48bab4be175", name: "Botad" },
  { _id: "662a8768683fb48bab4be176", name: "pune" },
];

const Country = [
  { _id: "662a83d8683fb48bab4bcc70", name: "India" },
  { _id: "662a83d8683fb48bab4bcc71", name: "Canada" },
  { _id: "662a83d8683fb48bab4bcc72", name: "Uk" },
  { _id: "662a83d8683fb48bab4bcc73", name: "UK" },
  { _id: "662a83d8683fb48bab4bcc74", name: "USA" },
  { _id: "662a83d8683fb48bab4bcc75", name: "Germany" },
];

const State = [
  { _id: "662a873b683fb48bab4bcd70", name: "Gujarat" },
  { _id: "662a873b683fb48bab4bcd71", name: "Maharashtra" },
  { _id: "662a873b683fb48bab4bcd72", name: "Bhopal" },
  { _id: "662a873b683fb48bab4bcd73", name: "Bamyan" },
  { _id: "662a873b683fb48bab4bcd74", name: "Badakhshan" },
  { _id: "662a873b683fb48bab4bcd75", name: "La Rioja" },
];

const page = [{id:1,page:"Profile Summary"},{id:2,page:"Resume"},{id:3, page:"Key skill"},{id:4,page:"Education"},{id:5,page:"Personal Detail"},{id:6,page:"Career info"}];

const IndividualProfile = ({ languageList, collegeList, degreeList }: any) => {
  const [activePage, setActivePage] = useState(1);
  const [query, setQuery] = useState("");
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSubmit = async (values: any, actions: any) => {
    if (activePage === 3) {
      API.post(API_CONSTANT?.JOB, values)
        .then((res) => {
          setActivePage(activePage + 1);
          toast?.success("Successfully job posting");
          actions.setSubmitting(false);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      setActivePage(activePage + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const validationSchema = [
    Yup.object().shape({
      // contact_number: Yup.string().required("Contact number is required."),
      // user_name: Yup.string().required("Username is required."),
      // role: Yup.string().required("Role is required."),
    }),
    Yup.object().shape({
    //   city: Yup.object()
    //     .shape({
    //       _id: Yup.string().required("City is required"),
    //     })
    //     .nonNullable("City is required"),
    //   company_name: Yup.string().required("Company name is required."),
    //   company_type: Yup.string().required("Company type is required."),
    //   owner: Yup.string().required("Owner is required."),
    //   street_address: Yup.string().required("Address is required."),
    //   country: Yup.object()
    //     .shape({
    //       _id: Yup.string().required("Country is required"),
    //     })
    //     .nonNullable("Country is required"),
    //   state: Yup.object()
    //     .shape({
    //       _id: Yup.string().required("State is required"),
    //     })
    //     .nonNullable("State is required."),
    //   website_url: Yup.string()
    //     .required("Website url is required.")
    //     .matches(/\s+/g, "Invalid email."),
    //   pincode: Yup.string()
    //     .required("Zip code is required.")
    //     .matches(/\s+/g, "Invalid email."),
    // }),
    // Yup.object().shape({
    //   pan_number: Yup.string()
    //     .required("Pan number is required.")
    //     .matches(/\s+/g, "Invalid email"),
    //   name_on_pan: Yup.string().required("Name of pan is required."),
    }),
  ];
  const currentValidationSchema = validationSchema[activePage];
  const formik = useFormik({
    initialValues: {
      resume: "",
      gender: GENDER[0],
      company_name: "",
      current_location: "",
      expected_salary_upto: "",
      profile_summary: "",
      date_of_birth: "",
      highest_education: "",
      expected_salary_start_at: "",
      college_school_name: "",
      total_experiences: [
        {
          companyName: "",
          role: "",
          location: null,
          employmentType: "",
          years: "",
          month: "",
          reason_for_leaving: "",
        },
      ],
      skills: [],
      languages: [
        {
          language: null,
          proficiency: "",
        },
      ],
      completion_date: {
        year: "",
        month: "",
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
      query === ""
        ? arr
        : arr.filter((list: any) =>
            list.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );
    return filteredArr;
  };
console.log("page",page[0]);

  return (
    <div className="mt-5">
      <div className="flex w-[80%] justify-around">
        {page?.map((list:any,i)=>{
          return(
            <div
            className={`cursor-pointer text-sm font-medium ${
              activePage === list?.id ? "text-meta-blue-1" : "text-meta-light-blue-3"
            }`}
          >
            {list?.page}
          </div>
          )
        })}
      
      </div>
      <div className="my-3 w-full border border-meta-light-blue-1" />
      <form onSubmit={formik.handleSubmit}>
        <div>
          {activePage===page[0]?.id && (
            <>
              <div className="mt-5 flex w-full gap-3 pl-9">
                <div className="w-full">
                  <label className="text-base font-medium text-meta-purple-1">
                  Profile Summary
                  </label>
                  <p className="pt-1 mb-3 text-sm text-meta-light-blue-3 font-medium">Your profile summary should mention the highlights of your career and education, what your professional interests are, and what kind of a career you 
are looking for. Write a meaningful summary of more than 50 characters.</p>
                  <textarea
                    value={formik?.values?.user_name}
                    name="user_name"
                    onChange={formik.handleChange}
                    placeholder="Summery"
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.user_name && formik.errors.user_name && (
                    <div className="error">{formik.errors.user_name}</div>
                  )}
                </div>               
              </div>
             
            </>
          )}
          {activePage === page[2]?.id && (
            <>
              <div className="mt-5 flex w-full gap-3 pl-9">
                <Menu as="div" className="relative w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.COMPANY_TYPE}
                  </label>
                  <Menu.Button className="border-meta-light-blue-1 relative z-20 mt-2 flex w-full appearance-none items-center justify-between rounded-lg border pl-5 pr-[11px] py-3 outline-none transition">
                    <p>
                      {formik?.values?.company_type === ""
                        ? "Select Company type"
                        : formik?.values?.company_type}
                    </p>
                    <Image
                      alt="Icon"
                      width={14}
                      height={14}
                      src={"/dashboard/SelectDown.svg"}
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-75"
                    leaveTo="transform opacity-0 scale-95"
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leaveFrom="transform opacity-100 scale-100"
                  >
                    <Menu.Items className="absolute right-0 z-30 mt- w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div>
                        {COMPANY_ARR?.map((list) => {
                          return (
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={() =>
                                    formik.setFieldValue(
                                      "company_type",
                                      list?.name
                                    )
                                  }
                                  className={classNames(
                                    active
                                      ? "bg-meta-blue-1 text-white"
                                      : "text-gray-900",
                                    "block px-4 py-2 text-[14px]"
                                  )}
                                >
                                  {list?.name}
                                </div>
                              )}
                            </Menu.Item>
                          );
                        })}
                      </div>
                    </Menu.Items>
                  </Transition>
                  {formik.touched.company_type &&
                    formik.errors.company_type && (
                      <div className="error">{formik.errors.company_type}</div>
                    )}
                </Menu>

                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.COMPANY_NAME}
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik?.values?.company_name}
                    name="company_name"
                    placeholder="Company name"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.company_name &&
                    formik.errors.company_name && (
                      <div className="error">{formik.errors.company_name}</div>
                    )}
                </div>
              </div>
              <div className="mt-3 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.WEBSITE_URL}
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik?.values?.website_url}
                    name="website_url"
                    placeholder="Website url"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.website_url && formik.errors.website_url && (
                    <div className="error">{formik.errors.website_url}</div>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.OWNER}
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik?.values?.owner}
                    name="owner"
                    type="text"
                    placeholder="owner name"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.owner && formik.errors.owner && (
                    <div className="error">{formik.errors.owner}</div>
                  )}
                </div>
              </div>
              <div className="mt-3 w-full pl-9">
                <label className="text-base font-medium text-meta-purple-1">
                  {TEXT?.COMPANY_MAILING_ADDRESS}
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik?.values?.street_address}
                  name="street_address"
                  type="text"
                  placeholder="Street address"
                  className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                />
                {formik.touched.street_address &&
                  formik.errors.street_address && (
                    <div className="error">{formik.errors.street_address}</div>
                  )}
              </div>
              <div className="mt-3 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <AutoComplete
                    value={formik?.values?.state}
                    filterArr={searchItems(State)}
                    query={query}
                    setQuery={setQuery}
                    name={"state"}
                    placeholder="Search state"
                    handleChange={(e: any) => formik.setFieldValue("state", e)}
                  />
                  {formik.touched.state && formik.errors.state && (
                    <div className="error">{formik.errors.state}</div>
                  )}
                </div>
                <div className="w-1/2">
                  <AutoComplete
                    value={formik?.values?.city}
                    filterArr={searchItems(city)}
                    query={query}
                    setQuery={setQuery}
                    name={"city"}
                    placeholder="Search city"
                    handleChange={(e: any) => formik.setFieldValue("city", e)}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className="error">{formik.errors.city}</div>
                  )}
                </div>
              </div>
              <div className="mt-3 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <input
                    type="text"
                    name="pincode"
                    onChange={formik.handleChange}
                    value={formik?.values?.pincode}
                    placeholder="Zip Code"
                    className="w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.pincode && formik.errors.pincode && (
                    <div className="error">{formik.errors.pincode}</div>
                  )}
                </div>
                <div className="w-1/2 relative">
                  <AutoComplete
                    value={formik?.values?.country}
                    filterArr={searchItems(Country)}
                    query={query}
                    setQuery={setQuery}
                    name={"country"}
                    placeholder="Search Country"
                    handleChange={(e: any) =>
                      formik.setFieldValue("country", e)
                    }
                  />
                  {formik.touched.country && formik.errors.country && (
                    <div className="error">{formik.errors.country}</div>
                  )}
                </div>
              </div>
            </>
          )}
          {activePage === 3 && (
            <>
              <div className="mt-5 flex w-full gap-3 pl-9">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.PAN_NUMBER}
                  </label>
                  <input
                    type="text"
                    placeholder="NSLPQS2154"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.NAME_ON_PAN_CARD}
                  </label>
                  <input
                    type="text"
                    placeholder="Webnova Infotech"
                    className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
              </div>
            </>
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
