import Image from 'next/image';
import MultipleSelectBox from '../MultipleSelectBox';
import { TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import * as Yup from 'yup';
import { useFormik, Field } from 'formik';
import { toast } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button';

const KeySkillTab = ({
  userDetails,
  setActivePage,
  activePage,
  skillData,
  getUserDataApiCall,
}: any) => {
  const handleSubmit = async (values: any, actions: any) => {
    let pushArray = [] as any;
    skillData?.filter((el: any) => {
      values?.skills?.map((list: any) => {
        if (list === el?.value) {
          pushArray.push({ _id: el?._id });
        }
      });
    });
    const obj = {
      skills: pushArray,
    };
    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          getUserDataApiCall();
          actions.setSubmitting(false);
          setActivePage(activePage + 1);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const validationSchema = Yup.object().shape({
    skills: Yup.array(),
  });

  const formik: any = useFormik({
    initialValues: {
      skills: userDetails?.skills ?? [],
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleClose = (list: any) => {
    const arr = formik?.values?.skills.filter((el: any) => {
      return el !== list;
    });
    formik?.setFieldValue('skills', arr);
  };

  const MultiboxStyle = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? 1 : 1,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      paddingLeft: '20px',
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
          <label className="text-base font-medium text-meta-purple-1">
            Key skill
          </label>
          <p className="mb-3 pt-1 text-sm font-medium text-meta-light-blue-3">
            Tell recruiters what you know or what you are known for e.g. Direct
            Marketing, Oracle, Java etc. We will send you job recommendations
            based on these skills. each skill is separated by a comma.
          </p>
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
                className="w-full !border-meta-light-blue-1 "
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
                      {ele?.subcategory}
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
          title={TEXT?.SAVE}
          titleClass="!text-base !text-white"
          btnClass="!w-36 !rounded-lg !bg-meta-blue-1 !py-2"
        />
      </div>
      {/* <div className="mt-8 flex w-full justify-end">
        <button
          type="submit"
          className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white"
        >
          {TEXT?.SAVE}
        </button>
      </div> */}
    </form>
  );
};
export default KeySkillTab;
