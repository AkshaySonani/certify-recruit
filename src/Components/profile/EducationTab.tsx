import { HIGH_EDUCATION } from '@/constant/Enum';
import { TEXT } from '@/service/Helper';
import { Menu, Transition } from '@headlessui/react';
import moment from 'moment';
import Image from 'next/image';
import { Fragment } from 'react';
import { useFormik, Field } from 'formik';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const EducationTab = ({
  userDetails,
  setActivePage,
  activePage,
  collegeList,
  degreeList,
}: any) => {
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
    college_school_name: Yup.object().nonNullable(`College name is required.`),
    degree: Yup.object().nonNullable(`Degree is required.`),
    highest_education: Yup.string().required(`Please select highest education`),
    completion_date: Yup.object().shape({
      year: Yup.string().required('Year is required'),
      month: Yup.string().required('Month is required'),
    }),
  });

  const formik = useFormik({
    initialValues: {
      degree: userDetails?.degree ?? null,
      highest_education: userDetails?.highest_education ?? '',
      college_school_name: userDetails?.college_school_name ?? null,
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
      <div className="mt-5  w-full  pl-9">
        <label className="text-base font-medium text-meta-purple-1">
          Your highest education
        </label>
        <div className="mt-2 flex gap-3 pt-1">
          {HIGH_EDUCATION?.map((list) => {
            return (
              <div
                className={`cursor-pointer rounded-3xl border border-meta-light-blue-1 px-3 py-2  text-sm ${list?.value === formik?.values?.highest_education ? 'bg-meta-blue-1 text-white ' : 'bg-white text-meta-light-blue-3'}`}
                onClick={() =>
                  formik.setFieldValue('highest_education', list?.value)
                }
              >
                {list?.label}
              </div>
            );
          })}
        </div>
        {formik.touched.highest_education &&
          formik.errors.highest_education && (
            <div className="error">{formik.errors.highest_education}</div>
          )}

        <div className="mt-[10px] w-full">
          <Menu as="div" className="relative w-full">
            <label className="text-base font-medium text-meta-purple-1">
              College name
            </label>
            <Menu.Button className="relative z-20 mt-2 flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 py-3 pl-5 pr-[11px] outline-none transition">
              <p>
                {formik?.values?.college_school_name === null
                  ? 'Select your college '
                  : formik?.values?.college_school_name?.name}
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
                  {collegeList?.map((list: any) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() =>
                              formik.setFieldValue('college_school_name', list)
                            }
                            className={classNames(
                              active
                                ? 'bg-meta-blue-1 text-white'
                                : 'text-gray-900',
                              'block px-4 py-2 text-[14px] capitalize',
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
            {formik.touched.college_school_name &&
              formik.errors.college_school_name && (
                <div className="error">{formik.errors.college_school_name}</div>
              )}
          </Menu>
        </div>
        <div className="mt-5 flex ">
          <Menu as="div" className="relative w-full">
            <label className="text-base font-medium text-meta-purple-1">
              Degree
            </label>
            <Menu.Button className="relative z-20 mt-2 flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 py-3 pl-5 pr-[11px] outline-none transition">
              <p>
                {formik?.values?.degree === null
                  ? 'Select your degree '
                  : formik?.values?.degree?.name}
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
                  {degreeList?.map((list: any) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={() => formik.setFieldValue('degree', list)}
                            className={classNames(
                              active
                                ? 'bg-meta-blue-1 text-white'
                                : 'text-gray-900',
                              'block px-4 py-2 text-[14px] capitalize',
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
            {formik.touched.degree && formik.errors.degree && (
              <div className="error">{formik.errors.degree}</div>
            )}
          </Menu>
        </div>

        <div className="mt-5 ">
          <label className="text-base font-medium text-meta-purple-1">
            Completion year (or expected)
          </label>
          <div className="mt-3 flex w-full gap-3">
            <div className="w-1/2">
              <DatePicker
                value={formik?.values?.completion_date?.month as any}
                wrapperClassName="w-full"
                // selected={formik?.values?.completion_date?.month as any}
                // renderMonthContent={renderMonthContent}
                showMonthYearPicker
                className="w-full rounded-xl border border-meta-light-blue-1 p-3"
                dateFormat="MMMM"
                placeholderText="Select Month"
                onChange={(date) => {
                  {
                    formik?.setFieldValue('completion_date', {
                      ...formik?.values?.completion_date,
                      month: moment(date).format('MMMM'),
                    });
                  }
                }}
              />
              {formik?.touched?.completion_date?.month &&
                formik.errors.completion_date?.year && (
                  <div className="error">
                    {formik.errors.completion_date?.month}
                  </div>
                )}
            </div>

            <div className="w-1/2">
              <DatePicker
                value={String(formik?.values?.completion_date?.year)}
                // value={formik?.values?.completion_date?.year as any}
                showYearPicker={true}
                wrapperClassName="w-full"
                // renderYearContent={renderYearContent}
                // selected={formik?.values?.completion_date?.year as any}
                shouldCloseOnSelect={true}
                dateFormat="YYYY"
                placeholderText="Select Year"
                className="w-full rounded-xl border border-meta-light-blue-1 p-3"
                onChange={(date) => {
                  {
                    formik?.setFieldValue('completion_date', {
                      ...formik?.values?.completion_date,
                      year: Number(moment(date).format('YYYY')),
                    });
                  }
                }}
              />

              {formik?.touched?.completion_date?.year &&
                formik.errors.completion_date?.year && (
                  <div className="error">
                    {formik.errors.completion_date?.year}
                  </div>
                )}
            </div>
          </div>
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
export default EducationTab;
