"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
const individualArr=[
    "US Recruitment",
    "Domestic Recruitment",
    "Human Resource",
    "Bench Sales",
    "UK Recruitment",
    "Canada Recruitment"
]

  return (
    <div>
      <div className="container mx-auto h-screen">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')] w-full ">
         <div className="bg-white shadow-[0px_2px_10px_0px_#00000006]
] w-[70%] m-auto border border-element/primary p-[30px]  rounded-[26px] relative">
    <div className="w-full flex justify-center gap-1 ">
    <Image src={"/Individual.svg"} alt="icon" width={22} height={22} />
    <p className="text-[18px] text-text/primary font-semibold">Individual</p>
    </div>
    <div className="absolute top-[39px]" onClick={()=>router?.back()} ><Image src={"/LeftArrow.svg"} alt="LeftArrow" width={22} height={22} /></div>
    
   
    <div className="mt-[30px] flex flex-wrap gap-4">
    {individualArr?.map((list)=>{
        return(
            <div className="flex items-center justify-between w-[48%] border border-stroke/secondary rounded-[10px] py-[12px] px-[12px]">
                <div className="flex gap-3 ">
                <Image src={"/Individual.svg"} alt="icon" width={16} height={20} />
                <p className="text-[14px] font-[500] text-text/paragraph ">{list}</p>
                </div>
             
                <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" className="w-[18px] h-[18px] text-text/primary bg-text/primary border-stroke/secondary"></input>               
            </div>
        )
    })}
     </div>
    </div>
        </div>
        <div className="flex gap-4 mt-[20px] items-center justify-end  w-[70%] m-auto cursor-pointer" onClick={()=>router?.push("/login")}><p className="text-[18px] text-text/primary font-[500]">Next</p><Image src={"/RightArrow.svg"} alt="LeftArrow" width={22} height={22} /></div>
      </div>
    </div>
  );
};

export default page;
