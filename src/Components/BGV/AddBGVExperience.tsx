'use client';
import * as Yup from 'yup';
import { WORKPLACE_TYPE } from '@/constant/Enum';
import { Menu, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import Button from '../Button';
import BGVProfile from './BGVProfile';
import { EMAIlREGEX } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { toast } from 'react-toastify';

function classNames(...classes: any) {
  return classes.filter(Boolean).join('');
}

const AddBGVExperience = () => {
  const [saveExperience, setSaveExperience] = useState(false);

  const validationSchema: any = Yup.object().shape({
    bgv: Yup.array().of(
      Yup.object().shape({
        company_name: Yup.string().required('Company name is required'),
        location_type: Yup.string().required('Location is required'),
        start_date: Yup.string().required('Start date is required'),
        end_date: Yup.string().required('End date is required'),
        reference: Yup.object().shape({
          name: Yup.string().required('Name is required'),
          designation: Yup.string().required('Designation is required'),
          phone_no: Yup.string().required('Phone number is required'),
          email_id: Yup.string()
            .required('Email is required.')
            .matches(EMAIlREGEX, 'Invalid email'),
        }),
        // description: Yup.string().required('Description is required'),
        // status: Yup.string().required('Status is required'),
      }),
    ),
  });
  const handleSubmit = async (values: any, actions: any) => {
    API.post(API_CONSTANT?.PROFILE, {
      bgv: values?.bgv,
    })
      .then((res: any) => {
        if (res?.data?.status === 200) {
          setSaveExperience(true);
          return;
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const formik: any = useFormik({
    initialValues: {
      bgv: [
        {
          currently_working: false,
          company_name: '',
          start_date: '',
          end_date: '',
          location_type: '',
          reference: {
            name: '',
            designation: '',
            phone_no: '',
            email_id: '',
          },
        },
      ],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleAddMoreEXP = () => {
    formik?.setFieldValue('bgv', [
      ...formik?.values?.bgv,
      {
        currently_working: false,
        company_name: '',
        start_date: '',
        end_date: '',
        location_type: null,
        reference: {
          name: '',
          designation: '',
          phone_no: '',
          email_id: '',
        },
      },
    ]);
  };

  const handleFormChange = (index: any, event: any) => {
    let data = [...formik?.values?.bgv];
    data[index][event.target.name] = event.target.value;
    formik.handleChange(event);
    formik?.setFieldValue('bgv', data);
  };

  return !saveExperience ? (
    <div className="mt-5">
      <p className="text-lg font-medium text-meta-purple-1">
        Company Information
      </p>
      <form onSubmit={formik.handleSubmit}>
        {formik?.values?.bgv?.map((list: any, index: any) => {
          return (
            <div>
              <div className="mt-4">
                <label
                  htmlFor={'Working'}
                  className={`flex cursor-pointer select-none items-center `}
                >
                  <input
                    type="checkbox"
                    id={'Working'}
                    name={'currently_working'}
                    value={list?.currently_working}
                    checked={list.currently_working === true ? true : false}
                    onChange={(event) => {
                      let data = [...formik?.values?.bgv];
                      data[index]['currently_working'] = event.target?.checked;
                      formik?.setFieldValue('bgv', data);
                    }}
                  />
                  <p className="pl-3 capitalize text-meta-light-blue-3">
                    {'I am currently working'}
                  </p>
                </label>
              </div>
              <div className="mt-5 w-full">
                <p className="text-base font-medium text-meta-light-blue-3">
                  Company name*
                </p>
                <input
                  type="text"
                  onChange={(event) => handleFormChange(index, event)}
                  value={list?.company_name}
                  name="company_name"
                  placeholder="Company name"
                  className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
                />
                {formik?.touched?.bgv?.[index]?.company_name &&
                  formik.errors.bgv?.[index]?.company_name && (
                    <div className="error">
                      {formik?.errors?.bgv?.[index]?.company_name}
                    </div>
                  )}
              </div>
              <div className="mt-4 flex w-full items-center gap-4">
                <div className="w-full lg:w-1/2 ">
                  <p className="text-base font-medium text-meta-light-blue-3">
                    Start date
                  </p>
                  <DatePicker
                    format="YYYY-MM-DD"
                    value={list?.start_date}
                    onChange={(date: any) => {
                      let data = [...formik?.values?.bgv];
                      data[index]['start_date'] = date?.format('YYYY-MM-DD');
                      formik?.setFieldValue('bgv', data);
                    }}
                    placeholder="Start date"
                    onOpenPickNewDate={false}
                    containerStyle={{ width: '100%' }}
                    style={{
                      height: 50,
                      width: '100%',
                      borderRadius: 8,
                      border: 0,
                      paddingLeft: 10,
                      marginTop: 10,
                      backgroundColor: '#EFF4FF',
                    }}
                  />
                  {formik?.touched?.bgv?.[index]?.start_date &&
                    formik.errors.bgv?.[index]?.start_date && (
                      <div className="error">
                        {formik?.errors?.bgv?.[index]?.start_date}
                      </div>
                    )}
                </div>
                <div className="w-full lg:w-1/2 ">
                  <p className="text-base font-medium text-meta-light-blue-3">
                    end date
                  </p>
                  <DatePicker
                    format="YYYY-MM-DD"
                    // value={date?.startDate}
                    placeholder="End date"
                    onOpenPickNewDate={false}
                    value={list?.end_date}
                    containerStyle={{ width: '100%' }}
                    onChange={(date: any) => {
                      let data = [...formik?.values?.bgv];
                      data[index]['end_date'] = date?.format('YYYY-MM-DD');
                      formik?.setFieldValue('bgv', data);
                    }}
                    style={{
                      height: 50,
                      width: '100%',
                      borderRadius: 8,
                      border: 0,
                      paddingLeft: 10,
                      marginTop: 10,
                      backgroundColor: '#EFF4FF',
                    }}
                  />
                  {formik?.touched?.bgv?.[index]?.end_date &&
                    formik.errors.bgv?.[index]?.end_date && (
                      <div className="error">
                        {formik?.errors?.bgv?.[index]?.end_date}
                      </div>
                    )}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-base font-medium text-meta-light-blue-3">
                  Location
                </p>
                <Menu as="div" className="relative  mt-[10px] w-full">
                  <Menu.Button className="relative z-20 flex  w-full appearance-none items-center justify-between rounded-lg bg-meta-light-blue-2  px-4 py-5 outline-none transition">
                    <p
                      className={`${list?.location_type ? 'text-black' : 'text-meta-gray-1'}  `}
                    >
                      {' '}
                      {list?.location_type ?? 'Location'}
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
                    <Menu.Items className="mt-  absolute right-0 z-30 max-h-[200px] w-full origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div>
                        {WORKPLACE_TYPE?.map((ele: any) => {
                          return (
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={() => {
                                    let data = [...formik?.values?.bgv];
                                    data[index]['location_type'] = ele;
                                    formik?.setFieldValue('bgv', data);
                                  }}
                                  className={classNames(
                                    active
                                      ? 'bg-meta-blue-1 text-white'
                                      : 'text-gray-900',
                                    'block px-4 py-2 text-[14px] capitalize hover:text-white',
                                  )}
                                >
                                  {ele}
                                </div>
                              )}
                            </Menu.Item>
                          );
                        })}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                {formik?.touched?.bgv?.[index]?.location_type &&
                  formik.errors.bgv?.[index]?.location_type && (
                    <div className="error">
                      {formik?.errors?.bgv?.[index]?.location_type}
                    </div>
                  )}
              </div>
              <div className="mt-4">
                <p className="text-base font-medium text-meta-light-blue-3">
                  Reference*
                </p>
                <div className="flex w-full justify-center gap-4">
                  <div className="w-full lg:w-1/2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={list?.reference?.name}
                      name="name"
                      onChange={(e) => {
                        let data = [...formik?.values?.bgv];
                        data[index]['reference'].name = e?.target?.value;
                        formik?.setFieldValue('bgv', data);
                      }}
                      className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
                    />
                    {formik?.touched?.bgv?.[index]?.reference?.name &&
                      formik.errors.bgv?.[index]?.reference?.name && (
                        <div className="error">
                          {formik?.errors?.bgv?.[index]?.reference?.name}
                        </div>
                      )}
                  </div>
                  <div className="w-full lg:w-1/2">
                    <input
                      type="text"
                      placeholder="Designation"
                      value={list?.reference?.designation}
                      onChange={(e) => {
                        let data = [...formik?.values?.bgv];
                        data[index]['reference'].designation = e?.target?.value;
                        formik?.setFieldValue('bgv', data);
                      }}
                      className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
                    />
                    {formik?.touched?.bgv?.[index]?.reference?.designation &&
                      formik.errors.bgv?.[index]?.reference?.designation && (
                        <div className="error">
                          {formik?.errors?.bgv?.[index]?.reference?.designation}
                        </div>
                      )}
                  </div>
                </div>
                <div className=" flex w-full justify-center gap-4">
                  <div className="w-full lg:w-1/2">
                    <input
                      type="number"
                      value={list?.reference?.phone_no}
                      onChange={(e) => {
                        let data = [...formik?.values?.bgv];
                        data[index]['reference'].phone_no = Number(
                          e?.target?.value,
                        );
                        formik?.setFieldValue('bgv', data);
                      }}
                      placeholder="Phone No"
                      className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
                    />
                    {formik?.touched?.bgv?.[index]?.reference?.phone_no &&
                      formik.errors.bgv?.[index]?.reference?.phone_no && (
                        <div className="error">
                          {formik?.errors?.bgv?.[index]?.reference?.phone_no}
                        </div>
                      )}
                  </div>
                  <div className="w-full lg:w-1/2">
                    <input
                      type="text"
                      placeholder="Email id"
                      value={list?.reference?.email_id}
                      onChange={(e) => {
                        let data = [...formik?.values?.bgv];
                        data[index]['reference'].email_id = e?.target?.value;
                        formik?.setFieldValue('bgv', data);
                      }}
                      className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
                    />
                    {formik?.touched?.bgv?.[index]?.reference?.email_id &&
                      formik.errors.bgv?.[index]?.reference?.email_id && (
                        <div className="error">
                          {formik?.errors?.bgv?.[index]?.reference?.email_id}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="mt-10 flex w-full justify-between">
          <Button
            title={'+ Add new experience'}
            btnClass={'!w-auto !px-4'}
            type={'button'}
            handleClick={handleAddMoreEXP}
          />
          <Button title={'Save'} btnClass={'!w-[140px] '} type="submit" />
        </div>
      </form>
    </div>
  ) : (
    <BGVProfile />
  );
};
export default AddBGVExperience;
