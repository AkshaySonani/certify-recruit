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
                    <div className='flex justify-center mt-[40px]'>
                        <div className='flex w-2/4 justify-between'>
                            <div className='w-64 h-44 border border-[#EFF4FF] rounded-lg flex justify-center items-center' onClick={() => router.push('/main/employee')}>
                                <div className='w-24'>
                                    <div className='flex justify-center'>
                                        <Image src={"/Employee.svg"} alt="icon" width={70} height={52} />
                                    </div>
                                    <div className='text-center mt-4 text-xl font-semibold text-text/primary'>Employee</div>
                                </div>
                            </div>
                            <div className='w-64 h-44 border border-[#EFF4FF] rounded-lg flex justify-center items-center'  onClick={() => router.push('/main/individual')}>
                                <div className='w-24'>
                                    <div className='flex justify-center'>
                                        <Image src={"/Individual.svg"} alt="icon" width={44} height={52} />
                                    </div>
                                    <div className='text-center mt-4 text-xl font-semibold text-text/primary'>Individual</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
