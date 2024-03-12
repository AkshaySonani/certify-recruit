"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const router = useRouter()
    const [eye, setEye] = useState(false)
    return (
        <div>
            <div className='container mx-auto'>
                <div className='flex justify-center py-20'>
                    <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
                </div>

                <div className="bg-[url('/_Compound.svg')] ">
                    <div className='flex justify-center'>
                        <div className='min-w-72 max-w-md bg-white w-10/12 rounded-3xl border border-[#EFF4FF] py-10 px-5 sm:px-10 mb-20'>
                            <h3 className='font-bold text-3xl text-text/secondary text-center mb-4'>Hi there!</h3>
                            <p className='text-text/paragraph font-medium text-sm text-center mb-10'>Welcome back to CertifyRecruit. </p>
                            <button className='rounded-xl w-full h-12 bg-white text-xl font-semibold text-[#49556F] border border-[#EFF4FF] mb-8'>
                                <span className='flex justify-center'>
                                    <Image src={"/login/GoogleIcon.svg"} alt="Google-icon" width={20} height={20} />
                                    <span className='ml-5 font-medium text-sm text-text/primary'>Log in with Google</span>
                                </span>
                            </button>
                            <div className='flex justify-center items-center mb-8'>
                                <div className='border-b border-[#EFF4FF] w-14'></div>
                                <span className='text-xs font-normal mx-2'>Or</span>
                                <div className='border-b border-[#EFF4FF] w-14'></div>
                            </div>
                            <div>
                                <input type='text' className='rounded-xl w-full h-12 border border-[#EFF4FF] mb-4 pl-4' placeholder='Utsav Sava' />
                            </div>
                            <div className='relative'>
                                <input type={eye ? "text" : "password"} className='rounded-xl w-full h-12 border border-[#EFF4FF] mb-3 pl-4' placeholder='Password' />
                                {!eye &&
                                    <Image src={"/login/Eye-close.svg"} className='absolute right-4 top-4' alt="eye" width={18} height={18} onClick={() => setEye(prev => !prev)} />}
                                {eye && <Image src={"/login/Eye-open.svg"} className='absolute right-4 top-4' alt="eye" width={18} height={18} onClick={() => setEye(prev => !prev)} />}
                            </div>
                            <div className='flex justify-end items-center mb-8'>
                                <span className='text-xs text-text/primary font-normal mx-2 cursor-pointer' onClick={() => router.push("/login/forgotPass")}>Forgot password?</span>
                            </div>
                            <button className='rounded-xl w-full h-12 bg-button/primary border border-[#EFF4FF] mb-8'>
                                <span className='flex justify-center font-medium text-sm text-white'>
                                    Log In
                                </span>
                            </button>
                            <div className='flex justify-center items-center font-medium text-sm text-text/paragraph'>
                                <span>Don’t have an account? <span className='text-text/primary cursor-pointer' onClick={() => router.push("/signUp")}>Sign up</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

