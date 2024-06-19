import * as Yup from 'yup';
import Image from 'next/image';
import Button from '../Button';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { TEXT } from '@/service/Helper';
import { useFormik, Field, FormikConsumer } from 'formik';
import Spinner from '@/app/icons/Spinner';
import useDebounce from '@/hooks/useDebounce';
import { BANK_ACCOUNT_TYPE, EMP_TYPE_ARR } from '@/constant/Enum';
import AppContext from '@/context/AppProvider';
import 'react-datepicker/dist/react-datepicker.css';
import { Menu, Transition } from '@headlessui/react';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { Fragment, useContext, useEffect, useState } from 'react';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
const BankDetailsTab = ({
  userDetails,
  setActivePage,
  activePage,
  getUserDataApiCall,
}: any) => {
  const context = useContext(AppContext);
  const [cityQuery, setCityQuery] = useState('');
  const [isSpinner, setIsSpinner] = useState(false);

  const handleSubmit = async (values: any, actions: any) => {
    setIsSpinner(true);
    const obj = {
      ...values,
      profile_count: {
        ...context?.userProfileCount,
        bank_details: 14.28,
      },
    };

    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          setIsSpinner(false);
          setActivePage(activePage);
          getUserDataApiCall();
          context?.setUserProfileCount(res?.data?.data?.profile_count);
          actions.setSubmitting(false);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
        }
      })
      .catch((error) => {
        setIsSpinner(false);
        toast.error(error || 'Something want wrong');
      });
  };

  const validationSchema = Yup.object().shape({
    pan_card_number: Yup.string()
      .required('Pan number is required')
      .matches(
        /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
        // /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        'Invalid pan number',
      ),
    aadhar_card_number: Yup.string()
      .required('Aadhar number is required')
      .matches(
        /^[2-9]{1}[0-9]{11}$/,
        // /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        'Invalid aadhar number',
      ),
    account_in_name: Yup.string().required('Account in name is required'),
    bank_name: Yup.string().required('bank name is required'),
    IFSC_code: Yup.string().required('IFSC code is required'),
    account_type: Yup.string().required('Account type is required'),
    account_number: Yup.string().required('Account number is required'),
  });

  const formik: any = useFormik({
    initialValues: {
      bank_name: userDetails?.bank_name ?? '',
      IFSC_code: userDetails?.IFSC_code ?? '',
      account_number: userDetails?.account_number ?? '',
      account_in_name: userDetails?.account_in_name ?? '',
      aadhar_card_number: userDetails?.aadhar_card_number ?? '',
      pan_card_number: userDetails?.pan_card_number ?? '',
      account_type: userDetails?.account_type ?? '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  console.log('userdetails', userDetails);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-5 flex w-full gap-3 pl-9">
        <div className="w-full">
          <label className="text-base font-medium text-meta-purple-1">
            Bank Details
          </label>
          <div className="relative my-2 w-full rounded-3xl bg-meta-gray-2 p-5">
            <div className=" flex w-full gap-3">
              <div className="w-1/2">
                <input
                  type="text"
                  onChange={formik?.handleChange}
                  value={formik?.values?.bank_name}
                  name="bank_name"
                  placeholder="bank name"
                  className="w-full rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
                />
                {formik.touched.bank_name && formik.errors.bank_name && (
                  <div className="error">{formik.errors.bank_name}</div>
                )}
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  onChange={formik?.handleChange}
                  value={formik?.values?.IFSC_code}
                  name="IFSC_code"
                  placeholder="IFSC Code"
                  className="w-full rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
                />
                {formik.touched.IFSC_code && formik.errors.IFSC_code && (
                  <div className="error">{formik.errors.IFSC_code}</div>
                )}
              </div>
            </div>
            <div className="mt-2 flex w-full gap-3">
              <div className="w-1/2">
                <input
                  type="text"
                  onChange={formik?.handleChange}
                  value={formik?.values?.account_number}
                  name="account_number"
                  placeholder="Account number"
                  className="w-full rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
                />
                {formik.touched.account_number &&
                  formik.errors.account_number && (
                    <div className="error">{formik.errors.account_number}</div>
                  )}
              </div>
              <div className="w-1/2">
                <Menu as="div" className="relative">
                  <Menu.Button className="relative  flex  w-full appearance-none items-center justify-between rounded-2xl border border-meta-light-blue-1 bg-white px-3 py-3 outline-none transition">
                    <p>
                      {formik?.values?.account_type === ''
                        ? 'Account type (e.g. saving)'
                        : formik?.values?.account_type}
                    </p>
                    <Image
                      alt="Icon"
                      width={14}
                      height={14}
                      src={'/dashboard/SelectDown.svg'}
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
                    <Menu.Items className="mt- absolute right-0 z-30 w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div>
                        {BANK_ACCOUNT_TYPE?.map((el: any) => {
                          return (
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={() =>
                                    formik?.setFieldValue('account_type', el)
                                  }
                                  className={classNames(
                                    active
                                      ? 'bg-meta-blue-1 text-white'
                                      : 'text-gray-900',
                                    'lo block px-4 py-2 text-[14px] capitalize',
                                  )}
                                >
                                  {el}
                                </div>
                              )}
                            </Menu.Item>
                          );
                        })}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {formik.touched.account_type && formik.errors.account_type && (
                  <div className="error">{formik.errors.account_type}</div>
                )}
              </div>
            </div>

            <div className="mt-2 w-full">
              <input
                type="text"
                name="account_in_name"
                onChange={formik?.handleChange}
                value={formik?.values?.account_in_name}
                placeholder="Account in the name"
                className="w-full rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
              />
              {formik.touched.account_in_name &&
                formik.errors.account_in_name && (
                  <div className="error">{formik.errors.account_in_name}</div>
                )}
            </div>
            <div className="mt-2 w-full">
              <input
                type="number"
                name="aadhar_card_number"
                onChange={formik?.handleChange}
                value={formik?.values?.aadhar_card_number}
                placeholder="Aadhar card  number"
                className="w-full rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
              />
              {formik.touched.aadhar_card_number &&
                formik.errors.aadhar_card_number && (
                  <div className="error">
                    {formik.errors.aadhar_card_number}
                  </div>
                )}
            </div>
            <div className="mt-2 w-full">
              <input
                type="text"
                name="pan_card_number"
                onChange={formik?.handleChange}
                value={formik?.values?.pan_card_number}
                placeholder="Pan card  number"
                className="w-full rounded-2xl border border-meta-light-blue-1 px-3 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
              />
              {formik.touched.pan_card_number &&
                formik.errors.pan_card_number && (
                  <div className="error">{formik.errors.pan_card_number}</div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex w-full justify-end">
        {isSpinner ? (
          <div className="w-36 rounded-lg bg-meta-blue-1 py-2">
            <Spinner
              width="32px"
              height="32px"
              color="white"
              className="spinner"
            />
          </div>
        ) : (
          <Button
            title={TEXT?.SAVE}
            titleClass="!text-base !text-white"
            btnClass="!w-36 !rounded-lg !bg-meta-blue-1 !py-2"
          />
        )}
      </div>
    </form>
  );
};
export default BankDetailsTab;
