import { GENDER, PROFICIENCY } from '@/constant/Enum';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import DatePicker from 'react-datepicker';
import { TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
const PersonalDetailsTab = ({
  languageList,
  userDetails,
  setActivePage,
  activePage,
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
    gender: Yup.string().required(`Gender is required.`),
    date_of_birth: Yup.string().required(`Date of birth is required.`),
    languages: Yup.array().of(
      Yup.object().shape({
        language: Yup.object().nonNullable('Language is required'),
        proficiency: Yup.string().required('Proficiency is required'),
      }),
    ),
  });

  const formik = useFormik({
    initialValues: {
      gender: userDetails?.gender ?? '',
      date_of_birth: userDetails?.date_of_birth ?? '',
      languages: userDetails?.languages ?? [
        {
          language: null,
          proficiency: '',
        },
      ],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  const handleAddMoreLang = () => {
    formik?.setFieldValue('languages', [
      ...formik?.values?.languages,
      { language: null, proficiency: '' },
    ]);
  };

  const handleChangeLanguages = (i: any, el: any, name: any) => {
    let arr = [...formik?.values?.languages];
    arr[i][name] = el;
    formik?.setFieldValue('languages', arr);
  };

  const handleRemove = (list: any) => {
    const arr = formik?.values?.languages.filter((el: any) => {
      return el !== list;
    });
    formik?.setFieldValue('languages', arr);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-5  w-full  pl-9">
        <label className="text-base font-medium text-meta-purple-1">
          Gender
        </label>
        <div className="mt-2 flex gap-3 pt-1">
          {GENDER?.map((list: any) => {
            return (
              <div
                className={`cursor-pointer rounded-3xl border border-meta-light-blue-1 px-3 py-2  text-sm ${list === formik?.values?.gender ? 'bg-meta-blue-1 text-white ' : 'bg-white text-meta-light-blue-3'}`}
                onClick={() => formik.setFieldValue('gender', list)}
              >
                <p className="capitalize">{list}</p>
              </div>
            );
          })}
        </div>
        {formik.touched.gender && formik.errors.gender && (
          <div className="error">{formik.errors.gender}</div>
        )}

        <div className="mt-5 w-full">
          <label className="text-base font-medium text-meta-purple-1">
            Date of birth
          </label>
          <DatePicker
            name="date_of_birth"
            wrapperClassName="w-full personal-details-date-picker"
            selected={formik?.values?.date_of_birth as any}
            shouldCloseOnSelect={true}
            showMonthDropdown
            showYearDropdown
            placeholderText="Select date of birth"
            className="mt-3 w-full rounded-xl border border-meta-light-blue-1 p-3"
            onChange={(date: any) =>
              formik?.setFieldValue('date_of_birth', date)
            }
          />
          {formik.touched.date_of_birth && formik.errors.date_of_birth && (
            <div className="error">{formik.errors.date_of_birth}</div>
          )}
        </div>

        <div className="z-50 mt-3 ">
          <label className="text-base font-medium text-meta-purple-1">
            Language
          </label>
          {formik?.values?.languages?.map((list: any, i: any) => {
            return (
              <div className="relative flex w-full gap-3 ">
                <div className="w-1/2">
                  <Menu as="div" className="relative w-full">
                    <Menu.Button className="relative z-20 mt-2 flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 py-3 pl-5 pr-[11px] outline-none transition">
                      <p>
                        {list?.language === null
                          ? 'Select your language'
                          : list?.language?.language}
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
                      <Menu.Items className="absolute right-0 z-30 max-h-[200px] w-full origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div>
                          {languageList?.map((el: any) => {
                            return (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={() =>
                                      handleChangeLanguages(i, el, 'language')
                                    }
                                    className={classNames(
                                      active
                                        ? 'bg-meta-blue-1 text-white'
                                        : 'text-gray-900',
                                      'block px-4 py-2 text-[14px] capitalize',
                                    )}
                                  >
                                    {el?.language}
                                  </div>
                                )}
                              </Menu.Item>
                            );
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {formik?.touched?.languages?.[i]?.language &&
                    formik.errors.languages?.[i]?.language && (
                      <div className="error">
                        {formik?.errors?.languages?.[i]?.language}
                      </div>
                    )}
                </div>
                <div className="w-1/2">
                  <Menu as="div" className="relative w-full">
                    <Menu.Button className="relative z-20 mt-2 flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 py-3 pl-5 pr-[11px] outline-none transition">
                      <p>
                        {list?.proficiency === ''
                          ? 'Select your Proficiency '
                          : list?.proficiency}
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
                          {PROFICIENCY?.map((el: any) => {
                            return (
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={() =>
                                      handleChangeLanguages(
                                        i,
                                        el,
                                        'proficiency',
                                      )
                                    }
                                    className={classNames(
                                      active
                                        ? 'bg-meta-blue-1 text-white'
                                        : 'text-gray-900',
                                      'block px-4 py-2 text-[14px] capitalize',
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
                  {formik?.touched?.languages?.[i]?.proficiency &&
                    formik.errors.languages?.[i]?.proficiency && (
                      <div className="error">
                        {formik?.errors?.languages?.[i]?.proficiency}
                      </div>
                    )}
                </div>
                {i !== 0 && (
                  <div
                    className="absolute -right-8  cursor-pointer lg:bottom-4"
                    onClick={() => handleRemove(list)}
                  >
                    <Image
                      width={20}
                      height={20}
                      alt="Google-icon"
                      src={'/CloseIcon.svg'}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div
          className="text- mt-[10px] cursor-pointer text-meta-blue-1"
          onClick={() => handleAddMoreLang()}
        >
          Add another language
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
export default PersonalDetailsTab;
