"use client"
import Api from '@/service/ApiService'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
    const router = useRouter()
    const [values,setValues]=useState({
        email:"",
        password:""
    })
    const [eye, setEye] = useState(false)
    const handleSubmit = async (e:any) => {
        // e.preventDefault();
        if ( !values?.email || !values?.password) {
            toast.error("email and password is required")
            return;
        }
        try {
            const resUserExists = await Api.post("/userExists", {email:values.email});
            if (resUserExists?.data?.user) {
                toast.error("User already exists")
                return;
            }
            const res = await Api.post("/register", {             
                   ...values
            });
            if (res.status===201) {
                const form = e.target;
                toast.success("User registration successfully")
                // form.reset();
                router.push("/login");
                // router.push("/signUp/signUpSuccess")
            } 
            else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("Error during registration:", error);
        }
    };

    return (
        <div>
            <div className='container mx-auto'>
                <div className='flex justify-center py-20'>
                    <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
                </div>

                <div className="bg-[url('/_Compound.svg')] ">
                    <div className='flex justify-center'>
                        <div className='min-w-72 max-w-md bg-white w-10/12 rounded-3xl border border-[#EFF4FF] py-10 px-5 sm:px-10 mb-20'>
                            <h3 className='font-bold text-3xl text-text/secondary text-center mb-4'>Get Started!</h3>
                            <p className='text-text/paragraph font-medium text-sm text-center mb-10'>Your New Journey Begins Now. </p>
                            <button className='rounded-xl w-full h-12 bg-white text-xl font-semibold text-[#49556F] border border-[#EFF4FF] mb-8'>
                                <span className='flex justify-center items-center'>
                                    <Image src={"/login/GoogleIcon.svg"} alt="Google-icon" width={20} height={20} />
                                    <span className='ml-5 font-medium text-sm text-text/primary'>Sign up with Google</span>
                                </span>
                            </button>
                            <div className='flex justify-center items-center mb-8'>
                                <div className='border-b border-[#EFF4FF] w-14'></div>
                                <span className='text-xs font-normal mx-2'>Or</span>
                                <div className='border-b border-[#EFF4FF] w-14'></div>
                            </div>
                            <div>
                                <input type='text' value={values?.email} 
                                onChange={(e)=>setValues({...values,email:e?.target.value} )} className='rounded-xl w-full h-12 border border-[#EFF4FF] mb-6 pl-4' placeholder='Email' />
                            </div>
                            <div className='relative'>
                                <input type={eye ? "text" : "password"} 
                                 value={values?.password} 
                                 onChange={(e)=>setValues({...values,password:e?.target.value} )}
                                className='rounded-xl w-full h-12 border border-[#EFF4FF] mb-8 pl-4' placeholder='Password' />
                                {!eye &&
                                    <Image src={"/login/Eye-close.svg"} className='absolute right-4 top-4' alt="eye" width={18} height={18} onClick={() => setEye(prev => !prev)} />}
                                {eye && <Image src={"/login/Eye-open.svg"} className='absolute right-4 top-4' alt="eye" width={18} height={18} onClick={() => setEye(prev => !prev)} />}
                            </div>

                            <button className='rounded-xl w-full h-12 bg-button/primary border border-[#EFF4FF] mb-8'>
                                <span className='flex justify-center font-medium text-sm text-white' onClick={(e)=>handleSubmit(eye)}>
                                    Sign Up
                                </span>
                            </button>   
                            <div className='flex justify-center items-center font-medium text-sm text-text/paragraph'>
                                <span>Already have an account? <span className='text-text/primary cursor-pointer' onClick={() => router.push("/login")}>Log in</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

