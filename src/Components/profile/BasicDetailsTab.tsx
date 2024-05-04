import { TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';
import AutoComplete from '../Autocomplete';
import { toast } from 'react-toastify';
const BasicDetails = ({
  setActivePage,
  userDetails,
  activePage,
  session,
}: any) => {
  const handleSubmit = async (values: any, actions: any) => {
    let obj = {
      ...values,
    };

    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        console.log('res', res);
        setActivePage(activePage + 1);
        toast?.success('Successfully update profile');
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const validationSchema = Yup.object().shape({
    contact_number: Yup.string().matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      'invalid contact number',
    ),
    user_name: Yup.string(),
    role: Yup.string(),
  });

  const currentValidationSchema = validationSchema;

  const formik = useFormik({
    initialValues: {
      contact_number: userDetails?.contact_number ?? '',
      user_name: userDetails?.user_name ?? '',
      role: userDetails?.role ?? '',
      contact_email: userDetails?.contact_email ?? '',
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
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
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
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
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
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
          />
          {formik.touched.role && formik.errors.role && (
            <div className="error">{formik.errors.role}</div>
          )}
        </div>
        <div className="w-1/2">
          <label className="text-base font-medium text-meta-purple-1">
            {TEXT?.PHONE_NUMBER}
          </label>
          <input
            type="number"
            onChange={formik.handleChange}
            value={formik?.values?.contact_number}
            name="contact_number"
            placeholder="Contact number"
            className="mt-2 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
          />
          {formik.touched.contact_number && formik.errors.contact_number && (
            <div className="error">{formik.errors.contact_number}</div>
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
export default BasicDetails;
