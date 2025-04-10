'use client';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/Components/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useFormik } from 'formik';
import { EMAIlREGEX } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const handleSubmit = async (values: any, actions: any) => {
    setLoading(true);
    let obj = {
      ...values,
    };

    API.post(API_CONSTANT?.CONTACT, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          setLoading(false);
          toast?.success(res?.data?.message || 'Successfully Update Profile');
          router.push('/');
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .required('Email is required.')
      .matches(EMAIlREGEX, 'Invalid email'),
    message: Yup.string().required('Message is required'),
  });

  const currentValidationSchema = validationSchema;

  const formik: any = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
    enableReinitialize: true,
    validationSchema: currentValidationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="">
      <div className="relative mb-10 bg-meta-gray-2 lg:mb-40">
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
                201, Platinum Hub, near Central Bank, Near Tulsidham Char Rasta,
                Manjit Nagar, GIDC Industrial Area, Manjalpur, Vadodara, Gujarat
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
                info@certifyrecruit.io
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-full px-4 pb-[75px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <div className="justify flex items-start justify-center gap-0 md:gap-10">
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
              <p className="text-2xl font-[700] text-meta-purple-1 md:text-[40px]">
                Contact our Friendly Team
              </p>
              <p className="pt-[10px] text-lg font-medium text-meta-light-blue-3">
                Our team is all ears for you!
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-[20px] flex w-full gap-3 lg:mt-[61px]">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    First name
                  </label>
                  <input
                    type="text"
                    onChange={formik.handleChange}
                    value={formik?.values?.firstName}
                    name="firstName"
                    placeholder="First name"
                    className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 bg-meta-light-blue-5 p-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="error">{formik.errors.firstName}</div>
                  )}
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Last name
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik?.values?.lastName}
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    className="mt-2 w-full rounded-2xl border border-meta-light-blue-1 bg-meta-light-blue-5 p-3 focus:border-meta-light-blue-3"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="error">{formik.errors.lastName}</div>
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
                  placeholder="Message"
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
