"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    const router = useRouter()
    return (
        <div>
            <div className='container mx-auto h-screen'>
                <div className='flex justify-center py-20'>
                    <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
                </div>

                <div className="bg-[url('/_Compound.svg')] ">
                    <div className='flex justify-center mt-36'>
                        <div className='w-2/4'>
                            <h3 className='font-bold text-3xl text-text/secondary text-center mb-6'>Redirect to Calendly</h3>
                            <p className='text-text/paragraph font-semibold text-xl text-center mb-10 underline underline-offset-2'>https://calendly.com/event_types/user/me</p>
                            <div className='flex justify-center' onClick={() => router.back()}>
                                <span className='flex text-xl font-semibold text-text/primary cursor-pointer'><Image src={"/LeftArrow.svg"} alt="LeftArrow" width={17} height={7} /> <span className='ml-2'>Back</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
