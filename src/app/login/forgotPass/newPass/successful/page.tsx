"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const router = useRouter()
    const [eye, setEye] = useState(false)
    return (
        <div>
            <div className='container mx-auto h-screen'>
                <div className='flex justify-center py-20'>
                    <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
                </div>

                <div className="bg-[url('/_Compound.svg')] ">
                    <div className='flex justify-center'>
                        <div className='w-1/3 rounded-3xl border border-[#EFF4FF] p-10'>
                            <div className='flex justify-center my-6'>
                                <Image src={"/login/successful.svg"} alt="MainLogo" width={155.24} height={136} />
                            </div>
                            <p className='text-text/paragraph font-medium text-sm text-center mb-2'>your password has been reset</p>
                            <h3 className='font-semibold text-2xl text-text/secondary text-center mb-10'>Successfully</h3>

                            <div className='flex justify-center items-center font-medium text-lg text-text/paragraph'>
                                <span className='mr-2 text-[#3751F2] cursor-pointer' onClick={() => router.push("/login")}>Go to login</span><Image src={"/LeftArrow.svg"} className='rotate-180' alt="LeftArrow" width={17} height={7} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page

