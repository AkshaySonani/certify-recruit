'use client';
import * as Yup from 'yup';
import Image from 'next/image';
import { useFormik } from 'formik';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Button from '@/Components/Button';
import { useRouter } from 'next/navigation';
import { ROUTE, TEXT } from '@/service/Helper';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { error } from 'console';
import { useSession } from 'next-auth/react';

const Page = (data: any) => {
  const router = useRouter();
  const session: any = useSession();
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState<Record<string, boolean>>({
    pass: false,
    confirmPass: false,
  });

  const handleResetPassword = (values: any) => {
    setLoading(true);
    const obj = {
      newPassword: values?.newPass,
      token: data?.searchParams?.token ? data?.searchParams?.token : null,
      email: data?.searchParams?.token ? '' : session?.data?.user?.email,
    };

    API.post(API_CONSTANT.RESET_PASSWORD, obj)
      .then((res) => {
        if (res?.data?.status === 200) {
          setLoading(false);
          toast.success(res?.data?.message);
          if (data?.searchParams?.token) {
            router.push(ROUTE?.SUCCESSFUL_RESET_PASSWORD);
          } else {
            router.push(`${ROUTE?.SUCCESSFUL_RESET_PASSWORD}?new`);
          }
        }
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(
          err?.response?.data?.message ||
            'Something want wrong please try again',
        );
      });
  };

  // useEffect(() => {
  //   if (data && !data?.searchParams?.token) {
  //     router.push(ROUTE?.FORGOT_PASSWORD);
  //   }
  // }, []);

  const validationSchema = Yup.object().shape({
    newPass: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    CNewPass: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPass')], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      newPass: '',
      CNewPass: '',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleResetPassword,
  });

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')]">
          <div className="flex justify-center">
            <form
              onSubmit={formik.handleSubmit}
              className="w-10/12 min-w-72 max-w-md"
            >
              <div className="mb-20 w-full rounded-3xl border border-meta-light-blue-2 bg-white px-5 py-10 sm:px-10">
                <h3 className="mb-4 text-center text-3xl font-bold text-meta-purple-1">
                  {TEXT?.SET_NEW_PASSWORD}
                </h3>
                <p className="mb-10 text-center text-sm font-medium text-meta-light-blue-3">
                  {TEXT?.MUST_BE_AT_LEAST_CHARACTERS}
                </p>

                <div className="relative mb-6">
                  <input
                    name="newPass"
                    placeholder={TEXT?.PASSWORD}
                    onChange={formik.handleChange}
                    value={formik?.values.newPass}
                    type={eye.pass ? 'text' : 'password'}
                    className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4"
                  />
                  {formik.touched.newPass && formik.errors.newPass && (
                    <div className="error">{formik.errors.newPass}</div>
                  )}

                  {!eye.pass && (
                    <Image
                      alt="eye"
                      width={18}
                      height={18}
                      src={'/login/Eye-close.svg'}
                      className="absolute right-4 top-4"
                      onClick={() =>
                        setEye((prev) => ({ ...prev, pass: !prev.pass }))
                      }
                    />
                  )}
                  {eye.pass && (
                    <Image
                      alt="eye"
                      width={18}
                      height={18}
                      src={'/login/Eye-open.svg'}
                      className="absolute right-4 top-4"
                      onClick={() =>
                        setEye((prev) => ({ ...prev, pass: !prev.pass }))
                      }
                    />
                  )}
                </div>
                <div className="relative mb-8">
                  <input
                    name="CNewPass"
                    onChange={formik.handleChange}
                    value={formik?.values.CNewPass}
                    placeholder={TEXT?.CONFIRM_PASSWORD}
                    type={eye.confirmPass ? 'text' : 'password'}
                    className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4"
                  />
                  {formik.touched.CNewPass && formik.errors.CNewPass && (
                    <div className="error">{formik.errors.CNewPass}</div>
                  )}
                  {!eye.confirmPass && (
                    <Image
                      alt="eye"
                      width={18}
                      height={18}
                      src={'/login/Eye-close.svg'}
                      className="absolute right-4 top-4"
                      onClick={() =>
                        setEye((prev) => ({
                          ...prev,
                          confirmPass: !prev.confirmPass,
                        }))
                      }
                    />
                  )}
                  {eye.confirmPass && (
                    <Image
                      alt="eye"
                      width={18}
                      height={18}
                      src={'/login/Eye-open.svg'}
                      className="absolute right-4 top-4"
                      onClick={() =>
                        setEye((prev) => ({
                          ...prev,
                          confirmPass: !prev.confirmPass,
                        }))
                      }
                    />
                  )}
                </div>

                <Button
                  disabled={loading}
                  isLoading={loading}
                  title={TEXT?.RESET_PASSWORD}
                />

                {/* <button
                  className="mb-8 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-light-blue-1 text-meta-purple-1 hover:bg-meta-blue-2 hover:text-white"
                  // onClick={() => router.push(ROUTE?.SUCCESSFULL_FORGOT_PASSWORD)}
                  // onClick={() => handleResetPassword()}
                >
                  <span className="flex justify-center text-sm font-medium">
                    {TEXT?.RESET_PASSWORD}
                  </span>
                </button> */}
                <div className="mb-3 flex items-center justify-center text-sm font-medium text-meta-light-blue-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => router.back()}
                  >
                    {TEXT?.CANCEL}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
