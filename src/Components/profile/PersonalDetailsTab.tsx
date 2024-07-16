import * as Yup from 'yup';
import Image from 'next/image';
import Button from '../Button';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { useFormik, Field } from 'formik';
import { Fragment, useContext, useState } from 'react';
import AppContext from '@/context/AppProvider';
import DatePicker from 'react-multi-date-picker';
import { Menu, Transition } from '@headlessui/react';
import { GENDER, PROFICIENCY } from '@/constant/Enum';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { TEXT, updateProfileCount } from '@/service/Helper';
import SuccessModal from './SuccessModal';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
const PersonalDetailsTab = ({
  session,
  languageList,
  userDetails,
  setActivePage,
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
    const obj = {
      ...values,
      // profile_count: {
      //   ...context?.userProfileCount,
      //   personal_details: 14,
      // },
    };
    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          setLoading(false);
          session?.user?.profile_count !== 100 &&
            session?.user?.profile_count < 100 &&
            handleNextClick('personal_details');
          if (
            profileCompletionCount?.individual === 100 ||
            session?.user?.profile_count === 100
          ) {
            setOpenSuccessModal(true);
          }
          getUserDataApiCall();

          context?.setUserProfileCount(res?.data?.data?.profile_count);
          actions.setSubmitting(false);
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
    gender: Yup.string().required(`Gender is required.`),
    date_of_birth: Yup.string().required(`Date of birth is required.`),
    languages: Yup.array().of(
      Yup.object().shape({
        language: Yup.object().nonNullable('Language is required'),
        proficiency: Yup.string().required('Proficiency is required'),
      }),
    ),
  });

  const formik: any = useFormik({
    initialValues: {
      gender: userDetails?.gender ?? '',
      date_of_birth: userDetails?.date_of_birth ?? '',
      languages:
        userDetails?.languages?.length !== 0
          ? userDetails?.languages
          : [
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
      <div className="mt-5 w-full pl-9">
        <label className="text-base font-medium text-meta-purple-1">
          Gender
        </label>
        <div className="flex gap-3 pt-1">
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

        <div className="mt-3 w-full">
          <label className="text-base font-medium text-meta-purple-1">
            Date of birth
          </label>
          <div className="w-full">
            <DatePicker
              format="YYYY-MM-DD"
              containerStyle={{ width: '100%' }}
              onOpenPickNewDate={false}
              value={formik?.values?.date_of_birth}
              onChange={(date: any) => {
                formik.setFieldValue(
                  'date_of_birth',
                  date?.format('YYYY-MM-DD'),
                );
              }}
              placeholder="Select date of birth"
              style={{
                height: 48,
                width: '100%',
                borderColor: '#DCE7FF',
                borderRadius: 8,
                paddingLeft: 10,
                marginTop: 4,
              }}
            />
          </div>
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
              <div className="relative flex w-full items-center gap-3 ">
                <div className="w-1/2">
                  <Menu as="div" className="relative w-full">
                    <Menu.Button className="relative mt-2 flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 px-3 py-3 outline-none transition">
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
                    <Menu.Button className="relative mt-2 flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 px-3 py-3 outline-none transition">
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
                    className={`${formik?.errors?.languages?.[i]?.proficiency ? 'bottom-[34px]' : 'bottom-4'} absolute -right-8  cursor-pointer`}
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
        <Button
          isLoading={loading}
          title={TEXT?.NEXT}
          titleClass="!text-base !text-white"
          btnClass="!w-36 !rounded-lg !bg-meta-blue-1 !py-2"
        />
      </div>
      <SuccessModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
    </form>
  );
};
export default PersonalDetailsTab;
