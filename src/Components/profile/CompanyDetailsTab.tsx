import { TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';
import AutoComplete from '../Autocomplete';
import { toast } from 'react-toastify';
import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { COMPANY_TYPE } from '@/constant/Enum';
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
const CompanyDetailsTab = ({ setActivePage, userDetails, activePage }: any) => {
  const [query, setQuery] = useState('');
  function classNames(...classes: any) {
    return classes.filter(Boolean).join('');
  }

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
  });

  const currentValidationSchema = validationSchema;

  const formik = useFormik({
    initialValues: {
      contact_email: userDetails?.contact_email ?? '',
      description: userDetails?.description ?? '',
      pincode: userDetails?.pincode ?? '',
      owner: userDetails?.owner ?? '',
      company_name: userDetails?.company_name ?? '',
      company_type: userDetails?.company_type ?? '',
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
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-5 flex w-full gap-3 pl-9">
        <Menu as="div" className="relative w-1/2">
          <label className="text-base font-medium text-meta-purple-1">
            {TEXT?.COMPANY_TYPE}
          </label>
          <Menu.Button className="relative z-20 mt-2 flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 py-3 pl-5 pr-[11px] outline-none transition">
            <p>
              {formik?.values?.company_type === ''
                ? 'Select Company type'
                : formik?.values?.company_type}
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
            <Menu.Items className="mt- absolute right-0 z-30 w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                {COMPANY_TYPE?.map((list: any) => {
                  return (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() =>
                            formik.setFieldValue('company_type', list)
                          }
                          className={classNames(
                            active
                              ? 'bg-meta-blue-1 text-white'
                              : 'text-gray-900',
                            'block px-4 py-2 text-[14px] capitalize',
                          )}
                        >
                          {list}
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
          {formik.touched.company_type && formik.errors.company_type && (
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
          {formik.touched.company_name && formik.errors.company_name && (
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
        {formik.touched.street_address && formik.errors.street_address && (
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
            name={'state'}
            placeholder="Search state"
            handleChange={(e: any) => formik.setFieldValue('state', e)}
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
            name={'city'}
            placeholder="Search city"
            handleChange={(e: any) => formik.setFieldValue('city', e)}
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
        <div className="relative w-1/2">
          <AutoComplete
            value={formik?.values?.country}
            filterArr={searchItems(Country)}
            query={query}
            setQuery={setQuery}
            name={'country'}
            placeholder="Search Country"
            handleChange={(e: any) => formik.setFieldValue('country', e)}
          />
          {formik.touched.country && formik.errors.country && (
            <div className="error">{formik.errors.country}</div>
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
export default CompanyDetailsTab;
