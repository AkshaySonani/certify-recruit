import * as Yup from 'yup';
import Button from '../Button';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { useFormik, Field } from 'formik';
import AppContext from '@/context/AppProvider';
import 'react-datepicker/dist/react-datepicker.css';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { TEXT, updateProfileCount } from '@/service/Helper';
import { Fragment, useContext, useEffect, useState } from 'react';
import { UpdateTokenApi } from '@/service/api-helpers';
import SuccessModal from './SuccessModal';

const SummaryTab = ({
  session,
  userDetails,
  setActivePage,
  activePage,
  getUserDataApiCall,
}: any) => {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const {
    profileCompletionCount,
    setProfileCompletionCount,
    completedSections,
    setCompletedSections,
    openSuccessModal,
    setOpenSuccessModal,
  } = context;

  const handleNextClick = (section: any) => {
    updateProfileCount(
      session?.user?.role,
      section,
      setProfileCompletionCount,
      completedSections,
      setCompletedSections,
      setOpenSuccessModal,
    );
  };

  const handleSubmit = async (values: any, actions: any) => {
    setLoading(true);
    const obj = {
      ...values,
      // profile_count: {
      //   ...context?.userProfileCount,
      //   summary_details: 14,
      // },
    };
    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          setLoading(false);
          getUserDataApiCall();
          session?.user?.profile_count !== 100 &&
            session?.user?.profile_count < 100 &&
            handleNextClick('profile_summary');
          if (
            profileCompletionCount?.individual === 100 ||
            session?.user?.profile_count === 100
          ) {
            setOpenSuccessModal(true);
          }
          actions.setSubmitting(false);
          setActivePage(activePage + 1);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error || 'Something want wrong');
      });
  };

  const validationSchema = Yup.object().shape({
    profile_summary: Yup.string().required('Profile summary is required.'),
  });

  const formik = useFormik({
    initialValues: {
      profile_summary: userDetails?.profile_summary ?? '',
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
            and education, your professional interests, and the type of career
            you are seeking. Write a meaningful summary of at least 50
            characters.
          </p>
          <textarea
            rows={4}
            placeholder="Summery"
            name="profile_summary"
            onChange={formik.handleChange}
            value={formik?.values?.profile_summary}
            className="w-full rounded-2xl border border-meta-light-blue-1 p-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
          />
          {formik.touched.profile_summary && formik.errors.profile_summary && (
            <div className="error">
              {formik?.errors?.profile_summary as any}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 flex w-full justify-end">
        <Button
          title={TEXT?.NEXT}
          isLoading={loading}
          titleClass="!text-base !text-white"
          btnClass="!w-36 !rounded-lg !bg-meta-blue-1 !py-2"
        />
      </div>
      {/* <div className="mt-8 flex w-full justify-end">
        <button
          type="submit"
          className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white"
        >
          {TEXT?.SAVE}
        </button>
      </div> */}
      <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
    </form>
  );
};
export default SummaryTab;
