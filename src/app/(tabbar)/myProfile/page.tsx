"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";

const COMPANY_ARR = [
  { id: 1, name: "Corporate Company" },
  { id: 2, name: "It Company" },
  { id: 3, name: "Software Company" },
  { id: 1, name: "CLient Company" },
];

const MyProfile = () => {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [company, setCompany] = useState(COMPANY_ARR[0]?.name);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="w-[80%] m-auto">
      <div className="flex justify-between items-center">
        <div
          className="flex cursor-pointer"
          onClick={() => router?.push("/dashboard")}
        >
          <Image src={"/BackArrow.svg"} alt="date" width={20} height={20} />
          <p className="text-5 font-semibold text-meta-purple-1 pl-[10px]">
            Dashboard
          </p>
        </div>
        <div>
          <button className="text-white py-[10px] text-sm font-semibold w-[120px] rounded-lg bg-hiring-btn-gradient">
            Hiring
          </button>
        </div>
      </div>
      <div className="w-full p-10 bg-meta-light-blue-2 rounded-[20px] mt-[15px]">
        <div className="flex items-cente gap-8 w-full">
          <Image
            width={109}
            height={135}
            alt="MainLogo"
            src={"/ProfileLogo.svg"}
          />
          <div className="flex w-full gap-8">
            <div className="w-[90%]">
              <p className="font-semibold text-meta-purple-1 text-xl">
                Webnova Infotech
              </p>
              <p className="text-meta-light-blue-3 font-medium text-sm">
                Company Type
              </p>
              <div className="border-b-default-1 border-meta-light-blue-1 my-[10px] w-full"/>
              <div className="flex justify-between w-1/2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Image
                    width={16}
                    height={16}
                    alt="MainLogo"
                    src={"/location.svg"}
                  />
                  <p className="text-meta-light-blue-3 text-xs">
                    New Your, USA
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    width={16}
                    height={16}
                    alt="MainLogo"
                    src={"/call.svg"}
                  />
                  <p className="text-meta-light-blue-3 text-xs">
                    516-742-4006
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Image
                  width={16}
                  height={16}
                  alt="MainLogo"
                  src={"/mail.svg"}
                />
                <p className="text-meta-light-blue-3 text-xs">
                  516-742-4006
                </p>
              </div>
            </div>
            <div className="text-meta-blue-1 text-base font-medium">Edit</div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex w-3/5 justify-around">
          <div
              onClick={() => setActive(0)}
            className={`default-t-13 font-medium cursor-pointer ${
              active === 0 ? "text-meta-blue-1" : "text-meta-light-blue-3"
            }`}
          >
            Basic Detail
          </div>
          <div
              onClick={() => setActive(1)}
            className={`default-t-13 font-medium cursor-pointer ${
              active === 1 ? "text-meta-blue-1" : "text-meta-light-blue-3"
            }`}
            >
            Company Detail
          </div>
          <div
            className={`default-t-13 font-medium cursor-pointer ${
              active === 2 ? "text-meta-blue-1" : "text-meta-light-blue-3"
            } `}
            onClick={() => setActive(2)}
          >
            KYC Compliance Detail
          </div>
        </div>
        <div className="w-full border-default-1 border-meta-light-blue-1 my-[10px]"/>

        <div>
          {active === 0 && (
            <>
              <div className="flex w-full gap-3 pl-[35px] mt-5">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Lynn Tanner"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Tannerlynntanner2001@gmail.com"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                  />
                </div>
              </div>
              <div className="flex w-full gap-3 pl-[35px] mt-[10px]">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Role
                  </label>
                  <input
                    type="text"
                    placeholder="Lynn Tanner"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Tannerlynntanner2001@gmail.com"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                  />
                </div>
              </div>
            </>
          )}
          {active === 1 && (
            <>
              <div className="flex w-full gap-3 pl-[35px] mt-5">
                <Menu as="div" className="relative w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Company Type
                  </label>
                  <Menu.Button
                    className="relative items-center mt-2 flex z-20 justify-between w-full appearance-none rounded-lg border border-stroke px-5 py-3 outline-none transition"
                  >
                    <p>{company}</p>
                    <Image
                      alt="Icon"
                      width={14}
                      height={14}
                      src={"/dashboard/SelectDown.svg"}
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-75"
                    leaveTo="transform opacity-0 scale-95"
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leaveFrom="transform opacity-100 scale-100"
                  >
                    <Menu.Items className="absolute right-0 z-30 mt-2 w-full origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div>
                        {COMPANY_ARR?.map((list) => {
                          return (
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={() => setCompany(list?.name)}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-base"
                                  )}
                                >
                                  {list?.name}
                                </div>
                              )}
                            </Menu.Item>
                          );
                        })}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Webnova Infotech"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                  />
                </div>
              </div>
              <div className="flex w-full gap-3 pl-[35px] mt-[10px]">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Website URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://webnovainfotech.in/"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Owner
                  </label>
                  <input
                    type="text"
                    placeholder="Utsav Savaliya"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                  />
                </div>
              </div>
              <div className="w-full pl-[35px] mt-[10px]">
                <label className="text-base font-medium text-meta-purple-1">
                  Company mailing address
                </label>
                <input
                  type="text"
                  placeholder="Street address"
                  className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                />
              </div>
              <div className="flex w-full gap-3 pl-[35px] mt-[10px]">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="https://webnovainfotech.in/"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 px-5 py-3"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Utsav Savaliya"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 px-5 py-3"
                  />
                </div>
              </div>
              <div className="flex w-full gap-3 pl-[35px] mt-[10px]">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 px-5 py-3"
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 px-5 py-3"
                  />
                </div>
              </div>
            </>
          )}
          {active === 2 && (
            <>
              <div className="flex w-full gap-3 pl-[35px] mt-5">
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    placeholder="NSLPQS2154"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    Name on PAN Card
                  </label>
                  <input
                    type="text"
                    placeholder="Webnova Infotech"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-2 px-5 py-3"
                  />
                </div>
              </div>
            </>
          )}
          <div className="w-full flex justify-end mt-[30px]">
            <button className="bg-meta-blue-1 text-white text-base rounded-lg w-[150px] py-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
