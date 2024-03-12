"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const router = useRouter()
    const [eye, setEye] = useState<Record<string, boolean>>({ pass: false, confirmPass: false });
    return (
        <div>
            <div className='container mx-auto'>
                <div className='flex justify-center py-20'>
                    <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
                </div>

                <div className="bg-[url('/_Compound.svg')] ">
                    <div className='flex justify-center'>
                        <div className='min-w-72 max-w-md bg-white w-10/12 rounded-3xl border border-[#EFF4FF] py-10 px-5 sm:px-10 mb-20'>
                            <h3 className='font-bold text-3xl text-text/secondary text-center mb-4'>Set new password</h3>
                            <p className='text-text/paragraph font-medium text-sm text-center mb-10'>Must be at least 8 characters</p>

                            <div className='relative mb-6'>
                                <input type={eye.pass ? "text" : "password"} className='rounded-xl w-full h-12 border border-[#EFF4FF] pl-4' placeholder='Password' />
                                {!eye.pass &&
                                    <Image src={"/login/Eye-close.svg"} className='absolute right-4 top-4' alt="eye" width={18} height={18}
                                        onClick={() => setEye((prev) => ({ ...prev, pass: !prev.pass }))} />}
                                {eye.pass && <Image src={"/login/Eye-open.svg"} className='absolute right-4 top-4' alt="eye" width={18} height={18}
                                    onClick={() => setEye((prev) => ({ ...prev, pass: !prev.pass }))} />}
                            </div>
                            <div className='relative mb-8'>
                                <input type={eye.confirmPass ? "text" : "password"} className='rounded-xl w-full h-12 border border-[#EFF4FF] pl-4' placeholder='Confirm password' />
                                {!eye.confirmPass &&
                                    <Image src={"/login/Eye-close.svg"} className='absolute right-4 top-4' alt="eye" width={18} height={18}
                                        onClick={() => setEye((prev) => ({ ...prev, confirmPass: !prev.confirmPass }))} />}
                                {eye.confirmPass && <Image src={"/login/Eye-open.svg"} className='absolute right-4 top-4' alt="eye" width={18} height={18}
                                    onClick={() => setEye((prev) => ({ ...prev, confirmPass: !prev.confirmPass }))} />}
                            </div>

                            <button className='rounded-xl w-full h-12 bg-[#DCE7FF] hover:bg-button/primary text-text/secondary hover:text-white border border-[#EFF4FF] mb-8' onClick={() => router.push("/login/forgotPass/newPass/successful")}>
                                <span className='flex justify-center font-medium text-sm '>
                                    Reset Password
                                </span>
                            </button>
                            <div className='flex justify-center items-center font-medium text-sm text-text/paragraph mb-3'>
                                <span className='cursor-pointer' onClick={() => router.back()}>Cancel</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

