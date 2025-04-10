import * as Yup from 'yup';
import Image from 'next/image';
import Button from '../Button';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { useFormik, Field } from 'formik';
import { components } from 'react-select';
import AppContext from '@/context/AppProvider';
import 'react-datepicker/dist/react-datepicker.css';
import MultipleSelectBox from '../MultipleSelectBox';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { useContext, useEffect, useState } from 'react';
import { TEXT, updateProfileCount } from '@/service/Helper';
import SuccessModal from './SuccessModal';

const KeySkillTab = ({
  session,
  userDetails,
  setActivePage,
  activePage,
  getUserDataApiCall,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [data, setData] = useState([]);
  const [field, setField] = useState([]);
  const context = useContext(AppContext);

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
    API.post(API_CONSTANT?.PROFILE, {
      role: values.field.value,
      skills: values?.skills.map((el: any) => el?._id),
    })
      .then((res) => {
        if (res?.data?.status === 200) {
          setLoading(false);
          session?.user?.profile_count !== 100 &&
            session?.user?.profile_count < 100 &&
            handleNextClick('key_skills');
          if (
            profileCompletionCount?.individual === 100 ||
            session?.user?.profile_count === 100
          ) {
            setOpenSuccessModal(true);
          }
          getUserDataApiCall();
          actions.setSubmitting(false);
          setActivePage(activePage + 1);
          // context?.setUserProfileCount(res?.data?.data?.profile_count);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error || 'Something want wrong');
      });
  };

  const validationSchema = Yup.object().shape({
    field: Yup.object().shape({
      value: Yup.string().required('Field is required'),
    }),
    skills: Yup.array()
      .min(1, `select at least one skill`)
      .max(10, 'select maximum 10 skills'),
  });

  const formik: any = useFormik({
    initialValues: {
      field: { label: userDetails?.role || '', value: userDetails?.role || '' },
      skills: userDetails?.skills
        ? userDetails?.skills?.map((list: any) => ({
            _id: list?._id,
            label: list?.subcategory,
            value: list?.subcategory,
          }))
        : [],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleClose = (list: any) => {
    const arr = formik?.values?.skills.filter((el: any) => el !== list);
    formik?.setFieldValue('skills', arr);
  };

  console.log('🚀 ~ formik:', formik.errors);
  useEffect(() => {
    getAllCategoryApi();
  }, []);

  useEffect(() => {
    setSkillData(
      data
        ?.filter((e: any) => e.field === formik.values?.field?.value)
        ?.map((list: any) => ({
          _id: list?._id,
          label: list?.subcategory,
          value: list?.subcategory,
        })) as any,
    );
  }, [formik.values?.field?.value, data]);

  const getAllCategoryApi = () => {
    API.get(API_CONSTANT?.CATEGORY)
      .then((res) => {
        setData(res?.data?.data);
        setField([
          ...new Set(res?.data?.data?.map((e: any) => e?.field)),
        ] as any);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };

  const Placeholder = (props: any) => {
    return <components.Placeholder {...props} />;
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <Image alt="Plus" width={20} height={19} src={'/job/Plus.svg'} />
      </components.DropdownIndicator>
    );
  };

  const MultiboxStyle = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? 1 : 1,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      // paddingLeft: '20px',
      paddingRight: '2px',
      paddingTop: '0px',
      paddingBottom: '0px',
      '&:hover': {
        border: state.isFocused ? 0 : 0,
      },
    }),
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mt-5 flex w-full gap-3 pl-9">
        <div className="w-full">
          <label className="mb-8 text-base font-medium text-meta-purple-1">
            Filed
          </label>

          <p className="mb-3 pt-1 text-sm font-medium text-meta-light-blue-3">
            Tell recruiters what you know or what you are known for, e.g.,
            Direct Marketing, Oracle, Java, etc. We will send you job
            recommendations based on these skills. Each skill should be
            separated by a comma.
          </p>

          <div className="mt-3 flex w-full flex-col items-start lg:mt-0 lg:w-1/2">
            <div className="border-1 mt-3 flex w-full flex-wrap items-start rounded-xl border border-meta-light-blue-1 py-2 lg:mt-0">
              <MultipleSelectBox
                name="field"
                form={formik}
                isMulti={false}
                style={MultiboxStyle}
                placeholder="Add your field"
                value={formik?.values?.field}
                className="w-full !border-meta-light-blue-1"
                components={{ Placeholder, DropdownIndicator }}
                options={field.map((e) => ({ label: e, value: e }))}
              />
            </div>
            {formik.touched.field?.value && formik.errors.field?.value && (
              <div className="error">{formik.errors.field?.value}</div>
            )}
            <div className="mt-4 flex flex-wrap items-start justify-start text-start sm:flex-nowrap">
              {formik?.values?.field?.value && (
                <div className="mb-2 mr-3 flex w-max items-center rounded-lg border-2 border-meta-light-blue-1 px-2 py-2">
                  <p className="whitespace-nowrap text-sm font-medium text-meta-light-blue-3">
                    {formik?.values?.field?.value}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full gap-3 pl-9">
        <div className="w-full">
          <label className="mb-8 text-base font-medium text-meta-purple-1">
            Key Skill
          </label>

          <div className="mt-3 flex w-full flex-col items-start lg:mt-0 lg:w-1/2">
            <div className="border-1 mt-3 flex w-full flex-wrap items-start rounded-xl border border-meta-light-blue-1 py-2 lg:mt-0">
              <MultipleSelectBox
                name="skills"
                form={formik}
                isMulti={true}
                options={skillData}
                style={MultiboxStyle}
                placeholder="Add your Skill"
                value={formik?.values?.skills}
                className="w-full !border-meta-light-blue-1"
                components={{ Placeholder, DropdownIndicator }}
              />
            </div>
            {formik.touched.skills && formik.errors.skills && (
              <div className="error">{formik.errors.skills}</div>
            )}
            <div className="mt-4 flex flex-wrap items-start justify-start text-start sm:flex-nowrap">
              {formik?.values?.skills?.map((ele: any, i: any) => {
                return (
                  <div className="mb-2 mr-3 flex w-max items-center rounded-lg border-2 border-meta-light-blue-1 px-2 py-2">
                    <p className="whitespace-nowrap text-sm font-medium text-meta-light-blue-3">
                      {ele?.label}
                    </p>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleClose(ele)}
                    >
                      <Image
                        width={19}
                        height={19}
                        alt="Preview"
                        className="ml-3"
                        src={'/job/Close.svg'}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
export default KeySkillTab;
