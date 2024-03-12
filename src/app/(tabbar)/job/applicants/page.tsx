"use client"
import Checkbox from "@/Components/Checkbox";
import Select from "@/Components/Select";
import Image from "next/image";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";

const tableData = [
    { name: "Kate Tanner", Designation: "UI/UX Designer", Experience: "6+ years", Date: "16/02/2024", Status: "Available" },
    { name: "April Curtis", Designation: "UI/UX Designer", Experience: "5.5+ years", Date: "10/02/2024", Status: "Hired" },
    { name: "Sledge Hammer", Designation: "UI/UX Designer", Experience: "5.5+ years", Date: "16/02/2024", Status: "Available" },
    { name: "B.A. Baracus", Designation: "UI/UX Designer", Experience: "5+ years", Date: "12/02/2024", Status: "Available" },
    { name: "Mike Torello", Designation: "UI/UX Designer", Experience: "4+ years", Date: "06/02/2024", Status: "Available" },
    { name: "Dori Doreau", Designation: "UI/UX Designer", Experience: "4+ years", Date: "16/02/2024", Status: "Hired" },
    { name: "Murdock", Designation: "UI/UX Designer", Experience: "6+ years", Date: "15/02/2024", Status: "Available" },
    { name: "Lynn Tanner", Designation: "UI/UX Designer", Experience: "5+ years", Date: "16/02/2024", Status: "Hired" },
]

const page = () => {
    const [dateRange, setDateRange] = useState([
        "2024-01-01",
        "2024-12-31",
    ]);

    return (
        <div>
            <div>
                <div className="text-text/secondary font-semibold text-2xl">
                    Applicant
                </div>
                <div className="flex gap-6 mt-5 mb-10 justify-center items-center">
                    <div className="w-2/4">
                        <div className="relative">
                            <div className="absolute left-3 top-4">
                                <Image src={"/dashboard/filter.svg"} alt="date" width={19} height={15} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full h-12 rounded-lg border-[1.5px] border-stroke bg-transparent px-12 py-3 text-black outline-none transition focus:border-primary active:border-primary"
                            />
                            <div className="absolute right-3 top-4">
                                <Image src={"/dashboard/search.svg"} alt="date" width={19} height={19} />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-2/4 items-center">

                        <div className="relative w-full">
                            <DatePicker
                                range
                                format="YYYY-MM-DD"
                                placeholder="Select Dates"
                                minDate={new Date("01-01-2014")}
                                maxDate={new Date("12-31-2024")}
                                onChange={(dateObjects: any) => {
                                    if (dateObjects?.[1]?.toString()) {
                                        setDateRange((e) => [
                                            dateObjects?.[0]?.toString(),
                                            dateObjects?.[1]?.toString(),
                                        ]);
                                    }
                                }}
                                containerStyle={{ width: "100%" }}
                                style={{
                                    height: 48,
                                    fontSize: 14,
                                    width: "100%",
                                    borderRadius: 8,
                                }}
                            />
                            <div className="absolute right-2 top-3">
                                <Image src={"/dashboard/date.svg"} alt="date" width={24} height={24} />
                            </div>
                        </div>

                    </div>
                </div>





            </div>
            <div>
                <table className="w-full text-sm text-left">
                    <thead className="shadow-inner border-b border-[#DCE7FF]">
                        <tr>
                            <th className="px-6 py-4 w-1/4">
                                <div className="font-medium text-base text-text/paragraph">
                                    Name
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="font-medium text-base text-text/paragraph">
                                    Designation
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="font-medium text-base text-text/paragraph">
                                    Experience
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="font-medium text-base text-text/paragraph">
                                    Date
                                </div>
                            </th>
                            <th className="px-6 py-4">
                                <div className="font-medium text-base text-text/paragraph">
                                    Status
                                </div>
                            </th>
                            <th className="px-6 w-1/12">
                                <span className="flex font-medium text-base text-text/paragraph bg-[#EFF4FF] p-2 rounded-lg">
                                    <div>Downloads</div>
                                    <div className="ml-5">5/5</div>
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item) => {
                            return (
                                <tr>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex items-center">
                                            <Image src={"/dashboard/photo.svg"} alt="Icon" width={31} height={31} />
                                            <div className="font-medium text-base text-text/secondary pl-4">{item.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div>
                                            <div className="font-medium text-base text-text/secondary ">{item.Designation}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div>
                                            <div className="font-medium text-base text-text/secondary ">{item.Experience}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div>
                                            <div className="font-medium text-base text-text/secondary ">{item.Date}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div>
                                            <div className={`font-medium text-base ${item.Status === "Hired" ? "text-[#EA4335]" : "text-[#34A853]"}  `}>{item.Status}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex justify-end">
                                            <Image src={"/sidebarIcon/jobPosting.svg"} className="mx-4" alt="Icon" width={21} height={21} />
                                            <Image src={"/dashboard/download.svg"} className="mx-4" alt="Icon" width={21} height={21} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;
