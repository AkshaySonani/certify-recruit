import Image from "next/image";
import MultipleSelectBox from "../MultipleSelectBox";

const KeySkillTab = ({ formik, skillData }: any) => {
  const handleClose = (list: any) => {
    const arr = formik?.values?.skills.filter((el: any) => {
      return el !== list;
    });
    formik?.setFieldValue("skills", arr);
  };

  const MultiboxStyle = {
    control: (base: any, state: any) => ({
      ...base,
      border: state.isFocused ? 1 : 1,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      paddingLeft: "20px",
      paddingTop: "0px",
      paddingBottom: "0px",
      "&:hover": {
        border: state.isFocused ? 0 : 0,
      },
    }),
  };
  return (
    <div className="mt-5 flex w-full gap-3 pl-9">
      <div className="w-full">
        <label className="text-base font-medium text-meta-purple-1">
          Key skill
        </label>
        <p className="pt-1 mb-3 text-sm text-meta-light-blue-3 font-medium">
          Tell recruiters what you know or what you are known for e.g. Direct
          Marketing, Oracle, Java etc. We will send you job recommendations
          based on these skills. each skill is separated by a comma.
        </p>
        <div className="flex items-start flex-col lg:w-1/2 w-full lg:mt-0 mt-3">
          <div className="flex items-start w-full lg:mt-0 mt-3 flex-wrap border border-1 border-meta-light-blue-1 rounded-xl py-2">
            <MultipleSelectBox
              className="w-full !border-meta-light-blue-1 "
              value={formik?.values?.skills}
              style={MultiboxStyle}
              name="skills"
              form={formik}
              options={skillData}
              placeholder="Add your Skill"
              isMulti={true}
            />
          </div>
          {formik.touched.skills && formik.errors.skills && (
            <div className="error">{formik.errors.skills}</div>
          )}
          <div className="text-start mt-4 flex items-start sm:flex-nowrap flex-wrap justify-start">
            {formik?.values?.skills?.map((ele: any, i: any) => {
              return (
                <div className="flex items-center px-2 py-1 border-2 border-meta-light-blue-1 rounded-lg mr-3 mb-2">
                  <p className="text-meta-light-blue-3 font-medium text-sm whitespace-nowrap">
                    {ele}
                  </p>
                  <div
                    className="cursor-pointer "
                    onClick={() => handleClose(ele)}
                  >
                    <Image
                      width={19}
                      height={19}
                      alt="Preview"
                      className="ml-3"
                      src={"/job/Close.svg"}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default KeySkillTab;
