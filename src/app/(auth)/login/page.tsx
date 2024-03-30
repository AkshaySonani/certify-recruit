"use client";
import Image from "next/image";
import Api from "@/service/ApiService";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [eye, setEye] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid Credentials");
        return;
      }
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')]">
          <div className="flex justify-center">
            <div className="min-w-72 max-w-md bg-white w-10/12 rounded-3xl border border-meta-light-blue-2 py-10 px-5 sm:px-10 mb-20">
              <h3 className="font-bold text-3xl text-meta-purple-1 text-center mb-4">
                Hi there!
              </h3>
              <p className="text-meta-light-blue-3 font-medium text-sm text-center mb-10">
                Welcome back to CertifyRecruit.{" "}
              </p>
              <button className="rounded-xl w-full h-12 bg-white text-xl font-semibold text-meta-light-blue-3 border border-meta-light-blue-2 mb-8">
                <span className="flex justify-center">
                  <Image
                    width={20}
                    height={20}
                    alt="Google-icon"
                    src={"/login/GoogleIcon.svg"}
                  />
                  <span className="ml-5 font-medium text-sm text-meta-blue-1">
                    Log in with Google
                  </span>
                </span>
              </button>
              <div className="flex justify-center items-center mb-8">
                <div className="border-b border-meta-light-blue-2 w-14" />
                <span className="text-xs font-normal mx-2">Or</span>
                <div className="border-b border-meta-light-blue-2 w-14" />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  value={values?.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e?.target.value })
                  }
                  className="rounded-xl w-full h-12 border border-meta-light-blue-2 mb-4 pl-4"
                />
              </div>
              <div className="relative">
                <input
                  placeholder="Password"
                  value={values?.password}
                  type={eye ? "text" : "password"}
                  className="rounded-xl w-full h-12 border border-meta-light-blue-2 mb-3 pl-4"
                  onChange={(e) =>
                    setValues({ ...values, password: e?.target.value })
                  }
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
              </div>
              <div className="flex justify-end items-center mb-8">
                <span
                  className="text-xs text-meta-blue-1 font-normal mx-2 cursor-pointer"
                  onClick={() => router.push("/login/forgotPass")}
                >
                  Forgot password?
                </span>
              </div>
              <button
                onClick={() => handleSubmit()}
                className="rounded-xl w-full h-12 bg-meta-blue-2 border border-meta-light-blue-2 mb-8"
              >
                <span className="flex justify-center font-medium text-sm text-white">
                  Log In
                </span>
              </button>
              {error && (
                <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}

              <div className="flex justify-center items-center font-medium text-sm text-meta-light-blue-3">
                <span>
                  Don’t have an account?{" "}
                  <span
                    onClick={() => router.push("/signUp")}
                    className="text-meta-blue-1 cursor-pointer"
                  >
                    Sign up
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
