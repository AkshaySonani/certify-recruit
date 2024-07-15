import * as Yup from 'yup';
import { Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import { TEXT } from '@/service/Helper';
import { CURRENT_LOCATION } from '@/constant/Enum';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

const EditDetailsDialog = ({
  isOpen,
  session,
  setIsOpen,
  userDetails,
  getUserDataApiCall,
}: any) => {
  const [successOpen, setSuccessOpen] = useState(false);
  const handleSubmit = async (values: any, actions: any) => {
    const obj = {
      ...values,
    };

    API.post(API_CONSTANT?.PROFILE, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          getUserDataApiCall();
          setSuccessOpen(true);
          actions.setSubmitting(false);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };
  const validationSchema = Yup.object().shape({
    contact_number: Yup.string().matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
      'invalid contact number',
    ),
    user_name: Yup.string().required('Username is required'),
  });

  const formik: any = useFormik({
    initialValues: {
      current_location: userDetails?.current_location ?? 'USA',
      contact_number: userDetails?.contact_number ?? '',
      user_name: userDetails?.user_name ?? '',
      role: userDetails?.role ?? '',
      email: session?.user?.email,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  let totalYears = 0;
  let totalMonths = 0;
  function calculateTotalExperience() {
    userDetails?.total_experiences?.forEach((experience: any) => {
      totalYears += experience.years;
      totalMonths += experience.month;
    });

    // Adjust totalMonths to years if it's more than 12
    totalYears += Math.floor(totalMonths / 12);
    totalMonths %= 12;

    return { totalYears, totalMonths };
  }
  calculateTotalExperience();

  useEffect(() => {
    if (successOpen === true) {
      setTimeout(() => {
        setIsOpen(false);
        setSuccessOpen(false);
      }, 3000);
    }
  }, [successOpen]);

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
                {successOpen ? (
                  <Dialog.Panel className="w-full max-w-lg transform rounded-2xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                    <div className="mt-6 ">
                      <Image
                        width={142}
                        height={142}
                        alt="UploadLogo"
                        src={'/profile/Successmark.png'}
                        className="mx-auto cursor-pointer"
                      />
                    </div>
                    <div className="my-[30px] flex w-full flex-col items-center justify-center">
                      <p className="text-center text-3xl  font-semibold text-black">
                        successful
                      </p>
                      <p className=" mt-[14px] px-20 text-center text-xl  font-semibold text-meta-gray-1">
                        Your profile has been updated successfully.
                      </p>
                    </div>
                  </Dialog.Panel>
                ) : (
                  <Dialog.Panel className="w-full max-w-3xl transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="border-b-default-1 relative flex items-start border-meta-light-blue-1 p-8 text-xl font-semibold leading-6 text-meta-purple-1"
                    >
                      {TEXT?.BASIC_DETAIL}
                    </Dialog.Title>
                    <form onSubmit={formik.handleSubmit}>
                      <div className="w-full p-8 pt-0">
                        <div className="flex items-center justify-between">
                          <div className="mr-3 w-1/2">
                            <label>UserName</label>
                            <input
                              type="text"
                              placeholder="Username"
                              name="user_name"
                              onChange={formik?.handleChange}
                              value={formik?.values?.user_name}
                              className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
                            />
                            {formik.touched.user_name &&
                              formik.errors.user_name && (
                                <div className="error">
                                  {formik.errors.user_name}
                                </div>
                              )}
                          </div>
                          <div className="w-1/2">
                            <label>{TEXT?.EMAIL}</label>
                            <input
                              type="text"
                              name="email"
                              value={formik?.values?.email}
                              readOnly
                              placeholder="Email"
                              className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
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
                            className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
                          />
                          {formik.touched.contact_number &&
                            formik.errors.contact_number && (
                              <div className="error">
                                {formik.errors.contact_number}
                              </div>
                            )}
                        </div>
                        <div className="mt-3 w-full">
                          <label>{TEXT?.ROLE}</label>
                          <input
                            type="text"
                            readOnly
                            name="role"
                            value={formik?.values?.role}
                            onChange={formik?.handleChange}
                            placeholder={TEXT?.ROLE}
                            className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
                          />
                        </div>

                        <div className="mt-3 w-full">
                          <label>Total Experience</label>
                          <div className="mt-2 flex items-center">
                            <div className="mr-3 w-1/2">
                              <label>{'Year'}</label>
                              <input
                                type="number"
                                value={totalYears}
                                readOnly
                                placeholder={'Year'}
                                className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
                              />
                            </div>
                            <div className="w-1/2">
                              <label>{'Month'}</label>
                              <input
                                type="number"
                                value={totalMonths}
                                readOnly
                                placeholder={'Month'}
                                className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3 focus:outline-meta-light-blue-1"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 w-full">
                          <label>Current Location</label>
                          <div className="flex items-center">
                            <div className="p-3 pl-0">
                              <label
                                htmlFor={'USA'}
                                className={`flex cursor-pointer select-none items-center `}
                              >
                                <input
                                  type="radio"
                                  id={'USA'}
                                  value={CURRENT_LOCATION[0]}
                                  onChange={formik.handleChange}
                                  defaultChecked={
                                    formik.values.current_location ===
                                    CURRENT_LOCATION[0]
                                  }
                                  name={'current_location'}
                                  radioGroup="location"
                                />
                                <p className="pl-3 uppercase">{'USA'}</p>
                              </label>
                            </div>

                            <div className="p-3">
                              <label
                                htmlFor={'Out side of USA'}
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
                                  id={'Out side of USA'}
                                  name={'current_location'}
                                />
                                <p className="pl-3">{'Out side of USA'}</p>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-between">
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
                )}
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default EditDetailsDialog;
