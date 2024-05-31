'use client';

import { WORKPLACE_TYPE } from '@/constant/Enum';
import { Menu, Transition } from '@headlessui/react';
import { useFormik } from 'formik';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import Button from '../Button';
import BGVProfile from './BGVProfile';
import BGVFullReport from './BGVFullReport';
function classNames(...classes: any) {
  return classes.filter(Boolean).join('');
}

const AddBGVExperience = () => {
  const [saveExperience, setSaveExperience] = useState(false);

  const validationSchema: any = [];
  const handleSubmit = async (values: any, actions: any) => {
    setSaveExperience(true);
  };
  const formik: any = useFormik({
    initialValues: {},
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return !saveExperience ? (
    <div className="mt-5">
      <p className="text-lg font-medium text-meta-purple-1">
        Company Information
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <label
            htmlFor={'Working'}
            className={`flex cursor-pointer select-none items-center `}
          >
            <input
              type="checkbox"
              id={'Working'}
              // name={'workplace'}
              // value={list}
              // checked={formik?.values?.workplace.includes(list) ? true : false}
              // onChange={formik.handleChange}
            />
            <p className="pl-3 capitalize text-meta-light-blue-3">
              {'I am currently working'}
            </p>
          </label>
        </div>
        <div className="mt-5 w-full">
          <p className="text-base font-medium text-meta-light-blue-3">
            Company name*
          </p>
          <input
            type="text"
            placeholder="Company name"
            className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
          />
        </div>
        <div className="mt-4 flex w-full items-center gap-4">
          <div className="w-full lg:w-1/2 ">
            <p className="text-base font-medium text-meta-light-blue-3">
              Start date
            </p>
            <DatePicker
              format="YYYY-MM-DD"
              // value={date?.startDate}
              placeholder="Start date"
              onOpenPickNewDate={false}
              containerStyle={{ width: '100%' }}
              // onChange={(dt: any) => {
              //   setDate({
              //     ...date,
              //     startDate: dt?.format('YYYY-MM-DD'),
              //   });
              // }}
              style={{
                height: 50,
                width: '100%',
                borderRadius: 8,
                border: 0,
                paddingLeft: 10,
                marginTop: 10,
                backgroundColor: '#EFF4FF',
              }}
            />
          </div>
          <div className="w-full lg:w-1/2 ">
            <p className="text-base font-medium text-meta-light-blue-3">
              Start date
            </p>
            <DatePicker
              format="YYYY-MM-DD"
              // value={date?.startDate}
              placeholder="End date"
              onOpenPickNewDate={false}
              containerStyle={{ width: '100%' }}
              // onChange={(dt: any) => {
              //   setDate({
              //     ...date,
              //     startDate: dt?.format('YYYY-MM-DD'),
              //   });
              // }}
              style={{
                height: 50,
                width: '100%',
                borderRadius: 8,
                border: 0,
                paddingLeft: 10,
                marginTop: 10,
                backgroundColor: '#EFF4FF',
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="text-base font-medium text-meta-light-blue-3">
            Start date
          </p>
          <Menu as="div" className="relative  mt-[10px] w-full">
            <Menu.Button className="relative z-20 flex  w-full appearance-none items-center justify-between rounded-lg bg-meta-light-blue-2  px-4 py-5 outline-none transition">
              <p className="text-meta-gray-1">onSite</p>
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
              <Menu.Items className="mt-  absolute right-0 z-30 max-h-[200px] w-full origin-top-right divide-y divide-gray-200 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div>
                  {WORKPLACE_TYPE?.map((list: any) => {
                    return (
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active
                                ? 'bg-meta-blue-1 text-white'
                                : 'text-gray-900',
                              'block px-4 py-2 text-[14px] capitalize hover:text-white',
                            )}
                          >
                            {list}
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
        <div className="mt-4">
          <p className="text-base font-medium text-meta-light-blue-3">
            Reference*
          </p>
          <div className="flex w-full justify-center gap-4">
            <div className="w-full lg:w-1/2">
              <input
                type="text"
                placeholder="Name"
                className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <input
                type="text"
                placeholder="Designation"
                className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
              />
            </div>
          </div>
          <div className=" flex w-full justify-center gap-4">
            <div className="w-full lg:w-1/2">
              <input
                type="text"
                placeholder="Name"
                className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <input
                type="text"
                placeholder="Designation"
                className="mt-[10px] w-full rounded-lg bg-meta-light-blue-2 px-4 py-5 text-black focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex w-full justify-between">
          <Button
            title={'+ Add new experience'}
            btnClass={'!w-auto !px-4'}
            type={'button'}
          />
          <Button title={'Save'} btnClass={'!w-[140px] '} type="submit" />
        </div>
      </form>
    </div>
  ) : (
    <BGVProfile />
  );
};
export default AddBGVExperience;
