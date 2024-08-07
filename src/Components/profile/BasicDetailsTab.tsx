import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import AppContext from '@/context/AppProvider';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { TEXT, updateProfileCount } from '@/service/Helper';
import SuccessModal from './SuccessModal';
import Button from '../Button';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const BasicDetails = ({
  session,
  activePage,
  userDetails,
  setActivePage,
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
      //   basic_details: 33,
      // },
    };
    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          setLoading(false);
          getUserDataApiCall();
          session?.user?.profile_count !== 100 &&
            session?.user?.profile_count < 100 &&
            handleNextClick('basic_details');
          actions.setSubmitting(false);
          if (
            profileCompletionCount?.employee === 100 ||
            session?.user?.profile_count === 100
          ) {
            setOpenSuccessModal(true);
          }
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
    contact_number: Yup.string()
      .required('Contact number is required')
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        'invalid contact number',
      ),
    user_name: Yup.string().required('User name is required'),
    role: Yup.string().required('Role is required'),
  });

  const currentValidationSchema = validationSchema;

  const formik: any = useFormik({
    initialValues: {
      contact_number: userDetails?.contact_number ?? '',
      user_name: userDetails?.user_name ?? '',
      role: userDetails?.role ?? '',
      contact_email: session?.user?.email ?? '',
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
            {TEXT?.USERNAME}
          </label>
          <input
            value={formik?.values?.user_name}
            name="user_name"
            onChange={formik.handleChange}
            type="text"
            placeholder="Username"
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 p-3 focus:border-meta-light-blue-3"
          />
          {formik.touched.user_name && formik.errors.user_name && (
            <div className="error">{formik.errors.user_name}</div>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-base font-medium text-meta-purple-1">
            {TEXT?.EMAIL}
          </label>
          <input
            type="text"
            readOnly
            value={session?.user?.email}
            name="contact_email"
            onChange={formik.handleChange}
            placeholder="email"
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 p-3 focus:border-meta-light-blue-3"
          />
        </div>
      </div>
      <div className="mt-3 flex w-full gap-3 pl-9">
        <div className="w-1/2">
          <label className="text-base font-medium text-meta-purple-1">
            {TEXT?.ROLE}
          </label>
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik?.values?.role}
            name="role"
            placeholder="Company role"
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 p-3 focus:border-meta-light-blue-3"
          />
          {formik.touched.role && formik.errors.role && (
            <div className="error">{formik.errors.role}</div>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-base font-medium text-meta-purple-1">
            {TEXT?.PHONE_NUMBER}
          </label>

          <PhoneInput
            className="gap-4"
            defaultCountry="in"
            placeholder="Contact number"
            value={formik?.values?.contact_number}
            inputClassName="!h-12 w-full flex grow !border-meta-light-blue-2 !focus:outline-meta-light-blue-1 !rounded-xl !text-sm"
            onChange={(value) =>
              formik.handleChange({ target: { value, name: 'contact_number' } })
            }
            countrySelectorStyleProps={{
              buttonStyle: { width: 64, height: 48, borderRadius: 12 },
            }}
          />
          <input
            type="number"
            onChange={formik.handleChange}
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 p-3 focus:border-meta-light-blue-3"
          />
          {formik.touched.contact_number && formik.errors.contact_number && (
            <div className="error">{formik.errors.contact_number}</div>
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

      <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
    </form>
  );
};
export default BasicDetails;

// const count = 0;
// if (date.name && date.username && date.email) {
//   count += 30;
// }
// if (date.name && date.username && date.email) {
//   count += 30;
// }
// if (date.pan && date.bank) {
//   count += 30;
// }
