import { API_CONSTANT } from "@/constant/ApiConstant";
import API from "@/service/ApiService";
import { TEXT } from "@/service/Helper";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik, Field } from "formik";
import { CURRENT_LOCATION } from "@/constant/Enum";
const EditDetailsDialog = ({
  setIsOpen,
  isOpen,
  userDetails,
  session,
}: any) => {
  const handleSubmit = async (values: any, actions: any) => {
    const obj = {
      ...values,
    };

    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        toast?.success("Successfully Update Profile");
        setIsOpen(false);
        actions.setSubmitting(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const validationSchema = Yup.object().shape({
    contact_number: Yup.string().matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      "invalid contact number"
    ),
  });

  const formik = useFormik({
    initialValues: {
      current_location: userDetails?.current_location ?? "USA",
      contact_number: userDetails?.contact_number ?? "",
      user_name: userDetails?.user_name ?? "",
      role: userDetails?.role ?? "",
      email: session?.user?.email,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            leaveTo="opacity-0"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leave="ease-in duration-200"
            enter="ease-out duration-300"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                leave="ease-in duration-200"
                leaveTo="opacity-0 scale-95"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leaveFrom="opacity-100 scale-100"
              >
                <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className=" border-b-default-1 relative flex items-start border-meta-light-blue-1 p-8 text-xl font-semibold leading-6 text-meta-purple-1"
                  >
                    {TEXT?.BASIC_DETAIL}
                  </Dialog.Title>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="w-full p-8 pt-0">
                      <div className="flex items-center justify-between">
                        <div className="mr-3 w-1/2">
                          <label>{TEXT?.FULL_NAME}</label>
                          <input
                            type="text"
                            placeholder="Username"
                            name="user_name"
                            onChange={formik?.handleChange}
                            value={formik?.values?.user_name}
                            className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                          />
                        </div>
                        <div className="w-1/2">
                          <label>{TEXT?.EMAIL}</label>
                          <input
                            type="text"
                            name="email"
                            value={formik?.values?.email}
                            readOnly
                            placeholder="Email"
                            className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                          />
                        </div>
                      </div>
                      <div className="mt-3 w-full">
                        <label>{TEXT?.PHONE_NUMBER}</label>
                        <input
                          type="number"
                          value={formik?.values?.contact_number}
                          name="contact_number"
                          onChange={formik?.handleChange}
                          placeholder={TEXT?.PHONE_NUMBER}
                          className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                        />
                      </div>
                      <div className="mt-3 w-full">
                        <label>{TEXT?.ROLE}</label>
                        <input
                          type="text"
                          name="role"
                          value={formik?.values?.role}
                          onChange={formik?.handleChange}
                          placeholder={TEXT?.ROLE}
                          className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                        />
                      </div>

                      <div className="w-full mt-3">
                        <label>{TEXT?.TOTAL_EXPERIENCE}</label>
                        <div className="flex items-center mt-2">
                          <div className="mr-3 w-1/2">
                            <label>{TEXT?.YEAR}</label>
                            <input
                              type="number"
                              readOnly
                              placeholder={TEXT?.YEAR}
                              className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                            />
                          </div>
                          <div className="w-1/2">
                            <label>{TEXT?.MONTH}</label>
                            <input
                              type="number"
                              readOnly
                              placeholder={TEXT?.MONTH}
                              className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3">
                        <label>{TEXT?.CURRENT_LOCATION}</label>
                        <div className="flex items-center">
                          <div className="p-3 pl-0">
                            <label
                              htmlFor={TEXT?.USA}
                              className={`flex cursor-pointer select-none items-center `}
                            >
                              <input
                                type="radio"
                                id={TEXT?.USA}
                                value={CURRENT_LOCATION[0]}
                                onChange={formik.handleChange}
                                defaultChecked={
                                  formik.values.current_location ===
                                  CURRENT_LOCATION[0]
                                }
                                name={"current_location"}
                                radioGroup="location"
                              />
                              <p className="pl-3 uppercase">{TEXT?.USA}</p>
                            </label>
                          </div>

                          <div className="p-3">
                            <label
                              htmlFor={TEXT?.OUT_SIDE_USA}
                              className={`flex cursor-pointer select-none items-center `}
                            >
                              <input
                                type="radio"
                                value={CURRENT_LOCATION[1]}
                                onChange={formik.handleChange}
                                defaultChecked={
                                  formik.values.current_location ===
                                  CURRENT_LOCATION[1]
                                }
                                radioGroup="location"
                                id={TEXT?.OUT_SIDE_USA}
                                name={"current_location"}
                              />
                              <p className="pl-3">{TEXT?.OUT_SIDE_USA}</p>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-between">
                        <div className="mt-8 flex w-full">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="w-36 rounded-lg bg-meta-light-blue-1 py-2 text-base text-black"
                          >
                            {TEXT?.CANCEL}
                          </button>
                        </div>
                        <div className="mt-8 flex w-full justify-end">
                          <button
                            type="submit"
                            className="w-36 rounded-lg bg-meta-blue-1 py-2 text-base text-white"
                          >
                            {TEXT?.SAVE}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default EditDetailsDialog;
