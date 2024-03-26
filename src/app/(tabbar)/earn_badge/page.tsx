import Image from "next/image";
import React from "react";

const page = () => {

  const menu = [
    { title: "Employee",value:"50" },
    { title: "Industry",value:"10" },
    { title: "Company Revenue ",value:"$ 30" },
    { title: "Company founded",value:"$ 10M" },
  ];

  const data=[
   { name:"B.A. Baracus",location:"UK-London" ,post:"CEO"},
   { name:"B.A. Baracus",location:"UK-London" ,post:"CEO"},
   { name:"B.A. Baracus",location:"UK-London" ,post:"CEO"},
   { name:"B.A. Baracus",location:"UK-London" ,post:"CEO"},
   { name:"B.A. Baracus",location:"UK-London" ,post:"CEO"}
  ]
  return (
    <div>
    <div>
      <div className="text-text/secondary font-semibold text-2xl mb-4">
      Earn Badge
      </div>

      <div className="flex gap-4 mt-4 w-full flex-wrap lg:flex-nowrap ">
        {menu.map((item) => {
          return (
            <div className="relative p-5 border border-[#DCE7FF] rounded-2xl w-1/4 cursor-pointer" >
              <div className="bg-[#DCE7FF] rounded-lg h-9 w-9 flex justify-center items-center mb-2">
                <Image
                  src={"/sidebarIcon/jobPosting.svg"}
                  alt="Icon"
                  width={19}
                  height={19}
                />
              </div>
              <p className="font-bold text-text/secondary text-2xl">{item?.value}</p>
              <p className="text-text/paragraph font-medium text-base">
                {item.title}
              </p>
              <Image
                src={"/dashboard/MaskGroup.svg"}
                className="absolute right-0 top-6"
                alt="Icon"
                width={61}
                height={93}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center flex-wrap items-center w-full mt-[20px] gap-3">
        
          {data?.map((list)=>{
            return(
              <div className="flex p-5 border border-[#DCE7FF] rounded-2xl gap-2">
              <Image
              src={"/dashboard/photo.svg"}
              alt="Icon"
              width={50}
              height={50}
            />
            <div className="pr-[12px]">
              <p className="text-text/secondary font-[500] text-[16px]">B.A. Baracus</p>
              <p className="text-text/paragraph text-[12px] font-[500]">CEO</p>
              <p className="text-text/paragraph text-[12px] font-[500]">UK-London </p>
            </div>
         </div>
            )
          })}
     
        
      </div>
    </div>
  </div>
  );
};

export default page;
