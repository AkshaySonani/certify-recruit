"use client";
import Image from "next/image";
import { toast } from "react-toastify";
import API from "@/service/ApiService";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { EMAIlREGEX, ROUTE, TEXT } from "@/service/Helper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";

import AppContext from "@/context/AppProvider";
import SignupSuccess from "./SignupSuccess";
import { API_CONSTANT } from "@/constant/ApiConstant";
import Button from "./Button";
type formValues = {
  email: string;
  password: string;
};
const SignupForm = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [eye, setEye] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required.")
      .matches(EMAIlREGEX, "Invalid email"),

    password: Yup.string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const handleSubmit = async (values: any) => {
    try {
      await signIn("credentials", {
        ...values,
        role: context.currentRole,
        isLogin: false,
        redirect: false,
        // callbackUrl: "/dashboard",
      }).then(() => router.push("/dashboard"));
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal server error");
    }
  };

  // const handleSubmit = async (values: any) => {
  //   try {
  //     const res = await API.post(API_CONSTANT?.SIGN_UP, {
  //       ...values,
  //       role: context?.currentRole,
  //     });
  //     if (res.data) {
  //       const res = await signIn("credentials", {
  //         ...values,
  //         redirect: false,
  //       });
  //       toast.success("User registration successfully");
  //       setSuccessMsg(true);
  //     } else {
  //       console.log("User registration failed.");
  //     }
  //   } catch (err: any) {
  //     console.log("Error during registration:", err);
  //     toast.error(err.response.data.message);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      {successMsg ? (
        <SignupSuccess />
      ) : (
        <div className="container mx-auto">
          <div className="flex justify-center py-20">
            <Image
              src={"/MainLogo.svg"}
              alt="MainLogo"
              width={334}
              height={56}
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-[url('/_Compound.svg')] ">
              <div className="flex justify-center">
                <div className="min-w-72 max-w-md bg-white w-10/12 rounded-3xl border border-meta-light-blue-2 py-10 px-5 sm:px-10 mb-20">
                  <h3 className="font-bold text-3xl text-meta-purple-1 text-center mb-4">
                    {TEXT?.Get_Started}
                  </h3>
                  <p className="text-meta-light-blue-3 font-medium text-sm text-center mb-10">
                    {TEXT?.YOUR_NEW_JOURNEY_BEGINS_NOW}
                  </p>
                  <button className="rounded-xl w-full h-12 bg-white text-xl font-semibold text-meta-light-blue-3 border border-meta-light-blue-2 hover:bg-meta-gray-2 mb-8">
                    <span className="flex justify-center items-center">
                      <Image
                        width={20}
                        height={20}
                        alt="Google-icon"
                        src={"/login/GoogleIcon.svg"}
                      />
                      <span className="ml-5 font-medium text-sm text-meta-blue-1">
                        {TEXT?.SIGN_UP_WITH_GOOGLE}
                      </span>
                    </span>
                  </button>
                  <div className="flex justify-center items-center mb-8">
                    <div className="border-b border-meta-light-blue-2 w-14" />
                    <span className="text-xs font-normal mx-2">{TEXT?.OR}</span>
                    <div className="border-b border-meta-light-blue-2 w-14" />
                  </div>
                  <div className="mb-3">
                    <input
                      value={formik?.values?.email}
                      // disabled={""}
                      onChange={formik.handleChange}
                      name="email"
                      type="text"
                      placeholder={TEXT?.EMAIL}
                      className="rounded-xl w-full h-12 border border-meta-light-blue-2 focus:outline-meta-light-blue-1 pl-4"
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
                      type={eye ? "text" : "password"}
                      className="rounded-xl w-full h-12 border border-meta-light-blue-2 focus:outline-meta-light-blue-1 pl-4"
                    />
                    {!eye && (
                      <Image
                        alt="eye"
                        width={18}
                        height={18}
                        src={"/login/Eye-close.svg"}
                        className="absolute right-4 top-4"
                        onClick={() => setEye((prev) => !prev)}
                      />
                    )}
                    {eye && (
                      <Image
                        alt="eye"
                        width={18}
                        height={18}
                        src={"/login/Eye-open.svg"}
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
                  <div className="flex justify-center items-center font-medium text-sm text-meta-light-blue-3">
                    <span>
                      {TEXT?.ALREADY_HAVE_AN_ACCOUNT}
                      <span
                        onClick={() => router.push(ROUTE?.LOGIN)}
                        className="text-meta-blue-1 hover:text-meta-blue-2 cursor-pointer"
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
      )}
    </div>
  );
};

export default SignupForm;
