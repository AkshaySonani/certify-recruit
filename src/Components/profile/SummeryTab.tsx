import { Fragment, useEffect, useState } from 'react';
import { TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import CareerInfoTab from './CareerInfoTab';
import PersonalDetailsTab from './PersonalDetailsTab';
import EducationTab from './EducationTab';
import KeySkillTab from './KeySkillTab';
import UploadResumeTab from './UploadResumeTab';

const SummaryTab = ({ userDetails, setActivePage, activePage }: any) => {
  const handleSubmit = async (values: any, actions: any) => {
    const obj = {
      ...values,
    };
    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        setActivePage(activePage + 1);
        toast?.success('Successfully Update Profile');
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const validationSchema = Yup.object().shape({
    profile_summary: Yup.string().required('Profile summary is required.'),
  });

  const formik = useFormik({
    initialValues: {
      resume: userDetails?.resume ?? [],
      gender: userDetails?.gender ?? '',
      company_name: userDetails?.company_name ?? '',
      current_location: userDetails?.current_location ?? 'USA',
      expected_salary_upto: userDetails?.expected_salary_upto ?? '',
      profile_summary: userDetails?.profile_summary ?? '',
      degree: userDetails?.degree ?? null,
      date_of_birth: userDetails?.date_of_birth ?? '',
      highest_education: userDetails?.highest_education ?? '',
      expected_salary_start_at: userDetails?.expected_salary_start_at ?? '',
      college_school_name: userDetails?.college_school_name ?? null,
      total_experiences: userDetails?.total_experiences ?? [
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
      skills: userDetails?.skills ?? [],
      languages: userDetails?.languages ?? [
        {
          language: null,
          proficiency: '',
        },
      ],
      completion_date: userDetails?.completion_date ?? {
        year: '',
        month: '',
      },
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-5 flex w-full gap-3 pl-9">
        <div className="w-full">
          <label className="text-base font-medium text-meta-purple-1">
            Profile Summary
          </label>
          <p className="mb-3 pt-1 text-sm font-medium text-meta-light-blue-3">
            Your profile summary should mention the highlights of your career
            and education, what your professional interests are, and what kind
            of a career you are looking for. Write a meaningful summary of more
            than 50 characters.
          </p>
          <textarea
            value={formik?.values?.profile_summary}
            name="profile_summary"
            onChange={formik.handleChange}
            placeholder="Summery"
            rows={4}
            className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
          />
          {formik.touched.profile_summary && formik.errors.profile_summary && (
            <div className="error">
              {formik?.errors?.profile_summary as any}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 flex w-full justify-end">
        <button
          type="submit"
          className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white"
        >
          {TEXT?.SAVE}
        </button>
      </div>
    </form>
  );
};
export default SummaryTab;
