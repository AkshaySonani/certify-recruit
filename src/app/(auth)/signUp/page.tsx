"use client";
import Image from "next/image";
import Api from "@/service/ApiService";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [eye, setEye] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    if (!values?.email || !values?.password) {
      toast.error("email and password is required");
      return;
    }
    try {
      const resUserExists = await Api.post("/userExists", {
        email: values.email,
      });
      if (resUserExists?.data?.user) {
        toast.error("User already exists");
        return;
      }
      const res = await Api.post("/register", {
        ...values,
      });
      if (res.status === 201) {
        const form = e.target;
        toast.success("User registration successfully");
        // form.reset();
        router.push("/login");
        // router.push("/signUp/signUpSuccess")
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration:", error);
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')] ">
          <div className="flex justify-center">
            <div className="min-w-72 max-w-md bg-white w-10/12 rounded-3xl border border-meta-light-blue-2 py-10 px-5 sm:px-10 mb-20">
              <h3 className="font-bold text-3xl text-meta-purple-1 text-center mb-4">
                Get Started!
              </h3>
              <p className="text-meta-light-blue-3 font-medium text-sm text-center mb-10">
                Your New Journey Begins Now.{" "}
              </p>
              <button className="rounded-xl w-full h-12 bg-white text-xl font-semibold text-meta-light-blue-3 border border-meta-light-blue-2 mb-8">
                <span className="flex justify-center items-center">
                  <Image
                    width={20}
                    height={20}
                    alt="Google-icon"
                    src={"/login/GoogleIcon.svg"}
                  />
                  <span className="ml-5 font-medium text-sm text-meta-blue-1">
                    Sign up with Google
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
                  className="rounded-xl w-full h-12 border border-meta-light-blue-2 mb-6 pl-4"
                  onChange={(e) =>
                    setValues({ ...values, email: e?.target.value })
                  }
                />
              </div>
              <div className="relative">
                <input
                  placeholder="Password"
                  value={values?.password}
                  type={eye ? "text" : "password"}
                  className="rounded-xl w-full h-12 border border-meta-light-blue-2 mb-8 pl-4"
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

              <button className="rounded-xl w-full h-12 bg-meta-blue-2 border border-meta-light-blue-2 mb-8">
                <span
                  onClick={(e) => handleSubmit(eye)}
                  className="flex justify-center font-medium text-sm text-white"
                >
                  Sign Up
                </span>
              </button>
              <div className="flex justify-center items-center font-medium text-sm text-meta-light-blue-3">
                <span>
                  Already have an account?{" "}
                  <span
                    onClick={() => router.push("/login")}
                    className="text-meta-blue-1 cursor-pointer"
                  >
                    Log in
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
