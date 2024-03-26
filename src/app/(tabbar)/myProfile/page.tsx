"use client";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const COMPANY_ARR = [
    { id: 1, name: "Corporate Company" },
    { id: 2, name: "It Company" },
    { id: 3, name: "Software Company" },
    { id: 1, name: "CLient Company" },
]


const MyProfile = () => {
    const router=useRouter();
    const [active, setActive] = useState(0);
    const [company, setCompany] = useState(COMPANY_ARR[0]?.name)

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <div className="w-[80%] m-auto">
            <div className="flex justify-between items-center">
                <div className="flex cursor-pointer" onClick={()=>router?.push("/dashboard")}>
                    <Image src={"/BackArrow.svg"} alt="date" width={20} height={20} />
                    <p className="text-[20px] font-semibold text-text/secondary pl-[10px]">Dashboard</p>
                </div>
                <div>
                    <button className="text-white py-[10px] text-[14px] font-semibold w-[120px] rounded-[8px]" style={{ background: "linear-gradient(270deg, #3751F2 0%, #2687F5 26.68%, #17B3F8 73.61%, #08E2FB 100%)" }}>Hiring</button>
                </div>
            </div>
            <div className="w-full p-10 bg-element/primary rounded-[20px] mt-[15px]">
                <div className="flex items-cente gap-8 w-full">
                    <Image src={"/ProfileLogo.svg"} alt="MainLogo" width={109} height={135} />
                    <div className="flex  w-full gap-8">
                        <div className="w-[90%]">
                            <p className="font-semibold text-text/secondary text-[20px]">Webnova Infotech</p>
                            <p className="text-text/paragraph font-[500] text-[14px]">Company Type</p>
                            <div className="border-b-[1px] border-stroke/secondary my-[10px] w-full"></div>
                            <div className="flex justify-between w-[50%]">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Image src={"/location.svg"} alt="MainLogo" width={16} height={16} />
                                    <p className="text-text/paragraph text-[12px]">New Your, USA</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Image src={"/call.svg"} alt="MainLogo" width={16} height={16} />
                                    <p className="text-text/paragraph text-[12px]">516-742-4006</p>
                                </div>

                            </div>
                            <div className="flex items-center gap-2 mt-[12px]">
                                <Image src={"/mail.svg"} alt="MainLogo" width={16} height={16} />
                                <p className="text-text/paragraph text-[12px]">516-742-4006</p>
                            </div>
                        </div>
                        <div className="text-text/primary text-[16px] font-[500]">Edit</div>
                    </div>
                </div>
            </div>

            <div className="mt-[20px]">
                <div className="flex w-[60%] justify-around ">
                    <div className={`text-[13px] font-[500]  cursor-pointer ${active===0 ? "text-text/primary" :"text-text/paragraph"} `} onClick={() => setActive(0)}>Basic Detail</div>
                    <div className={`text-[13px] font-[500]  cursor-pointer ${active===1 ? "text-text/primary" :"text-text/paragraph"} `} onClick={() => setActive(1)}>Company Detail</div>
                    <div className={`text-[13px] font-[500]  cursor-pointer ${active===2 ? "text-text/primary" :"text-text/paragraph"} `} onClick={() => setActive(2)}>KYC Compliance Detail</div>
                </div>
                <div className="w-full border-[1px] border-stroke/secondary my-[10px]"></div>

                <div>
                    {active === 0 &&
                        <>
                            <div className="flex w-full gap-3 pl-[35px] mt-[20px]">
                                <div className="w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Lynn Tanner"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Tannerlynntanner2001@gmail.com"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                    />
                                </div>

                            </div>
                            <div className="flex w-full gap-3 pl-[35px] mt-[10px]">
                                <div className="w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                        Role
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Lynn Tanner"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Tannerlynntanner2001@gmail.com"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                    />
                                </div>

                            </div>

                        </>
                    }
                    {active === 1 &&
                        <>
                            <div className="flex w-full gap-3 pl-[35px] mt-[20px]">
                                <Menu as="div" className="relative w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                        Company Type
                                    </label>
                                    <Menu.Button className={`relative items-center mt-[8px] flex z-20 justify-between w-full  appearance-none rounded-lg border border-stroke px-5 py-3 outline-none transition  `}>
                                        <p>{company}</p>
                                        <Image
                                            src={"/dashboard/SelectDown.svg"}
                                            alt="Icon"
                                            width={14}
                                            height={14}
                                        />
                                    </Menu.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items className="absolute right-0 z-30 mt-2 w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div>
                                                {COMPANY_ARR?.map((list) => {
                                                    return (
                                                        <Menu.Item  >
                                                            {({ active }) => (
                                                                <div onClick={() => setCompany(list?.name)}


                                                                    className={classNames(
                                                                        active
                                                                            ? "bg-gray-100 text-gray-900"
                                                                            : "text-gray-700",
                                                                        "block px-4 py-2 text-base"
                                                                    )}>
                                                                    {list?.name}
                                                                </div>
                                                            )}
                                                        </Menu.Item>
                                                    )
                                                })}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                <div className="w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Webnova Infotech"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                    />
                                </div>

                            </div>
                            <div className="flex w-full gap-3 pl-[35px] mt-[10px]">
                                <div className="w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                        Website URL
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="https://webnovainfotech.in/"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                        Owner
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Utsav Savaliya"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                    />
                                </div>

                            </div>
                            <div className="w-full pl-[35px] mt-[10px]">
                                <label className="text-base font-medium text-text/secondary">
                                    Company mailing address
                                </label>
                                <input
                                    type="text"
                                    placeholder="Street address"
                                    className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                />
                            </div>
                            <div className="flex w-full gap-3 pl-[35px] mt-[10px]">
                                <div className="w-[50%]">
                                    <input
                                        type="text"
                                        placeholder="https://webnovainfotech.in/"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph  px-5 py-3"
                                    />
                                </div>
                                <div className="w-[50%]">

                                    <input
                                        type="text"
                                        placeholder="Utsav Savaliya"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph  px-5 py-3"
                                    />
                                </div>

                            </div>
                            <div className="flex w-full gap-3 pl-[35px] mt-[10px]">
                                <div className="w-[50%]">
                                    <input
                                        type="text"
                                        placeholder="Zip Code"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph  px-5 py-3"
                                    />
                                </div>
                                <div className="w-[50%]">

                                    <input
                                        type="text"
                                        placeholder="Country"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph  px-5 py-3"
                                    />
                                </div>

                            </div>
                        </>
                    }
                         {active === 2 &&
                        <>
                            <div className="flex w-full gap-3 pl-[35px] mt-[20px]">
                                <div className="w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                    PAN Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="NSLPQS2154"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <label className="text-base font-medium text-text/secondary">
                                    Name on PAN Card
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Webnova Infotech"
                                        className="w-full rounded-lg border border-[#DCE7FF] focus:border-text/paragraph mt-[8px] px-5 py-3"
                                    />
                                </div>

                            </div>
                         

                        </>
                    }
                    <div className="w-full flex justify-end mt-[30px]">
                    <button className="bg-text/primary text-white text-[14px] rounded-[8px] w-[150px] py-[8px] ">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyProfile