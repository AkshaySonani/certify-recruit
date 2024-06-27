'use client';
import Image from 'next/image';
import Select from '@/Components/Select';
import Checkbox from '@/Components/Checkbox';
import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Menu, Popover, Switch, Transition } from '@headlessui/react';
import { TEXT } from '@/service/Helper';
import MultipleSelectBox from '@/Components/MultipleSelectBox';
import { components } from 'react-select';
import useDebounce from '@/hooks/useDebounce';
import { API_CONSTANT } from '@/constant/ApiConstant';
import API from '@/service/ApiService';
import { toast } from 'react-toastify';
import DatePicker from 'react-multi-date-picker';
import Link from 'next/link';
let statusArr = [
  {
    id: 1,
    status: 'Available',
  },
  { id: 2, status: 'Hired' },
  { id: 3, status: 'All' },
];

const Page = () => {
  const [active, setActive] = useState(statusArr[0]?.status);
  const [skills, setSkills] = useState([]);
  const [skillQuery, setSkillQuery] = useState('');
  const debouncedSearchSkill = useDebounce(skillQuery);
  const [skillData, setSkillData] = useState([]);
  const [uplodedDate, setUplodedDate] = useState('');
  const [experience, setExperience] = useState('');
  const [selectRole, setSelectRole] = useState('');
  const [tableData, setTableData] = useState([]);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
  }
  const handleClose = (list: any) => {
    const arr = skills.filter((el: any) => {
      return el !== list;
    });
    setSkills(arr);
  };
  const searchSkillApi = (search: any) => {
    let obj = {
      searchText: search,
    };
    API.post(API_CONSTANT?.CATEGORY, obj)
      .then((res: any) => {
        let skiilArr = res?.data?.data?.map((list: any) => {
          return {
            _id: list?._id,
            label: list?.subcategory,
            value: list?.subcategory,
          };
        });
        setSkillData(skiilArr);
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };

  useEffect(() => {
    if (debouncedSearchSkill !== '') {
      searchSkillApi(debouncedSearchSkill);
    }
  }, [debouncedSearchSkill]);

  const onSearchSkill = (search: any) => {
    setSkillQuery(search);
  };

  const Placeholder = (props: any) => {
    return <components.Placeholder {...props} />;
  };

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <Image alt="Plus" width={20} height={19} src={'/job/Plus.svg'} />
      </components.DropdownIndicator>
    );
  };
  const SkillMenuStyle = {
    control: (base: any, state: any) => ({
      ...base,
      border: '2px solid #dce7ff',
      width: state?.isFocused ? '100%' : '128px',
      borderRadius: '8px',
      // This line disable the blue border

      '&:hover': {
        border: '2px solid #dce7ff',
      },
    }),
  };
  const ROLE = [
    'US Recruitment',
    'Domestic Recruitment',
    'Human Resource',
    'Bench Sales',
    'UK Recruitment',
    'Canada Recruitment',
  ];

  const onFilterSubmit = () => {
    let obj = {
      role: selectRole,
      skills: skills.map((el: any) => el?._id),
      data_uploaded: uplodedDate,
      Experience: experience,
    };
    API.post(API_CONSTANT?.SEARCH_CVS, obj)
      .then((res: any) => {
        setTableData(res?.data?.data);
        console.log('res', res);
      })
      .catch((error: any) => {
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };

  const onClearFilter = () => {
    setSkills([]);
    setExperience('');
    setUplodedDate('');
    setSelectRole('');
    setTableData([]);
  };

  const downLoadResume = async (imageSrc: any) => {
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);
    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'image file name here';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-semibold text-meta-purple-1">
          {TEXT?.SEARCH_CVS}
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-sm bg-green-500" />
            <p className="text-base font-medium text-meta-purple-1">
              {TEXT?.AVAILABLE}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-sm bg-red-500" />
            <p className="text-base font-medium text-meta-purple-1">Hired</p>
          </div>
        </div>
      </div>
      <div className="mb-10 mt-5 flex w-full items-center justify-between gap-6">
        <div className="w-2/4">
          <Popover className="relative">
            <Popover.Button className="absolute left-3 top-4">
              <Image
                alt="date"
                width={19}
                height={15}
                src={'/dashboard/filter.svg'}
              />
            </Popover.Button>
            <input
              type="text"
              placeholder="Job title"
              className="border-stroke focus:border-primary active:border-primary h-12 w-full rounded-lg border-2 bg-transparent px-12 py-3 text-black outline-none transition"
            />

            <Popover.Panel className="absolute z-10 mt-2 w-full rounded-xl border border-meta-light-blue-1 bg-white p-4 shadow-xl">
              <div className="w-full">
                <label className="text-base font-medium text-meta-purple-1">
                  Role
                </label>
                <Menu as="div" className="relative ">
                  <Menu.Button className="relative mt-2 flex w-full appearance-none items-center justify-between rounded-lg border border-meta-light-blue-1 px-3 py-3 outline-none transition">
                    <p className="pr-5 text-base font-medium text-meta-purple-1">
                      {selectRole}
                    </p>
                    <Image
                      alt="Icon"
                      width={14}
                      height={14}
                      src={'/dashboard/SelectDown.svg'}
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
                    <Menu.Items className="absolute right-0 z-30 max-h-[200px] w-full min-w-36 origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div>
                        {ROLE?.map((el: any) => {
                          return (
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  onClick={() => setSelectRole(el)}
                                  className={classNames(
                                    active
                                      ? 'bg-meta-blue-1 text-white'
                                      : 'text-gray-900',
                                    'block px-4 py-2 text-sm capitalize',
                                  )}
                                >
                                  {el}
                                </div>
                              )}
                            </Menu.Item>
                          );
                        })}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="mt-3 flex w-full flex-col items-start lg:mt-0 lg:w-1/2">
                <div className="mt-4 flex flex-wrap items-start justify-start text-start sm:flex-nowrap">
                  {skills?.map((ele: any, i: any) => {
                    return (
                      <div className="mb-2 mr-3 flex h-10 items-center rounded-lg border-2 border-meta-light-blue-1 px-2 py-1">
                        <p className="whitespace-nowrap text-sm font-medium text-meta-light-blue-3">
                          {ele?.label}
                        </p>
                        <div
                          className="cursor-pointer "
                          onClick={() => handleClose(ele)}
                        >
                          <Image
                            width={19}
                            height={19}
                            alt="Preview"
                            className="ml-3"
                            src={'/job/Close.svg'}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex w-full flex-wrap items-start lg:mt-0">
                  <MultipleSelectBox
                    name="skills"
                    isMulti={true}
                    style={SkillMenuStyle}
                    className="border-1 w-full border-meta-light-blue-1 "
                    placeholder="Add"
                    options={skillData}
                    value={skills}
                    handleChange={(option: any) => setSkills(option)}
                    onKeyDown={(e: any) => {
                      console.log('e', e);
                      onSearchSkill(e);
                    }}
                    components={{ Placeholder, DropdownIndicator }}
                  />
                </div>
              </div>
              {/* <div className="mt-4 w-full">
                <label className="text-base font-medium text-meta-purple-1">
                  {TEXT?.LOCATION}
                </label>
                <input
                  type="text"
                  placeholder="Type location here..."
                  className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                />
              </div> */}
              <div className="mt-4 flex w-full flex-col  lg:flex-row lg:gap-2">
                <div className="w-full lg:w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.DATE_UPLOADED}
                  </label>

                  <div className="flex  items-center">
                    <DatePicker
                      format="YYYY-MM-DD"
                      value={uplodedDate}
                      placeholder="DD-MM-YY"
                      onOpenPickNewDate={false}
                      containerStyle={{ width: '100%' }}
                      onChange={(dt: any) => {
                        setUplodedDate(dt?.format('DD-MM-YYYY'));
                      }}
                      style={{
                        height: 38,
                        width: '100%',
                        borderColor: '#DCE7FF',
                        borderRadius: 8,
                        paddingLeft: 10,
                        marginTop: 3,
                      }}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.EXPERIENCE}
                  </label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e?.target?.value)}
                    placeholder="Type here..."
                    className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
                  />
                </div>
              </div>
              <div className="mt-4 w-full ">
                <label className="text-base font-medium text-meta-purple-1">
                  {TEXT?.STATUS}
                </label>
                <div className="flex w-full flex-wrap items-center gap-4">
                  <div className=" mt-1 rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3">
                    <Checkbox
                      label={'All'}
                      className="text-base font-medium text-meta-light-blue-3"
                    />
                  </div>
                  <div className=" mt-1 rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3">
                    <Checkbox
                      label={'Available'}
                      className="text-base font-medium text-meta-light-blue-3"
                    />
                  </div>
                  <div className=" mt-1 rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3">
                    <Checkbox
                      label={'Hired'}
                      className="text-base font-medium text-meta-light-blue-3"
                    />
                  </div>
                </div>
                <div className="mt-4 flex w-full justify-end">
                  <button
                    onClick={() => onClearFilter()}
                    className="ml-5 h-12 w-28 rounded-xl border border-meta-light-blue-2 bg-meta-light-blue-1"
                  >
                    <span className="flex justify-center text-sm font-medium text-meta-light-blue-3">
                      Clear
                    </span>
                  </button>
                  <button
                    onClick={() => onFilterSubmit()}
                    className="ml-5 h-12 w-28 rounded-xl border border-meta-light-blue-2 bg-meta-light-blue-1"
                  >
                    <span className="flex justify-center text-sm font-medium text-meta-light-blue-3">
                      {TEXT?.DONE}
                    </span>
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
        {/* <div className="flex w-2/4 items-center">
          <div>
            <input
              type="text"
              placeholder="City pincode"
              className="border-stroke focus:border-primary active:border-primary h-12 w-full rounded-lg border-2 bg-transparent py-3 pl-1 text-black outline-none transition"
            />
          </div>
          <div className="ml-3 rounded-lg bg-meta-light-blue-2 p-2">
            <Image
              alt="date"
              width={19}
              height={19}
              src={'/dashboard/search.svg'}
            />
          </div>
        </div> */}
        <Menu as="div" className="relative ml-10">
          <div>
            <Menu.Button className="border-stroke relative z-20 flex w-full min-w-40 appearance-none items-center justify-between rounded-lg border bg-meta-light-blue-2 px-5 py-3 outline-none transition">
              <p>{active}</p>
              <Image
                alt="Icon"
                width={14}
                height={14}
                src={'/dashboard/SelectDown.svg'}
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-75"
            leaveTo="transform opacity-0 scale-95"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leaveFrom="transform opacity-100 scale-100"
          >
            <Menu.Items className="absolute right-0 z-30 mt-2 min-w-40 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                {statusArr?.map((list) => {
                  return (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => setActive(list?.status)}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-base',
                          )}
                        >
                          {list?.status}
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div>
        <table className="w-full min-w-[600px] overflow-x-auto overflow-y-auto text-left text-sm">
          <thead className="border-b border-meta-light-blue-1 shadow-inner">
            <tr>
              <th></th>
              <th className="w-1/4 px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.NAME}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.DESIGNATION}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="text-base font-medium text-meta-light-blue-3">
                  {TEXT?.EXPERIENCE}
                </div>
              </th>

              <th className="w-1/12 px-6" />
            </tr>
          </thead>
          <tbody>
            {tableData.map((item: any) => {
              return (
                <tr>
                  <td>
                    <div className="h-3.5 w-3.5 rounded-sm bg-green-500" />
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center">
                      <Image
                        alt="Icon"
                        width={31}
                        height={31}
                        src={'/dashboard/photo.svg'}
                      />
                      <div className="pl-4 text-base font-medium text-meta-purple-1">
                        {item.userDetails?.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium text-meta-purple-1">
                        {item?.role}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="text-base font-medium text-meta-purple-1">
                        {item?.totalExperience?.years} Year,{' '}
                        {item?.totalExperience?.months} Months
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex justify-end">
                      <Link
                        href={item?.resume?.[0]?.file_url ?? ''}
                        target="_blank"
                      >
                        <div className="cursor-pointer">
                          <Image
                            alt="Icon"
                            width={21}
                            height={21}
                            className="mx-4"
                            src={'/sidebarIcon/jobPosting.svg'}
                          />
                        </div>
                      </Link>
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          downLoadResume(item?.user_cv?.[0]?.file_url)
                        }
                      >
                        <Image
                          alt="Icon"
                          width={21}
                          height={21}
                          className="mx-4"
                          src={'/dashboard/download.svg'}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
