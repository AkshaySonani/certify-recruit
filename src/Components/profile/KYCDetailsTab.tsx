import * as Yup from 'yup';
import { useContext, useState } from 'react';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { useFormik, Field } from 'formik';
import AutoComplete from '../Autocomplete';
import AppContext from '@/context/AppProvider';
import { API_CONSTANT } from '@/constant/ApiConstant';
import {
  calculatePercentage,
  TEXT,
  updateProfileCount,
} from '@/service/Helper';
import SuccessModal from './SuccessModal';
import Button from '../Button';

const KYCDetailsTab = ({
  session,
  setActivePage,
  userDetails,
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
    let obj = {
      ...values,
      // profile_count: {
      //   ...context?.userProfileCount,
      //   kyc_details: 33,
      // },
    };

    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          setLoading(false);
          session?.user?.profile_count !== 100 &&
            session?.user?.profile_count < 100 &&
            handleNextClick('KYC_compliance_detail');
          if (
            profileCompletionCount?.employee === 100 ||
            session?.user?.profile_count === 100
          ) {
            setOpenSuccessModal(true);
          }
          setActivePage(1);
          getUserDataApiCall();
          actions.setSubmitting(false);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error || 'Something want wrong');
      });
  };

  const validationSchema = Yup.object().shape({
    pan_number: Yup.string()
      .required('Pan number is required')
      .matches(
        /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
        // /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        'Invalid pan number',
      ),
    name_on_pan: Yup.string().required('Name of pan is required'),
  });

  const currentValidationSchema = validationSchema;

  const formik: any = useFormik({
    initialValues: {
      pan_number: userDetails?.pan_number ?? '',
      name_on_pan: userDetails?.name_on_pan ?? '',
    },
    enableReinitialize: true,
    validationSchema: currentValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-5 flex w-full gap-3 pl-9">
        <div className="w-1/2">
          <label className="text-base font-medium text-meta-purple-1">
            {TEXT?.PAN_NUMBER}
          </label>
          <input
            type="text"
            minLength={10}
            maxLength={10}
            name="pan_number"
            placeholder="Pan number"
            onChange={formik.handleChange}
            value={formik?.values?.pan_number?.toUpperCase()}
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 p-3 focus:border-meta-light-blue-3"
          />
          {formik.touched.pan_number && formik.errors.pan_number && (
            <div className="error">{formik.errors.pan_number}</div>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-base font-medium text-meta-purple-1">
            {TEXT?.NAME_ON_PAN_CARD}
          </label>
          <input
            type="text"
            name="name_on_pan"
            onChange={formik.handleChange}
            value={formik?.values?.name_on_pan}
            placeholder="Name of pan"
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 p-3 focus:border-meta-light-blue-3"
          />
          {formik.touched.name_on_pan && formik.errors.name_on_pan && (
            <div className="error">{formik.errors.name_on_pan}</div>
          )}
        </div>
      </div>

      <div className="mt-8 flex w-full justify-end">
        <Button
          title={TEXT?.SAVE}
          isLoading={loading}
          titleClass="!text-base !text-white"
          btnClass="!w-36 !rounded-lg !bg-meta-blue-1 !py-2"
        />
      </div>
      <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
    </form>
  );
};
export default KYCDetailsTab;
