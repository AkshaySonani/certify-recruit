"use client";
import React, { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import Checkbox from "@/Components/Checkbox";
import { useRouter } from "next/navigation";
import { ROUTE, TEXT } from "@/service/Helper";
import { Combobox, Transition } from "@headlessui/react";
import API from "@/service/ApiService";
import { API_CONSTANT } from "@/constant/ApiConstant";
import * as Yup from "yup";
import { useFormik, Field } from "formik";
import JobPostingForm2 from "@/Components/Job/JobPostingForm2";
import JobPostingForm3 from "@/Components/Job/JobPostingForm3";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import PreviewDialog from "../../../Components/Job/PreviewDialog"
// import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const SelectOption = [
  { label: "Type here....", value: "" },
  { label: "Surat", value: "Surat" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Rajkot", value: "Rajkot" },
];
const people = [

  { _id: "662ccb4a52f81a3100514885", name: "surat" },
  { _id: "662ccb4a52f81a3100514885", name: "Ahemedabad" },
  { _id: "662ccb4a52f81a3100514885", name: "Baroda" },
  { _id: "662ccb4a52f81a3100514885", name: "Rajkot" },
  { _id: "662ccb4a52f81a3100514885", name: "Botad" },
  { _id: "662ccb4a52f81a3100514885", name: "pune" },
];

const WORKPLACE_TYPE = ['ONSITE', 'HYBRID', 'REMOTE'];

const Page = () => {
  const [cityData, setCityData] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [nextPage, setNextPage] = useState(1);
const session=useSession()

  const [query, setQuery] = useState("");
  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );


  useEffect(() => {
    // getCityDataApi();
    getSkillDataApi()
  }, []);
  ['ONSITE', 'HYBRID', 'REMOTE']
  

  const handleSubmit = async (values: formValues,actions:any) => {
    if(nextPage===3){
      let pushArray = [];
      skillData?.filter((el:any) => {
         values?.skills?.map((list:any) => {
          if (list === el?.value) {
            pushArray.push({ _id: el?._id });
          }
        });
      });
        const data={
          ...values,
          skills:pushArray
        }
        // setSubmitting(true);
        // let data = Edit
        //   ? { ...values, loginUid: employee?.loginUid, id: employee?.id }
        //   : { ...values, password: values.password, type: "Add" };
        API.post(API_CONSTANT.JOB, data)
          .then((res) => {
           console.log("res",res);
           setNextPage(nextPage + 1);
           toast?.success("Successfully job posting")
           actions.setSubmitting(false);
          })
          .catch((error) => {
            console.log("error",error);
            
          });
    }
    else{
      console.log("hello");
      
      setNextPage(nextPage + 1)
      actions.setTouched({});
      actions.setSubmitting(false);
    }
    
  };

  
  const validationSchema = [
    Yup.object().shape({
    company_name: Yup.string().required("Company is required."),
    title: Yup.string().required("job title is required."),
    workplace: Yup.array().min(1, `select at least one workplace type`),
    city: Yup.object().shape({
      _id: Yup.string().required('city is required'),
    }),
    
  
    // description:Yup.string().required("description is required.")
  }),
  Yup.object().shape({
    working_schedule: Yup.array().min(1, `select at least one working schedule`),
    job_types:Yup.array().min(1, `select at least one job type`)
  }),
  Yup.object().shape({
    // city: Yup.array().min(1,"City is required."),
    description:Yup.string().required("description is required.")
  })]
  const currentValidationSchema = validationSchema[nextPage - 1]
  const formik = useFormik({
    initialValues: {
      is_hiring_manager: false,
      title: "",
      company_id: session?.data?.user._id,
      company_name:"",
      description: "",
      workplace: [],
      job_types: [],
      salary_pay: "HOURLY",
      hourly_rate: null,
      salary_negotiable: false,
      vacancy: 1,
      working_schedule: [],
      area: "",
      status:"ACTIVE",
      pincode: "",
      street_address: "",
      salary_started: "",
      salary_upto: "",
      city: null,
      skills: [],
    },
    enableReinitialize: true,
    validationSchema:currentValidationSchema,
    onSubmit: handleSubmit,
  });

  // const getCityDataApi = () => {
  //   API.get(API_CONSTANT?.CITIES)
  //     .then((res) => {
  //       console.log("res",res);

  //       setCityData(res?.data?.data);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);

  //       // toast.error(error?.response?.data?.error);
  //     });
  // };

  const getSkillDataApi = () => {
    API.get(API_CONSTANT?.CATEGORY)
      .then((res) => {
      let skiilArr=  res?.data?.data?.map((list:any)=>{
      return{_id:list?._id,label:list?.subcategory,value:list?.subcategory}
    
        })
        setSkillData(skiilArr);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(error?.response?.data?.error);
      });
  };
const handlePrevious=()=>{
  setNextPage(nextPage-1)
}

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <p className="sm:text-2xl text-lg font-semibold text-meta-purple-1">
          {TEXT?.JOB_POSTING}
        </p>
        <div className="flex items-center cursor-pointer" onClick={()=>setIsOpen(true)}>
          <Image
            width={25}
            height={25}
            alt="Preview"
            src={"/job/Eye_fill.svg"}
          />
          <p className="ml-2 sm:text-xl text-lg font-semibold text-meta-blue-1 sm:block hidden">
            {TEXT?.PREVIEW}
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {nextPage === 1 ? (
          <div>
            <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
              <div className="lg:w-1/2 w-full lg:mr-5 text-start">
                <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
                  {TEXT?.ARE_YOU_HIRING_MANAGER}
                </p>
                <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
                  {TEXT?.THE_HIRED_CANDIDATE_WILL_WORK_IN_REPORTING_CHAIN}
                </p>
              </div>
              <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3 gap-4">
                <label
                  htmlFor="Yes"
                  className="border-meta-light-blue-1 hover:bg-meta-light-blue-2 border flex gap-2 items-center rounded-lg p-3 w-1/2"
                >
                  <input
                    id="Yes"
                    name="is_hiring_manager"
                    type="radio"
                    radioGroup="Salary"
                    value={"true"}
                    onChange={formik.handleChange}
                    className=""
                  />
                  <p>{"Yes"}</p>
                </label>
                <label
                  htmlFor="No"
                  className="border-meta-light-blue-1 border hover:bg-meta-light-blue-2 flex gap-2 items-center rounded-lg p-3 w-1/2"
                >
                  <input
                    id="No"
                    defaultChecked
                    name="is_hiring_manager"
                    type="radio"
                    radioGroup="Salary"
                    onChange={formik.handleChange}
                    className=""
                    value={"false"}
                  />
                  <p>{"No"}</p>
                </label>
              </div>
            </div>
            <div className="border-meta-light-blue-1 border my-6" />

            <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
              <div className="lg:w-1/2 w-full lg:mr-5 text-start">
                <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
                  {TEXT?.COMPANY} <span className="text-red-600">*</span>
                </p>
                <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
                  {TEXT?.YOUR_COMPANY_NAME}
                </p>
              </div>
              <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3">
                <input
                  type="text"
                  name="company_name"
                  onChange={formik.handleChange}
                  value={formik?.values?.company_name}
                  placeholder="Type here..."
                  className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                />
              </div>
              {formik.touched.company_name && formik.errors.company_name && (
                    <div className="error">{formik.errors.company_name}</div>
                  )}
            </div>
            <div className="border-meta-light-blue-1 border my-6" />

            <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
              <div className="lg:w-1/2 w-full lg:mr-5 text-start">
                <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
                  {TEXT?.JOB_TITLE} <span className="text-red-600">*</span>
                </p>
                <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
                  {TEXT?.YOU_CAN_PICK_MULTIPLE_WORK_SCHEDULES}
                </p>
              </div>
              <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3">
                <input
                  type="text"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik?.values?.title}
                  placeholder="Type here..."
                  className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                />
              </div>
              {formik.touched.title && formik.errors.title && (
                    <div className="error">{formik.errors.title}</div>
                  )}
            </div>
            <div className="border-meta-light-blue-1 border my-6" />

            <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
              <div className="lg:w-1/2 w-full lg:mr-5 text-start">
                <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
                  {TEXT?.WORKPLACE_TYPE}
                  <span className="text-red-600">*</span>
                </p>
                <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
                  {TEXT?.YOU_CAN_PICK_MULTIPLE_WORK_SCHEDULES}
                </p>
              </div>
              <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3 md:flex-nowrap flex-wrap gap-2">
                {WORKPLACE_TYPE?.map((list) => {
                  return (
                    <div className="border-meta-light-blue-1 border rounded-lg w-1/3 p-3">
                    
                      <label
                        htmlFor="checkboxLabelOne"
                        className={`flex cursor-pointer select-none items-center `}
                      >
                        <input
                          type="checkbox"
                          name={"workplace"}
                          value={list}
                          onChange={formik.handleChange}
                        
                        />
                        <p className="pl-3 capitalize">{list}</p>
                      </label>
                    </div>
                  );
                })}
              
              </div>
              {formik.touched.workplace && formik.errors.workplace && (
                        <div className="error">{formik.errors.workplace}</div>
                      )}
            </div>
            <div className="border-meta-light-blue-1 border my-6" />

            <div className="flex justify-between w-full lg:flex-nowrap flex-wrap">
              <div className="lg:w-1/2 w-full lg:mr-5 text-start">
                <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
                  {TEXT?.JOB_POSTING_LOCATION}
                </p>
                <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
                  {TEXT?.WHICH_OPTION_BEST_DESCRIBE_THIS_JOBS_LOCATION}
                </p>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="lg:mt-0 mt-2">
                 
                  <Combobox  value={formik?.values?.city} onChange={(e)=>formik.setFieldValue("city",e)}>
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none border-meta-light-blue-1 sm:text-sm">
                        <Combobox.Input
                          className="w-full py-3 pl-3 pr-10  focus:outline-none text-sm leading-5 text-gray-900"
                          displayValue={(person) => person?.name}
                          placeholder="Select city"
                          name="city"
                          onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <Image
                            alt="Icon"
                            width={14}
                            height={14}
                            src={"/dashboard/SelectDown.svg"}
                          />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {filteredPeople.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredPeople.map((person) => (
                              <Combobox.Option
                                key={person._id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                    active
                                      ? "bg-meta-blue-1 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={person}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      ></span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                  {formik.touched.city && formik.errors.city && (
                    <div className="error">{formik.errors.city}</div>
                  )}
                  <div className="flex items-center my-3">
                    <div className="mr-3">
                      <label className="text-base font-medium text-meta-purple-1">
                        {TEXT?.AREA}
                      </label>
                      <input
                        name="area"
                        onChange={formik.handleChange}
                        value={formik?.values?.area}
                        type="text"
                        placeholder="Type here..."
                        className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-base font-medium text-meta-purple-1">
                        {TEXT?.PINCODE}
                      </label>
                      <input
                        name="pincode"
                        onChange={formik.handleChange}
                        value={formik?.values?.pincode}
                        type="text"
                        placeholder="Type here..."
                        className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-base font-medium text-meta-purple-1">
                      {TEXT?.STREET_ADDRESS}
                    </label>
                    <input
                      type="text"
                      name="street_address"
                      onChange={formik.handleChange}
                      value={formik?.values?.street_address}
                      placeholder="Type here..."
                      className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : nextPage === 2 ? (
          <JobPostingForm2 formik={formik} />
        ) : nextPage === 3 ?  (
          <JobPostingForm3 formik={formik} skillData={skillData} />
        ):""}
        <div className={`"w-full flex  mt-16 ${nextPage===1 ? "justify-end" : "justify-between"}`}>
          {nextPage !== 1 && (
            <button
            type="button"
              onClick={handlePrevious}
              className="border-meta-light-blue-1 border text-base text-meta-light-blue-3 font-medium py-3 rounded-lg sm:min-w-48 min-w-full sm:mb-0 mb-3"
            >
              {TEXT?.BACK}
            </button>
          )}
          <button
            disabled={formik?.isSubmitting}
            type={ "submit" }
            className="bg-meta-light-blue-1 text-base text-meta-light-blue-3 font-medium py-3 rounded-lg min-w-48 "
          >
            {TEXT?.NEXT}
          </button>
        </div>
      </form>

      {isOpen && <PreviewDialog isOpen={isOpen} setIsOpen={setIsOpen} formik={formik}/>}
    </div>
  );
};

export default Page;

