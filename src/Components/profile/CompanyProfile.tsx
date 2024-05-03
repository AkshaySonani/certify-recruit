import Image from 'next/image';
import { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Combobox, Menu, Transition } from '@headlessui/react';
import { TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';
import AutoComplete from '../Autocomplete';
import { toast } from 'react-toastify';
import { COMPANY_TYPE } from '@/constant/Enum';
import BasicDetails from './BasicDetailsTab';
import CompanyDetailsTab from './CompanyDetailsTab';
import KYCDetailsTab from './KYCDetailsTab';
const TAB = [
  {
    id: 1,
    label: TEXT?.BASIC_DETAIL,
  },
  {
    id: 2,
    label: TEXT?.Company_Detail,
  },
  {
    id: 3,
    label: TEXT?.KYC_Compliance_Detail,
  },
];
const CompanyProfile = ({ userDetails, session }: any) => {
  const [activePage, setActivePage] = useState(TAB[0]?.id);
  const [query, setQuery] = useState('');

  const handleSubmit = async (values: any, actions: any) => {
    if (activePage === 3) {
      let obj = {
        ...values,
        user_ref_id: session?.user?._id,
        _id: userDetails?._id ?? null,
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
    } else {
      setActivePage(activePage + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const validationSchema = [
    Yup.object().shape({
      contact_number: Yup.string().required('Contact number is required.'),
      user_name: Yup.string().required('Username is required.'),
      role: Yup.string().required('Role is required.'),
    }),
    Yup.object().shape({
      city: Yup.object()
        .shape({
          _id: Yup.string().required('City is required'),
        })
        .nonNullable('City is required'),
      company_name: Yup.string().required('Company name is required.'),
      company_type: Yup.string().required('Company type is required.'),
      owner: Yup.string().required('Owner is required.'),
      street_address: Yup.string().required('Address is required.'),
      country: Yup.object()
        .shape({
          _id: Yup.string().required('Country is required'),
        })
        .nonNullable('Country is required'),
      state: Yup.object()
        .shape({
          _id: Yup.string().required('State is required'),
        })
        .nonNullable('State is required.'),
      website_url: Yup.string()
        .required('Website url is required.')
        .matches(
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
          'Invalid Website url.',
        ),
      pincode: Yup.string()
        .required('Zip code is required.')
        .matches(/^[1-9][0-9]{5}$/, 'Invalid zipcode.'),
    }),
    Yup.object().shape({
      pan_number: Yup.string()
        .required('Pan number is required.')
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid pan number'),
      name_on_pan: Yup.string().required('Name of pan is required.'),
    }),
  ];
  const currentValidationSchema = validationSchema[activePage - 1];

  const formik = useFormik({
    initialValues: {
      contact_number: userDetails?.contact_number ?? '',
      user_name: userDetails?.user_name ?? '',
      logo: '',
      role: userDetails?.role ?? '',
      contact_email: userDetails?.contact_email ?? '',
      description: userDetails?.description ?? '',
      pincode: userDetails?.pincode ?? '',
      owner: userDetails?.owner ?? '',
      company_name: userDetails?.company_name ?? '',
      company_type: userDetails?.company_type ?? '',
      pan_number: userDetails?.pan_number ?? '',
      name_on_pan: userDetails?.name_on_pan ?? '',
      street_address: userDetails?.street_address ?? '',
      website_url: userDetails?.website_url ?? '',
      city: userDetails?.city ?? null,
      state: userDetails?.state ?? null,
      country: userDetails?.country ?? null,
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

  return (
    <div className="mt-5">
      <div className="flex w-3/5 justify-around">
        {TAB?.map((list: any) => {
          return (
            <div
              onClick={() => setActivePage(list.id)}
              className={`cursor-pointer text-sm font-medium ${
                activePage === list?.id
                  ? 'text-meta-blue-1'
                  : 'text-meta-light-blue-3'
              }`}
            >
              {list?.label}
            </div>
          );
        })}
      </div>
      <div className="my-3 w-full border border-meta-light-blue-1" />

      <div>
        {activePage === 1 && (
          <BasicDetails
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
          />
        )}
        {activePage === 2 && (
          <CompanyDetailsTab
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
          />
        )}
        {activePage === 3 && (
          <KYCDetailsTab
            setActivePage={setActivePage}
            userDetails={userDetails}
            activePage={activePage}
          />
        )}
      </div>
    </div>
  );
};
export default CompanyProfile;
