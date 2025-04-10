'use client';
import * as Yup from 'yup';
import Button from './Button';
import Image from 'next/image';
import Loading from './Loading';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import API from '@/service/ApiService';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AppContext from '@/context/AppProvider';
import React, { useContext, useEffect, useState } from 'react';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { EMAIlREGEX, ROUTE, TEXT, USER_ROLE } from '@/service/Helper';
import SignupSuccessModal from './SignupSuccessModal';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const SignupForm = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [eye, setEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required.')
      .matches(EMAIlREGEX, 'Invalid email'),

    password: Yup.string()
      .required('Password is required.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        'invalid contact number',
      ),
    name: Yup.string().required('Name is required'),
  });

  const onNextUpdateProfileRole = async () => {
    const currentUserRole = await localStorage.getItem('userRole');

    API.post(API_CONSTANT?.PROFILE, {
      role: currentUserRole,
    })
      .then((res) => {
        if (res?.data?.status === 200) {
          return;
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const signUpWithEmailAndPassword = async (values: any) => {
    setLoading(true);
    try {
      const signUpResponse = await signIn('signup', {
        ...values,
        redirect: false,
        role: context.currentRole,
      });

      if (!signUpResponse?.ok) {
        setLoading(false);
        toast.error(signUpResponse?.error);
      } else {
        setSuccessOpen(true);
        if (context?.currentRole === 'individual') {
          onNextUpdateProfileRole();
        }
        setLoading(false);

        toast.success('User successfully register');
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error signing in with email and password. Try again later.');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      phone: '',
      name: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: signUpWithEmailAndPassword,
  });

  return (
    <div>
      <Loading loading={loading} />
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center py-20">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="bg-[url('/_Compound.svg')] ">
            <div className="flex justify-center">
              <div className="mb-20 w-10/12 min-w-72 max-w-md rounded-3xl border border-meta-light-blue-2 bg-white px-5 py-10 sm:px-10">
                <h3 className="mb-4 text-center text-3xl font-bold text-meta-purple-1">
                  {TEXT?.Get_Started}
                </h3>
                <p className="mb-10 text-center text-sm font-medium text-meta-light-blue-3">
                  {TEXT?.YOUR_NEW_JOURNEY_BEGINS_NOW}
                </p>
                {/* FIXME : hide google login from sign up for now because role not found  */}
                {context?.currentRole === 'false' && (
                  <>
                    <button
                      type="button"
                      onClick={() => signIn('google')}
                      className="mb-8 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-white text-xl font-semibold text-meta-light-blue-3 hover:bg-meta-gray-2"
                    >
                      <span className="flex items-center justify-center">
                        <Image
                          width={20}
                          height={20}
                          alt="Google-icon"
                          src={'/login/GoogleIcon.svg'}
                        />
                        <span className="ml-5 text-sm font-medium text-meta-blue-1">
                          {TEXT?.SIGN_UP_WITH_GOOGLE}
                        </span>
                      </span>
                    </button>
                    <div className="mb-8 flex items-center justify-center">
                      <div className="w-14 border-b border-meta-light-blue-2" />
                      <span className="mx-2 text-xs font-normal">
                        {TEXT?.OR}
                      </span>
                      <div className="w-14 border-b border-meta-light-blue-2" />
                    </div>
                  </>
                )}

                <div className="mb-3">
                  <input
                    value={formik?.values?.name}
                    onChange={formik.handleChange}
                    name="name"
                    type="text"
                    placeholder={'Name'}
                    className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4 focus:outline-meta-light-blue-1 "
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="error">{formik.errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <PhoneInput
                    className="gap-4"
                    defaultCountry="in"
                    placeholder="Phone Number"
                    value={formik?.values?.phone}
                    inputClassName="!h-12 w-full flex grow !border-meta-light-blue-2 !focus:outline-meta-light-blue-1 !rounded-xl !text-sm"
                    onChange={(value) =>
                      formik.handleChange({ target: { value, name: 'phone' } })
                    }
                    countrySelectorStyleProps={{
                      buttonStyle: { width: 64, height: 48, borderRadius: 12 },
                    }}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="error">{formik.errors.phone}</div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    value={formik?.values?.email}
                    onChange={formik.handleChange}
                    name="email"
                    type="text"
                    placeholder={TEXT?.EMAIL}
                    className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4 focus:outline-meta-light-blue-1"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                </div>
                <div className="relative mb-3">
                  <input
                    value={formik?.values.password}
                    onChange={formik.handleChange}
                    name="password"
                    placeholder={TEXT?.PASSWORD}
                    type={eye ? 'text' : 'password'}
                    className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4 focus:outline-meta-light-blue-1"
                  />
                  {!eye && (
                    <Image
                      alt="eye"
                      width={18}
                      height={18}
                      src={'/login/Eye-close.svg'}
                      className="absolute right-4 top-4"
                      onClick={() => setEye((prev) => !prev)}
                    />
                  )}
                  {eye && (
                    <Image
                      alt="eye"
                      width={18}
                      height={18}
                      src={'/login/Eye-open.svg'}
                      className="absolute right-4 top-4"
                      onClick={() => setEye((prev) => !prev)}
                    />
                  )}
                  {formik.touched.password && formik.errors.password && (
                    <div className="error">{formik.errors.password}</div>
                  )}
                </div>

                <Button title={TEXT?.SIGN_UP} />

                {/* <button className="rounded-xl w-full h-12 bg-meta-blue-2 border border-meta-light-blue-2 mb-8">
                    <span
                      // onClick={(e) => handleSubmit(eye)}
                      className="flex justify-center font-medium text-sm text-white"
                    >
                      {TEXT?.SIGN_UP}
                    </span>
                  </button> */}
                <div className="flex items-center justify-center text-sm font-medium text-meta-light-blue-3">
                  <span>
                    {TEXT?.ALREADY_HAVE_AN_ACCOUNT}
                    <span
                      onClick={() => router.push(ROUTE?.LOGIN)}
                      className="cursor-pointer text-meta-blue-1 hover:text-meta-blue-2"
                    >
                      {TEXT?.LOG_IN}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <SignupSuccessModal isOpen={successOpen} setIsOpen={setSuccessOpen} />
    </div>
  );
};

export default SignupForm;
