'use client';
import * as Yup from 'yup';
import Image from 'next/image';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/Components/Button';
import Loading from '@/Components/Loading';
import { useRouter } from 'next/navigation';
import { EMAIlREGEX, ROUTE, TEXT } from '@/service/Helper';

const Page = () => {
  const router = useRouter();

  const [eye, setEye] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required.')
      .matches(EMAIlREGEX, 'Invalid email'),

    password: Yup.string()
      .required('Password is required.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
  });

  const signInWithEmailAndPassword = async (values: any) => {
    setLoading(true);
    try {
      const signInResponse = await signIn('signin', {
        ...values,
        redirect: false,
      });
      console.log('signInResponse', signInResponse);
      if (!signInResponse?.ok) {
        setLoading(false);
        toast.error(signInResponse?.error);
      } else {
        setLoading(false);
        router.push('/dashboard');
        toast.success('User successfully logged in');
      }
    } catch (error) {
      setLoading(false);
      console.log('🚀 ~ signInWithEmailAndPassword ~ error:', error);
      toast.error('Error signing in with email and password. Try again later.');
    }
  };

  // const handleSubmit = async (values: any) => {
  //   try {
  //     const res = await signIn("credentials", {
  //       ...values,
  //       isLogin: true,
  //       redirect: false,
  //       // callbackUrl: "/dashboard",
  //     });
  //     if (!res?.error) {
  //       router.push("/dashboard");
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error?.response?.data?.message || "Internal server error");
  //   }
  // };
  // const handleSubmit = async (values: any) => {
  //   try {
  //     await signIn("credentials", {
  //       ...values,
  //       isLogin: true,
  //       redirect: true,
  //       callbackUrl: "/dashboard",
  //     });
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error?.response?.data?.message || "Internal server error");
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: signInWithEmailAndPassword,
  });

  return (
    <div>
      <Loading loading={loading} />
      <div className="container mx-auto max-w-6xl">
        {/* <div className="flex justify-center py-20">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div> */}

        <div className="bg-[url('/_Compound.svg')]">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-center">
              <div className="mb-20 w-10/12 min-w-72 max-w-md rounded-3xl border border-meta-light-blue-2 bg-white px-5 py-10 sm:px-10">
                <h3 className="mb-4 text-center text-3xl font-bold text-meta-purple-1">
                  {TEXT?.HI_THERE}
                </h3>
                <p className="mb-10 text-center text-sm font-medium text-meta-light-blue-3">
                  {TEXT?.WELCOME_BACK_TO_CERTIFY}
                </p>
                <button className="mb-8 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-white text-xl font-semibold text-meta-light-blue-3 hover:bg-meta-gray-2">
                  <span className="flex justify-center">
                    <Image
                      width={20}
                      height={20}
                      alt="Google-icon"
                      src={'/login/GoogleIcon.svg'}
                    />
                    <span className="ml-5 text-sm font-medium text-meta-blue-1">
                      {TEXT?.LOG_IN_WITH_GOOGLE}
                    </span>
                  </span>
                </button>
                <div className="mb-8 flex items-center justify-center">
                  <div className="w-14 border-b border-meta-light-blue-2" />
                  <span className="mx-2 text-xs font-normal">{TEXT?.OR}</span>
                  <div className="w-14 border-b border-meta-light-blue-2" />
                </div>
                <div className="mb-3">
                  <input
                    value={formik?.values?.email}
                    // disabled={""}
                    onChange={formik.handleChange}
                    name="email"
                    type="text"
                    placeholder={TEXT?.EMAIL}
                    className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4  focus:outline-meta-light-blue-1"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                </div>
                <div className="relative mb-5">
                  <input
                    value={formik?.values.password}
                    onChange={formik.handleChange}
                    name="password"
                    placeholder={TEXT?.PASSWORD}
                    type={eye ? 'text' : 'password'}
                    className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4  focus:outline-meta-light-blue-1"
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
                <div className="mb-3 flex items-center justify-end">
                  <span
                    className="mx-2 cursor-pointer text-xs font-normal text-meta-blue-1"
                    onClick={() => router.push('/login/forgotPass')}
                  >
                    {TEXT?.FORGOT_PASSWORD}
                  </span>
                </div>
                <Button title={TEXT?.LOG_IN} />

                <div className="flex items-center justify-center text-sm font-medium text-meta-light-blue-3">
                  <span>
                    {TEXT?.DONT_HAVE_AN_ACCOUNT}
                    <span
                      onClick={() => router.push(ROUTE?.SIGN_UP)}
                      className="cursor-pointer text-meta-blue-1 hover:text-meta-blue-2"
                    >
                      {TEXT?.SIGN_UP}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
