import { calculatePercentage, TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';
import AutoComplete from '../Autocomplete';
import { toast } from 'react-toastify';
import { Fragment, useContext, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { COMPANY_TYPE } from '@/constant/Enum';
import useDebounce from '@/hooks/useDebounce';
import AppContext from '@/context/AppProvider';

const CompanyDetailsTab = ({
  activePage,
  userDetails,
  setActivePage,
  getUserDataApiCall,
}: any) => {
  const [stateQuery, setStateQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const debouncedSearchCity = useDebounce(cityQuery);
  const debouncedSearchState = useDebounce(stateQuery);
  const context = useContext(AppContext);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join('');
  }

  const handleSubmit = async (values: any, actions: any) => {
    let obj = {
      ...values,
    };

    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          const profileCount = calculatePercentage(values, 33);
          context?.setUserProfileCount(
            context?.userProfileCount + Number(profileCount),
          );
          getUserDataApiCall();
          setActivePage(activePage + 1);
          actions.setSubmitting(false);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const validationSchema = Yup.object().shape({
    company_name: Yup.string(),
    company_type: Yup.string(),
    owner: Yup.string(),
    street_address: Yup.string(),
    website_url: Yup.string().matches(
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      'Invalid Website url.',
    ),
    pincode: Yup.string().matches(/^[1-9][0-9]{5}$/, 'Invalid zipcode.'),
  });

  const currentValidationSchema = validationSchema;

  const formik: any = useFormik({
    initialValues: {
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

  useEffect(() => {
    getCountryApi();
  }, []);

  useEffect(() => {
    if (debouncedSearchCity !== '') {
      searchCityApi(debouncedSearchCity);
    }
  }, [debouncedSearchCity]);

  useEffect(() => {
    if (debouncedSearchState !== '') {
      searchStateApi(debouncedSearchState);
    }
  }, [debouncedSearchState]);

  const searchCityApi = (search: any) => {
    let obj = {
      searchText: search,
    };
    API.post(API_CONSTANT?.CITIES, obj)
      .then((res) => {
        setCities(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const searchStateApi = (search: any) => {
    let obj = {
      searchText: search,
    };
    API.post(API_CONSTANT?.STATES, obj)
      .then((res) => {
        setStates(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const getCountryApi = () => {
    API.get(API_CONSTANT?.COUNTRY)
      .then((res) => {
        setCountries(res?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
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
            <Menu.Items className="mt- absolute right-0 z-30 max-h-[200px] w-full origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
      <div className="mt-3 flex w-full items-center gap-3 pl-9">
        <div className="w-1/2">
          <input
            type="text"
            name="pincode"
            onChange={formik.handleChange}
            value={formik?.values?.pincode}
            placeholder="Zip Code"
            className="h-11 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
          />
          {formik.touched.pincode && formik.errors.pincode && (
            <div className="error">{formik.errors.pincode}</div>
          )}
        </div>
        <div className="relative w-1/2">
          <Menu as="div" className="relative  w-full">
            <Menu.Button className="relative z-20  flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 py-[9px] pl-5 pr-[11px] outline-none transition">
              {formik?.values?.country === null ? (
                <p className="text-meta-gray-1">Select Country</p>
              ) : (
                <p>{formik?.values?.country?.name as any}</p>
              )}
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
              <Menu.Items className="mt-  absolute right-0 z-30 max-h-[200px] w-full origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div>
                  {countries?.map((list: any) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => {
                              formik.setFieldValue('country', list);
                              formik.setFieldValue('city', null);
                              formik.setFieldValue('state', null);
                            }}
                            className={classNames(
                              active
                                ? 'bg-meta-blue-1 text-white'
                                : 'text-gray-900',
                              'block px-4 py-2 text-[14px] capitalize hover:text-white',
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
            {formik.touched.country && formik.errors.country && (
              <div className="error">{formik.errors.country}</div>
            )}
          </Menu>
        </div>
      </div>
      <div className="mt-3 flex w-full gap-3 pl-9">
        <div className="w-1/2">
          <AutoComplete
            query={stateQuery}
            disabled={formik.values.country === null ? true : false}
            name={'state'}
            setQuery={setStateQuery}
            className="!py-[11.2px]"
            placeholder="Search state"
            value={formik?.values?.state}
            filterArr={states}
            handleChange={(e: any) => {
              formik.setFieldValue('state', e);
            }}
          />
          {formik.touched.state && formik.errors.state && (
            <div className="error">{formik.errors.state}</div>
          )}
        </div>
        <div className="w-1/2">
          <AutoComplete
            value={formik?.values?.city}
            disabled={formik.values.country === null ? true : false}
            filterArr={cities}
            className="!py-[11.2px]"
            query={cityQuery}
            setQuery={setCityQuery}
            name={'city'}
            placeholder="Search city"
            handleChange={(e: any) => formik.setFieldValue('city', e)}
          />
          {formik.touched.city && formik.errors.city && (
            <div className="error">{formik.errors.city}</div>
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
