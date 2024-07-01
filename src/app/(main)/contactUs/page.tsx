'use client';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/Components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import API from '@/service/ApiService';
import { useFormik } from 'formik';
import { EMAIlREGEX } from '@/service/Helper';
const Page = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const handleSubmit = async (values: any, actions: any) => {
    setLoading(true);
    let obj = {
      ...values,
    };

    // API.post(API_CONSTANT?.PROFILE, obj)
    //   .then((res) => {
    //     if (res?.data?.status === 200) {
    //       context?.setUserProfileCount(res?.data?.data?.profile_count);
    //       setActivePage(1);
    //       getUserDataApiCall();
    //       actions.setSubmitting(false);
    //       toast?.success(res?.data?.message || 'Successfully Update Profile');
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error(error || 'Something want wrong');
    //   });
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string()
      .required('Email is required.')
      .matches(EMAIlREGEX, 'Invalid email'),
    message: Yup.string().required('Message is required'),
  });

  const currentValidationSchema = validationSchema;

  const formik: any = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      message: '',
    },
    enableReinitialize: true,
    validationSchema: currentValidationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="">
      <div className="relative mb-40 bg-meta-gray-2">
        <div className="mx-auto h-full px-4 pb-[75px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
          <div
            className=" w-full"
            data-aos="fade-down"
            data-aos-duration="1200"
            data-aos-easing="ease-in-sine"
          >
            <div className="relative flex flex-col items-center justify-center">
              <p className="bg-website-title bg-clip-text  text-center text-[30px] font-bold leading-[60px] text-transparent ">
                CONTACT US
              </p>
              <p className="w-full max-w-[484px] pt-3 text-center text-[30px] font-bold leading-[60px] text-meta-purple-1 sm:text-[50px]">
                We'd Love to Hear from You
              </p>
              <div className="absolute left-[66px] top-[-72px] hidden lg:block">
                <Image
                  alt="date"
                  width={37}
                  height={37}
                  src={'/landing/ball.png'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container relative mx-auto w-full px-4  lg:bottom-[-104px]">
          <div className=" grid grid-cols-1 justify-center gap-4 lg:grid-cols-3">
            <div
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="500"
              className="min-h-[200px] rounded-[20px] border border-meta-light-blue-1 bg-meta-light-blue-5 py-[30px] lg:w-[300px] xl:w-[380px]"
            >
              <div className="flex justify-center">
                <Image
                  alt="date"
                  width={46}
                  height={62}
                  src={'/contactUs/location.svg'}
                />
              </div>
              <p className="py-2 text-center text-lg font-medium text-meta-purple-1">
                Address
              </p>
              <p className="px-[55px] text-center text-base font-medium text-meta-light-blue-3">
                413, Tulsi Arcade, Near Sudama Chowk, Digital Valley (Mota
                Varachha), Surat.
              </p>
            </div>
            <div
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="500"
              className="min-h-[200px] rounded-[20px] border border-meta-light-blue-1 bg-meta-light-blue-5 py-[30px] lg:w-[300px] xl:w-[380px]"
            >
              <div className="flex justify-center ">
                <Image
                  alt="date"
                  width={62}
                  height={62}
                  src={'/contactUs/call.png'}
                />
              </div>
              <p className="py-2 text-center text-lg font-medium text-meta-purple-1">
                Contact
              </p>
              <p className="px-[55px] text-center text-base font-medium text-meta-light-blue-3">
                +91 9157350298
              </p>
            </div>
            <div
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="500"
              className="min-h-[200px] rounded-[20px] border border-meta-light-blue-1 bg-meta-light-blue-5 py-[30px] lg:w-[300px] xl:w-[380px]"
            >
              <div className="flex justify-center">
                <Image
                  alt="date"
                  width={56}
                  height={48}
                  src={'/contactUs/email.svg'}
                />
              </div>
              <p className="py-2 text-center text-lg font-medium text-meta-purple-1">
                Email
              </p>
              <p className="px-[40px] text-center text-base font-medium text-meta-light-blue-3">
                Info@Certifyrecruit.Com
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-full px-4 pb-[75px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <div className="justify flex justify-center gap-10">
          <div className="mt-2">
            <Image
              alt="date"
              width={480}
              height={500}
              src={'/contactUs/banner.png'}
              className="hidden md:block"
            />
          </div>
          <div>
            <div data-aos="fade-left" data-aos-easing="ease-in-sine">
              <p className="text-[40px] font-[700] text-meta-purple-1">
                Contact our Friendly Team
              </p>
              <p className="text-lg font-medium text-meta-light-blue-3">
                Our team is all ears for you!
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-[61px] flex w-full gap-3">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    First name
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik?.values?.first_name}
                    name="first_name"
                    placeholder="First name"
                    className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 bg-meta-light-blue-5 p-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <div className="error">{formik.errors.first_name}</div>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Last name
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik?.values?.last_name}
                    name="last_name"
                    type="text"
                    placeholder="Last name"
                    className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 bg-meta-light-blue-5 p-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className="error">{formik.errors.last_name}</div>
                  )}
                </div>
              </div>
              <div className="mt-3 w-full">
                <label className="text-base font-medium text-meta-purple-1">
                  Email
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik?.values?.email}
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 bg-meta-light-blue-5 p-3 focus:border-meta-light-blue-3"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="error">{formik.errors.email}</div>
                )}
              </div>
              <div className="mt-3 w-full">
                <label className="text-base font-medium text-meta-purple-1">
                  Message
                </label>
                <textarea
                  name="message"
                  onChange={formik.handleChange}
                  value={formik?.values?.message}
                  rows={5}
                  placeholder="Email"
                  className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 bg-meta-light-blue-5 p-3 focus:border-meta-light-blue-3"
                />
                {formik.touched.message && formik.errors.message && (
                  <div className="error">{formik.errors.message}</div>
                )}
              </div>
              <div className="mt-3">
                <Button
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  title={'Send Message'}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
